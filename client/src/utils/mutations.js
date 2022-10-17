import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
  }
`;

export const ADD_SUPPLIER = gql`
  mutation addSupplier($name: String!, $email: String!, $address: String!, $phone: String!) {
    addSupplier(name: $name, email: $email, address: $address, phone: $phone) {
            name
            email
            address
            phone
        }
    }
`;

export const UPDATE_SUPPLIER = gql`
    mutation UpdateSupplier($_id: ID! $name: String!, $email: String!, $address: String!, $phone: String!) {
        updateSupplier(_id: $_id, name: $name, email: $email, address: $address, phone: $phone) {
            _id
            name
            email
            address
            phone
        }
    }
`;

export const DELETE_SUPPLIER = gql`
    mutation deleteSupplier($_id: _id) {
        deleteSupplier(_id: $_id) {
            _id
            name
            email
            address
            phone 
        }
    }
`;

export const UPDATE_USER_MATERIAL = gql`
    mutation updateUserMaterial($id: ID!, $name: String!, $stock: Int!, $safetyStock: Int!, $anticipatedDemand: Int! {
        updateUserMaterial(_id: $id, name: $name, stock: $stock, safetyStock: $safetyStock, anticipatedDemand: $anticipatedDemand) {
            userMaterials {
                material {
                  name
                }
                stock
                safetyStock
                anticipatedDemand
            }
            
        }
    }
`;

export const UPDATE_SUPPLIER_MATERIAL = gql`
    mutation updateSupplierMaterial($id: ID!, $name: String!, $stock: Int!, $safetyStock: Int!, $anticipatedDemand: Int!) {
        updateSupplierMaterial(_id: $id, materialId: $materialId, cost: $cost, leadTime: $leadTime) {
            _id
            name
            supplierMaterials{
                material{
                    materialId
                }
                cost
                leadTime
            }
        }
    }
`;

