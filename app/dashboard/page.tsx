"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Sidebar from "../../src/components/dashboard/Sidebar";
import { getEvents } from "../../src/services/event.service";
import CreateEventModal from "../../src/components/dashboard/CreateEventModal";

interface EventType {
  id: string;
  name: string;
  date?: string;
}

export default function Dashboard() {
  const [role, setRole] = useState("");
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      const parsed = JSON.parse(user);
      setRole(parsed.role);
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        setError("Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await getEvents();
      setEvents(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-base-200 flex">
      <div className="hidden md:block">
        <Sidebar role={role} />
      </div>

      <section className="flex-1 p-4 md:p-8">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Welcome {role}</h1>
          <p className="text-sm text-gray-500">Manage events and submissions</p>
        </div>

        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Events</h2>

              <button
                className="btn btn-primary btn-sm"
                onClick={() => (document.getElementById("create_event_modal") as HTMLDialogElement)?.showModal()}
              >
                Create Event
              </button>
            </div>

            {loading && <p className="text-sm text-gray-500">Loading events...</p>}

            {error && <p className="text-error">{error}</p>}

            {!loading && events.length === 0 && <p className="text-gray-500">No events found</p>}

            <div className="grid gap-3">
              {events.map((event) => (
                <div key={event.id} className="border rounded-xl p-4 hover:bg-base-200 transition">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">{event.name}</h3>
                      {event.date && <p className="text-sm text-gray-500">{event.date}</p>}
                    </div>

                    <Link href={`/event/${event.id}`} className="btn btn-sm btn-outline">
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CreateEventModal onCreated={loadEvents} />
    </main>
  );
}
