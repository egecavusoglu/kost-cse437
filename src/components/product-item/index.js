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
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import AddProductModal from '../add-product-modal';
import Link from 'src/components/link';

export default function ProductItem({ data = {}, ...props }) {
  return (
    <Container>
      <Box flex="1" w="full">
        <Link to={`/org/${data.id}`} fontWeight="semibold" mb={2}>
          {data.name}
        </Link>
        <Text fontSize="sm" textAlign="left">
          {data.description}
        </Text>
      </Box>

      <Flex justifyContent="space-between" w="full">
        <Badge colorScheme="green">{data.plan}</Badge>
        <Text fontSize="xs">created {formattedDate}</Text>
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
      w={52}
      shadow="md"
      rounded="lg"
      p={3}
      _hover={{ shadow: 'xl' }}
      transitionProperty="all"
      transitionDuration={'200ms'}>
      {children}
    </VStack>
  );
}

function AddProductItem() {
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
      <AddProductModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
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
