import Booking from "../models"
import { gql } from "apollo-server-express";


const BookingService = {
  getAllBookings: () => {
    return Booking.find({});
  },

  getBookingById: (id) => {
    return Booking.findById(id);
  },

 
  bookingsByUser: (user) => {
    return Booking.find({ user: user });
  },

  addBooking: async (
    {
      hotel,
       booking_date,
      booking_start,
      booking_end,
      user
     
    }
  
  ) => {
    let booking;

  
      booking = new Booking({
        hotel,
        booking_date,
        booking_start,
        booking_end,
        user
      });
   

    
   


    return booking.save();
  },

  
  

  
};

module.exports = {
  resolvers : {
    Query: {
      bookings: (_, args) => {
      
        return BookingService.getAllBookings();
      },
      booking: (_, { id }) => {
        return BookingService.getBookingById(id);
      },  
      bookingsByUser: (_, { user }) => {
        return BookingService.bookingsByUser(user);
      },
  
    },
    Mutation: {
      addBooking: (
        _,
        {
          hotel,
          booking_date,
          booking_start,
          booking_end,
          user
        },
       
      ) => {
  
        return BookingService.addBooking(
          {
            hotel,
            booking_date,
        booking_start,
        booking_end,
        user
          },
        );
      },
    
    },
    Booking: {
      user: async (_, args, ) => {
        return (await _.populate("user").execPopulate()).user;
      },
      hotel: async (_, args, ) => {
        return (await _.populate("hotel").execPopulate()).hotel;
      },
    },
  },
  

 typeDefs : gql`
  type Booking {
    id: ID
    hotel: Hotel
    booking_date: String
    booking_start: String
    booking_end: String
    user: User
  }

  extend type Query {
    booking(id: ID!): Booking
    bookingsByUser(user: ID!): [Booking]
    bookings: [Booking]
  }

  extend type Mutation {
    addBooking(
      hotel: ID!
      booking_date: String!
      booking_start: String!
      booking_end: String!
      user: ID!
    ): Booking

   
  }
`



};
