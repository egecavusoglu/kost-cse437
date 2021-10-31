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
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { validateEmail } from 'src/lib/email';
import { MEMBERS_API_URI, addMemberToOrg } from 'src/requests/members';
import { useSWRConfig } from 'swr';
export default function UserTag({ name, isAdmin = false, ...props }) {
  return (
    <Container>
      <HStack spacing={4}>
        <Text fontWeight="medium" color={'gray.600'} noOfLines={1}>
          {name}
        </Text>
        {isAdmin && <Badge colorScheme="cyan">admin</Badge>}
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
      px={4}
      bg={'white'}
      rounded="lg"
      shadow="sm">
      {children}
    </Box>
  );
}
