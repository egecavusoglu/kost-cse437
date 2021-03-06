import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Text,
  Badge,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { createOrganisation } from 'src/requests/organisation';
import { useSWRConfig } from 'swr';
export default function AddOrgModal({ isOpen, onOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="gray.700">Add New Organisation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <AddOrgForm onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

function AddOrgForm({
  onClose = () => {}, // Callback function invoked after a successfull create.
  ...props
}) {
  const { mutate } = useSWRConfig();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState();
  const [desc, setDesc] = useState();
  const [plan, setPlan] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await createOrganisation({
      name,
      description: desc,
      plan,
    });
    setLoading(false);

    if (!res) {
      // Error creating
      return toast({
        title: 'Oops.',
        description: "We've encountered an error creating organisation.",
        status: 'error',
        duration: 3000,
        isClosable: false,
      });
    }

    toast({
      title: 'Organisation created.',
      description: 'You are all set!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    mutate(`/api/orgs`);
    handleSuccessfulCreate();
  };

  const handleSuccessfulCreate = () => {
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack pb={4} px={5} bg="white" spacing={5}>
        <FormControl mt={4} isRequired id="org-name">
          <FormLabel color="gray.700">Name</FormLabel>
          <Text fontSize="xs" color="gray.600" mb={3}>
            This name is the unique identifier of your organisation.
          </Text>
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>
        <FormControl mt={4} isRequired id="org-description">
          <FormLabel color="gray.700">Description</FormLabel>
          <Text fontSize="xs" color="gray.600" mb={3}>
            Briefly describe what your organisation is doing.
          </Text>
          <Textarea type="text" value={desc} onChange={(e) => setDesc(e.target.value)} />
        </FormControl>
        <FormControl mt={4} isRequired id="org-plan">
          <FormLabel color="gray.700">Subscription Plan</FormLabel>
          <Text fontSize="xs" color="gray.600" mb={3}>
            We only offer Free subscriptions for now!
          </Text>
          <Select placeholder="Select Plan" value={plan} onChange={(e) => setPlan(e.target.value)}>
            <option value="FREE">Free</option>
          </Select>
        </FormControl>
        <Button
          isLoading={loading}
          colorScheme="primary"
          w="min-content"
          alignSelf="center"
          type="submit">
          Create Organisation
        </Button>
      </Stack>
    </form>
  );
}
