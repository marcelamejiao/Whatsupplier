import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Table, Form } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SINGLE_SUPPLIER } from '../utils/queries';
import { UPDATE_SUPPLIER, UPDATE_SUPPLIER_MATERIAL, DELETE_SUPPLIER} from '../utils/mutations';


function SingleSupplier () {
  const { supplierId } = useParams();
  const navigate = useNavigate();

  // const [updateSupplier] = useMutation(UPDATE_SUPPLIER);
  // const [updateSupplierMaterial] = useMutation(UPDATE_SUPPLIER_MATERIAL);
  const [deleteSupplier] = useMutation(DELETE_SUPPLIER);

  const { loading, error, data } = useQuery(QUERY_SINGLE_SUPPLIER, {
    variables: {
      _id: supplierId,
    }
  });

  if (loading) {
    return 'Loading...';
  }

  if (error) {
    return `Error! ${error.message}`;
  }

  const { supplier } = data;
  console.log(supplier);

  const handleDeleteSupplier = async () => {
    try {
      await deleteSupplier({
        variables: {_id: supplierId},
      });
      navigate('/suppliers');

    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="card" style={{width: '18rem'}}>
      <div className="card-body">
      <h5 className="card-title">{supplier.name}</h5>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">{supplier.address}</li>
        <li className="list-group-item">{supplier.phone}</li>
        <li className="list-group-item">{supplier.email}</li>
      </ul>
      <div className="card-body">
        <a href="#" className="btn btn-primary">Modify</a>
        <Button onClick={handleDeleteSupplier}>Delete</Button>
      </div>

      <Table className="table">
      <thead className="thead-dark">
        <tr>
          <th scope="col">Material</th>
          <th scope="col">Cost</th>
          <th scope="col">Lead Time</th>
        </tr>
      </thead>
      <tbody>
        {}
      </tbody>
      </Table>
      <Button onClick={''}>New Supplier</Button>
    </div>

  );

  // const { supplier } = data.supplier;
  // // const { materials } = data;

  // // const materialList = materials.map(function(material){
  // //   return <option scope="row">{material.name}</option>
  // // });
}

export default SingleSupplier;