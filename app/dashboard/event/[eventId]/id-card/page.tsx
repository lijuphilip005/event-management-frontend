
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPrintUsers } from "../../../../../src/services/submission.service";

export default function IdCardPage() {
  const { eventId } = useParams();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadApproved = async () => {
    setLoading(true);
    const data = await getPrintUsers(eventId as string);
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    loadApproved();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Approved ID Cards</h1>
        <button className="btn btn-primary" onClick={handlePrint}>
          Print All
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {!loading && users.length === 0 && <p>No approved submissions</p>}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((u) => (
          <div
            key={u.id}
            style={{ width: "256px", height: "380px", position: "relative", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.15)", border: "1px solid #e5e7eb" }}
          >
          
            <img
              src="/id_car_bg_image.png"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              alt=""
            />

           
            <img
              src={`http://localhost:3001/uploads/${u.photo}`}
              style={{
                position: "absolute",
                top: "33%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "110px",
                height: "110px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid white",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              }}
              alt={u.name}
            />

            {/* DETAILS — bottom white strip */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                textAlign: "center",
                padding: "12px 8px 16px",
                color: "#111",
              }}
            >
              <h2 style={{ fontSize: "18px", fontWeight: "700", margin: "0 0 4px" }}>{u.name}</h2>
              <p style={{ fontSize: "13px", margin: "0 0 2px" }}>Place: {u.place}</p>
              <p style={{ fontSize: "13px", margin: 0 }}>Blood Group: {u.blood_group}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}