import Head from 'next/head';
import Link from 'src/components/link';
import { Wrap, WrapItem, useToast } from '@chakra-ui/react';
import OrgSelector from 'src/components/org-selector';
import OrgItem, { AddOrgItem, OrgItemSkeleton } from 'src/components/org-item';
import Navbar from 'src/components/navbar';
import { useEffect, useState } from 'react';
import { getOrganisations } from 'src/requests/organisation';
export default function Home() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [orgs, setOrgs] = useState([]);

  useEffect(() => {
    fetchOrganisations();
  }, []);

  const fetchOrganisations = async () => {
    setLoading(true);
    const orgs = await getOrganisations();
    setLoading(false);
    if (!orgs) {
      return toast({
        title: 'Oops.',
        description: "We've encountered an error creating organisation.",
        status: 'error',
        duration: 3000,
        isClosable: false,
      });
    }
    setOrgs(orgs);
  };

  return (
    <div>
      <Navbar />
      {/* <OrgSelector /> */}
      <Wrap p={8} spacing={4} justifyContent="space-evenly">
        {loading ? (
          <OrgItemSkeleton />
        ) : (
          orgs.map((org) => (
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
