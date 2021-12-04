import { Grid } from '@chakra-ui/react';
import OrgItem, { AddOrgItem, OrgItemSkeleton } from 'src/components/org-item';
import Navbar from 'src/components/navbar';
import { useOrgs } from 'src/requests/organisation';

/// Homepage dashboard where your organizations live in. 
/// Each file in /pages is an actual page navigtable by /xxx in the url. 
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
        {
          error ? <div>Error loading organizations</div> : 
        (loading ? <OrgItemSkeleton /> : orgs?.map((org) => <OrgItem key={org.id} data={org} />))
        }
      </Grid>
    </div>
  );
}

import { checkValidAuthCookie } from 'src/lib/jwt';
export async function getServerSideProps(context) {
  const hasValidCookie = checkValidAuthCookie(context.req);
  if (!hasValidCookie) {
    return {
      redirect: {
        destination: '/welcome',
        permanent: false,
      },
    };
  }
  return {
    props: {}, // will be passed to the page component as props
  };
}
