import {
  Stack,
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
  Divider,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import Navbar from 'src/components/navbar';
import PasswordInput from 'src/components/password-input';
import { PROFILE_API_URI, useProfile, updateProfile } from 'src/requests/profile';
import { useSWRConfig } from 'swr';
import { validateEmail } from 'src/lib/email';
import { resetPassword } from 'src/requests/auth';

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
      <Stack p={4} direction={['column', 'column', 'row']} spacing={4}>
        <VStack
          as="form"
          onSubmit={handleSubmit}
          bg="white"
          w="full"
          borderRadius="lg"
          p={4}
          alignItems="flex-start"
          spacing={6}
          maxW="3xl">
          <Heading fontSize="2xl" fontWeight="medium" color="secondary.600">
            Profile
          </Heading>
          <Stack w="full" direction={['column', 'row']} spacing={2}>
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
            </FormControl>
          </Stack>
          <FormControl isInvalid={invalidEmail} isRequired id="email">
            <FormLabel color="gray.700">Email Address</FormLabel>
            <Input type="email" onChange={handleEmailChange} value={localUser?.email} />
            <FormErrorMessage fontSize="xs">Please use a valid email.</FormErrorMessage>
          </FormControl>
          <Button colorScheme={'primary'} type="submit">
            Update Profile
          </Button>
        </VStack>
        <ResetPassword />
      </Stack>
    </div>
  );
}

function ResetPassword() {
  const toast = useToast();
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [repeatPass, setRepeatPass] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPass != repeatPass) {
      return toast({
        title: 'Oops.',
        description: 'New password must match repeat password.',
        status: 'error',
        duration: 3000,
        isClosable: false,
      });
    }

    const res = await resetPassword({
      newPassword: newPass,
      oldPassword: currentPass,
    });
    if (!res.isSuccess) {
      if (res.error.code == 'INCORRECT_OLD_PASSWORD') {
        return toast({
          title: 'Oops.',
          description:
            'Your current password does not match our records. Please enter correct password',
          status: 'error',
          duration: 3000,
          isClosable: false,
        });
      }
      return toast({
        title: 'Oops.',
        description: "We've encountered an error updating password. Please try again later.",
        status: 'error',
        duration: 3000,
        isClosable: false,
      });
    }
    toast({
      title: 'Password Updated',
      description: 'You are all set!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    resetInputs();
  };

  const resetInputs = () => {
    setCurrentPass('');
    setNewPass('');
    setRepeatPass('');
  };

  return (
    <VStack
      as="form"
      onSubmit={handleSubmit}
      bg="white"
      w="full"
      borderRadius="lg"
      p={4}
      alignItems="flex-start"
      spacing={6}
      maxW="3xl">
      <Heading fontSize="2xl" fontWeight="medium" color="secondary.600">
        Change Password
      </Heading>
      <FormControl isRequired={true} id="current_password">
        <FormLabel color="gray.700">Current Password</FormLabel>
        <PasswordInput value={currentPass} setValue={(e) => setCurrentPass(e)} />
      </FormControl>
      <Divider />
      <FormControl isRequired={true} id="new_password">
        <FormLabel color="gray.700">New Password</FormLabel>
        <PasswordInput value={newPass} setValue={(e) => setNewPass(e)} />
      </FormControl>
      <FormControl isRequired={true} id="repeat_password">
        <FormLabel color="gray.700">Repeat New Password</FormLabel>
        <PasswordInput value={repeatPass} setValue={(e) => setRepeatPass(e)} />
      </FormControl>
      <Button colorScheme={'primary'} type="submit">
        Update Password
      </Button>
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
