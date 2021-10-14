import {
  Center,
  useDisclosure,
  VStack,
  Box,
  Flex,
  Spacer,
  Badge,
  Text,
  Skeleton,
  SkeletonText,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import AddOrgModal from '../add-org-modal';
import { formatDate } from 'src/lib/date';
export default function OrgItem({ data = {}, ...props }) {
  const formattedDate = formatDate(data.createdAt);
  return (
    <Container>
      <Box flex="1" w="full">
        <Text fontWeight="semibold" mb={2}>
          {data.name}
        </Text>
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

function InnerContent() {}

function AddOrgItem() {
  const iconSize = 10;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const launchAddOrg = () => {
    onOpen();
  };

  return (
    <>
      <Container>
        <Box w="full" h="full" as="button" textAlign="left" onClick={launchAddOrg}>
          <Box flex="1" w="full">
            <Text color="gray.700" fontWeight="medium">
              Add Organisation
            </Text>
          </Box>
          <Center h="full" w="full">
            <AddIcon color="secondary.400" w={iconSize} h={iconSize} />
          </Center>
        </Box>
      </Container>
      <AddOrgModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
}

function OrgItemSkeleton() {
  return (
    <Container>
      <Box w="full" h="full">
        <Skeleton height="20px" />
        <SkeletonText mt="4" noOfLines={2} spacing="4" />
      </Box>
    </Container>
  );
}
export { AddOrgItem, OrgItemSkeleton };
