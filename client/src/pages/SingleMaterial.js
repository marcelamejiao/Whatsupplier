
import React, { useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { UPDATE_USER_MATERIAL } from '../utils/mutations';

const SingleMaterial = () => {
    const { materialId } = useParams();
    const navigate = useNavigate();
    const { loading: userLoading, error: userError, data: userData } = useQuery(QUERY_ME)
    const [updateUserMaterial] = useMutation(UPDATE_USER_MATERIAL);
    const materialData = userData?.me?.userMaterials?.filter((m) => m.material._id === materialId)

    const [formState, setFormState] = useState({
        materialId: '',
        stock: '',
        safetyStock: '',
        anticipatedDemand: ''
    });
    if (userLoading) {
        return 'Loading'
    }
    if (userError) {
        return `Error: ${userError.message}`
    }

    if (! formState.materialId) {
        setFormState({
            materialId: materialData[0].material._id,
            stock: materialData[0].stock,
            safetyStock: materialData[0].safetyStock,
            anticipatedDemand: materialData[0].anticipatedDemand
        });
    }

    const materialName = materialData[0].material.name

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
        <div className='container'>
            <h2><strong>Edit Inventory Item:</strong> {materialName}</h2>
            <Form onSubmit={handleFormSubmit}>
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
                <Button type="submit" className="btn mb-2">Save</Button>
            </Form>
        </div>

    )
}

export default SingleMaterial;