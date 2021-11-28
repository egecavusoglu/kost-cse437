import { useQuery, postRequest, deleteRequest } from 'src/lib/fetch';

async function createProduct({
  name,
  description,
  amount,
  currency,
  billingPeriod,
  organisationId,
}) {
  try {
    const res = await postRequest({
      url: '/api/products',
      body: { name, description, amount, currency, billingPeriod, organisationId },
    });

    if (res.isSuccess) {
      return res.data;
    }
    throw res.error;
  } catch (err) {
    return false;
  }
}

function useProducts(orgId) {
  const { data, error } = useQuery(`/api/orgs/${orgId}/products`);
  return {
    products: data?.data,
    loading: !error && !data,
    error,
  };
}

function useProdDetails(orgId) {
  const { data, error } = useQuery(`/api/orgs/${orgId}/products`);
  return {
    prod: data?.data,
    loading: !error && !data,
    error,
  };
}

async function deleteProduct(productId) {
  try {
    const res = await deleteRequest({
      url: `/api/products/${productId}`,
    });
    if (res.isSuccess) {
      return true;
    }
    throw res.error;
  } catch (err) {
    return false;
  }
}

export { createProduct, useProducts, useProdDetails, deleteProduct };
