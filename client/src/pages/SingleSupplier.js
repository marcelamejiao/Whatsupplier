import React from 'react';
import { useParams } from 'react-router-dom';
import { Button, Table, Form } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SINGLE_SUPPLIER } from '../utils/queries';
import { UPDATE_SUPPLIER, UPDATE_SUPPLIER_MATERIAL, DELETE_SUPPLIER} from '../utils/mutations';


function SingleSupplier () {
  const { supplierId } = useParams();
  console.log(supplierId);

  // const [updateSupplier] = useMutation(UPDATE_SUPPLIER);
  // const [updateSupplierMaterial] = useMutation(UPDATE_SUPPLIER_MATERIAL);
  // const [deleteSupplier] = useMutation(DELETE_SUPPLIER);

  // const { loading, error, data } = useQuery(QUERY_SINGLE_SUPPLIER);

  // if (loading) {
  //   return 'Loading...';
  // }

  // if (error) {
  //   return `Error! ${error.message}`;
  // }

  // const { supplier } = data.supplier;
  // // const { materials } = data;

  // // const materialList = materials.map(function(material){
  // //   return <option scope="row">{material.name}</option>
  // // });

  // const supplierInfoCard = showCard ?
  // (
  //   <div class="card" style="width: 18rem;">
  //       <div class="card-body">
  //       <h5 class="card-title">{ supplier }</h5>
  //     </div>
  //     <ul class="list-group list-group-flush">
  //       <li class="list-group-item"></li>
  //       <li class="list-group-item"></li>
  //       <li class="list-group-item"></li>
  //     </ul>
  //     <div class="card-body">
  //       <a href="#" className="btn btn-primary">Modify</a>
  //       <a href="#" className="btn btn-primary">Delete</a>
  //     </div>
  //   </div>
  // ) : '';
}

export default SingleSupplier;