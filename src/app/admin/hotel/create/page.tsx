'use client'
import { showToast } from "@/app/components/toast/toast"
import { api } from "@/lib/axios"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CreateHotelPage () {
    const [nama_hotel, setNama_hotel] = useState('')
    const [kota, setKota] = useState('')
    const [alamat, setAlamat] = useState('')

    const onSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        try {
            const res = await api.post('hotel/create', {
                nama_hotel,
                kota,
                alamat
              })
             showToast(res.data.message, 'success')
        } catch (error: any) {
            console.log(error)
        }
    }

    return (
        <div>
            <h4>Input Hotel</h4>
            <form onSubmit={onSubmit}>
            <div className="mb-3">
                <label className="form-label small fw-semibold">Nama Hotel</label>
                <input 
                type="text" 
                name="nama"
                className="form-control form-control-sm py-2"
                value={nama_hotel}
                onChange={(e) => setNama_hotel (e.target.value)}
                />
            </div>
             <div className="mb-3">
                <label className="form-label small fw-semibold">kota</label>
                <input 
                type="text" 
                name="kota"
                className="form-control form-control-sm py-2"
                value={kota}
                onChange={(e) => setKota (e.target.value)}
                />
            </div>
             <div className="mb-3">
                <label className="form-label small fw-semibold">alamat</label>
                <input 
                type="text" 
                name="alamat"
                className="form-control form-control-sm py-2"
                value={alamat}
                onChange={(e) => setAlamat (e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Save
                </button>
            </form>
        </div>
    )
}