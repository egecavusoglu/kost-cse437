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
  useToast,
} from '@chakra-ui/react';
import Link from 'src/components/link';
import Logo from 'src/components/logo';
import { validateEmail } from 'src/lib/email';
import { login } from 'src/requests/auth';
import { useRouter } from 'next/router';

/**
 * Login input component.
 */
const LoginInput = ({ ...props }) => {
  const router = useRouter();
  const toast = useToast();

  const [email, setEmail] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (event) => {
    const val = event.target.value;
    setEmail(val);
    setInvalidEmail(!validateEmail(val));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const response = await login(email, password);
    setLoading(false);

    if (response) {
      router.push('/');
      return;
    }

    toast({
      title: 'Oops.',
      description: "We've encountered an error.",
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
        <Stack py={2} px={5} border="0px" borderColor="gray.200" bg="white" spacing={5}>
          <Heading as="h1" color={'secondary.600'} size="md">
            Log in
          </Heading>
          <FormControl mt={4} isInvalid={invalidEmail} isRequired id="email">
            <FormLabel color="gray.700">Email Address</FormLabel>
            <Input type="email" onChange={handleEmailChange} value={email} />
            <FormErrorMessage fontSize="xs">Please use a valid email.</FormErrorMessage>
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel color="gray.700">Password</FormLabel>
            <Input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
          </FormControl>
          <Stack d="flex" flexDirection={'column'} spacing={4} alignItems="center">
            <Button
              w={'50%'}
              size="md"
              mx="auto"
              colorScheme="primary"
              isDisabled={loading}
              type="submit">
              Log In
            </Button>

            <Text color="gray.600">
              Don&apos;t have an account? <Link to="/signup">Sign up</Link>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </form>
  );
};

export default LoginInput;
