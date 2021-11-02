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
      <Box
        display="flex"
        flexDir="row"
        height="100%"
      >
        <Box
          flexGrow="1"
          height="100%"
        >
          <OrgSelector />
          <Box m={[2, 4]} p={[2, 4]}>
            {finishedLoading ? (
              <Dashboard />
            ) : (
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
        </Box>
        <Box
          display={sideBarDisplay}
          flexDirection="column"
          w="20%"
          bg="white"
          borderLeft="1px solid grey"
        >
          <Heading
            fontSize="25px"
            color="secondary.600"
            textAlign="center"
            marginBottom="5"
          >Members</Heading>
          {members?.map((member) => {
            console.log(member);
            return (
              <Box
                padding="5"
              >
                {member.user.firstName + " " + member.user.lastName}
              </Box>
            )
          })}
        </Box>
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
          marginTop="5"
          onClick={toggleSideBarDisplay}
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
  function toggleSideBarDisplay() {
    console.log("launch side bar ran");
    if (sideBarDisplay == "none") {
      setSideBarDisplay("flex")
    } else {
      setSideBarDisplay("none")
    }
  }

}
