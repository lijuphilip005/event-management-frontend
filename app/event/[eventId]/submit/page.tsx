"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { submitEventForm } from "../../../../src/services/submission.service";

export default function SubmitPage() {

  const params = useParams();
  const eventId = params.eventId as string;

  const [form, setForm] = useState({
    name: "",
    place: "",
    blood_group: "",
    contact: "",
  });

  const [photo, setPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!photo) {
      alert("Photo required");
      return;
    }

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("place", form.place);
    formData.append("blood_group", form.blood_group);
    formData.append("contact", form.contact);
    formData.append("photo", photo);

    try {
      setLoading(true);

      await submitEventForm(eventId, formData);

      alert("Submitted successfully!");

      setForm({
        name: "",
        place: "",
        blood_group: "",
        contact: "",
      });

      setPhoto(null);

    } catch (err) {
      alert("Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-base-200 flex items-center justify-center p-4">

      <div className="card w-full max-w-lg bg-base-100 shadow-xl">
        <div className="card-body">

          <h1 className="text-2xl font-bold text-center mb-4">
            Event Registration
          </h1>

          <form onSubmit={handleSubmit} className="space-y-3">

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              className="input input-bordered w-full"
            />

            <input
              name="place"
              value={form.place}
              onChange={handleChange}
              placeholder="Place"
              className="input input-bordered w-full"
            />

            <input
              name="blood_group"
              value={form.blood_group}
              onChange={handleChange}
              placeholder="Blood Group"
              className="input input-bordered w-full"
            />

            <input
              name="contact"
              value={form.contact}
              onChange={handleChange}
              placeholder="Contact Number"
              className="input input-bordered w-full"
            />

            <input
              type="file"
              className="file-input file-input-bordered w-full"
              onChange={(e) =>
                setPhoto(e.target.files?.[0] || null)
              }
            />

            <button
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>

          </form>

        </div>
      </div>

    </main>
  );
}
