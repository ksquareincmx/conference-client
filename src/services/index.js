import { AuthService } from "./AuthService";
import { StorageService } from "./StorageService";
import { BookingService } from "./BookingService";
import { ProfileService } from "./ProfileService";
import { RoomService } from "./RoomService";
import { UserService } from "./UserService";

// TODO: Pass the storage service to the services
const authService = AuthService();
const storageService = StorageService();
const bookingService = BookingService();
const profileService = ProfileService();
const roomService = RoomService();
const userService = UserService();

export {
  authService,
  storageService,
  bookingService,
  profileService,
  roomService,
  userService
};
