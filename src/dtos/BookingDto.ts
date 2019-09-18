export interface IBookingDto {
  description: string;
  start: Date;
  end: Date;
  event_id?: string;
  attendees: string[];
  location?: string;
  guests: number;
  id?: number;
  room_id: number;
  user_id: number;
}
