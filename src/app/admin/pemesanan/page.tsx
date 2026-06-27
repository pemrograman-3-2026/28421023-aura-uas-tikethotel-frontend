'use client'
import { api, baseURL } from "@/lib/axios"
import { IUser } from "@/proxy"
import Link from "next/link"
import { useEffect, useState } from "react"
import { IKamar } from "../kamar/page"
import Image from "next/image"

export interface IPemesanan {
    id_pemesanan: number
    tanggal_checkin: string
    tanggal_checkout: string
    total_harga: string
    userID : number
    kamarID : number
    image : string
    user: IUser
    kamar: IKamar
  
}

export default function Adminpemesananpage () {
    const [pemesanans, setpemesanans] = useState<IPemesanan[]>([])

    const getData = async () => {
        try {
            const res = await api.get('pemesanan/getALL')
            setpemesanans(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            <div className="d-flex justify-content-between">
                <h4>Data pemesanan</h4>
                <Link href={'/admin/pemesanan/create'}>
                <button type="button" className="btn btn-primary">Tambah pemesanan</button>
                </Link>
            </div>

            <table className="table mt-4 table-hover">
                <thead>
                    <tr>
                        <td>tanggal_checkin</td>
                        <td>tanggal_checkout</td>
                        <td>total_harga</td>
                        <td>user</td>
                        <td>kamar</td>
                         <td>image</td>
                        <td>Aksi</td>
                    </tr>
                </thead>

                <tbody>
                    {pemesanans.map(pemesanan => {
                        return (
                            <tr key={pemesanan.id_pemesanan}>
                                <td>{pemesanan.tanggal_checkin}</td>
                                <td>{pemesanan.tanggal_checkout}</td>
                                <td>{pemesanan.total_harga}</td>
                                <td>{pemesanan.user.name}</td>
                                <td>{pemesanan.kamar.no_kamar}</td>
                                <td>
                                   <Image 
                                   src={`${baseURL}/image/${pemesanan.image}`}
                                   width={300} 
                                   height={300}
                                    alt=""
                                    unoptimized
                                    />
                                </td>
                                <td>ini aksi</td>
                                <td>
                                     <div className="d-flex gap-2">
                                    <button type="button" className="btn btn-warning">Edit</button>
                                    <button type="button" className="btn btn-danger">Delete</button>
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