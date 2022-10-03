const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    myPosts: [Post]
  }
  type Post {
    id: ID!
    userId: ID!
    title: String
    body: String
  }
  type Query {
    hello(name: String!): String
    users: [User]
    user(id: ID!): User
    posts: [Post]
  }
`;

const users = [
  { id: "1", name: "tanaka", email: "test@test.com" },
  { id: "2", name: "yoshida", email: "test@test.com" }
];

const resolvers = {
  Query: {
    hello: (parent, args) => {
      return `Hello World ${args.name}`;
    },
    users: async () => {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      return res.data;
    },
    user: async (parent, args) => {
      console.log(args);
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${args.id}`
      );
      return res.data;
    },
    posts: async (parent, args) => {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      return res.data;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
