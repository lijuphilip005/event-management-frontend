"use client";

import Link from "next/link";
import { useState } from "react";
import { registerUser } from "../../src/services/auth.service";

export default function RegisterPage() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await registerUser(form);
      console.log("REGISTER SUCCESS =>", res);
      alert("Registered successfully");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-base-200">

      <div className="card w-full max-w-md shadow-2xl bg-base-100">
        <div className="card-body">

          <h1 className="text-2xl font-bold text-center mb-4">
            Create Account
          </h1>

          <form className="space-y-4" onSubmit={handleSubmit}>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              placeholder="Name"
              className="input input-bordered w-full"
              autoComplete="new-password"
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
            />

            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
            />

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>

            <button className="btn btn-primary w-full">
              Register
            </button>

          </form>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link href="/" className="link link-primary">
              Login
            </Link>
          </p>

        </div>
      </div>

    </main>
  );
}
