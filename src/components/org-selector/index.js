import { HStack, Text, Select } from '@chakra-ui/react';
import { useOrgs } from 'src/requests/organisation';
import { useRouter } from 'next/router';

export default function OrgSelector({ value, ...props }) {
  const router = useRouter();
  const orgId = router.query.id;
  const { orgs, loading, error } = useOrgs();

  const handleChange = (e) => {
    const oid = e.target.value;
    router.push(`/org/${oid}`);
  };
  return (
    <HStack bg="white" px={12} py={2} spacing={4} borderBottom="2px solid" borderColor="gray.300">
      <Text fontWeight="semibold" color="gray.600" fontSize="sm">
        Organisation
      </Text>
      <Select
        fontWeight="semibold"
        color="gray.700"
        placeholder="Select organisation"
        size="sm"
        bg="white"
        w="min"
        minW={48}
        value={orgId}
        onChange={handleChange}>
        {orgs?.map((org) => (
          <option key={org.id} value={org.id}>
            {org.name}
          </option>
        ))}
      </Select>
    </HStack>
  );
}
