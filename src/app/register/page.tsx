'use client'

import { showToast } from "@/app/components/toast/toast";
import { api } from "@/lib/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useState } from "react";

export default function RegisterPage() {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [no_hp, setNo_hp] = useState('')
    const [email, setEmail] = useState('')
    const [alamat, setAlamat] = useState('')
    const router = useRouter()
    const onSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()

        try {
          const res = await api.post('user/register', {
            name,
            password,
            no_hp,
            email,
            alamat
            
          })
          showToast(res.data.message, 'success')
          router.push('/')
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
            <h5 className="fw-bold mb-1">Register</h5>
            <p className="text-muted small mb-4">Daftarkan akun anda</p>
          </div>

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label small fw-semibold">name</label>
              <input
                type="text"
                name="name"
                className="form-control form-control-sm py-2"
                placeholder="Masukan name Anda"
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

             <div className="mb-3">
              <label className="form-label small fw-semibold">Nomor Telepon</label>
              <input
                type="text"
                name="no_hp"
                className="form-control form-control-sm py-2"
                placeholder="Masukan No Telp"
                 value={no_hp}
                onChange={(e) => setNo_hp(e.target.value)}
              />
            </div>
             <div className="mb-3">
              <label className="form-label small fw-semibold">Email</label>
              <input
                type="text"
                name="email"
                className="form-control form-control-sm py-2"
                placeholder="Masukan Email"
                 value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
             <div className="mb-3">
              <label className="form-label small fw-semibold">Alamat</label>
              <input
                type="text"
                name="alamat"
                className="form-control form-control-sm py-2"
                placeholder="Masukan Alamat"
                 value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn w-100 py-2 text-white fw-semibold"
              style={{ background: "#1e2a3a", borderRadius: "8px" }}
            >
              Daftar
            </button>
          </form>

          <p className="text-center text-muted small mt-4 mb-0">
            Sudah punya akun?
          </p>
          <Link href={'/'}>
          <button
              type="submit"
              className="btn w-100 py-2 text-white fw-semibold"
              style={{ background: "#1e2a3a", borderRadius: "8px" }}
            >
              Log In
            </button>
            </Link>
        </div>
      </div>
    </div>
  );
}