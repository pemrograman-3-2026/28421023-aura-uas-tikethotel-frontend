'use client'
import { adminMenu } from "@/app/components/layouts/menu/admin.menu";
import Navbar from "@/app/components/layouts/Navbar";
import Sidebar from "@/app/components/layouts/Sidebar";
import React, { useState } from "react";

export default function AdminLayout ({
    children
  }: Readonly<{
    children: React.ReactNode
  }>
) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="d-flex">
      <div
        className={`sidebar-backdrop ${sidebarOpen ? "show" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />
      
      <Sidebar
        isOpen={sidebarOpen}
        ListMenu={adminMenu}
        collapsed={collapsed}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-grow-1 d-flex flex-column main-content">
        <Navbar
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          onToggleCollapse={() => setCollapsed((prev) => !prev)}
        />

        <main className="p-4 flex-grow-1 bg-light">
          {children}
        </main>
      </div>
    </div>
  )
}