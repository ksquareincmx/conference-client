const userServiceURI = `${process.env.REACT_APP_SERVER_URI}User/`;
const profileServiceURI = `${process.env.REACT_APP_SERVER_URI}Profile/`;
const bookingServiceURI = `${process.env.REACT_APP_SERVER_URI}Booking/`;
const roomServiceURI = `${process.env.REACT_APP_SERVER_URI}Room/`;

export const servicesRoutes = {
  // User
  createUser: {
    getServiceURI: config => `${userServiceURI}`
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
    getServiceURI: config => `${profileServiceURI}`
  },
  getProfileById: {
    getServiceURI: ({ id }) => `${profileServiceURI}${id}`
  },
  getAllProfiles: {
    getServiceURI: config => `${profileServiceURI}`
  },
  updateProfileById: {
    getServiceURI: ({ id }) => `${profileServiceURI}${id}`
  },
  deleteProfileById: {
    getServiceURI: ({ id }) => `${profileServiceURI}${id}`
  },
  // Room
  createRoom: {
    getServiceURI: config => `${roomServiceURI}`
  },
  getRoomById: {
    getServiceURI: ({ id }) => `${roomServiceURI}${id}`
  },
  getAllRooms: {
    getServiceURI: config => `${roomServiceURI}`
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
    getServiceURI: ({ id }) => `${bookingServiceURI}${id}`
  },
  getAllBookings: {
    getServiceURI: config => `${bookingServiceURI}`
  },
  getDetailedBookings: {
    getServiceURI: ({ filterDate }) => {
      const query = `?page=1&pageSize=500&order=start ASC&start[gte]=${filterDate}`;
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
