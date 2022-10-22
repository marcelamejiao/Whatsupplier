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
  mutation addUser($username: String!, $email: String!, $password: String!, $companyName: String!, $companyDetails: String!) {
    addUser(username: $username, email: $email, password: $password, companyName: $companyName, companyDetails: $companyDetails) {
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
    mutation deleteSupplier($_id: ID!) {
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
    mutation updateUserMaterial($_id: ID!, $stock: Int!, $safetyStock: Int!, $anticipatedDemand: Int!){
        updateUserMaterial(_id: $_id, stock: $stock, safetyStock: $safetyStock, anticipatedDemand: $anticipatedDemand) {
            userMaterials {
                material {
                    _id
                }
                stock
                safetyStock
                anticipatedDemand
            }
            
        }
    }
`;

export const UPDATE_SUPPLIER_MATERIAL = gql`
    mutation updateSupplierMaterial($_id: ID!, $materialId: ID!, $cost: Float! , $leadTime: Int!) {
        updateSupplierMaterial(_id: $_id, materialId: $materialId, cost: $cost, leadTime: $leadTime) {
            _id
            name
            supplierMaterials{
                material {
                    _id
                }
                cost
                leadTime
            }
        }
    }
`;

