'use client'

import Link from "next/link";
import { IMenu } from "./menu/admin.menu";
import { BadgeCent, Clapperboard, LayoutDashboard, MarsStroke } from "lucide-react";




const navItems = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/kamar", icon: MarsStroke, label: "Kamar" },
  { to: "/admin/pemesanan", icon: Clapperboard, label: "Pemesanan" },
   { to: "/admin/pembayaran", icon: BadgeCent, label: "Pembayaran" },
];

export default function Sidebar(
  { 
    isOpen, 
    ListMenu,
    collapsed,
    onClose 
  } : {
    isOpen: boolean,
    ListMenu: IMenu[],
    collapsed: boolean,
    onClose: () => void
  }
) {
  return (
    <div
      className={`sidebar ${isOpen ? "open" : ""} ${collapsed ? "collapsed" : ""}`}
    >
      <div className="sidebar-brand">
        {!collapsed && <span className="brand-name">Aura Cantik</span>}
        <button
          className="btn d-md-none ms-auto"
          style={{ color: "white" }}
          onClick={onClose}
        >
          ✕
        </button>
      </div>

      <nav className="mt-2">
        <ul className="nav flex-column">
          {ListMenu.map(({ to, icon: Icon, label }) => (
            <li className="nav-item" key={to}>
              <Link
                href={to}
                className={'nav-link'}
                onClick={onClose}
                title={collapsed ? label : ""}
              >
                <span className="nav-icon">
                  <Icon/>
                </span>
                {!collapsed && <span className="nav-label">{label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}