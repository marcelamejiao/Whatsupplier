import React, {useEffect} from "react";
import { useQuery } from '@apollo/client';
import { QUERY_CHEAPEST_SUPPLIER } from '../utils/queries';
import ReorderPoint from "./ReOrderPoint";

const CheapestSupplier = ({ materialId, materialStock }) => {
  const {
    loading: cheapestSupplierLoading,
    error: cheapestSupplierError,
    data: cheapestSupplierData,
    refetch: refetchCheapestSupplier
  } = useQuery(
    QUERY_CHEAPEST_SUPPLIER,
    {
      variables: {
        materialId: materialId
      }
    }
  );

  useEffect(() => {
    const refetch = async () => await refetchCheapestSupplier();
    refetch();
  }, []);

  if (cheapestSupplierLoading) {
    return 'Loading'
  }

  if (cheapestSupplierError) {
    return `Error: ${cheapestSupplierError.message}`
  }

  const { cheapestSupplier } = cheapestSupplierData;

  let cheapestSupplierContainer = '';

  if (!cheapestSupplier) {
    cheapestSupplierContainer = (
      <section>
        No supplier found for this material.<br />
        Please add this material to at least one supplier.
      </section>
    );
  } else {
    cheapestSupplierContainer = (
      <>
        <div>
          <section>
            The supplier <strong>{cheapestSupplier.name}</strong> has the lowest cost for this material!
          </section>
        </div>
        <div>
          <ReorderPoint supplierId={cheapestSupplier._id} materialId={materialId} materialStock={materialStock} />
        </div>
      </>
    );
  }

  return (
    <>
          {cheapestSupplierContainer}
    </>
  );
};

export default CheapestSupplier;