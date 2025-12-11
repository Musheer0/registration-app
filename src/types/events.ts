export interface Event {
  id: string
  creator_id: string
  eventName: string
  description: string
  venue: string
  time: string | null
  eventStartTime: string
  eventEndTime: string
  dateOfEvent: string
  maxParticipants: number
  registrationEnd: string
  clubName: string
  eventPoster: string
  logo: string
  googleFormLink: string
  createdAt: string
  updatedAt: string
}
