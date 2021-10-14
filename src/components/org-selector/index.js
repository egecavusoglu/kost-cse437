import { HStack, Text, Select } from '@chakra-ui/react';
export default function OrgSelector({ props }) {
  return (
    <HStack bg="white" px={12} py={2} spacing={4}>
      <Text fontWeight="medium" fontSize="sm">
        Organisation
      </Text>
      <Select placeholder="Select organisation" size="sm" bg="white" w="min" minW={48}>
        <option value="option1">Option 1Option 1Option 1Option 1Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
    </HStack>
  );
}
