import Navbar from 'src/components/navbar';
import { useRouter } from 'next/router';
import { Button, Text, Flex, Box, Grid, Heading, Wrap, WrapItem } from '@chakra-ui/react';
import OrgSelector from 'src/components/org-selector';
import { useOrgDetails } from 'src/requests/organisation';
import ProductItem, { AddProductItem, ProductItemSkeleton } from 'src/components/product-item';
import { useProducts } from 'src/requests/products';
import OrgSettings from 'src/components/org-settings';

export default function OrgDetails({ props }) {
  const router = useRouter();
  const orgId = router.query.id;
  const { org, loading, error } = useOrgDetails(orgId);
  const { products } = useProducts(orgId);

  return (
    <div>
      <Navbar />
      <OrgSelector />
      <Box m={[2, 4]} p={[2, 4]}>
        <Flex mb={4} alignItems="center" justifyContent="space-between">
          <Heading color="secondary.600" as="h2" fontSize="2xl">
            {org?.name}
          </Heading>
          <OrgSettings org={org} />
        </Flex>
        <Box py={1} mb={6}>
          <Text>{org?.description}</Text>
        </Box>
        <Products />
      </Box>
    </div>
  );

  function Products({ ...props }) {
    return (
      <>
        <Heading color="secondary.600" as="h2" fontSize="xl">
          Products
        </Heading>
        <Grid
          templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']}
          autoColumns
          gap={6}
          py={8}>
          <AddProductItem orgId={orgId} />
          {loading ? (
            <ProductItemSkeleton />
          ) : (
            products?.map((p) => (
              <WrapItem key={p.id}>
                <ProductItem key={p.id} data={p} />
              </WrapItem>
            ))
          )}
        </Grid>
      </>
    );
  }
}
