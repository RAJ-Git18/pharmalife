'use client'

import axios from 'axios'
import { Trash } from 'lucide-react';
import React, { useState, useEffect } from 'react'

// Data types of the data for the inquiry
interface Inquiry {
  inquiry_id: string;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  created_at: string;
}


const page = () => {

  // State of the fetched data
  const [inquiryList, setInquiryList] = useState<Inquiry[]>([])

  // State for showing message for each inquiry (track each one separately)
  const [showMessage, setShowMessage] = useState<{ [key: string]: boolean }>({})

  // First time page refresh huda afai call hunxa
  useEffect(() => {
    const getInquiry = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/getinquiry/')

        if (response.data.message === 'Data fetched successfully') {
          setInquiryList(response.data.data)
        }

      } catch (error) {
        alert('Unable to fetch the inquiries')
      }
    }
    getInquiry()
  }, [])

  // Toggle the message visibility for the specific inquiry
  const toggleMessage = (inquiry_id: string) => {
    setShowMessage(prevState => ({
      ...prevState,
      [inquiry_id]: !prevState[inquiry_id] // Toggle the state for the specific inquiry
    }))
  }

  const DeleteInquiry = async (inquiry_id: string) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/deleteinquiry/${inquiry_id}/`)

      window.location.reload()

    } catch (error) {
      alert('Unable to delete the inquiry')
    }

  }


  return (
    <div className="min-h-screen flex flex-col">
      {
        inquiryList.map((inquiry) => (
          <ul className="bg-white m-3 rounded-lg" key={inquiry.inquiry_id}>
            <div className="flex items-center justify-between px-4 py-2">
              <button
                className="p-3 text-left"
                onClick={() => toggleMessage(inquiry.inquiry_id)}
              >
                <span>{inquiry.inquiry_id}</span> {/* Use span instead of li */}
              </button>

              <button
                onClick={() => (DeleteInquiry(inquiry.inquiry_id))}
                className="ml-2" // Optional: Add margin to the trash icon button
              >
                <Trash />
              </button>
            </div>

            {/* Conditionally render the message */}
            {showMessage[inquiry.inquiry_id] && (
              <div className="border-t-2 p-3 font-semibold">
                <li>Name: {inquiry.firstName} {inquiry.lastName}</li>
                <li>Email: {inquiry.email}</li>
                <li className="mt-3">{inquiry.message}</li>
                <li>{new Date(inquiry.created_at).toLocaleString()}</li>
              </div>
            )}
          </ul>
        ))
      }
    </div>
  )
}

export default page
