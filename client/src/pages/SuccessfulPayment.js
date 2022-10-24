import React, { useEffect } from "react";
import { useMutation } from '@apollo/client';
import { UPGRADE_ACCOUNT } from '../utils/mutations';
import { useSearchParams } from "react-router-dom";
import { Container } from '../components/styles/SuccessfulPayment.styled';

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

    if (!loading) {
      fetchData();
    }
  }, []);

  const sessionId = searchParams.get('session_id');
  if (!sessionId) {
    return (
      <h1>Wrong Page!</h1>
    );
  }

  if (loading || (!data && !error)) {
    return (
      <Container>
        <h2>Please wait while we upgrade your account...</h2>
      </Container>
    );
  }

  const isTrial = data?.upgradeAccount?.isTrial ?? true;

  if (isTrial) {
    return (
      <>
        <Container>
          <section>
            <h2>Unfortunately an error ocurred and we were unable to upgrade your account.</h2>
          </section>
        </Container>
      </>
    );
  }

  return (
    <>
      <Container>
        <section>
          <h2>Thank you for your payment!</h2>
          <p>You are now a premium user of WhatSupplier!</p>
        </section>
      </Container>
    </>
  );
};

export default SuccessfulPayment;