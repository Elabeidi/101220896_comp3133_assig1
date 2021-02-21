import { Hotel } from "../models";

import { gql } from "apollo-server-express";


const HotelService = {
  getAllHotels: () => {
    return Hotel.find({});
  },

  getHotelById: (id) => {
    return Hotel.findById(id);
  },

 
  hotelByName: (name) => {
    return Hotel.find({ name: name });
  },
  hotelByCity: (city) => {
    return Hotel.find({ city: city });
  },

  addHotel: async (
    {
      hotel_name,
      street,
      city ,
      postal_code,
      price,
      email,
      user,
     
    }
  
  ) => {
    let hotel;

  
      hotel = new Hotel({
        hotel_name,
        street,
        city ,
        postal_code,
        price,
        email,
        user,
      });
   

    


    return hotel.save();
  },

  
  

  
};

module.exports = {
  



resolvers : {
  Query: {
    hotels: (_, args) => {
    
      return HotelService.getAllHotels();
    },
    hotel: (_, { id }) => {
      return HotelService.getHotelById(id);
    },  
    hotelByName: (_, { name }) => {
      return HotelService.hotelByName(name);
    },
    hotelByCity: (_, { city }) => {
      return HotelService.hotelByCity(city);
    },

  },
  Mutation: {
    addHotel: (
      _,
      {
        hotel_name,
    street,
    city,
    postal_code,
    price,
    email,
    user
      },
     
    ) => {
      return HotelService.addHotel(
        {
          hotel_name,
    street,
    city,
    postal_code,
    price,
    email,
    user
        },
      );
    },
    
  },
  Hotel: {
    user: async (_, args, ) => {
      return (await _.populate("user").execPopulate()).user;
    },
  },
}


,

 typeDefs :gql`
  type Hotel {
    id: ID
    hotel_name: String
    street: String
    city: String
    postal_code: String
    price: Int
    email: String
    user: User
  }

  extend type Query {
    hotel(id: ID!): Hotel
    hotels: [Hotel]
    hotelByName(hotel_name: String): [Hotel]
    hotelByCity(city: String): [Hotel]
  }

  extend type Mutation {
    addHotel(
      hotel_name: String!
      street: String!
      city: String!
      postal_code: String!
      price: Int!
      email: String!
      user: ID!
    ): Hotel

    
  }
`

};
