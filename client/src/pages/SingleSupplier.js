import React, { useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useParams, useNavigate } from 'react-router-dom';
import { Table, Form } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SINGLE_SUPPLIER, QUERY_MATERIALS } from '../utils/queries';
import { UPDATE_SUPPLIER, UPDATE_SUPPLIER_MATERIAL, DELETE_SUPPLIER } from '../utils/mutations';
import { EditContainer, MaterialContainer, SupplierContainer } from '../components/styles/SingleSupplier.styled'
import { Modal, Footer, Container } from '../components/styles/SupplierLists.styled'
import { Button } from '../components/styles/MaterialLists.styled'


function SingleSupplier() {
  const { supplierId } = useParams();
  const navigate = useNavigate();

  const [supplierFormState, setSupplierFormState] = useState({
    _id: '',
    name: '',
    address: '',
    phone: '',
    email: '',
  });

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

  const [updateSupplier] = useMutation(UPDATE_SUPPLIER);
  const [updateSupplierMaterial] = useMutation(UPDATE_SUPPLIER_MATERIAL);
  const [deleteSupplier] = useMutation(DELETE_SUPPLIER);

  const { loading: materialLoading, error: materialError, data: materialData } = useQuery(QUERY_MATERIALS);
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

  if (supplierFormState._id === '') {
    setSupplierFormState({
      _id: supplier._id,
      name: supplier.name,
      address: supplier.address,
      phone: supplier.phone,
      email: supplier.email
    });
  }

  const handleSupplierChange = (event) => {
    const { name, value } = event.target;

    setSupplierFormState({
      ...supplierFormState,
      [name]: value,
    });
  };

  if (materialLoading) {
    return 'Loading...';
  }

  if (materialError) {
    return `Error! ${error.message}`;
  }

  const { materials } = materialData;

  const materialsList = materials.map(function (material) {
    return (
      <option key={material._id} value={material._id}>{material.name}</option>
    );
  });

  const supplierMaterialList = supplier.supplierMaterials.map(function (supplierMaterial) {
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
        variables: { _id: supplierId },
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

  const handleUpdateSupplierFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await updateSupplier({
        variables: { ...supplierFormState },
      });
      NotificationManager.success('Your Supplier has been updated', 'Notification');

    } catch (e) {
      console.error(e);
      NotificationManager.error('Please fill all info', 'Error');
    }
  };

  return (
    <EditContainer>
      <SupplierContainer>
        <h2>Update Supplier</h2>
        <Modal>
          <Form onSubmit={handleUpdateSupplierFormSubmit}>
            <div className="card-header" >
              <h5 className="card-title"><p>Name</p><input name='name' value={supplierFormState.name} onChange={handleSupplierChange} /></h5>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><p>Address</p><input name='address' value={supplierFormState.address} onChange={handleSupplierChange} /></li>
              <li className="list-group-item"><p>Phone</p><input name='phone' value={supplierFormState.phone} onChange={handleSupplierChange} /></li>
              <li className="list-group-item"><p>Email</p><input name='email' value={supplierFormState.email} onChange={handleSupplierChange} /></li>
            </ul>
            <Footer>
              <Button type="submit" style={{ backgroundColor: "#569ec2" }} onClick={handleUpdateSupplierFormSubmit}>Save</Button>
              <Button type="submit" onClick={handleDeleteSupplier}>Delete</Button>
              <NotificationContainer />
            </Footer>
          </Form>
        </Modal>
      </SupplierContainer>
      <MaterialContainer>
        <h2>Update Supplier's Materials</h2>
        <Container>
          <Table className="table">
            <thead>
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
          <Modal>
            <Form onSubmit={handleAddMaterialFormSubmit} className="p-2">
              <div className="form-group">
                <label htmlFor="materials">Materials</label>
                <select className="form-control" id="materials" name='materialId' required defaultValue={""} onChange={handleMaterialChange}>
                  <option value="" disabled>--Please select a material--</option>
                  {materialsList}
                </select>
                <label htmlFor="cost">Cost:</label>
                <input className="form-control" id="cost" name='cost' type='number' step={`0.01`} required onChange={handleMaterialChange} />
                <label htmlFor="leadTime">Lead Time (days):</label>
                <input className="form-control" id='leadTime' name='leadTime' type='number' required onChange={handleMaterialChange} />
              </div>
              <Button type="submit" onClick={handleAddMaterialFormSubmit}>Add Material</Button>
            </Form>
          </Modal>
        </Container>
      </MaterialContainer>

    </EditContainer>
  );
}

export default SingleSupplier;