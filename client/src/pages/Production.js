import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { Container } from '../components/styles/MaterialLists.styled';

const Production = () => {

    // Force reloading the suppliers when visiting the page.
    useEffect(() => {
        const fetchFunc = async () => await refetchMe();
        fetchFunc();
    }, []);

    const { loading: userLoading, error: userError, data: userData, refetch: refetchMe } = useQuery(QUERY_ME);

    if (userLoading) {
        return 'Loading'
    }
    if (userError) {
        return `Error: ${userError.message}`
    }
    const { me } = userData;

    const userMaterialsList = me?.userMaterials?.map((userMaterial, index) => {
        return (
            <tr key={index}>
                <td>{userMaterial.material.name}</td>
                <td>
                    {userMaterial.stock}
                </td>
                <td>
                    <Link
                        to={`/materials/${userMaterial.material._id}/send-to-production`}
                    >
                        Send To Production
                    </Link>
                </td>
            </tr>
        );
    })

    return (
        <Container>
            <h1>Production</h1>
            <div className='table-responsive'>
                <Table className='col-md-9 ml-auto mr-auto'>
                    <thead>
                        <tr>
                            <th scope="col">Material Name</th>
                            <th scope="col">Stock</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {userMaterialsList}
                    </tbody>
                </Table>
            </div>
        </Container>

    )
}

export default Production;