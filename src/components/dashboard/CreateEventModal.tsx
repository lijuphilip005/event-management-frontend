"use client";

import { useState } from "react";
import { createEvent } from "../../services/event.service";

interface Props {
  onCreated: () => void;
}

export default function CreateEventModal({ onCreated }: Props) {

  const [form, setForm] = useState({
    name: "",
    date: "",
    details: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createEvent(form);
      alert("Event created");

      setForm({
        name: "",
        date: "",
        details: "",
      });

      onCreated();

      (document.getElementById("create_event_modal") as HTMLDialogElement)
        ?.close();

    } catch (err) {
      alert("Failed to create event");
    }
  };

  return (
    <dialog id="create_event_modal" className="modal">
      <div className="modal-box">

        <h3 className="font-bold text-lg mb-4">Create Event</h3>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Event Name"
            className="input input-bordered w-full"
          />

          <input
            name="date"
            value={form.date}
            onChange={handleChange}
            type="date"
            className="input input-bordered w-full"
          />

          <textarea
            name="details"
            value={form.details}
            onChange={handleChange}
            placeholder="Details"
            className="textarea textarea-bordered w-full"
          />

          <button className="btn btn-primary w-full">
            Create
          </button>

        </form>

      </div>
    </dialog>
  );
}
