import React, { useEffect } from "react";
import { useMutation } from '@apollo/client';
import { UPGRADE_ACCOUNT } from '../utils/mutations';
import { useParams, useSearchParams } from "react-router-dom";

const SuccessfulPayment = () => {
  const [searchParams] = useSearchParams();
  const [upgradeAccount, { data, loading, error }] = useMutation(UPGRADE_ACCOUNT);

  useEffect(() => {
    async function fetchData() {
      try {
        await upgradeAccount({
          variables: {
            sessionId: sessionId,
          }
        });
      } catch (e) {
        console.log(e);
      }
    }

    if (! loading) {
      fetchData();      
    }
  }, []);

  const sessionId = searchParams.get('session_id');
  if (! sessionId) {
    return (
      <h1>Wrong Page!</h1>
    );
  }

  if (loading || (!data && !error)) {
    return (
      <h2>Please wait while we upgrade your account...</h2>
    );
  }

  const isTrial = data?.upgradeAccount?.isTrial ?? true;

  if (isTrial) {
    return (
      <>
        <section className="col-12 d-flex justify-content-center align-items-center flex-column">
          <h2>Unfortunately an error ocurred and we were unable to upgrade your account.</h2>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="col-12 d-flex justify-content-center align-items-center flex-column">
        <h2>Thank you for your payment!</h2>
        <p>You are now a premium user of WhatSupplier!</p>
      </section>
    </>
  );
};

export default SuccessfulPayment;