import React, { useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { UPDATE_USER_MATERIAL } from '../utils/mutations';
import { Footer, Modal, Button } from '../components/styles/SendToProduction.styled';

const SendMaterialToProduction = () => {
  const { materialId } = useParams();
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    materialId: materialId,
    stock: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const { loading: userLoading, error: userError, data: userData } = useQuery(QUERY_ME);
  const [updateUserMaterial] = useMutation(UPDATE_USER_MATERIAL);

  if (userLoading) {
    return 'Loading'
  }
  if (userError) {
    return `Error: ${userError.message}`
  }
  const { me } = userData;

  const userMaterials = me.userMaterials;

  const userMaterial = userMaterials.find((element) => {
    if (element.material._id === materialId) {
      return true;
    }
    else return false;
  });

  const handleClose = () => navigate('/production')

  async function handleFormSubmit(event) {
    event.preventDefault();
    console.log('comes here');
    if (userMaterial.stock - formState.units < 0) {
      NotificationManager.error('Your send to production units can not be less than your current stock.', 'Notification');
      return false;
    }

    try {
      await updateUserMaterial({
        variables: {
          _id: materialId,
          stock: userMaterial.stock - formState.units,
          safetyStock: userMaterial.safetyStock,
          anticipatedDemand: userMaterial.anticipatedDemand
        }
      });

      navigate('/production');
    } catch (e) {
      console.error(e);
      NotificationManager.error('Please enter a number', 'Error');
    }
  }

  return (
    <Modal>
      <h2>Send to Production</h2>
      <NotificationContainer />
      <Form onSubmit={handleFormSubmit} className="p-2 col-md-6">
        <div className="form-group">
          <label>Material Name:{userMaterial.material.name}</label>
        </div>
        <div className="form-group">
          <label>Material Stock:{userMaterial.stock}</label>
        </div>
        <div className="form-group">
          <label>Units</label>
          <input type="number" className="form-control" id="units" min="1" name="units" placeholder="E.g. 100" onChange={handleChange}>
          </input>
        </div>
      </Form>
      <Footer>
        <Button type="submit" onClick={handleFormSubmit}>Send Production</Button>
        <Button type="submit" onClick={handleClose}>Close</Button>
      </Footer>
    </Modal>
  );
};

export default SendMaterialToProduction;