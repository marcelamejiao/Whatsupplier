import React, { useState, useEffect } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME, QUERY_MATERIALS } from '../utils/queries';
import { UPDATE_USER_MATERIAL } from '../utils/mutations';
import { Link } from 'react-router-dom';

const MaterialsList = () => {
    const [updateUserMaterial] = useMutation(UPDATE_USER_MATERIAL);
    const { loading: materialLoading, error: materialError, data: materialData } = useQuery(QUERY_MATERIALS);
    const { loading: userLoading, error: userError, data: userData, refetch } = useQuery(QUERY_ME);

    useEffect(() => {
        const fetchFunc = async () => await refetch();
        fetchFunc();
    }, []);

    const [formState, setFormState] = useState({
        materialId: '',
        stock: '',
        safetyStock: '',
        anticipatedDemand: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
        console.log("setFormState", formState)
    };
    const openNewMaterialForm = () => {
        setShowNewMaterialForm(true);
        setShowTable(false);
    }

    const [showTable, setShowTable] = useState(true);
    const [showNewMaterialForm, setShowNewMaterialForm] = useState(false);

    if (userLoading) {
        return 'Loading...';
    }
    if (userError) {
        return `Error! ${userError.message}`;
    }
    const { me } = userData;

    const userMaterialsList = me?.userMaterials?.map((userMaterial, index) => {
        return (
            <tr key={index}>
                <td>{userMaterial.material.name}</td>
                <td>{userMaterial.stock}</td>
                <td>{userMaterial.safetyStock}</td>
                <td>{userMaterial.anticipatedDemand}</td>
                <button><Link to={`/inventory/:${userMaterial.material._id}`}>Update</Link></button>
            </tr>
        );
    })
    const inventoryTable = showTable ?
        (
            <>
                <Table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Safety Stock</th>
                            <th scope="col">Anticipated Demand</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userMaterialsList}
                    </tbody>
                </Table>
                <Button onClick={openNewMaterialForm}>Add A Material</Button>
            </>
        ) : '';

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
            window.location.reload();
        } catch (e) {
            console.error(e);
        }
    }

    if (materialLoading) {
        return 'Loading...';
    }
    if (materialError) {
        return `Error! ${materialError.message}`;
    }
    const { materials } = materialData
    const addInventoryForm = showNewMaterialForm
        ? (
            <Form onSubmit={handleFormSubmit}>
                <h2>New Inventory Form</h2>
                <div className="form-group">
                    <label htmlFor="name">Please Select the material</label>
                    <select name="materialId" onChange={handleChange} >
                        {materials.map((item, index) => { return <option key={index} value={item._id}>{item.name}</option> })}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="stock">Stock</label>
                    <input type="number" className="form-control" name="stock" placeholder="100" min="0" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="safetyStock">Safety Stock</label>
                    <input type="number" className="form-control" name="safetyStock" placeholder="100" min="0" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="anticipatedDemand">Anticipated Demand</label>
                    <input type="number" className="form-control" name="anticipatedDemand" placeholder="100" min="0" onChange={handleChange} autoComplete="off" />
                </div>
                <Button type="submit" className="btn mb-2">Save</Button>
            </Form>
        )
        : '';
    return (
        <div>
            <section className='container'>
                <h1>Inventory</h1>
                {inventoryTable}
                {addInventoryForm}
            </section>
        </div>
    )
}

export default MaterialsList;