import { Box, VStack, Input, Text } from '@chakra-ui/react';
import Navbar from 'src/components/navbar';
import { useProfile } from 'src/requests/profile';

export default function Profile() {
  const { profile, loading, error } = useProfile();
  const { user } = profile;
  const [localUser, setLocalUser] = useState(user);
  console.log(localUser);
  return (
    <div>
      <Navbar />
      <Box p={4}>
        <VStack bg="white" w="full" borderRadius="lg" p={4} alignItems="flex-start">
          <TextInputGroup
            label="First Name"
            value={localUser?.firstName}
            setValue={(v) => {
              console.log(v);
              setLocalUser({ firstName: v, ...localUser });
            }}
          />
          <TextInputGroup label="Last Name" value={localUser?.lastName} />
        </VStack>
      </Box>
    </div>
  );
}

function TextInputGroup({ label, value, setValue }) {
  return (
    <VStack gap={2} alignItems="flex-start">
      <Text>{label}</Text>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
    </VStack>
  );
}

import { checkValidAuthCookie } from 'src/lib/jwt';
import { useState } from 'react';
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
