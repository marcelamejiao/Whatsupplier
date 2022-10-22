import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_CHEAPEST_SUPPLIER } from '../utils/queries';
import Card from 'react-bootstrap/Card';

const PlaceOrder = () => {
  const { materialId } = useParams();

  const { loading: userLoading, error: userError, data: userData } = useQuery(QUERY_ME);
  const { 
    loading: cheapestSupplierLoading, 
    error: cheapestSupplierError, 
    data: cheapestSupplierData
  } = useQuery(
    QUERY_CHEAPEST_SUPPLIER, 
    {
      variables: {
        materialId: materialId
      } 
    }
  );

  if (userLoading) {
    return 'Loading'
  }
  if (userError) {
    return `Error: ${userError.message}`
  }

  const { me } = userData;
  const userMaterials = me.userMaterials;
  const userMaterial = userMaterials.find(
    (userMaterial) => {
      return userMaterial.material._id === materialId;
    }
  );

  if (cheapestSupplierLoading) {
    return 'Loading'
  }

  if (cheapestSupplierError) {
    return `Error: ${cheapestSupplierError.message}`
  }

  const { cheapestSupplier } = cheapestSupplierData;

  if (cheapestSupplierLoading) {
    return 'Loading...';
  }

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
      <section>
        The supplier <strong>{cheapestSupplier.name}</strong> has the lowest cost for this material!
      </section>
    );
  }

  return (
    <>
      <h2>Place order</h2>
      <div className='row'>
        <div className="col-md-6 d-flex justify-content-center">
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title><h3>Material</h3></Card.Title>
              <Card.Text>
                <strong>Name: </strong>{userMaterial.material.name}<br />
                <strong>Stock: </strong>{userMaterial.stock}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-6 d-flex justify-content-center">
        <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Text>
              {cheapestSupplierContainer}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;