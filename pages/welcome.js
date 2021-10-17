import Navbar from 'src/components/navbar';
import { Center, HStack, Button, Box, Heading, Text } from '@chakra-ui/react';
import Link from 'src/components/link';
export default function Welcome({ props }) {
  return (
    <div>
      <Navbar />

      <Center p={12}>
        <Box bg="secondary.400" w={'lg'} rounded="lg" shadow="lg" p={12}>
          <Heading as="h1" color={'white'} size="lg">
            Welcome to Kost!
          </Heading>
          <Text mt={5}>Login to continue</Text>
          <HStack spacing={3} mt={4}>
            <Link to="/login" barebones>
              <Button
                display={{ md: 'inline-flex' }}
                fontSize={'sm'}
                fontWeight={600}
                color={'white'}
                variant="unstyled">
                Log In
              </Button>
            </Link>
            <Link to="/signup" barebones>
              <Button
                display={{ md: 'inline-flex' }}
                fontSize={'sm'}
                fontWeight={600}
                color={'white'}
                bg={'primary.400'}
                _hover={{
                  bg: 'primary.500',
                }}>
                Sign Up
              </Button>
            </Link>
          </HStack>
        </Box>
      </Center>
    </div>
  );
}
