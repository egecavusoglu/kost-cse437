import Navbar from 'src/components/navbar';
import { useOrgDetails } from 'src/requests/organisation';
import { useProducts, useProdDetails } from 'src/requests/products';
import ProdSelector from 'src/components/prod-selector';
import Link from 'src/components/link';
import { useRouter } from 'next/router';
import { formatDate } from 'src/lib/date';
import ProductItem, { AddProductItem, ProductItemSkeleton } from 'src/components/product-item';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Flex,
  Box,
  Grid,
  Heading,
  Wrap,
  WrapItem,
  VStack,
} from '@chakra-ui/react';

export default function ProductDetailsPage({ data = {}, ...props }) {
  const router = useRouter();
  const productId = router.query.productId;
  const orgId = router.query.id;
  const { product, loading, error } = useProdDetails(productId, orgId);
  // console.log(product?.createdAt);
  // console.log(formattedDate);
  return (
    <>
      <div>
        <Navbar />
        <Box m={[2, 4]} p={[2, 4]}>
          <Flex mb={4} alignItems="center" justifyContent="space-between">
            <Heading color="secondary.600" as="h2" fontSize="2xl">
              {product?.name}
            </Heading>
          </Flex>
          <Box py={1} mb={6}>
            <Text>{product?.description}</Text>
          </Box>
          <Box py={1} mb={6}>
            <Text color="gray.600" fontWeight="medium">
              Created
            </Text>
            <Text>{formatDate(product?.createdAt)}</Text>
            <Text color="gray.600" fontWeight="medium">
              Billing Period and Amount
            </Text>
            <Text>
              {product?.billingPeriod} {product?.amount} {product?.currency}
            </Text>
          </Box>
        </Box>

        {/* username, pw, website link, notes */}
      </div>
    </>
  );
}
