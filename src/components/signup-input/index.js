import { useState } from 'react';
import {
  Box,
  Stack,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Heading,
  Text,
  HStack,
  useToast,
  Divider,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Link from 'src/components/link';
import Logo from 'src/components/logo';
import { validateEmail } from 'src/lib/email';
import { signup, login } from 'src/requests/auth';

const LoginInput = ({ ...props }) => {
  const router = useRouter();
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const handleEmailChange = (event) => {
    const val = event.target.value;
    setEmail(val);
    setInvalidEmail(!validateEmail(val));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const signupResult = await signup({
      firstName,
      lastName,
      email,
      password,
    });
    setLoading(false);

    if (signupResult) {
      toast({
        title: 'Account created.',
        description: "We're logging you in.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      return logUserIn(email, password);
    }
    toast({
      title: 'Oops.',
      description: "We've encountered an error.",
      status: 'error',
      duration: 3000,
      isClosable: false,
    });
  };

  const logUserIn = async (email, pwd) => {
    setLoading(true);
    const response = await login(email, pwd);
    setLoading(false);

    if (response) {
      router.push('/');
      return;
    }

    toast({
      title: 'Oops.',
      description: "We've encountered an error logging you in.",
      status: 'error',
      duration: 3000,
      isClosable: false,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box rounded="md" w="sm" h="min" shadow="lg" overflow="hidden">
        <Box
          d="flex"
          bg="secondary.600"
          h="72px"
          w="full"
          justifyContent="center"
          alignItems="center">
          <Link>
            <Logo size={12} />
          </Link>
        </Box>
        <Stack py={2} px={5} borderColor="gray.200" bg="white" spacing={5}>
          <Heading as="h1" color={'secondary.600'} size="md">
            Sign up
          </Heading>
          <HStack spacing={2}>
            <FormControl isRequired={true} id="first_name">
              <FormLabel color="gray.700">First Name</FormLabel>
              <Input
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                isRequired={true}
              />
              <FormErrorMessage fontSize="xs">Please use a valid email.</FormErrorMessage>
            </FormControl>
            <FormControl isRequired={true} id="last_name">
              <FormLabel color="gray.700">Last Name</FormLabel>
              <Input
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                isRequired={true}
              />
              <FormErrorMessage fontSize="xs">Please use a valid email.</FormErrorMessage>
            </FormControl>
          </HStack>
          <FormControl isInvalid={invalidEmail} isRequired id="email">
            <FormLabel color="gray.700">Email Address</FormLabel>
            <Input type="email" onChange={handleEmailChange} value={email} />
            <FormErrorMessage fontSize="xs">Please use a valid email.</FormErrorMessage>
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel color="gray.700">Password</FormLabel>
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              isRequired={true}
            />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel color="gray.700">Confirm Password</FormLabel>
            <Input
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              isRequired={true}
            />
          </FormControl>
          <Stack d="flex" flexDirection={'column'} spacing={4} py={2} alignItems="center">
            <Button
              type="submit"
              w={'50%'}
              size="md"
              mx="auto"
              colorScheme="primary"
              isDisabled={loading}>
              Sign Up
            </Button>
            <Divider my={2} />
            <Text color="gray.600">
              Already have an account? <Link to="/login">Log in</Link>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </form>
  );
};

export default LoginInput;
