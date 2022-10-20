import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Table, Form } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SINGLE_SUPPLIER, QUERY_MATERIALS } from '../utils/queries';
import { UPDATE_SUPPLIER, UPDATE_SUPPLIER_MATERIAL, DELETE_SUPPLIER} from '../utils/mutations';


function SingleSupplier () {
  const { supplierId } = useParams();
  const navigate = useNavigate();

  const [materialsFormState, setMaterialsFormState] = useState({
    _id: supplierId,
    materialId: '',
    cost: '',
    leadTime: ''
  });

  const handleMaterialChange = (event) => {
    const { name, value } = event.target;

    setMaterialsFormState({
      ...materialsFormState,
      [name]: value,
    });
  };

  // const [updateSupplier] = useMutation(UPDATE_SUPPLIER);
  const [updateSupplierMaterial] = useMutation(UPDATE_SUPPLIER_MATERIAL);
  const [deleteSupplier] = useMutation(DELETE_SUPPLIER);

  const { loading: materialLoading, error: materialError, data: materialData} = useQuery(QUERY_MATERIALS);
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

  if (materialLoading) {
    return 'Loading...';
  }

  if (materialError) {
    return `Error! ${error.message}`;
  }

  const { materials } = materialData;

  const materialsList = materials.map(function (material) {
    return (
      <option value={material._id}>{material.name}</option>
    );
  });

  const supplierMaterialList = supplier.supplierMaterials.map(function (supplierMaterial) {
    console.log(supplierMaterial);
    
    return (
      <tr>
        <td>{supplierMaterial.material.name}</td>
        <td>{supplierMaterial.cost}</td>
        <td>{supplierMaterial.leadTime}</td>
      </tr>
    );
  });

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

  const handleAddMaterialFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await updateSupplierMaterial({
        variables: {
          _id: materialsFormState._id,
          materialId: materialsFormState.materialId,
          cost: Number(materialsFormState.cost),
          leadTime: parseInt(materialsFormState.leadTime)
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className='row'>
      <div className="card col-6" style={{width: '18rem'}}>
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
      </div>
      <div className='col-6'>
        <Table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Material</th>
              <th scope="col">Cost</th>
              <th scope="col">Lead Time</th>
            </tr>
          </thead>
          <tbody>
            {supplierMaterialList}
          </tbody>
        </Table>
        <Form onSubmit={handleAddMaterialFormSubmit} className="p-2">
          <div className="form-group">
            <label for="materials">Materials</label>
            <select className="form-control" id="materials" name='materialId' required onChange={handleMaterialChange}>
              <option value="" disabled selected>--Please select a material--</option>
              {materialsList}
            </select>
            <label for="cost">Cost:</label>
            <input className="form-control" id="cost" name='cost' type='number' required onChange={handleMaterialChange} />
            <label for="leadTime">Lead Time:</label>
            <input className="form-control" id='leadTime' name='leadTime' type='number' required onChange={handleMaterialChange}/>
          </div>
          <Button type='submit' className="btn">Add to this Supplier</Button>
        </Form>
      </div>
    </div>
  );
}

export default SingleSupplier;