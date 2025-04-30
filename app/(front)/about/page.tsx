'use client'
import Image from 'next/image';
import { Truck, ShieldCheck, HeartPulse, PhoneCall, Leaf } from 'lucide-react';
import store from '../../../public/images/about/pharmacy.png'
import tarak from '../../../public/images/about/tarak.png'
import jethalal from '../../../public/images/about/jethalal.png'
import babita from '../../../public/images/about/babita.png'
import daya from '../../../public/images/about/dayabhabi.png'

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-50 to-green-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Your Trusted Online Pharmacy
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Fast, reliable, and secure delivery of medicines to your doorstep.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <Image
              src={store}
              alt="Our Pharmacy Team"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
            />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              We are committed to providing <strong>safe, authentic medicines</strong> at affordable prices, delivered quickly and discreetly.
            </p>
            <p className="text-gray-600 mb-4">
              Our team of licensed pharmacists ensures every order meets strict quality standards.
            </p>
            <p className="text-gray-600">
              Founded in 2023, we serve thousands of customers across the country with genuine healthcare products.
            </p>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Us?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <ShieldCheck className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">100% Authentic Medicines</h3>
              <p className="text-gray-600">
                Sourced directly from licensed manufacturers and pharmacies.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <Truck className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast & Discreet Delivery</h3>
              <p className="text-gray-600">
                Same-day dispatch for orders before 3 PM.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <PhoneCall className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">24/7 Pharmacist Support</h3>
              <p className="text-gray-600">
                Free consultations with certified pharmacists.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section (Optional) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Our Expert Pharmacists</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Meet the team ensuring your health comes first.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div key={member.id} className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4 overflow-hidden rounded-full">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-blue-600 mb-2">{member.role}</p>
              <p className="text-gray-600">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-100 to-green-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Need Prescription Medicines?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Upload your prescription and get doorstep delivery in 24 hours.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full inline-flex items-center">
            Upload Prescription
          </button>
        </div>
      </div>
    </div>
  );
}

// Sample team data (replace with real team)
const teamMembers = [
  {
    id: 1,
    name: "Dr. Tarak ",
    role: "Chief Pharmacist",
    bio: "15+ years of experience in clinical pharmacy.",
    image: tarak
  },
  {
    id: 2,
    name: "Dr. Jethalal",
    role: "Medicine Safety Officer",
    bio: "Specializes in drug interactions and safety.",
    image: jethalal
  },
  {
    id: 3,
    name: "Babita",
    role: "Customer Care Pharmacist",
    bio: "Provides personalized medication advice.",
    image: babita
  },
  {
    id: 4,
    name: "Daya Bhabhi",
    role: "Logistics & Quality Control",
    bio: "Ensures safe and fast deliveries.",
    image: daya
  }
];