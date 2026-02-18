"use client";

import Link from "next/link";

interface Props {
  role: string;
}

export default function Sidebar({ role }: Props) {
  return (
    <aside className="w-64 bg-base-200 min-h-screen p-4">

      <h2 className="text-xl font-bold mb-6">Dashboard</h2>

      <ul className="menu bg-base-200 rounded-box">

        <li>
          <Link href="/dashboard">Events</Link>
        </li>

        <li>
          <Link href="/dashboard/submissions">Submissions</Link>
        </li>

        {/* <li>
          <Link href="/dashboard/print">Print IDs</Link>
        </li> */}

        {role === "admin" && (
          <li>
            <Link href="/dashboard/employees">Employees</Link>
          </li>
        )}

      </ul>
    </aside>
  );
}
