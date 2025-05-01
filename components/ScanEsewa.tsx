import React from 'react'
import Image from 'next/image'
import qr from '../public/images/payment/qr-code.png'

const ScanEsewa: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Vibrant Header */}
      <header className="bg-gradient-to-r from-green-400 to-emerald-500 py-12 text-white shadow-md">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl font-bold mb-3">Complete Your Payment</h1>
          <p className="text-xl opacity-90">Scan the QR code using your eSewa app</p>
          <div className="mt-4 animate-bounce">👇</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-12 px-4 max-w-4xl">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 bg-white rounded-2xl p-8 shadow-lg">
          {/* QR Code Section */}
          <div className="p-5 bg-white rounded-xl border-2 border-green-100">
            <Image
              src={qr}
              alt="eSewa QR Code"
              className="w-64 h-64 md:w-72 md:h-72"
              priority
            />
            <p className="mt-4 text-center text-gray-500 font-medium">
              Scan with <span className="text-green-600 font-bold">eSewa</span> app
            </p>
          </div>

          {/* Action Section */}
          <div className="flex flex-col gap-6 w-full md:w-auto">
            <button className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-md hover:shadow-lg">
              <span className="text-2xl">📲</span>
              <span>Scan Now</span>
            </button>
            
            <button className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-md hover:shadow-lg">
              <span className="text-2xl">👍</span>
              <span>Already Scanned</span>
            </button>

            <div className="mt-2 p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-green-800 text-center flex items-center justify-center gap-2">
                <span className="text-green-500">ℹ️</span>
                Payment confirmation may take a few moments
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Friendly Footer */}
      <footer className="py-8 text-center">
        <p className="text-gray-500">
          Need help? <span className="text-emerald-500 font-medium cursor-pointer hover:underline">Contact support</span>
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <span className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">💬</span>
          <span className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">✉️</span>
          <span className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">📞</span>
        </div>
      </footer>
    </div>
  )
}

export default ScanEsewa