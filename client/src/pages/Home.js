import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

function Home () {
  const { loading, error, data }  = useQuery(QUERY_ME);

  if (loading) {
    return 'Loading...';
  }

  if (error) {
    return `Error! ${error.message}`;
  }

  const { me: {companyName, companyDetails} } = data;

  return (
    <div className='row'>
        <section className='col-6'>
            <h2>HOME</h2>

            <p>Company Name: {companyName}</p>
            <p>Company Details: {companyDetails}</p>
        </section>

        <section className='col-6'>
          <div className="card" style={{width: '18rem'}}>
            <div className="card-body">
              <h5 className="card-title">My Suppliers</h5>
              <p className="card-text">Here you can see: Supplier's List and Create a new Supplier or One Supplier and modify or delete it.  </p>
              <a href="/suppliers" className="btn btn-primary">My Suppliers</a>
            </div>
          </div>

          <div className="card" style={{width: '18rem'}}>
            <div className="card-body">
              <h5 className="card-title">My Inventory</h5>
              <p className="card-text">Here you can see: Material's list and Update the Stock, Safety Stock and Anticipated Demand or view One Material and Place an Order</p>
              <a href="/inventory" className="btn btn-primary">My Inventory</a>
            </div>
          </div>

          <div className="card" style={{width: '18rem'}}>
            <div className="card-body">
              <h5 className="card-title">My Production</h5>
              <p className="card-text">Here you can send materials to production.</p>
              <a href="/production" className="btn btn-primary">My Production</a>
            </div>
          </div>
        </section>
    </div>
  );
}

export default Home;