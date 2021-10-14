import Head from 'next/head';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Splash from 'src/components/splash';
import theme from 'src/config/chakra-theme';
import { getProfile } from 'src/requests/profile';
import { waitForAtLeast } from 'src/lib/delay';
import { useRouter } from 'next/router';
function Kost({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    checkProfile();
  }, []);

  const checkProfile = async () => {
    setLoading(true);
    const user = await waitForAtLeast(getProfile, 1500);
    setLoading(false);
    // Can do conditional routing to proper pages here.
    if (!user) {
      router.push('/welcome');
    }
  };
  return (
    <>
      <Head>
        <title>Kost App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider theme={theme}>
        {loading ? (
          <Splash />
        ) : (
          <Box minH={'100vh'} bg="gray.200">
            <Component {...pageProps} style="background: pink;" />
          </Box>
        )}
      </ChakraProvider>
    </>
  );
}

export default Kost;
