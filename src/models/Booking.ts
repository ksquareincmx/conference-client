export interface IBooking {
  description: string;
  start: Date;
  end: Date;
  eventId?: string;
  attendees: string[];
  location?: string;
  guests: number;
  id?: number;
  roomId: number;
  userId: number;
}
