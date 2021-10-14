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
  HStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { createOrganisation } from 'src/requests/organisation';

export default function AddProductModal({ isOpen, onOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="gray.700">Add New Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <AddProductForm onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

function AddProductForm({
  onClose = () => {}, // Callback function invoked after a successfull create.
  ...props
}) {
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
    handleSuccessfulCreate();
  };

  const handleSuccessfulCreate = () => {
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack pb={4} px={5} bg="white" spacing={5}>
        <FormControl mt={4} isRequired id="product-name">
          <FormLabel color="gray.700">Name</FormLabel>
          <Text fontSize="xs" color="gray.600" mb={3}>
            of the service or the product. eg. Stripe, AWS, Azure
          </Text>
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>
        <FormControl mt={4} isRequired id="product-description">
          <FormLabel color="gray.700">Description</FormLabel>
          <Text fontSize="xs" color="gray.600" mb={3}>
            Briefly describe what this product/service is used for. eg. 'This is our payment
            provider.'
          </Text>
          <Textarea type="text" value={desc} onChange={(e) => setDesc(e.target.value)} />
        </FormControl>

        <HStack alignItems="start">
          <FormControl w={48} isRequired id="product-plan">
            <FormLabel color="gray.700">Currency</FormLabel>
            <Select value={plan} onChange={(e) => setPlan(e.target.value)}>
              <option value="usd">USD ($)</option>
            </Select>
          </FormControl>
          <FormControl isRequired id="product-name">
            <FormLabel color="gray.700">Amount</FormLabel>
            {/* <Text fontSize="xs" color="gray.600" mb={3}>
              of the service or the product
            </Text> */}
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>
        </HStack>
        <FormControl isRequired id="product-plan">
          <FormLabel color="gray.700">Billing Period</FormLabel>
          <Select value={plan} onChange={(e) => setPlan(e.target.value)}>
            <option value="MONTHLY">Monthly</option>
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
