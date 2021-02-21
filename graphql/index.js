import { gql } from "apollo-server-express";
import user from "./user";
import hotel from "./hotel";
import booking from "./booking";



const resolvers = [
  user.resolvers,
  hotel.resolvers,
  booking.resolvers,  
 
];

const typeDefs = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

 
  ${user.typeDefs}
  ${hotel.typeDefs}
  ${booking.typeDefs}  

`;

module.exports = {
  resolvers,
  typeDefs,
};
