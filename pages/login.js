import { Box, Center, Spacer } from '@chakra-ui/react';
import Login from 'components/login-input';

export default function LoginPage(props) {
  return (
    <Center py={12} bg="gray.100" h={'100vh'} flexDirection="column">
      <Login />
      <Box mt={44} />
    </Center>
  );
}
