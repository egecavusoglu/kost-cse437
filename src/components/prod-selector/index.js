import { HStack, Text, Select } from '@chakra-ui/react';
import { useOrgs } from 'src/requests/organisation';
import { useRouter } from 'next/router';
import { useProducts } from 'src/requests/products';
import { useProdDetails } from 'src/requests/products';

export default function ProdSelector({ data = {}, value, ...props }) {
  const router = useRouter();
  const { products } = useProducts(orgId);
  const orgId = router.query.id;
  const productId = data.id;
  const { orgs, loading, error } = useOrgs();

  const handleChange = (e) => {
    const pid = e.target.value;
    router.push(`/org/${orgId}/product/${productId}`);
  };
  return (
    <HStack bg="white" px={4} py={2} spacing={4} borderBottom="2px solid" borderColor="gray.300">
      <Text fontWeight="semibold" color="gray.600" fontSize="sm">
        Products
      </Text>
      <Select
        fontWeight="semibold"
        color="gray.700"
        size="sm"
        bg="white"
        w="min"
        minW={48}
        value={productId}
        onChange={handleChange}>
        {products?.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </Select>
    </HStack>
  );
}
