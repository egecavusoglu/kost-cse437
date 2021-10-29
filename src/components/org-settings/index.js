import { useEffect, useState } from 'react';
import {
  Heading,
  Drawer,
  DrawerOverlay,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Box,
  Flex,
  Text,
} from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';

export default function OrgSettings({ org, ...props }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button variant="ghost" leftIcon={<SettingsIcon />} color="gray.600" onClick={onOpen}>
        Settings
      </Button>
      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen} height={'90vh'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            <Text color="secondary.600">Settings</Text>
          </DrawerHeader>
          <DrawerBody height={'500px'}>
            <Box height={'60vh'}>
              <Heading as="h3" size={'md'}>
                Members
              </Heading>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
