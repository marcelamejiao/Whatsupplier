import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { Container,  Button} from '../components/styles/PlaceOrder.style'
import CheapestSupplier from '../components/CheapestSupplier';

const PlaceOrder = () => {
  const { materialId } = useParams();

  const { loading: userLoading, error: userError, data: userData } = useQuery(QUERY_ME);

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

  return (
    <Container>
      <h2>Place order</h2>
      <div className='row d-flex justify-content-center'>
        <div className="style-card m-5">
          <Card>
            <Card.Body style={{ width: '20rem', height:'15rem' }}>
              <h3>Material</h3>
                <section>
                  <strong>Name: </strong>{userMaterial.material.name}<br />
                  <strong>Stock: </strong>{userMaterial.stock} units
                </section>
                <Button>
                  <Link to={`/inventory/${userMaterial.material._id}`}>Update</Link>
                </Button>
            </Card.Body>
          </Card>
        </div>
        <div className="style-card m-5">
          <CheapestSupplier materialId={materialId} materialStock={userMaterial.stock} />
        </div>
      </div>
    </Container>
  );
};

export default PlaceOrder;