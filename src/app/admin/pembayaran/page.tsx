'use client'
import { api, baseURL } from "@/lib/axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import { IPemesanan } from "../pemesanan/page"
import { showToast } from "@/app/components/toast/toast"

export interface IPembayaran {
    id_pembayaran: number
    metode: string
    tanggal_bayar: string
    jumlah_bayar: string
    pemesananID: number
    pemesanan: IPemesanan
  
}

export default function Adminpembayaranpage () {
    const [pembayarans, setpembayarans] = useState<IPembayaran[]>([])

    const getData = async () => {
        try {
            const res = await api.get('pembayaran/getALL')
            setpembayarans(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const deleteData = async (id: number) => {
                    const isAgree = confirm('Are you sure')
            
                    if (isAgree) {
                       try {
                        const res = await api.delete(`pembayaran/delete/${id}`)
                        showToast(res.data.message, 'success')
                        getData()
                       } catch (error: any) {
                        showToast(error.response.data.message, 'danger')
                       }
                    }
                }

    return (
        <div>
            <div className="d-flex justify-content-between">
                <h4>Data pembayaran</h4>
                <Link href={'/admin/pembayaran/create'}>
                <button type="button" className="btn btn-primary">Tambah pembayaran</button>
                </Link>
            </div>

            <table className="table mt-4 table-hover">
                <thead>
                    <tr>
                        <td>metode</td>
                        <td>tanggal_bayar</td>
                        <td>jumlah_bayar</td>
                        <td>total harga</td>
                        <td>Aksi</td>
                    </tr>
                </thead>

                <tbody>
                    {pembayarans.map(pembayaran => {
                        return (
                            <tr key={pembayaran.id_pembayaran}>
                                <td>{pembayaran.metode}</td>
                                <td>{pembayaran.tanggal_bayar}</td>
                                <td>{pembayaran.jumlah_bayar}</td>
                                <td>{pembayaran.pemesanan.total_harga}</td>
                                <td>ini aksi</td>
                                <td>
                                     <div className="d-flex gap-2">
                                    <button type="button" className="btn btn-warning">Edit</button>
                                    <button onClick={() => deleteData(pembayaran.id_pembayaran)} type="button" className="btn btn-danger">Delete</button>
                                </div>
                                </td>
                            </tr>
                        )
                    } )}
                </tbody>
            </table>
        </div>
    )
}