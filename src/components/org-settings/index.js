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
  Wrap,
  Text,
} from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import { useOrgMembers } from 'src/requests/members';
import UserTag, { AddUserTag } from 'src/components/user-tag';
import { useAuthStore } from 'src/store';
import { getPermissionScore, canAddMembersToOrg } from 'src/lib/permissions';
import { sortMembers } from 'src/lib/order-members';
export default function OrgSettings({ org, ...props }) {
  // get user id from global state and compare it to members to see if current user is a member, owner of org. render menus accordingly.
  const user = useAuthStore((s) => s.user);
  const currentUserId = user?.id;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const orgId = org?.id;
  const { members, loading, error } = useOrgMembers(orgId);
  const sortedMembers = sortMembers(members);
  const currentUsersMember = members?.find((e) => e.userId == currentUserId);
  const isCurrentUserOwner = currentUsersMember?.isOwner;
  const isCurrentUserAdmin = currentUsersMember?.isAdmin;
  const currentUserPermissionsScore = getPermissionScore({
    isAdmin: isCurrentUserAdmin,
    isOwner: isCurrentUserOwner,
  });
  const currentUserCanAddMembers = canAddMembersToOrg(currentUserPermissionsScore);

  return (
    <>
      <Button variant="ghost" leftIcon={<SettingsIcon />} color="gray.600" onClick={onOpen}>
        Settings
      </Button>
      <Drawer placement="right" onClose={onClose} isOpen={isOpen} size={'lg'} bg={'secondary.400'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color="gray.100" />
          <DrawerHeader borderBottomWidth="1px" bg="secondary.500">
            <Text color="gray.100">Settings</Text>
          </DrawerHeader>
          <DrawerBody>
            <Box
              // height={'50vh'}
              py={4}>
              <Heading as="h4" size="md" fontWeight="medium" color="gray.600">
                Members
              </Heading>
              <Wrap py={4}>
                {sortedMembers?.map((m) => (
                  <UserTag
                    key={m.userId}
                    orgId={orgId}
                    userId={m.userId}
                    name={`${m.user.firstName} ${m.user.lastName}`}
                    isAdmin={m.isAdmin}
                    isOwner={m.isOwner}
                    permissionLevel={currentUserPermissionsScore}
                  />
                ))}
                {currentUserCanAddMembers && <AddUserTag orgId={orgId} />}
              </Wrap>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
