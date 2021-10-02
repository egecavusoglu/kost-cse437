import { Link as ChakraLink } from '@chakra-ui/react';

import NextLink from 'next/link';
export default function Link({ children, to = '/', ...props }) {
  return (
    <NextLink href={to}>
      <a>
        <ChakraLink color="primary.300" {...props}>
          {children}
        </ChakraLink>
      </a>
    </NextLink>
  );
}
