import React, { useState } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME, QUERY_MATERIALS } from '../utils/queries';
import { UPDATE_USER_MATERIAL } from '../utils/mutations';

const MaterialsList = () => {
    const [updateUserMaterial] = useMutation(UPDATE_USER_MATERIAL);
    const { loading: materialLoading, error: materialError, data: materialData } = useQuery(QUERY_MATERIALS);
    const { loading: userLoading, error: userError, data: userData } = useQuery(QUERY_ME);

    const [formState, setFormState] = useState({
        materialId: '',
        name: '',
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
    console.log(me?.userMaterials)

    const userMaterialsList = me?.userMaterials?.map((userMaterial) => {
        return (
            <tr>
                <td>{userMaterial.material.name}</td>
                <td>{userMaterial.stock}</td>
                <td>{userMaterial.safetyStock}</td>
                <td>{userMaterial.anticipatedDemand}</td>
            </tr>
        );
    })
    console.log(materialData)
    if (materialLoading) {
        return 'Loading...';
    }
    if (materialError) {
        return `Error! ${materialError.message}`;
    }
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
                variables: { ...formState },
            });
            window.location.reload();
        } catch (e) {
            console.error(e);
        }
    }

    console.log(materialData)
    const addInventoryForm = showNewMaterialForm
        ? (
            <Form onSubmit={handleFormSubmit}>
                <h2>New Inventory Form</h2>
                <div className="form-group">
                    <label for="name">Name</label>
                    <select>
                        <option value="1">test1</option>
                        <option value="2">test2</option>
                        <option value="3">test3</option>
                    </select>
                </div>
                <div className="form-group">
                    <label for="stock">Stock</label>
                    <input type="text" className="form-control" name="stock" placeholder="100" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label for="safetyStock">Safety Stock</label>
                    <input type="text" className="form-control" name="safetyStock" placeholder="100" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label for="anticipatedDemand">Anticipated Demand</label>
                    <input type="text" className="form-control" name="anticipatedDemand" placeholder="100" onChange={handleChange} autoComplete="off" />
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