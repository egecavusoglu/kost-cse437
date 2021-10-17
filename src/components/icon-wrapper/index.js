import { Icon } from '@chakra-ui/react';
export default function IconWrapper({ icon, ...props }) {
  return <Icon as={icon} {...props} />;
}
