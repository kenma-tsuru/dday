import { useState, useEffect } from 'react';
import Head from 'next/head';
import DashboardItem from '../components/DashboardItem';
import { Event, saveEvents, loadEvents, addEvent, removeEvent } from '../utils/storage';

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    loadEvents().then(setEvents);
  }, []);

  const addEventHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent = addEvent(title, date);
    const newEvents = [...events, newEvent];
    setEvents(newEvents);
    await saveEvents(newEvents);
    setTitle('');
    setDate('');
  };

  const removeEventHandler = async (id: string) => {
    const updatedEvents = removeEvent(events, id);
    setEvents(updatedEvents);
    await saveEvents(updatedEvents);
  };

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>D-Day Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-3xl font-bold mb-4">D-Day Dashboard</h1>

      <form onSubmit={addEventHandler} className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Event Title"
          className="border p-2 mr-2"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 mr-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Event
        </button>
      </form>

      {events.map((event) => (
        <DashboardItem
          key={event.id}
          id={event.id}
          title={event.title}
          date={event.date}
          creationDate={event.creationDate}
          onRemove={removeEventHandler}
        />
      ))}
    </div>
  );
}
