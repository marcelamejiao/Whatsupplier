import React, { useState, useEffect } from "react";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_REORDER_POINT } from "../utils/queries";
import { Form } from "react-bootstrap";
import { PLACE_ORDER } from "../utils/mutations";
import { Button } from '../components/styles/PlaceOrder.style'

const ReorderPoint = ({ supplierId, materialId, materialStock }) => {
  const [placeOrder] = useMutation(PLACE_ORDER);
  const [formState, setFormState] = useState({
    units: '',
  });

  const {loading, error, data, refetch} = useQuery(QUERY_REORDER_POINT, {
    variables: {
      supplierId: supplierId,
      materialId: materialId,
    }
  });

  useEffect(() => {
    const fetch = async () => await refetch();
    fetch();
  }, []);

  if (loading) {
    return 'Loading...';
  }

  if (error) {
    return 'Error: ' + error.message;
  }

  const { reorderPoint } = data; 

  const showReorderPoint = () => {
    if (materialStock <= reorderPoint) {
      return (
        <Form onSubmit={handleFormSubmit}>
          <p>Your stock has reached reorder point. Please place an order.</p>
          <div className="form-group">
            <input type="number" min='1' required className="form-control" id="units" name="units" value={formState.units} placeholder="Enter units. E.g. 100" onChange={handleChange} />
          </div>
          <div className="form-group">
            <Button type="submit">Place Order</Button>
          </div>
        </Form>
        );
    } else {
      return (
        'You have sufficient stock for this material.'
      );
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await placeOrder({
        variables: {
          units: parseInt(formState.units),
          materialId: materialId,
          supplierId: supplierId,
        }
      });
    } catch (e) {
      console.error(e);
      NotificationManager.error('Please enter a number', 'Error');
    }

  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <>
      <NotificationContainer />
      <div>
        <strong>Reorder Point: </strong>{reorderPoint} units
      </div>
      <div>
        {showReorderPoint()}
      </div>
    </>
  );
};

export default ReorderPoint;
