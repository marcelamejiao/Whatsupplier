
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { UPDATE_USER_MATERIAL } from '../utils/mutations';
import { Modal, Footer } from '../components/styles/SupplierLists.styled';

const SingleMaterial = () => {
    const params = useParams();
    const navigate = useNavigate();
    const userMaterialId = params.materialId.slice(1)
    const { loading: userLoading, error: userError, data: userData } = useQuery(QUERY_ME)
    const [updateUserMaterial] = useMutation(UPDATE_USER_MATERIAL);
    const materialData = userData?.me?.userMaterials?.filter((m) => m.material._id === userMaterialId)

    const [formState, setFormState] = useState({
        materialId: userMaterialId,
        stock: materialData[0]?.stock,
        safetyStock: materialData[0]?.safetyStock,
        anticipatedDemand: materialData[0]?.anticipatedDemand
    });
    if (userLoading) {
        return 'Loading'
    }
    if (userError) {
        return `Error: ${userError.message}`
    }
    const materialName = materialData[0]?.material.name
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateUserMaterial({
                variables: {
                    _id: formState.materialId,
                    stock: parseInt(formState.stock),
                    safetyStock: parseInt(formState.safetyStock),
                    anticipatedDemand: parseInt(formState.anticipatedDemand)
                },
            });
            navigate('/inventory')
        } catch (e) {
            console.error(e);
        }
    }
    return (
        <Modal>
            <Form onSubmit={handleFormSubmit}>
                <h2>Update a material</h2>
                <div className="form-group" >
                    <label htmlFor="name">{materialName}</label>
                </div>
                <div className="form-group">
                    <label htmlFor="stock">Stock</label>
                    <input type="number" className="form-control" name="stock" value={formState.stock} min="0" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="safetyStock">Safety Stock</label>
                    <input type="number" className="form-control" name="safetyStock" value={formState.safetyStock} min="0" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="anticipatedDemand">Anticipated Demand</label>
                    <input type="number" className="form-control" name="anticipatedDemand" value={formState.anticipatedDemand} min="0" onChange={handleChange} autoComplete="off" />
                </div>
            </Form>
            <Footer>
                <button type="submit" className="btn mb-2 btn-outline-secondary" onClick={handleFormSubmit}>Save</button>
                <button type="submit" className="btn mb-2 btn-outline-secondary" onClick={() => navigate('/inventory')}>Close</button>
            </Footer>
        </Modal>

    )
}

export default SingleMaterial;