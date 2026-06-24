'use client'

import { showToast } from "@/app/components/toast/toast"
import { api } from "@/lib/axios";
import { IUser } from "@/proxy";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LoginPage() {

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const onLogin =async (e: React.SubmitEvent) => {
    e.preventDefault()
    try {
      const res = await api.post('user/login', {
        name,
        password
      }, {
        withCredentials: true
      })

      showToast(res.data.message, 'success')
      const data = res.data.data as IUser
      router.push(`/${data.name.toLocaleLowerCase()}`)
    } catch (error: any) {
      showToast(error.response.data.message, 'danger')
    }
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div
        className="card border-0 shadow"
        style={{ width: "100%", maxWidth: "400px", borderRadius: "12px" }}
      >
        <div className="card-body p-4 p-md-5">
          <div className="d-flex align-items-center justify-content-center flex-column">
            <h5 className="fw-bold mb-1">Selamat datang</h5>
            <p className="text-muted small mb-4">Masuk ke Admin</p>
          </div>

          <form onSubmit={onLogin}>
            <div className="mb-3">
              <label className="form-label small fw-semibold">name</label>
              <input
                type="text"
                name="name"
                className="form-control form-control-sm py-2"
                placeholder="masukan name Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="form-label small fw-semibold">Password</label>
              <input
                type="password"
                name="password"
                className="form-control form-control-sm py-2"
                placeholder="Masukan Password"
                 value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn w-100 py-2 text-white fw-semibold"
              style={{ background: "#1e2a3a", borderRadius: "8px" }}
            >
              Masuk
            </button>
          </form>

          <p className="text-center text-muted small mt-4 mb-0">
            Belum punya akun?
          </p>
          <Link href={'/register'}>
          <button
              type="submit"
              className="btn w-100 py-2 text-white fw-semibold"
              style={{ background: "#1e2a3a", borderRadius: "8px" }}
            >
              Daftar
            </button>
            </Link>
        </div>
      </div>
    </div>
  );
}