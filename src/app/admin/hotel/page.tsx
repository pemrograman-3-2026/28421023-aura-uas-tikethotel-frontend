'use client'
import { showToast } from "@/app/components/toast/toast"
import { api, baseURL } from "@/lib/axios"
import Link from "next/link"
import { useEffect, useState } from "react"

export interface IHotel {
    id_hotel: number
    nama_hotel: string
    kota: string
    alamat: string
  
}

export default function AdminHotelpage () {
    const [hotels, setHotels] = useState<IHotel[]>([])

    const getData = async () => {
        try {
            const res = await api.get('hotel/getALL')
            setHotels(res.data)
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
            const res = await api.delete(`hotel/delete/${id}`)
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
                <h4>Data hotel</h4>
                <Link href={'/admin/hotel/create'}>
                <button type="button" className="btn btn-primary">Tambah hotel</button>
                </Link>
            </div>

            <table className="table mt-4 table-hover">
                <thead>
                    <tr>
                        <td>nama_hotel</td>
                        <td>kota</td>
                        <td>alamat</td>
                        <td>Aksi</td>
                    </tr>
                </thead>

                <tbody>
                    {hotels.map(hotel => {
                        return (
                            <tr key={hotel.id_hotel}>
                                <td>{hotel.nama_hotel}</td>
                                <td>{hotel.kota}</td>
                                <td>{hotel.alamat}</td>
                                <td>ini aksi</td>
                                <td>
                                     <div className="d-flex gap-2">
                                    <button type="button" className="btn btn-warning">Edit</button>
                                    <button onClick={() => deleteData(hotel.id_hotel)} type="button" className="btn btn-danger">Delete</button>
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