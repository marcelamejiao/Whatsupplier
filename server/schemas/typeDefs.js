const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    companyName: String
    companyDetails: String
    isTrial: Boolean
    userMaterials: [userMaterialsSchema]
  }

  type userMaterialsSchema {
    material: Material
    stock: Int
    safetyStock: Int
    anticipatedDemand: Int
  }

  type Supplier {
    _id: ID
    name: String
    email: String
    address: String
    phone: String
    user: User
    supplierMaterials: [supplierMaterialsSchema]
  }

  type supplierMaterialsSchema {
    material: Material
    cost: Float
    leadTime: Int
  }

  type Material {
    _id: ID!
    name: String!
  }

  type Checkout {
    session: ID!
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    suppliers: [Supplier]
    supplier(_id: ID!): Supplier
    materials: [Material]
    me: User
    cheapestSupplier(materialId: ID!): Supplier
    reorderPoint(supplierId: ID!, materialId: ID!): Int
    checkout: Checkout
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, companyName: String!, companyDetails: String!): Auth
    login(email: String!, password: String!): Auth
    addSupplier(name: String!, email: String!, address: String!, phone: String!): Supplier
    updateSupplier(_id: ID!, name: String! email: String! address: String! phone: String!): Supplier
    deleteSupplier(_id: ID!): Supplier
    updateUserMaterial(_id: ID! stock:Int! safetyStock:Int! anticipatedDemand:Int!): User
    updateSupplierMaterial(_id: ID!, materialId: ID!, cost: Float!, leadTime: Int!): Supplier
    placeOrder(units: Int!, materialId: ID!, supplierId: ID!): User
    upgradeAccount(sessionId: ID!): User
  }
`;

module.exports = typeDefs;