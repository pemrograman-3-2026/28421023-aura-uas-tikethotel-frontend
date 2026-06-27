'use client'
import { api } from "@/lib/axios"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { showToast } from "@/app/components/toast/toast";
import { IPemesanan } from "../../pemesanan/page";

export default function AdminCreatePembayaranPage () {

    const router = useRouter()
    const [pemesanans, setPemesanans] = useState<IPemesanan[]>([]);
    const [metode, setmetodess] = useState("");
    const [jumlah_bayar, setJumlah_bayars] = useState("");
    const [pemesananID, setPemesananID] = useState("");
   

    const getPemesanan = async () => {
        try {
            const res = await api.get('/pemesanan/getALL')
            setPemesanans(res.data)
        } catch (error) {
            console.log(error)
        
        }
    }
    useEffect(() => {
        getPemesanan()
    },[])
    

    const onSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        try {
            const res = await api.post('pembayaran/create', {
                metode,
                jumlah_bayar: jumlah_bayar,
                pemesananID: Number (pemesananID)
            })
            showToast(res.data.message, 'success')
            router.push('/admin/pembayaran')

        } catch (error) {
            
        }
    }


    return(
        <div>
            <h1>input pembayaran</h1>

            <div className="row">
                <div className="col-md-6">
                    <form onSubmit={onSubmit}>
                        <div>
                            <label className="form-label small fw-semibold">metodes</label>
                            <input 
                            type="text"
                            name="metode"
                            className="form-control" 
                            onChange={(e) => setmetodess(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="form-label small fw-semibold">jumlah bayar</label>
                            <input 
                            type="text"
                            name="jumlah_bayar"
                            className="form-control" 
                            onChange={(e) => setJumlah_bayars(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="from-label small fw-semiblod">pemesanan</label>
                            <select name="pemesananID"
                            className="fro-control"
                            onChange={(e) => setPemesananID(e.target.value)}
                            defaultValue={""}
                            >
                            <option
                            disabled
                            value={""}
                            >
                            Select Pemesanan
                            </option>
                            {pemesanans.map(pemesanan => {
                                return (
                                <option
                                    key={pemesanan.id_pemesanan}
                                    value={pemesanan.id_pemesanan}
                                >
                                    {pemesanan.total_harga}
                                </option>                           )
                            }
                            )}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}