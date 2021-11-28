import Navbar from 'src/components/navbar';
import { useOrgDetails } from 'src/requests/organisation';
import { useProducts, useProdDetails } from 'src/requests/products';
import ProdSelector from 'src/components/prod-selector';
import Link from 'src/components/link';
import { useRouter } from 'next/router';
import ProductItem, { AddProductItem, ProductItemSkeleton } from 'src/components/product-item';
import { Button, Text, Flex, Box, Grid, Heading, Wrap, WrapItem, VStack } from '@chakra-ui/react';

export default function ProductDetailsPage({ data = {}, ...props }) {
  const router = useRouter();
  const productId = router.query.productId;
  const orgId = router.query.id;
  const { product, loading, error } = useProdDetails(productId, orgId);
  console.log(product);
  return (
    <>
      <div>
        <Navbar />
        <ProdSelector />
        <Box m={[2, 4]} p={[2, 4]}>
          <Flex mb={4} alignItems="center" justifyContent="space-between">
            <Heading color="secondary.600" as="h2" fontSize="2xl">
              {product?.name}
            </Heading>
          </Flex>
          <Box py={1} mb={6}>
            <Text>{product?.description}</Text>
          </Box>
        </Box>
        <Link to={`/org/${orgId}/product/${productId}`} fontWeight="semibold" mb={2}>
          {/* {data.name} */}
        </Link>
        <Box maxH={24} w="full" overflow="hidden">
          <Text fontSize="sm" textAlign="left" color="gray.700" noOfLines={4}>
            {/* {data.description} */}
          </Text>
        </Box>

        {/* username, pw, website link, cost, notes(how to use) */}
      </div>
    </>
  );
}
