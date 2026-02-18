"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  getSubmissionsByEvent,
  approveSubmission,
  getPrintUsers,
} from "../../../../src/services/submission.service";

export default function EventAdminPage() {

  const { eventId } = useParams();

  const [tab, setTab] = useState("submissions");
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [approved, setApproved] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);


  const loadSubmissions = async () => {
    setLoading(true);
    const data = await getSubmissionsByEvent(eventId as string);
    setSubmissions(data);
    setLoading(false);
  };

  const loadApproved = async () => {
    const data = await getPrintUsers(eventId as string);
    setApproved(data);
  };

  useEffect(() => {
    loadSubmissions();
    loadApproved();
  }, []);

  const handleApprove = async (id: string) => {
    await approveSubmission(id);
    loadSubmissions();
    loadApproved();
  };

  return (
    <main className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        Event Management
      </h1>

      <div className="tabs tabs-boxed mb-6">
        <button
          className={`tab ${tab === "submissions" ? "tab-active" : ""}`}
          onClick={() => setTab("submissions")}
        >
          Submissions
        </button>

        <button
          className={`tab ${tab === "print" ? "tab-active" : ""}`}
          onClick={() => setTab("print")}
        >
          Print IDs
        </button>
      </div>

      {tab === "submissions" && (
        <div className="grid md:grid-cols-2 gap-4">

          {loading && <p>Loading...</p>}

          {submissions.map((s) => (
            <div key={s.id} className="card bg-base-100 shadow-md">
              <div className="card-body">

                <img
                  src={`http://localhost:3001/uploads/${s.photo}`}
                  className="w-24 h-24 object-cover rounded"
                />

                <h2 className="font-bold">{s.name}</h2>
                <p>{s.place}</p>
                <p>Blood: {s.blood_group}</p>
                <p>Contact: {s.contact}</p>
                <p>Status: {s.status}</p>

                {s.status !== "approved" && (
                  <button
                    className="btn btn-primary mt-2"
                    onClick={() => handleApprove(s.id)}
                  >
                    Approve
                  </button>
                )}

              </div>
            </div>
          ))}
        </div>
      )}

  
      {tab === "print" && (
        <div className="grid md:grid-cols-2 gap-4">

          {approved.map((u) => (
            <div key={u.id} className="card bg-base-100 shadow">

              <div className="card-body">
                <h3 className="font-bold">{u.name}</h3>

                <img
                  src={`http://localhost:3001/uploads/${u.photo}`}
                  className="w-24 h-24 rounded"
                />

                <p>{u.blood_group}</p>

                <button
                  className="btn btn-secondary mt-2"
                  onClick={() => window.print()}
                >
                  Print ID
                </button>
              </div>

            </div>
          ))}

        </div>
      )}

    </main>
  );
}
