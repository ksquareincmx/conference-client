const userServiceURI = `${process.env.REACT_APP_SERVER_URI}Users/`;
const profileServiceURI = `${process.env.REACT_APP_SERVER_URI}Profiles/`;
const bookingServiceURI = `${process.env.REACT_APP_SERVER_URI}Bookings/`;
const roomServiceURI = `${process.env.REACT_APP_SERVER_URI}Rooms/`;
const googleAuthURI = `${process.env.REACT_APP_SERVER_URI}Users/google/oauth20`;

export const servicesRoutes = {
  // token
  logInWithGoogle: {
    getServiceURI: config => googleAuthURI
  },
  // User
  createUser: {
    getServiceURI: config => userServiceURI
  },
  getUserById: {
    getServiceURI: ({ id }) => `${userServiceURI}${id}`
  },
  updateUserById: {
    getServiceURI: ({ id }) => `${userServiceURI}${id}`
  },
  deleteUserById: {
    getServiceURI: ({ id }) => `${userServiceURI}${id}`
  },
  // Profile
  createProfile: {
    getServiceURI: config => profileServiceURI
  },
  getProfileById: {
    getServiceURI: ({ id }) => `${profileServiceURI}${id}`
  },
  getAllProfiles: {
    getServiceURI: config => profileServiceURI
  },
  updateProfileById: {
    getServiceURI: ({ id }) => `${profileServiceURI}${id}`
  },
  deleteProfileById: {
    getServiceURI: ({ id }) => `${profileServiceURI}${id}`
  },
  // Room
  createRoom: {
    getServiceURI: config => roomServiceURI
  },
  getRoomById: {
    getServiceURI: ({ id }) =>
      `${roomServiceURI}${id}/bookings?filter[include]=user&filter[include]=room`
  },
  getAllRooms: {
    getServiceURI: config => roomServiceURI
  },
  updateRoomById: {
    getServiceURI: ({ id }) => `${roomServiceURI}${id}`
  },
  deleteRoomById: {
    getServiceURI: ({ id }) => `${roomServiceURI}${id}`
  },
  // Booking
  createBooking: {
    getServiceURI: config => `${bookingServiceURI}`
  },
  getBookingById: {
    getServiceURI: ({ id }) =>
      `${bookingServiceURI}${id}?filter[include]=user&filter[include]=room`
  },
  getAllBookings: {
    getServiceURI: config => bookingServiceURI
  },
  getDetailedBookings: {
    getServiceURI: ({ filterDate }) => {
      const query = `?page=1&pageSize=500&order=start ASC&start[gte]=${filterDate}&filter[include]=user&filter[include]=room`;
      return `${bookingServiceURI}${query}`;
    }
  },
  getDetailedBookingsByRoom: {
    getServiceURI: ({ filterDate, roomId }) => {
      const query = `?page=1&pageSize=500&order=start ASC&start[gte]=${filterDate}&roomId[eq]=${roomId}&filter[include]=user&filter[include]=room`;
      return `${bookingServiceURI}${query}`;
    }
  },
  updateBookingById: {
    getServiceURI: ({ id }) => `${bookingServiceURI}${id}`
  },
  deleteBookingById: {
    getServiceURI: ({ id }) => `${bookingServiceURI}${id}`
  }
};
