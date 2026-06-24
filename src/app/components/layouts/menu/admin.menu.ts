import { BadgeCent, Clapperboard, LayoutDashboard, MarsStroke } from "lucide-react"


export const adminMenu = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/kamar", icon: MarsStroke, label: "Kamar" },
  { to: "/admin/pemesanan", icon: Clapperboard, label: "Pemesanan" },
   { to: "/admin/pembayaran", icon: BadgeCent, label: "Pembayaran" }
]

export type IMenu = typeof adminMenu[0]
