import Head from 'next/head';
import Link from 'src/components/link';
import { Wrap, WrapItem } from '@chakra-ui/react';
import OrgSelector from 'src/components/org-selector';
import OrgItem, { AddOrgItem } from 'src/components/org-item';
import Navbar from 'src/components/navbar';
export default function Home() {
  return (
    <div>
      <Navbar />
      {/* <OrgSelector /> */}
      <Wrap p={8}>
        <WrapItem>
          <AddOrgItem />
        </WrapItem>

        <WrapItem>
          <OrgItem />
        </WrapItem>
      </Wrap>
    </div>
  );
}
