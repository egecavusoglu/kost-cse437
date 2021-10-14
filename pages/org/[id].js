import Navbar from 'src/components/navbar';
import { useRouter } from 'next/router';
import { Box, Heading, Wrap, WrapItem } from '@chakra-ui/react';
import OrgSelector from 'src/components/org-selector';
import { useOrgDetails } from 'src/requests/organisation';
import { AddProductItem, ProductItemSkeleton } from 'src/components/product-item';

export default function OrgDetails({ props }) {
  const router = useRouter();
  const orgId = router.query.id;
  const { org, loading, error } = useOrgDetails(orgId);
  return (
    <div>
      <Navbar />
      <OrgSelector />
      <Box m={4} p={4}>
        <Heading color="secondary.600" as="h2" fontSize="xl">
          Products
        </Heading>
        <Wrap my={8} spacing={4} justifyContent="space-evenly">
          {loading ? (
            <ProductItemSkeleton />
          ) : // orgs?.map((org) => (
          //   <WrapItem key={org.id}>
          //     <ProductItem key={org.id} data={org} />
          //   </WrapItem>
          // ))
          null}
          <WrapItem>
            <AddProductItem />
          </WrapItem>
        </Wrap>
      </Box>
    </div>
  );
}
