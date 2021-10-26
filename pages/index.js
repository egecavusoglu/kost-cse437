import Head from 'next/head';
import Link from 'src/components/link';
import { Wrap, Grid, WrapItem, useToast } from '@chakra-ui/react';
import OrgSelector from 'src/components/org-selector';
import OrgItem, { AddOrgItem, OrgItemSkeleton } from 'src/components/org-item';
import Navbar from 'src/components/navbar';
import { useOrgs } from 'src/requests/organisation';

/// Homepage dashboard where your organizations live in. 

export default function Home() {
  const { orgs, loading, error } = useOrgs();

  return (
    <div>
      <Navbar />
      <Grid
        templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']}
        autoColumns
        gap={6}
        p={8}>
        <AddOrgItem />
        {loading ? <OrgItemSkeleton /> : orgs?.map((org) => <OrgItem key={org.id} data={org} />)}
      </Grid>
    </div>
  );
}

// Similar layout with flex wrap
// <Wrap p={8} spacing={4} justifyContent="space-evenly">
//       <WrapItem>
//         <AddOrgItem />
//       </WrapItem>
//       {loading ? (
//         <OrgItemSkeleton />
//       ) : (
//         orgs?.map((org) => (
//           <WrapItem key={org.id}>
//             <OrgItem key={org.id} data={org} />
//           </WrapItem>
//         ))
//       )}
//     </Wrap>
