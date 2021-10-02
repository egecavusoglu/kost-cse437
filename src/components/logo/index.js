import { Image } from '@chakra-ui/react';
import Svg from '../../../public/logo.svg';

export default function Logo({ size = 12 }) {
  return <Image src={Svg.src} h={size} alt="kost logo" />;
}
