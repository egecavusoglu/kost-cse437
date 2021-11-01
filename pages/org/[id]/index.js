import Navbar from 'src/components/navbar';
import { useRouter } from 'next/router';
import { Button, Text, Flex, Box, Grid, Heading, Wrap, WrapItem } from '@chakra-ui/react';
import OrgSelector from 'src/components/org-selector';
import { useOrgDetails } from 'src/requests/organisation';
import ProductItem, { AddProductItem, ProductItemSkeleton } from 'src/components/product-item';
import { useProducts } from 'src/requests/products';
import OrgSettings from 'src/components/org-settings';
import { useOrgMembers } from 'src/requests/members';
import handler from 'pages/api/hello';

export default function OrgDetails({ props }) {
  const router = useRouter();
  const orgId = router.query.id;
  const { org, loading, error } = useOrgDetails(orgId);
  const { products, products_loading, products_error } = useProducts(orgId);
  const { members } = useOrgMembers(orgId);
  let finishedLoading = false;

  // hard load products and members to avoid undefined errors
  if (products && members) {
    finishedLoading = true;
  }

  return (
    <div>
      <Navbar />
      <OrgSelector />
      <Box m={[2, 4]} p={[2, 4]}>
      {finishedLoading ? (
        <Dashboard/> 
      ): (
        <div></div>
      )}
         
        <Flex mb={4} alignItems="center" justifyContent="space-between">
          {/* <Heading color="secondary.600" as="h2" fontSize="2xl">
            {org?.name}
          </Heading> */}
          <OrgSettings org={org} />
        </Flex>
        <Box py={1} mb={6}>
          {/* <Text>{org?.description}</Text> */}
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

  /// Represents the dashboard component inside the org/screen
  function Dashboard({ ...props }) {
    let sum = calculateMonthlyTotalCost();
    return (
      <>
        <Heading color="secondary.600" as="h2" fontSize="xl">Dashboard</Heading>
        <div>
          <div>Monthly Total Cost: ${sum} </div>
          <div>Total Services Used: {products.length} </div>
          <div>Total Members: {members.length} </div>
        </div>
      </>
    );
  }

  /// Helper method to calculate montly cost
  function calculateMonthlyTotalCost() {
    let sum = 0;
    products.forEach(addSum);

    function addSum(org) {
      sum += org.amount
    };
    return sum
  }

}
