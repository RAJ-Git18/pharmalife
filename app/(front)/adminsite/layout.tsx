// app/admin/layout.tsx
import React from 'react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div
        style={{
          width: '250px',
          backgroundColor: '#333',
          color: 'white',
          padding: '20px',
        }}
      >
        <h2>Admin Dashboard</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>
            <Link href="/admin/dashboard" style={{ color: 'white', textDecoration: 'none' }}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/admin/users" style={{ color: 'white', textDecoration: 'none' }}>
              Users
            </Link>
          </li>
          <li>
            <Link href="/admin/settings" style={{ color: 'white', textDecoration: 'none' }}>
              Settings
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        {children}
      </div>
    </div>
  );
}
