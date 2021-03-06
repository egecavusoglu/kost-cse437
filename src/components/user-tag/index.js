import { useRef, useState } from 'react';
import { Flex, HStack, Tag, Avatar, Badge, Button, Text, TagLabel, Box } from '@chakra-ui/react';
import {
  useToast,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Switch,
  FormErrorMessage,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { validateEmail } from 'src/lib/email';
import { MEMBERS_API_URI, addMemberToOrg } from 'src/requests/members';
import { useSWRConfig } from 'swr';
import { DotsHorizontalIcon } from '@heroicons/react/solid';
import IconWrapper from '../icon-wrapper';
import { getPermissionScore, canEditMemberStatus } from 'src/lib/permissions';
import { changeMemberStatus, removeMemberFromOrg } from 'src/requests/members';

export default function UserTag({
  orgId,
  userId,
  name,
  isAdmin = false,
  isOwner = false,
  permissionLevel, // Permission level of the current logged in user
  ...props
}) {
  const { mutate } = useSWRConfig();
  const toast = useToast();

  const generateUserBadge = () => {
    if (isOwner) {
      return <Badge colorScheme="primary">owner</Badge>;
    }
    if (isAdmin) {
      return <Badge colorScheme="cyan">admin</Badge>;
    }
    return null;
  };
  const canEdit = canEditMemberStatus({
    editor: permissionLevel,
    editee: getPermissionScore({ isAdmin, isOwner }),
  });

  const changeAdminStatus = async (newAdminState) => {
    const res = await changeMemberStatus(orgId, userId, { isAdmin: newAdminState });
    if (!res) {
      return toast({
        title: 'Oops.',
        description: "We've encountered an error.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    mutateMemberList();
    toast({
      title: 'Success',
      description: 'Changed permissions!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const removeMember = async () => {
    const res = await removeMemberFromOrg(orgId, userId);
    if (!res) {
      return toast({
        title: 'Oops.',
        description: "We've encountered an error.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    mutateMemberList();
    toast({
      title: 'Success',
      description: 'Removed User!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const mutateMemberList = () => {
    mutate(MEMBERS_API_URI(orgId));
  };

  return (
    <Container>
      <HStack spacing={1.5}>
        <Text fontWeight="medium" color={'gray.600'} noOfLines={1}>
          {name}
        </Text>
        {generateUserBadge()}
        {canEdit && (
          <Menu>
            <MenuButton as={Button} size="xs" variant="ghost" m={0}>
              <IconWrapper icon={DotsHorizontalIcon} color="gray.400" boxSize={5} />
            </MenuButton>
            <MenuList>
              {isAdmin ? (
                <MenuItem onClick={() => changeAdminStatus(false)} color="gray.600">
                  Remove admin privileges
                </MenuItem>
              ) : (
                <MenuItem onClick={() => changeAdminStatus(true)} color="gray.600">
                  Make admin
                </MenuItem>
              )}

              <MenuItem onClick={() => removeMember()} color="red.400">
                Remove member
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </HStack>
    </Container>
  );
}

function AddUserTag({ orgId, ...props }) {
  const { mutate } = useSWRConfig();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const [email, setEmail] = useState();
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleEmailChange = async (event) => {
    const val = event.target.value;
    setEmail(val);
    setInvalidEmail(!validateEmail(val));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, isAdmin);
    const response = await addMemberToOrg(orgId, { email, isAdmin });

    if (!response) {
      return toast({
        title: 'Oops.',
        description: "We've encountered an error.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    mutate(MEMBERS_API_URI(orgId));
    toast({
      title: 'Member added',
      description: 'Your team is growing!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    setEmail('');
  };
  return (
    <>
      <Button
        onClick={onOpen}
        variant="ghost"
        border="1px"
        borderColor="gray.200"
        color="gray.600"
        fontWeight="medium"
        shadow="sm"
        leftIcon={<AddIcon color="secondary.400" />}>
        Add Member
      </Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>Add New Member</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <VStack spacing={4}>
                <FormControl isRequired isInvalid={invalidEmail}>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    ref={initialRef}
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="First name"
                  />
                  <FormErrorMessage fontSize="xs">Please use a valid email.</FormErrorMessage>
                </FormControl>
                <FormControl isRequired>
                  <Flex alignItems="center" justifyContent="space-between">
                    <Box>
                      <FormLabel mb={0} htmlFor="admin-switch">
                        Make Admin{' '}
                      </FormLabel>
                      <Text color="gray.500" fontSize="sm" mb={2}>
                        you can change this later
                      </Text>
                    </Box>
                    <Switch
                      id="admin-switch"
                      size={'lg'}
                      colorScheme="primary"
                      value={isAdmin}
                      onChange={(e) => {
                        setIsAdmin(!isAdmin);
                      }}
                    />
                  </Flex>
                </FormControl>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button onClick={onClose}>Cancel</Button>
              <Button colorScheme="primary" ml={3} type="submit">
                Add Member
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
export { AddUserTag };

function Container({ children }) {
  return (
    <Box
      border="1px"
      borderColor="gray.200"
      w="max-content"
      py={2}
      px={3}
      bg={'white'}
      rounded="lg"
      shadow="sm">
      {children}
    </Box>
  );
}
