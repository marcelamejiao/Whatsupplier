import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_REORDER_POINT } from "../utils/queries";
import { Button, Form } from "react-bootstrap";

const ReOrderPoint = ({ supplierId, materialId, materialStock }) => {

  const {loading, error, data} = useQuery(QUERY_REORDER_POINT, {
    variables: {
      supplierId: supplierId,
      materialId: materialId,
    }
  });

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
        <Form>
          <p>Your stock has reached reorder point. Please place an order.</p>
          <div className="form-group">
            <input type="number" min='1' required className="form-control" id="units" name="units" placeholder="Enter units. E.g. 100" />
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

  return (
    <>
      <div>
        <strong>Reorder Point: </strong>{reorderPoint} units
      </div>
      <div>
        {showReorderPoint()}
      </div>
    </>
  );
};

export default ReOrderPoint;