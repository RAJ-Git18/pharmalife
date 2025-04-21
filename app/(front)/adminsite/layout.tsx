import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

    <div className="flex flex-col min-h-screen bg-gray-100 text-black">
      {/* Main Section */}
      <div className="flex flex-1 text-black">
        {/* Sidebar */}
        <aside className="w-1/5 bg-white shadow-md px-4 py-6 space-y-4">
          <nav className="flex flex-col space-y-2">
            <Link href="/adminsite/dashboard" className="text-gray-700 hover:text-green-600">
              Dashboard
            </Link>
            <Link href="/adminsite/products" className="text-gray-700 hover:text-green-600">
              Products
            </Link>
            <Link href="/adminsite/users" className="text-gray-700 hover:text-green-600">
              Users
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="w-4/5 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
