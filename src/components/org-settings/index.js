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
} from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import { useOrgMembers } from 'src/requests/members';
import UserTag, { AddUserTag } from 'src/components/user-tag';

export default function OrgSettings({ org, ...props }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const orgId = org?.id;
  const { members, loading, error } = useOrgMembers(orgId);

  return (
    <>
      <Button variant="ghost" leftIcon={<SettingsIcon />} color="gray.600" onClick={onOpen}>
        Settings
      </Button>
      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen} bg={'secondary.400'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            <Text color="secondary.600">Settings</Text>
          </DrawerHeader>
          <DrawerBody>
            <Box height={'50vh'}>
              <Heading as="h4" size="md" fontWeight="medium" color="gray.600">
                Members
              </Heading>
              <Wrap py={4}>
                {members?.map((m) => (
                  <UserTag name={`${m.user.firstName} ${m.user.lastName}`} isAdmin={m.isAdmin} />
                ))}
                <AddUserTag orgId={orgId} />
              </Wrap>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
