import { Grid } from '@chakra-ui/react';
import Navbar from 'src/components/navbar';

export default function Profile() {
  return (
    <div>
      <Navbar />
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
