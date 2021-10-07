import { Center, Spinner } from '@chakra-ui/react';
import Logo from '../logo';
export default function Splash() {
  return (
    <Center bg="secondary.600" h="100vh">
      <Logo />
      <Spinner color={'primary.400'} emptyColor="gray.600" />
    </Center>
  );
}
