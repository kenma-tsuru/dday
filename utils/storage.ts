export interface Event {
  id: string; // Add an id field for easier removal
  title: string;
  date: string;
  creationDate: string;
}

export function saveEvents(events: Event[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('events', JSON.stringify(events));
  }
}

export function loadEvents(): Event[] {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('events');
    return data ? JSON.parse(data) : [];
  }
  return [];
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
