import { gql } from "apollo-server-express";
import { User } from "../models";
import { hash } from "bcryptjs";


const UserService = {
  getAllUsers: () => {
    return User.find({});
  },

  getUserById: (id) => {
    return User.findById(id);
  },

  addUser: async (
    {
      username,
      password,
      email,
      
    }
  ) => {
    let user;

  
      user = new User({
        username,
      password,
      email,
      });
   

    

    if (user.password) {
      const hashedPassword = await hash(user.password, 12);
      user.password = hashedPassword;
    }
    return user.save();
  },

  
     
 

};


 

module.exports = {
  resolvers : {
    Query: {
      users: (_, args) => {
  
        return UserService.getAllUsers();
      },
      user: (_, { id }) => {
       
        return UserService.getUserById(id);
      },
    },
    Mutation: {
      addUser: (
        _,
        {
          username,
          password,
          email,
        }
      ) => {
        return UserService.addUser(
          {
            username,
            password,
            email,
          }
        );
      },
     
    },
    
  },
  

 typeDefs : gql`
  type User {
    id: ID
    username: String
    password: String
    email: String
  }

  extend type Query {
    user(id: ID!): User
    users: [User]

  }

  extend type Mutation {
    addUser(
      username: String!
      password: String!
      email: String!
    ): User

  }
`



};
