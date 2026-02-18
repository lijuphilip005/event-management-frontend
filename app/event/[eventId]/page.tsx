"use client";

import { useParams } from "next/navigation";

export default function EventDetailPage() {

  const params = useParams();
  const eventId = params.eventId as string;

  const submitLink =
    `${window.location.origin}/event/${eventId}/submit`;

const copyLink = async () => {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(submitLink);
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = submitLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }

    alert("Link copied!");
  } catch (err) {
    alert("Failed to copy link");
  }
};

  return (
    <main className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        Event Details
      </h1>

      <div className="card bg-base-100 shadow-md">
        <div className="card-body">

          <h2 className="text-lg font-semibold mb-2">
            Submission Link
          </h2>

          <div className="flex flex-col md:flex-row gap-3">

            <input
              value={submitLink}
              readOnly
              className="input input-bordered w-full"
            />

            <button
              className="btn btn-primary"
              onClick={copyLink}
            >
              Copy Link
            </button>

          </div>

          <p className="text-sm text-gray-500 mt-2">
            Share this link with users to collect data.
          </p>

        </div>
      </div>

    </main>
  );
}
