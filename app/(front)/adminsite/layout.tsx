// app/admin/layout.tsx
import React from 'react';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
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
                <ul>
                    <li><a href="/admin/dashboard" style={{ color: 'white' }}>Dashboard</a></li>
                    <li><a href="/admin/users" style={{ color: 'white' }}>Users</a></li>
                    <li><a href="/admin/settings" style={{ color: 'white' }}>Settings</a></li>
                </ul>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
                {/* The content of the page will be injected here */}
                {children}
            </div>
        </div>
    );
};

export default AdminLayout;
