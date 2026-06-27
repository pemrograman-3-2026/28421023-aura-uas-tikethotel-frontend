'use client'
import { api } from "@/lib/axios"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { IHotel } from "../../hotel/page";
import { showToast } from "@/app/components/toast/toast";

export default function AdminCreateKamarPage () {

    const router = useRouter()
    const [hotels, setHotels] = useState<IHotel[]>([]);
    const [no_kamar, setNo_kamar] = useState("");
    const [hargas, setHargas] = useState("");
    const [id_hotels, setId_hotels] = useState("");
   

    const getHotel = async () => {
        try {
            const res = await api.get('/hotel/getALL')
            setHotels(res.data)
        } catch (error) {
            console.log(error)
        
        }
    }
    useEffect(() => {
        getHotel()
    },[])
    

    const onSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        try {
            const res = await api.post('kamar/create', {
                no_kamar,
                harga: hargas,
                id_hotel: Number (id_hotels)
            })
            showToast(res.data.message, 'success')
            router.push('/admin/kamar')

        } catch (error) {
            
        }
    }


    return(
        <div>
            <h1>input kamar</h1>

            <div className="row">
                <div className="col-md-6">
                    <form onSubmit={onSubmit}>
                        <div>
                            <label className="form-label small fw-semibold">no_kamar</label>
                            <input 
                            type="text"
                            name="no_kamar"
                            className="form-control" 
                            onChange={(e) => setNo_kamar(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="form-label small fw-semibold">harga</label>
                            <input 
                            type="text"
                            name="harga"
                            className="form-control" 
                            onChange={(e) => setHargas(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="from-label small fw-semiblod">hotel</label>
                            <select name="id_hotel"
                            className="fro-control"
                            onChange={(e) => setId_hotels(e.target.value)}
                            defaultValue={""}
                            >
                            <option
                            disabled
                            value={""}
                            >
                            Select Hotel
                            </option>
                            {hotels.map(hotel => {
                                return (
                                <option
                                    key={hotel.id_hotel}
                                    value={hotel.id_hotel}
                                >
                                    {hotel.nama_hotel}
                                </option>                           )
                            }
                            )}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Save Kamar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}