const { v4: uuidv4 } = require('uuid');

let products = [];
let orders = [];

const resolvers = {
  Query: {
    getProduct: (_, { id }) => products.find((product) => product.id === id),
    getAllProducts: () => products,
    getOrder: (_, { id }) => {
      const order = orders.find((order) => order.id === id);
      order.products = products.filter((product) => order.productIds.includes(product.id));
      return order;
    },
    getAllOrders: () => orders,
  },

  Mutation: {
    createProduct: (_, { name, description, price, quantity }) => {
      const newProduct = { id: uuidv4(), name, description, price, quantity };
      products.push(newProduct);
      return newProduct;
    },
    updateProduct: (_, { id, name, description, price, quantity }) => {
      const productIndex = products.findIndex((product) => product.id === id);
      if (productIndex === -1) throw new Error('Product not found');
      const updatedProduct = { ...products[productIndex], name, description, price, quantity };
      products[productIndex] = updatedProduct;
      return updatedProduct;
    },
    deleteProduct: (_, { id }) => {
      const productIndex = products.findIndex((product) => product.id === id);
      if (productIndex === -1) return false;
      products.splice(productIndex, 1);
      return true;
    },
    createOrder: (_, { productIds }) => {
      const newOrder = { id: uuidv4(), productIds, total: 0, status: 'PENDING', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      newOrder.products = products.filter((product) => productIds.includes(product.id));
      newOrder.total = newOrder.products.reduce((sum, product) => sum + product.price, 0);
      orders.push(newOrder);
      return newOrder;
    },
    updateOrder: (_, { id, productIds, status }) => {
      const orderIndex = orders.findIndex((order) => order.id === id);
      if (orderIndex === -1) throw new Error('Order not found');
      const updatedOrder = { ...orders[orderIndex], productIds, status, updatedAt: new Date().toISOString() };
      updatedOrder.products = products.filter((product) => productIds.includes(product.id));
      updatedOrder.total = updatedOrder.products.reduce((sum, product) => sum + product.price, 0);
      orders[orderIndex] = updatedOrder;
      return updatedOrder;
    },
    deleteOrder: (_, { id }) => {
      const orderIndex = orders.findIndex((order) => order.id === id);
      if (orderIndex === -1) return false;
      orders.splice(orderIndex, 1);
      return true;
    },
  },

  Order: {
    products: (order) => products.filter((product) => order.productIds.includes(product.id)),
  },
};

module.exports = resolvers;