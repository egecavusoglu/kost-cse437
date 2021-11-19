import {
  HStack,
  Box,
  VStack,
  Input,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Button,
  useToast,
} from '@chakra-ui/react';
import Navbar from 'src/components/navbar';
import { PROFILE_API_URI, useProfile, updateProfile } from 'src/requests/profile';
import { useSWRConfig } from 'swr';
import { validateEmail } from 'src/lib/email';
export default function Profile() {
  const toast = useToast();
  const { mutate } = useSWRConfig();
  const { profile, loading, error } = useProfile();
  const user = profile?.user;
  const [localUser, setLocalUser] = useState(user);
  const [invalidEmail, setInvalidEmail] = useState(false);

  useEffect(() => {
    setLocalUser(user);
  }, [profile]);

  const handleEmailChange = (event) => {
    const val = event.target.value;
    setLocalUser({ ...localUser, email: val });
    setInvalidEmail(!validateEmail(val));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateProfile({
      firstName: localUser.firstName,
      lastName: localUser.lastName,
      email: localUser.email,
    });
    if (!res) {
      return toast({
        title: 'Oops.',
        description: "We've encountered an error updating profile. Please try again later.",
        status: 'error',
        duration: 3000,
        isClosable: false,
      });
    }
    mutate(PROFILE_API_URI);
    toast({
      title: 'Profile Updated',
      description: 'You are all set!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <div>
      <Navbar />
      <VStack p={4}>
        <form onSubmit={handleSubmit}>
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
            <HStack spacing={2}>
              <FormControl isRequired={true} id="first_name">
                <FormLabel color="gray.700">First Name</FormLabel>
                <Input
                  type="text"
                  onChange={(e) => setLocalUser({ ...localUser, firstName: e.target.value })}
                  value={localUser?.firstName}
                  isRequired={true}
                />
              </FormControl>
              <FormControl isRequired={true} id="last_name">
                <FormLabel color="gray.700">Last Name</FormLabel>
                <Input
                  type="text"
                  onChange={(e) => setLocalUser({ ...localUser, lastName: e.target.value })}
                  value={localUser?.lastName}
                  isRequired={true}
                />
                <FormErrorMessage fontSize="xs">Please use a valid email.</FormErrorMessage>
              </FormControl>
            </HStack>
            <FormControl isInvalid={invalidEmail} isRequired id="email">
              <FormLabel color="gray.700">Email Address</FormLabel>
              <Input type="email" onChange={handleEmailChange} value={localUser?.email} />
              <FormErrorMessage fontSize="xs">Please use a valid email.</FormErrorMessage>
            </FormControl>
            <Button colorScheme={'primary'} type="submit">
              Update Profile
            </Button>
          </VStack>
        </form>
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
