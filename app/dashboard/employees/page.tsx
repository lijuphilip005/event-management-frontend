"use client";

import { useEffect, useState } from "react";
import {getEmployees, toggleEmployeeStatus,} from "../../../src/services/users.service";

export default function EmployeesPage() {

  const [employees, setEmployees] = useState<any[]>([]);

  const loadEmployees = async () => {
    const data = await getEmployees();
    setEmployees(data);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleToggle = async (id: string) => {
    await toggleEmployeeStatus(id);
    loadEmployees();
  };

  return (
    <main className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Manage Employees
      </h1>

      <div className="grid md:grid-cols-2 gap-4">

        {employees.map((e) => (
          <div key={e.id} className="card bg-base-100 shadow">

            <div className="card-body">

              <h2 className="font-bold">{e.name}</h2>
              <p>{e.email}</p>

              <div className="mt-2">
                Status:
                <span
                  className={`ml-2 badge ${
                    e.isActive
                      ? "badge-success"
                      : "badge-error"
                  }`}
                >
                  {e.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              <button
                className={`btn mt-3 ${
                  e.isActive ? "btn-error" : "btn-success"
                }`}
                onClick={() => handleToggle(e.id)}
              >
                {e.isActive ? "Block" : "Unblock"}
              </button>

            </div>

          </div>
        ))}

      </div>

    </main>
  );
}
