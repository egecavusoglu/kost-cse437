import Navbar from 'src/components/navbar';
import { useRouter } from 'next/router';
import { Box, Grid, Heading, Wrap, WrapItem } from '@chakra-ui/react';
import OrgSelector from 'src/components/org-selector';
import { useOrgDetails } from 'src/requests/organisation';
import ProductItem, { AddProductItem, ProductItemSkeleton } from 'src/components/product-item';
import { useProducts } from 'src/requests/products';
export default function OrgDetails({ props }) {
  const router = useRouter();
  const orgId = router.query.id;
  const { org, loading, error } = useOrgDetails(orgId);
  const { products } = useProducts(orgId);
  return (
    <div>
      <Navbar />
      <OrgSelector />
      <Box m={4} p={4}>
        <Heading color="secondary.600" as="h2" fontSize="xl">
          Products
        </Heading>
        <Grid
          templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']}
          autoColumns
          gap={6}
          p={8}>
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
      </Box>
    </div>
  );
}

{
  /* <Wrap my={8} spacing={4} justifyContent="space-evenly">
          <WrapItem>
            <AddProductItem orgId={orgId} />
          </WrapItem>
          {loading ? (
            <ProductItemSkeleton />
          ) : (
            
          )}
        </Wrap> */
}
