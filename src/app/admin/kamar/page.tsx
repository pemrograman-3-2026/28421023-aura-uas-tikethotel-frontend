'use client'
import { api, baseURL } from "@/lib/axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import { IHotel } from "../hotel/page"
import { showToast } from "@/app/components/toast/toast"

export interface IKamar {
    id_kamar: number
    no_kamar: string
    harga: string
    id_hotel: number
    hotel: IHotel
}

export default function Adminkamarpage () {
    const [kamars, setkamars] = useState<IKamar[]>([])

    const getData = async () => {
        try {
            const res = await api.get('kamar/getALL')
            setkamars(res.data)
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
                const res = await api.delete(`kamar/delete/${id}`)
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
                <h4>Data kamar</h4>
                <Link href={'/admin/kamar/create'}>
                <button type="button" className="btn btn-primary">Tambah kamar</button>
                </Link>
            </div>

            <table className="table mt-4 table-hover">
                <thead>
                    <tr>
                        <td>no_kamar</td>
                        <td>harga</td>
                        <td>hotel</td>
                        <td>Aksi</td>
                    </tr>
                </thead>

                <tbody>
                    {kamars.map(kamar => {
                        return (
                            <tr key={kamar.id_kamar}>
                                <td>{kamar.no_kamar}</td>
                                <td>{kamar.harga}</td>
                                <td>{kamar.hotel.nama_hotel}</td>
                                <td>
                                     <div className="d-flex gap-2">
                                    <button type="button" className="btn btn-warning">Edit</button>
                                    <button onClick={() => deleteData(kamar.id_kamar)} type="button" className="btn btn-danger">Delete</button>
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