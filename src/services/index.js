import { AuthService } from "./Auth";
import { StorageService } from "./Storage";
import { BookingService } from "./Booking";
import { ProfileService } from "./Profile";
import { RoomService } from "./Room";
import { UserService } from "./User";

// TODO: Pass the storage service to the services
const authService = AuthService();
const storageService = StorageService();
const bookingService = BookingService(storageService);
const profileService = ProfileService(storageService);
const roomService = RoomService(storageService);
const userService = UserService(storageService);

export {
  authService,
  storageService,
  bookingService,
  profileService,
  roomService,
  userService
};
