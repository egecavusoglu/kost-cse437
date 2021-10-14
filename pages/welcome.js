import Navbar from 'src/components/navbar';
import { Center, Box, Heading, Text } from '@chakra-ui/react';

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
        </Box>
      </Center>
    </div>
  );
}
