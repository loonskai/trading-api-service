import { makeExecutableSchema } from "@graphql-tools/schema";

const typeDefs = `
  type User {
    id: Int!
  }

  type Query {
    user(id: Int!): User
  }

  type Subscription {
    hello: String
  }
`;

const resolvers = {
  Query: {
    user() {
      return null;
    },
  },
  Subscription: {
    hello: {
      subscribe: async function* () {
        for await (const word of ["Hello", "Bonjour", "Ciao"]) {
          yield word;
        }
      },
    },
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
