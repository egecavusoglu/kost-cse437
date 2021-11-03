import Navbar from 'src/components/navbar';
import { useRouter } from 'next/router';
import { Button, Text, Flex, Box, Grid, Heading, Wrap, WrapItem } from '@chakra-ui/react';
import OrgSelector from 'src/components/org-selector';
import { useOrgDetails } from 'src/requests/organisation';
import ProductItem, { AddProductItem, ProductItemSkeleton } from 'src/components/product-item';
import { useProducts } from 'src/requests/products';
import OrgSettings from 'src/components/org-settings';
import { useOrgMembers } from 'src/requests/members';
import { useState } from 'react'

export default function OrgDetails({ props }) {
  const router = useRouter();
  const orgId = router.query.id;
  const { org, loading, error } = useOrgDetails(orgId);
  const { products, products_loading, products_error } = useProducts(orgId);
  const { members } = useOrgMembers(orgId);
  let finishedLoading = false;
  const [sideBarDisplay, setSideBarDisplay] = useState("none");
  // hard load products and members to avoid undefined errors
  if (products && members) {
    finishedLoading = true;
  }

  return (
    <div
      height="100%"
    >
      <Navbar />
      <OrgSelector />
      <Box m={[2, 4]} p={[2, 4]}>
        <Flex mb={4} alignItems="center" justifyContent="space-between">
          <Heading color="secondary.600" as="h2" fontSize="xl">
            Overview
          </Heading>
          <OrgSettings org={org} />
        </Flex>
       
          {finishedLoading ? (
            <Dashboard />
          ) : (
            <div></div>
          )}
          <Flex mb={4} alignItems="center" justifyContent="space-between">
          </Flex>
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
        <Box
          overflow="hidden"
          bg="white"
          display="flex"
          flexDirection="column"
          w="45%"
          minWidth={52}
          shadow="md"
          rounded="lg"
          p={3}
          marginBottom="10"
        // onClick={toggleSideBarDisplay}
        >
          <Text fontSize="20px">Total Cost: ${sum} per month </Text>
          <Text fontSize="20px">Services Used: {products.length} </Text>
          <Text fontSize="20px">Members: {members.length} </Text>
        </Box>
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

  /// Helper method that toggles the sidebar display to "flex" or "none"
  // function toggleSideBarDisplay() {
  //   console.log("launch side bar ran");
  //   if (sideBarDisplay == "none") {
  //     setSideBarDisplay("flex")
  //   } else {
  //     setSideBarDisplay("none")
  //   }
  // }

}
