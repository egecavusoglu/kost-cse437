import { Stack, Box, VStack, Input, Text, Heading, Button } from '@chakra-ui/react';
import Navbar from 'src/components/navbar';
import { useProfile } from 'src/requests/profile';

export default function Profile() {
  const { profile, loading, error } = useProfile();
  const user = profile?.user;
  const [localUser, setLocalUser] = useState(user);

  useEffect(() => {
    setLocalUser(user);
  }, [profile]);

  return (
    <div>
      <Navbar />
      <VStack p={4}>
        <VStack
          bg="white"
          w="full"
          borderRadius="lg"
          p={4}
          alignItems="flex-start"
          spacing={6}
          maxW="2xl">
          <Heading fontSize="2xl" fontWeight="medium" color="secondary.600">
            Profile
          </Heading>
          <Stack direction={['column', 'row']} spacing={4}>
            <TextInputGroup
              label="First Name"
              value={localUser?.firstName}
              setValue={(v) => setLocalUser({ ...localUser, firstName: v })}
            />
            <TextInputGroup
              label="Last Name"
              value={localUser?.lastName}
              setValue={(v) => setLocalUser({ ...localUser, lastName: v })}
            />
          </Stack>
          <TextInputGroup
            label="Email Address"
            value={localUser?.email}
            setValue={(v) => setLocalUser({ ...localUser, email: v })}
          />
          <Button colorScheme={'primary'}>Update Profile</Button>
        </VStack>
      </VStack>
    </div>
  );
}

function TextInputGroup({ label, value, setValue }) {
  return (
    <VStack gap={2} alignItems="flex-start">
      <Text fontWeight="medium" color="gray.600">
        {label}
      </Text>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
    </VStack>
  );
}

import { checkValidAuthCookie } from 'src/lib/jwt';
import { useEffect, useState } from 'react';
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
