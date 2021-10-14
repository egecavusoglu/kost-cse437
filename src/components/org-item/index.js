import { Center, useDisclosure, VStack, Box, Flex, Spacer, Badge, Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import AddOrgModal from '../add-org-modal';
export default function OrgItem({ props }) {
  return (
    <Container>
      <Box flex="1">
        <Text fontWeight="semibold" mb={2}>
          Organization Name
        </Text>
        <Text fontSize="sm">This is some org description</Text>
      </Box>

      <Flex justifyContent="space-between" w="full">
        <Text fontSize="xs">created 12/01/2021</Text>
        <Badge colorScheme="green">Free</Badge>
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
      _hover={{ shadow: 'lg' }}
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
export { AddOrgItem };
