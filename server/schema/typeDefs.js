const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User{
    _id: ID
    username: String
    email: String
    password: String
    userMaterials: [userMaterialsSchema]
  }

  type userMaterialsSchema{
    material: Material
    stock: Int
    safetyStock: Int
    anticipatedDemand: Int
  }

  type Supplier{
    _id: ID
    name: String
    email: String
    address: String
    phone: String
    user: User
    supplierMaterials: [supplierMaterialsSchema]
  }

  type supplierMaterialsSchema{
    material: Material
    cost: Float
    leadTime: Int
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    suppliers: Supplier
    supplier(_id: ID!): Supplier
    userMaterials: [userMaterialsSchema]
    userMaterial(_id: ID!): [userMaterialsSchema]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addSupplier(name: String!, email: String!, address: String!, phone: String!): Supplier
    updateSupplier(name: String! email: String! address: String! phone: String!): Supplier
    deleteSupplier(_id: ID!):Supplier
    updateUserMaterial(name: String! stock:Int! safetyStock:Int! anticipatedDemand:Int!): User
  }
`;

module.exports = typeDefs;