import { API_URL } from './config';
import axios from 'axios';

export interface Event {
  id: string; // Add an id field for easier removal
  title: string;
  date: string;
  creationDate: string;
}

export async function saveEvents(events: Event[]): Promise<void> {
  await axios.post(`${API_URL}/events`, events);
}

export async function loadEvents(): Promise<Event[]> {
  const response = await axios.get(`${API_URL}/events`);
  return response.data;
}

export function addEvent(title: string, date: string): Event {
  return {
    id: Date.now().toString(), // Use timestamp as a simple unique id
    title,
    date,
    creationDate: new Date().toISOString(),
  };
}

export function removeEvent(events: Event[], id: string): Event[] {
  return events.filter(event => event.id !== id);
}
