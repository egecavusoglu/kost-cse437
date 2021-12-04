import {
  Heading,
  Drawer,
  DrawerOverlay,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Box,
  Wrap,
  Text,
  Stack,
  VStack,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
  Divider,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import { useOrgDetails, useDashboard, updateOrg, ORG_API_URI } from 'src/requests/organisation';
import { useOrgMembers } from 'src/requests/members';
import UserTag, { AddUserTag } from 'src/components/user-tag';
import { useAuthStore } from 'src/store';
import { getPermissionScore, canAddMembersToOrg } from 'src/lib/permissions';
import { sortMembers } from 'src/lib/order-members';
// question about how to make this change as an individual component
// import { OrgSettingsUpdate } from 'src/components/org-settings-update';
import { useEffect, useState } from 'react';


export default function OrgSettings({ org, ...props }) {
  // get user id from global state and compare it to members to see if current user is a member, owner of org. render menus accordingly.
  const user = useAuthStore((s) => s.user);
  const currentUserId = user?.id;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const orgId = org?.id;

  const { members, loading, error } = useOrgMembers(orgId);
  const sortedMembers = sortMembers(members);
  const currentUsersMember = members?.find((e) => e.userId == currentUserId);
  const isCurrentUserOwner = currentUsersMember?.isOwner;
  const isCurrentUserAdmin = currentUsersMember?.isAdmin;
  const currentUserPermissionsScore = getPermissionScore({
    isAdmin: isCurrentUserAdmin,
    isOwner: isCurrentUserOwner,
  });
  const currentUserCanAddMembers = canAddMembersToOrg(currentUserPermissionsScore);
  // console.log(org);

  // add update form submit handler
  const toast = useToast();

  // useEffect(() => {
  //   setLocalOrg(org);
  // }, [org]);

  const [localOrg, setLocalOrg] = useState(org);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateOrg({
      name: localOrg.name,
      description: localOrg.description,
      plan: localOrg.plan,
    });
    if (!res) {
      return toast({
        title: 'Oops.',
        description: "We've encountered an error updating organisation details. Please try again later.",
        status: 'error',
        duration: 3000,
        isClosable: false,
      });
    }
    mutate(ORG_API_URI);
    toast({
      title: 'organisation details Updated',
      description: 'You are all set!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <>
      <Button variant="ghost" leftIcon={<SettingsIcon />} color="gray.600" onClick={onOpen}>
        Settings
      </Button>
      <Drawer placement="right" onClose={onClose} isOpen={isOpen} size={'lg'} bg={'secondary.400'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color="gray.100" />
          <DrawerHeader borderBottomWidth="1px" bg="secondary.500">
            <Text color="gray.100">Settings</Text>
          </DrawerHeader>
          <DrawerBody>
            <Box
              // height={'50vh'}
              py={4}>
              <Heading as="h4" size="md" fontWeight="medium" color="gray.600">
                Members
              </Heading>
              <Wrap py={4}>
                {sortedMembers?.map((m) => (
                  <UserTag
                    key={m.userId}
                    orgId={orgId}
                    userId={m.userId}
                    name={`${m.user.firstName} ${m.user.lastName}`}
                    isAdmin={m.isAdmin}
                    isOwner={m.isOwner}
                    permissionLevel={currentUserPermissionsScore}
                  />
                ))}
                {currentUserCanAddMembers && <AddUserTag orgId={orgId} />}
              </Wrap>

              <Heading as="h4" size="md" fontWeight="medium" color="gray.600">
                Organisation Details
              </Heading>
              <Box
                overflow="hidden"
                bg="white"
                display="flex"
                flexDirection="column"
                w="45%"
                minWidth={52}
                shadow="md"
                rounded="lg"
                p={3}
                marginBottom="10"
                marginTop="1">
                {/* not able to get data from orgDetail by use useOrgDetails() function */}
                <Text fontSize="20px">Organisation Name:{org?.name} </Text>
                <Text fontSize="20px">Description: {org?.description}</Text>
                <Text fontSize="20px">Subscription Plan: {org?.plan}</Text>
              </Box>

              <Stack p={4} direction={['column', 'column', 'row']} spacing={4}>
                <VStack
                  as="form"
                  onSubmit={handleSubmit}
                  bg="white"
                  w="full"
                  borderRadius="lg"
                  p={0}
                  alignItems="flex-start"
                  spacing={6}
                  maxW="3xl">
                  <Heading fontSize="2xl" fontWeight="medium" color="secondary.600">
                    Organisation Details
                  </Heading>

                  <FormControl isRequired={true} id="org_name">
                    <FormLabel color="gray.700">Organisation Name</FormLabel>
                    <Input
                      type="text"
                      onChange={(e) => setLocalOrg({ ...localOrg, name: e.target.value })}
                      value={localOrg?.name}
                      isRequired={true}
                    />
                  </FormControl>

                  <FormControl isRequired={true} id="org_description">
                    <FormLabel color="gray.700">Description</FormLabel>
                    <Input
                      type="text"
                      onChange={(e) => setLocalOrg({ ...localOrg, description: e.target.value })}
                      value={localOrg?.description}
                      isRequired={true}
                    />
                  </FormControl>

                  <FormControl isRequired={true} id="org_plan">
                    <FormLabel color="gray.700">Subscription Plan</FormLabel>
                    <Input
                      type="text"
                      onChange={(e) => setLocalOrg({ ...localOrg, plan: e.target.value })}
                      value={localOrg?.plan}
                      isRequired={true}
                    />
                  </FormControl>

                  <Button colorScheme={'primary'} type="submit">
                    Update Organisation Details
                  </Button>
                </VStack>
              </Stack>
            </Box>

            {/* <OrgSettingsUpdate /> */}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
