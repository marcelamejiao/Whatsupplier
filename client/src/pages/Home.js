import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useQuery, useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT, QUERY_ME } from '../utils/queries';
import { HomeContainer, HomeBanner, Card, Button} from '../components/styles/Home.styled';
import image from '../images/illustration-flowing-conversation.svg'
import image2 from '../images/illustration-grow-together.svg'
import image3 from '../images/illustration-your-users.svg'

const stripePromise = loadStripe('pk_test_51Lw2jTCa4vlrvSc11LyWUFpLMJRGhAbpCP7mzDLPS83NtUjkUxc6WMBRSUoI8rPdjUc93acqRAjlHP3mCYn2tL7700rqRfIP43');

function Home() {
  const { loading, error, data } = useQuery(QUERY_ME);
  const [getCheckout, { data: checkoutData }] = useLazyQuery(QUERY_CHECKOUT);

  // We check to see if there is a data object that exists, if so this means that a checkout session was returned from the backend
  // Then we should redirect to the checkout with a reference to our session id
  useEffect(() => {
    if (checkoutData) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: checkoutData.checkout.session });
      });
    }
  }, [checkoutData]);

  if (loading) {
    return 'Loading...';
  }

  if (error) {
    return `Error! ${error.message}`;
  }

  const { me: { companyName, companyDetails, username, isTrial } } = data;

  const redirectToPayment = async () => {
    await getCheckout();
  };

  const accountTypeBadge = isTrial ? (<span class="badge badge-warning">Trial</span>) : (<span class="badge badge-success">Premium</span>);

  return (
    <HomeContainer>
      <HomeBanner>
        <h2>Welcome {username} !</h2>
        <p>Company Name: {companyName} {accountTypeBadge}</p>
        <p>Company Details: {companyDetails}</p>
        {
          isTrial ? <button onClick={redirectToPayment}>Get WhatSupplier Premium!</button> : ''
        }
      </HomeBanner>
      <Card>
        <div>
          <h2>My Suppliers</h2>
          <p>Here you can see: Supplier's List and Create a new Supplier or One Supplier and modify or delete it.  </p>
          <Button><a href="/suppliers">My Suppliers</a></Button>
        </div>
        <div>
          <img src={image} alt='' />
        </div>
      </Card>

      <Card>
        <div>
          <h5>My Inventory</h5>
          <p>Here you can see: Material's list and Update the Stock, Safety Stock and Anticipated Demand or view One Material and Place an Order</p>
          <Button><a href="/inventory">My Inventory</a></Button>
        </div>
        <div>
          <img src={image2} alt='' />
        </div>
      </Card>

      <Card>
        <div>
          <h5>My Production</h5>
          <p>Here you can send materials to production.</p>
          <Button><a href="/production">My Production</a></Button>
        </div>
        <div>
          <img src={image3} alt='' />
        </div>
      </Card>
    </HomeContainer>
  );
}

export default Home;