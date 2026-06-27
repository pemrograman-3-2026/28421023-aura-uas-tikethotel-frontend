'use client'
import { api } from "@/lib/axios"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { showToast } from "@/app/components/toast/toast";
import { IUser } from "@/proxy";
import { IKamar } from "../../kamar/page";

export default function AdminCreatePemesananPage () {

    const router = useRouter()
    const [users, setUsers] = useState<IUser[]>([]);
    const [kamars, setKamars] = useState<IKamar[]>([]);
    const [no_kamar, setNo_kamar] = useState("");
    const [total_hargas, setTotal_hargas] = useState("");
    const [userID, setUserID] = useState("");
    const [kamarID, setKamarID] = useState("");
    const [image, setImage] = useState<File | null>(null);
   

    const getUser = async () => {
        try {
            const res = await api.get('/user/getALL')
            setUsers(res.data)
        } catch (error) {
            console.log(error)
        
        }
    }
    useEffect(() => {
        getUser()
    },[])

    const getKamar = async () => {
        try {
            const res = await api.get('/kamar/getALL')
            setKamars(res.data)
        } catch (error) {
            console.log(error)
        
        }
    }
    useEffect(() => {
        getKamar()
    },[])
    

    const onSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('total_harga', total_hargas)
            formData.append('userID', userID)
            formData.append('kamarID', kamarID)

            if (!image) {
                showToast('mohon pilih gambar', 'danger')
                return
            }

            formData.append('image', image)

            const res = await api.post('pemesanan/create', formData)
            showToast(res.data.message, 'success')
            router.push('/admin/pemesanan')

        } catch (error) {
            
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        const fileSelected = e.target.files ? e.target.files[0] : null
        setImage(fileSelected)
    }

    return(
        <div>
            <h1>input pemesanan</h1>

            <div className="row">
                <div className="col-md-6">
                    <form onSubmit={onSubmit}>
                        <div>
                            <label className="form-label small fw-semibold">Total Harga</label>
                            <input 
                            type="text"
                            name="total_harga"
                            className="form-control" 
                            onChange={(e) => setTotal_hargas(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="from-label small fw-semiblod">user</label>
                            <select name="userID"
                            className="form-control"
                            onChange={(e) => setUserID(e.target.value)}
                            defaultValue={""}
                            >
                            <option
                            disabled
                            value={""}
                            >
                            Select User
                            </option>
                            {users.map(user => {
                                return (
                                <option
                                    key={user.id_user}
                                    value={user.id_user}
                                >
                                    {user.name}
                                </option>                           )
                            }
                            )}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="from-label small fw-semiblod">kamar</label>
                            <select name="kamarID"
                            className="form-control"
                            onChange={(e) => setKamarID(e.target.value)}
                            defaultValue={""}
                            >
                            <option
                            disabled
                            value={""}
                            >
                            Select kamar
                            </option>
                            {kamars.map(kamar => {
                                return (
                                <option
                                    key={kamar.id_kamar}
                                    value={kamar.id_kamar}
                                >
                                    {kamar.no_kamar}
                                </option>                           )
                            }
                            )}
                            </select>
                        </div>
                         <div className="mb-3">
                        <label className="form-label small fw-semibold">poster image</label>
                        <input 
                        type="file" 
                        name="image"
                        className="form-control"
                        onChange={handleFileChange}
                        />
                        </div>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}