import React, { useState } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { QUERY_SUPPLIERS } from '../utils/queries'; 

function SuppliersList () {

  const [showTable, setShowTable] = useState(true);
  const [ showNewSupplierForm, setShowNewSupplierForm ] = useState(false);

  const { supplierName } = useQuery(QUERY_SUPPLIERS);
  const materialList = '';

  function openNewSupplierForm() {
    setShowNewSupplierForm(true);
    setShowTable(false);
  }

  const supplierTable = showTable ?
    (
      <>
        <Table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Email</th>
              <th scope="col">Material</th>
              <th scope="col">Material Cost</th>
              <th scope="col">Lead Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{supplierName}</th>
              <td></td>
            </tr>
          </tbody>
        </Table>
        <Button onClick={openNewSupplierForm}>New Supplier</Button>
      </>
    ) : 
    '';

  const newSupplierForm = showNewSupplierForm 
    ? (
      <Form>
        <h2>New Supplier Form</h2>
        <div className="form-group">
          <label for="exampleInputPassword1">Supplier's Name</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="ABC Company" />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Address</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="17 Street Sydney NSW 2000" />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Phone Number</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="+610450207635" />
        </div>
        <div className="form-group">
          <label for="exampleFormControlInput1">Email address</label>
          <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
        </div>
        <div className="form-group">
          <label for="exampleFormControlSelect1">Material</label>
          <select className="form-control" id="exampleFormControlSelect1">
            <option>{materialList}</option>
            <option>2</option>
          </select>
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Cost ($)</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="123" />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Lead Time (days)</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="4" />
        </div>
        <Button type="submit" className="btn mb-2">Save</Button>
      </Form>
    )
    : '';
  
  return (
    <div>
      <section className='container'>
        <h1>Suppliers List</h1>
        {supplierTable}    
        {newSupplierForm}
      </section>
    </div>
  );
}

export default SuppliersList;