import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import Logo from '../logo';
import CustomLink from '../link';
import { useAuthStore } from 'src/store';
import { logout } from 'src/requests/auth';
/**
 * @component Navigation Bar used across the app
 * This component is copied from https://chakra-templates.dev/navigation/navbar (open source & free)
 */

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();
  const userLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const NAV_ITEMS = userLoggedIn
    ? [
        //   {
        //     label: 'Inspiration',
        //     children: [
        //       {
        //         label: 'Explore Design Work',
        //         subLabel: 'Trending Design to inspire you',
        //         href: '#',
        //       },
        //       {
        //         label: 'New & Noteworthy',
        //         subLabel: 'Up-and-coming Designers',
        //         href: '#',
        //       },
        //     ],
        //   },
        {
          label: 'Organisations',
          href: '/',
        },
      ]
    : [];
  return (
    <Box>
      <Flex
        bg={useColorModeValue('secondary.600', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={'none'}
            color="primary.300"
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }} alignItems="center">
          <CustomLink to="/">
            <Text
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              fontFamily={'heading'}
              color={useColorModeValue('gray.800', 'white')}>
              <Logo size={9} />
            </Text>
          </CustomLink>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav navItems={NAV_ITEMS} />
          </Flex>
        </Flex>

        <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={6}>
          <ActionButtons />
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav navItems={NAV_ITEMS} />
      </Collapse>
    </Box>
  );
}

const UserButton = ({ user }) => {
  const handleLogout = async () => {
    const res = await logout();
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        bg={'transparent'}
        _hover={{}}
        _active={{
          bg: 'secondary.700',
        }}
        color={'gray.200'}>
        {user.firstName}
      </MenuButton>
      <MenuList>
        <Text py={2} px={3} fontSize="sm">
          {user.firstName} {user.lastName}
        </Text>
        <CustomLink to="/profile" barebones>
          <MenuItem>My Profile</MenuItem>
        </CustomLink>
        <MenuItem onClick={handleLogout} color="red.400">
          Log out
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

const ActionButtons = () => {
  const user = useAuthStore((s) => s.user);
  if (user) {
    return <UserButton user={user} />;
  }
  return (
    <>
      <CustomLink to="/login" barebones>
        <Button
          display={{ base: 'none', md: 'inline-flex' }}
          fontSize={'sm'}
          fontWeight={600}
          color={'white'}
          variant="unstyled">
          Log In
        </Button>
      </CustomLink>
      <CustomLink to="/signup" barebones>
        <Button
          display={{ base: 'none', md: 'inline-flex' }}
          fontSize={'sm'}
          fontWeight={600}
          color={'white'}
          bg={'primary.400'}
          _hover={{
            bg: 'primary.500',
          }}>
          Sign Up
        </Button>
      </CustomLink>
    </>
  );
};

const DesktopNav = ({ navItems }) => {
  const linkColor = useColorModeValue('gray.200', 'gray.200');
  const linkHoverColor = useColorModeValue('white', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction={'row'} spacing={4}>
      {navItems.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <CustomLink
                p={2}
                to={navItem.href}
                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}>
                {navItem.label}
              </CustomLink>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}>
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text transition={'all .3s ease'} _groupHover={{ color: 'pink.400' }} fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = ({ navItems }) => {
  return (
    <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
      {navItems.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <CustomLink to={href}>
        <Flex
          py={2}
          justify={'space-between'}
          align={'center'}
          _hover={{
            textDecoration: 'none',
          }}>
          <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
            {label}
          </Text>
          {children && (
            <Icon
              as={ChevronDownIcon}
              transition={'all .25s ease-in-out'}
              transform={isOpen ? 'rotate(180deg)' : ''}
              w={6}
              h={6}
            />
          )}
        </Flex>
      </CustomLink>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
            children.map((child) => (
              <CustomLink key={child.label} py={2} to={child.href}>
                {child.label}
              </CustomLink>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
