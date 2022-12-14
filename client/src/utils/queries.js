import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      companyName
      companyDetails
      isTrial
      userMaterials {
        material{
            _id
            name
        }
        stock
        safetyStock
        anticipatedDemand
      }
    }
  }
`;

export const QUERY_SUPPLIERS = gql`
  query getSuppliers{
      suppliers{
        _id
        name
        address
        phone
        email
      }
  }
`;

export const QUERY_SINGLE_SUPPLIER = gql`
  query getSingleSupplier($_id: ID!) {
    supplier(_id: $_id) {
      _id
      name
      address
      phone
      email
      supplierMaterials{
        material{
            _id
            name
        }
       cost
       leadTime
      }
    }
  }
`;

export const QUERY_MATERIALS= gql`
  query getMaterials {
    materials {
      _id
      name
    }
  }
`;

export const QUERY_CHEAPEST_SUPPLIER = gql`
  query cheapestSupplier($materialId: ID!) {
    cheapestSupplier(materialId: $materialId) {
      _id
      name
      supplierMaterials {
        cost
        leadTime
        material {
          name
          _id
        }
      }
    }
  }
`;

export const QUERY_REORDER_POINT = gql`
  query reorderPoint($supplierId: ID!, $materialId: ID!) {
    reorderPoint(supplierId: $supplierId, materialId: $materialId)
  }
`;

export const QUERY_CHECKOUT = gql`
  query Checkout {
    checkout {
      session
    }
  }
`;