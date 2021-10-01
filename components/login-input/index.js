import { useState } from 'react';
import {
  Box,
  Stack,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Button,
} from '@chakra-ui/react';
import Link from 'components/link';
import Logo from 'components/logo';

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
    <Box rounded="md" w="sm" shadow="lg" overflow="hidden">
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
      <Box p={6} border="0px" borderColor="gray.200" bg="white">
        <FormControl isInvalid={invalidEmail} id="email">
          <FormLabel color="gray.700">Email Address</FormLabel>
          <Input type="email" onChange={handleEmailChange} value={email} isRequired={true} />
          <FormErrorMessage fontSize="xs">Please use a valid email.</FormErrorMessage>
          {/* <FormHelperText fontSize="xs">let us take you to your dashboard.</FormHelperText> */}
        </FormControl>
        <FormControl mt={6}>
          <FormLabel color="gray.700">Password</FormLabel>
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            isRequired={true}
          />
        </FormControl>
        <Box d="flex" alignItems="center" mt={6}>
          <Button w={'70%'} size="md" mx="auto" colorScheme="primary" isDisabled={loading}>
            Log in
          </Button>
        </Box>
      </Box>
    </Box>
  );

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
};

export default LoginInput;
