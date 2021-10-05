import { ChakraProvider, Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import theme from 'src/config/chakra-theme';
import { getProfile } from 'src/requests/profile';

function Kost({ Component, pageProps }) {
  useEffect(() => {
    checkProfile();
  }, []);

  const checkProfile = async () => {
    const user = await getProfile();
    // Can do conditional routing to proper pages here.
    // if (user) {

    // }
  };
  return (
    <ChakraProvider theme={theme}>
      <Box minH={'100vh'} bg="gray.200">
        <Component {...pageProps} style="background: pink;" />
      </Box>
    </ChakraProvider>
  );
}

export default Kost;
