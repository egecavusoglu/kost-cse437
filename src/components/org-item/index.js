import {
  Center,
  useDisclosure,
  VStack,
  Box,
  Flex,
  Button,
  Badge,
  Text,
  Skeleton,
  SkeletonText,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import AddOrgModal from '../add-org-modal';
import { formatDate } from 'src/lib/date';
import Link from 'src/components/link';
import { DotsHorizontalIcon } from '@heroicons/react/solid';
import IconWrapper from '../icon-wrapper';
import { deleteOrganisation } from 'src/requests/organisation';
import { useSWRConfig } from 'swr';

export default function OrgItem({ data = {}, ...props }) {
  const { mutate } = useSWRConfig();
  const toast = useToast();
  const formattedDate = formatDate(data.createdAt);
  const organizationId = data.id;

  const handleDeleteOrg = async () => {
    const result = await deleteOrganisation(organizationId);
    if (!result) {
      return toast({
        title: 'Oops.',
        description: "We've encountered an error deleting organisation.",
        status: 'error',
        duration: 3000,
        isClosable: false,
      });
    }
    toast({
      title: 'Organisation deleted!',
      description: 'We hope that was intended mate.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    mutate('/api/orgs');
  };
  return (
    <Container>
      <Box flex="1" w="full">
        <Link to={`/org/${data.id}`} fontWeight="semibold" mb={2}>
          {data.name}
        </Link>
        <Text fontSize="sm" textAlign="left" color="gray.700">
          {data.description}
        </Text>
      </Box>

      <Flex justifyContent="space-between" w="full">
        <Badge colorScheme="green">{data.plan}</Badge>
        <Text fontSize="xs">created {formattedDate}</Text>
      </Flex>
      <Flex justifyContent="end" w="full">
        <Menu>
          <MenuButton as={Button} size="xs" variant="ghost">
            <IconWrapper icon={DotsHorizontalIcon} color="gray.400" boxSize={5} />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={handleDeleteOrg} color="red.400">
              Delete Organisation
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
      _hover={{ shadow: 'xl' }}
      transitionProperty="all"
      transitionDuration={'200ms'}>
      {children}
    </VStack>
  );
}

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
