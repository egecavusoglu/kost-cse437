import { ChakraProvider, Box } from '@chakra-ui/react';
import theme from 'src/config/chakra-theme';

function Kost({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Box minH={'100vh'} bg="gray.200">
        <Component {...pageProps} style="background: pink;" />
      </Box>
    </ChakraProvider>
  );
}

export default Kost;
