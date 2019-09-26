import { IRoomDto } from "./RoomDto";

export interface IBookingDto {
  description: string;
  start: string;
  end: string;
  event_id?: string;
  attendees: string[];
  location?: string;
  guests: number;
  id?: number;
  room_id: number;
  user_id: number;
}
