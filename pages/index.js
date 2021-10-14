import Head from 'next/head';
import Link from 'src/components/link';
import { Wrap, WrapItem, useToast } from '@chakra-ui/react';
import OrgSelector from 'src/components/org-selector';
import OrgItem, { AddOrgItem, OrgItemSkeleton } from 'src/components/org-item';
import Navbar from 'src/components/navbar';
import { useOrgs } from 'src/requests/organisation';
export default function Home() {
  const { orgs, loading, error } = useOrgs();

  return (
    <div>
      <Navbar />
      {/* <OrgSelector /> */}
      <Wrap p={8} spacing={4} justifyContent="space-evenly">
        {loading ? (
          <OrgItemSkeleton />
        ) : (
          orgs?.map((org) => (
            <WrapItem key={org.id}>
              <OrgItem key={org.id} data={org} />
            </WrapItem>
          ))
        )}
        <WrapItem>
          <AddOrgItem />
        </WrapItem>
      </Wrap>
    </div>
  );
}
