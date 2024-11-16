const { gql } = require('apollo-server-express');

const schema = gql`
  type Product {
    id: ID!
    name: String!
    description: String
    price: Float!
    quantity: Int!
  }

  type Order {
    id: ID!
    products: [Product!]!
    total: Float!
    status: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    getProduct(id: ID!): Product
    getAllProducts: [Product!]!
    getOrder(id: ID!): Order
    getAllOrders: [Order!]!
  }

  type Mutation {
    createProduct(name: String!, description: String, price: Float!, quantity: Int!): Product!
    updateProduct(id: ID!, name: String, description: String, price: Float, quantity: Int): Product!
    deleteProduct(id: ID!): Boolean!
    createOrder(productIds: [ID!]!): Order!
    updateOrder(id: ID!, productIds: [ID!], status: String): Order!
    deleteOrder(id: ID!): Boolean!
  }
`;

module.exports = schema;