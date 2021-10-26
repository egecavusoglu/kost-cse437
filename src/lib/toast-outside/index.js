import { createStandaloneToast } from '@chakra-ui/react';

/**
 * This function is used to fire toasts outside of React components when hooks cannot be used.
 */
const toast = createStandaloneToast();

export { toast };
