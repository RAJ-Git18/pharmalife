'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function AboutPage() {

  const router = useRouter()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    //send data to the django backend
    const submitinquiry = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/submitinquiry/", formData,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        console.log('sflsdlfs');

        response.data.message === 'inquiry submitted' && alert('Form is submitted')

      } catch (error) {
        alert('Form cannot be submitted')
      }
    }
    submitinquiry()
    setSubmitted(true)
    setFormData({ firstName: '', lastName: '', email: '', message: '' })
    setTimeout(() => {
      router.push('/')
    }, 2000);
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center p-8 gap-40">
      <div className="flex flex-col gap-3">
        <div className="text-3xl text-[#1FB472] font-bold">Contact us</div>

        <div className="text-xl">Wanna get in touch with us? Fill out the form with your inquiry.</div>
      </div>


      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white border rounded-lg py-10 max-w-fit px-4">
        <div className=" flex items-center justify-center mb-5">
          <Image
            src="/images/logo/pharmalogo.png"
            alt="Pharma Logo"
            width={170}
            height={10}
          />
        </div>
        <div className="flex gap-4">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900"
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="How can we help you?"
          required
          rows={4}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900"
        />
        <button
          type="submit"
          className="bg-[#1FB472] text-white py-2 rounded-md hover:bg-slate-800 transition"
        >
          Submit
        </button>

        {submitted && (
          <p className="text-green-600 text-center mt-4">Thank you for reaching out! We will get back to you soon.</p>
        )}
      </form>

    </div>
  )
}
