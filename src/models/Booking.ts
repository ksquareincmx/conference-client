import { IRoom } from "./Room";

export interface IBooking {
  description: string;
  start: string;
  end: string;
  eventId?: string;
  attendees: string[];
  location?: string;
  guests: number;
  id?: number;
  roomId: number;
  userId: number;
  room: IRoom;
}
