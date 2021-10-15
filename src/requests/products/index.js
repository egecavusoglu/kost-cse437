import { useQuery, postRequest } from 'src/lib/fetch';

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

export { createProduct, useProducts };
