"use client";
import Link from "next/link";

import { useEffect, useState } from "react";
import { getAllSubmissions, approveSubmission } from "../../../src/services/submission.service";
import Sidebar from "@/src/components/dashboard/Sidebar";

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsed = JSON.parse(user);
      setRole(parsed.role);
    }
  }, []);

  const loadData = async () => {
    setLoading(true);
    const data = await getAllSubmissions();
    setSubmissions(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApprove = async (id: string) => {
    await approveSubmission(id);
    loadData();
  };

  return (
   <main className="p-6">
  <h1 className="text-2xl font-bold mb-4">Submissions Review</h1>

  <div className="flex gap-6 items-start">

    <div className="hidden md:block w-64">
      <Sidebar role={role} />
    </div>

    <div className="flex-1">
      {loading && <p>Loading...</p>}

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="table w-full bg-base-100 border-separate border-spacing-y-6">
          <thead>
            <tr className="bg-base-200 text-base-content">
              <th className="w-12 text-center">#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Place</th>
              <th>Blood Group</th>
              <th>Status</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {submissions.map((s, index) => (
              <tr key={s.id} className="bg-base-100 shadow-sm rounded-lg">
                <td className="text-center text-sm text-gray-400 rounded-l-lg">
                  {index + 1}
                </td>

                <td className="py-4">
                  <img
                    src={`http://localhost:3001/uploads/${s.photo}`}
                    style={{
                      width: "150px",
                      height: "150px",
                      minWidth: "150px",
                      minHeight: "150px",
                      margin: "10px",
                    }}
                    className="rounded-lg object-cover"
                  />
                </td>

                <td className="font-semibold">{s.name}</td>
                <td className="text-sm text-gray-500">{s.place}</td>

                <td>
                  <span className="badge badge-outline font-bold">
                    {s.blood_group}
                  </span>
                </td>

                <td>
                  {s.status === "approved" ? (
                    <span className="badge badge-success text-white font-semibold px-3 py-2">
                      ✓ Approved
                    </span>
                  ) : (
                    <span className="badge badge-warning text-white font-semibold px-3 py-2">
                      Pending
                    </span>
                  )}
                </td>

                <td className="text-right rounded-r-lg">
                  {s.status !== "approved" ? (
                    <button
                      className="btn btn-primary mt-2"
                      onClick={() => handleApprove(s.id)}
                    >
                      Approve
                    </button>
                  ) : (
                    <Link
                      href={`/dashboard/event/${s.event.id}/id-card`}
                      className="btn btn-secondary mt-2"
                    >
                      Print ID
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  </div>
</main>

  );
}
