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
} from '@chakra-ui/react';
import Link from 'src/components/link';
import Logo from 'src/components/logo';
import { validateEmail } from 'src/helpers/email';

/**
 * Login input component.
 */
const LoginInput = ({ ...props }) => {
  const [email, setEmail] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (event) => {
    const val = event.target.value;
    setEmail(val);
    setInvalidEmail(!validateEmail(val));
  };

  return (
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
        <Heading as="h1" color={'gray.700'} size="md">
          Sign up
        </Heading>
        <FormControl mt={4} isInvalid={invalidEmail} id="email">
          <FormLabel color="gray.700">Email Address</FormLabel>
          <Input type="email" onChange={handleEmailChange} value={email} isRequired={true} />
          <FormErrorMessage fontSize="xs">Please use a valid email.</FormErrorMessage>
          {/* <FormHelperText fontSize="xs">let us take you to your dashboard.</FormHelperText> */}
        </FormControl>
        <FormControl mt={4}>
          <FormLabel color="gray.700">Password</FormLabel>
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            isRequired={true}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel color="gray.700">Confirm Password</FormLabel>
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            isRequired={true}
          />
        </FormControl>
        <Stack d="flex" flexDirection={'column'} spacing={4} alignItems="center">
          <Button
            w={'50%'}
            size="md"
            mx="auto"
            // variant="outline"
            colorScheme="primary"
            isDisabled={loading}>
            Sign Up
          </Button>
          <Text color="gray.600">
            Already have an account? <Link to="/login">Log in</Link>
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
};

export default LoginInput;
