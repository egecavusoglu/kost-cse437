import {
  Center,
  useDisclosure,
  VStack,
  Box,
  Flex,
  Badge,
  Text,
  Skeleton,
  SkeletonText,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import AddProductModal from '../add-product-modal';
import { getCurrencySymbol } from 'src/lib/currency';
import IconWrapper from '../icon-wrapper';
import { deleteProduct } from 'src/requests/products';
import { useSWRConfig } from 'swr';
import { DotsHorizontalIcon } from '@heroicons/react/solid';

export default function ProductItem({ data = {}, ...props }) {
  const { mutate } = useSWRConfig();
  const toast = useToast();
  const formattedAmount = `${getCurrencySymbol(data.currency)}${data.amount}`;

  const handleDeleteProduct = async () => {
    const result = await deleteProduct(data.id);
    if (!result) {
      return toast({
        title: 'Oops.',
        description: "We've encountered an error deleting product.",
        status: 'error',
        duration: 3000,
        isClosable: false,
      });
    }
    toast({
      title: 'Product deleted!',
      description: 'We hope that was intended mate.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    mutate(`/api/orgs/${data.organisationId}/products`);
  };

  return (
    <Container>
      <Box w="full" flex="1">
        <Text fontWeight="semibold" mb={2} color="secondary.600">
          {data.name}
        </Text>

        <Text fontSize="sm" textAlign="left">
          {data.description}
        </Text>
      </Box>

      <HStack w="full" justifyContent="start" alignItems="center">
        <Text color="primary.500" fontSize="3xl" fontWeight="semibold">
          {formattedAmount}
        </Text>
        <Badge colorScheme="green">{data.billingPeriod}</Badge>
      </HStack>
      <Flex justifyContent="end" w="full">
        <Menu>
          <MenuButton as={Button} size="xs" variant="ghost">
            <IconWrapper icon={DotsHorizontalIcon} color="gray.400" boxSize={5} />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={handleDeleteProduct} color="red.400">
              Delete Product
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Container>
  );
}

function Container({ children, ...props }) {
  return (
    <VStack
      {...props}
      bg="white"
      h={56}
      w="full"
      minWidth={52}
      shadow="md"
      rounded="lg"
      p={3}
      _hover={{ shadow: 'lg' }}
      transitionProperty="all"
      transitionDuration={'200ms'}>
      {children}
    </VStack>
  );
}

function AddProductItem({ orgId }) {
  const iconSize = 10;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const launchAddModal = () => {
    onOpen();
  };

  return (
    <>
      <Container>
        <Box w="full" h="full" as="button" textAlign="left" onClick={launchAddModal}>
          <Box flex="1" w="full">
            <Text color="gray.700" fontWeight="medium">
              Add Product
            </Text>
          </Box>
          <Center h="full" w="full">
            <AddIcon color="secondary.400" w={iconSize} h={iconSize} />
          </Center>
        </Box>
      </Container>
      <AddProductModal orgId={orgId} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
}

function ProductItemSkeleton() {
  return (
    <Container>
      <Box w="full" h="full">
        <Skeleton height="20px" />
        <SkeletonText mt="4" noOfLines={2} spacing="4" />
      </Box>
    </Container>
  );
}
export { AddProductItem, ProductItemSkeleton };
