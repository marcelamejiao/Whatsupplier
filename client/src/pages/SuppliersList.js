import React, { useState, useEffect } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Table, Form } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SUPPLIERS } from '../utils/queries';
import { ADD_SUPPLIER } from '../utils/mutations';
import { Link } from 'react-router-dom';
import { Container, Header, Modal, Footer } from '../components/styles/SupplierLists.styled';
import { Button } from '../components/styles/MaterialLists.styled'

function SuppliersList() {
  const [addSupplier] = useMutation(ADD_SUPPLIER);

  // Force reloading the suppliers when visiting the page.
  useEffect(() => {
    const fetchFunc = async () => await refetch();
    fetchFunc();
  }, []);

  const [formState, setFormState] = useState({
    name: '',
    address: '',
    phone: '',
    email: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const [showTable, setShowTable] = useState(true);
  const [showNewSupplierForm, setShowNewSupplierForm] = useState(false);

  const { loading: suppliersLoading, error: suppliersError, data: suppliersData, refetch } = useQuery(QUERY_SUPPLIERS);

  if (suppliersLoading) {
    return 'Loading...';
  }

  if (suppliersError) {
    return `Error! ${suppliersError.message}`;
  }

  const { suppliers } = suppliersData;

  const supplierList = suppliers.map(function (supplier) {
    return (
      <tr>
        <td>
          <Link
            to={`/suppliers/${supplier._id}`}
          >
            {supplier.name}
          </Link>
        </td>
        <td>{supplier.address}</td>
        <td>{supplier.phone}</td>
        <td>{supplier.email}</td>
      </tr>
    );
  });

  function openNewSupplierForm() {
    setShowNewSupplierForm(true);
    setShowTable(false);
  }
  const closeNewSupplierForm = () => {
    setShowNewSupplierForm(false);
    setShowTable(true)
  }
  async function handleFormSubmit(event) {
    event.preventDefault();

    try {
      await addSupplier({
        variables: { ...formState },
      });
      NotificationManager.success('New Supplier has been added', 'Notification');
      window.location.reload();
    } catch (e) {
      console.error(e);
      NotificationManager.error(e.message, 'Error');
    }
  }

  const supplierTable = showTable ?
    (
      <div className="table-responsive">
        <Table className="col-md-9 ml-auto mr-auto">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {supplierList}
          </tbody>
        </Table>
      </div>
    ) : '';

  const newSupplierForm = showNewSupplierForm
    ? (
      <Modal>
        <Form onSubmit={handleFormSubmit}>
          <h2>New Supplier Form</h2>
          <div className="form-group">
            <label htmlFor="name">Supplier's Name</label>
            <input type="text" className="form-control" id="name" name="name" placeholder="ABC Company" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input type="text" className="form-control" id="address" name="address" placeholder="17 Street Sydney NSW 2000" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="text" className="form-control" id="phone" name="phone" placeholder="+610450207635" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" name="email" placeholder="name@example.com" onChange={handleChange} autoComplete="off" />
          </div>
        </Form>
        <Footer>
          <Button type="submit" onClick={handleFormSubmit}>Save</Button>
          <Button type="submit" onClick={closeNewSupplierForm}>Close</Button>
          <NotificationContainer />
        </Footer>
      </Modal>
    )
    : '';

  return (
    <Container>
      <Header>
        <h1>Suppliers List</h1>
        {showTable && <button onClick={openNewSupplierForm}>New Supplier</button>}
      </Header>
      {supplierTable}
      {newSupplierForm}

    </Container>
  );
}

export default SuppliersList;
