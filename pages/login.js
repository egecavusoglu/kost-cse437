import { Box, Center } from '@chakra-ui/react';
import Login from 'src/components/login-input';

export default function LoginPage(props) {
  return (
    <Center py={12} flexDirection="column">
      <Login />
    </Center>
  );
}
