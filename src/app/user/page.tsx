'use client'

import { api, baseURL } from "@/lib/axios"
import { useEffect, useState } from "react"
import Image from "next/image"
import { IKamar } from "../admin/kamar/page"

export default function UseDashboardPage () {

    const [kamars, setKamars] = useState<IKamar[]>([])

    const getData = async () => {
        try {
           const res = await api.get('kamar/getALl') 
           setKamars(res.data)
        } catch (error) {
            console.log(error)
            
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div>

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
                                    <button type="button" className="btn btn-success">Beli</button>
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
