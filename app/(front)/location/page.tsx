import React from "react";
import Image from "next/image";

const LocationPage: React.FC = () => {
  return (
    <div className="container mx-auto px-8 py-12">
      {/* Header */}
      <h1 className="text-3xl font-semibold text-center mb-8">Our Location</h1>
      
      {/* About the company */}
      <div className="text-center mb-8">
    <p className="text-lg text-justify">
        At <strong>First Choice</strong>, we are committed to delivering the best products and services
        to our customers. We pride ourselves on our customer-first approach, ensuring that every interaction
        is smooth, efficient, and delightful. Our company has been a trusted name in the industry, providing
        quality solutions to meet your needs.
    </p>
    <p className="text-lg mt-4 text-justify">
        Located in the heart of the city, our office is easily accessible, providing a convenient space for
        both clients and employees. We value transparency, collaboration, and innovation, and our location
        is designed to reflect those values.
    </p>
</div>


      {/* Map Section */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Visit Us</h2>
        <div className="w-full h-96 mt-10 mb-20">
        <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.303290846069!2d85.31476367470054!3d27.677019526829902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19cb93a85231%3A0x5043e3d7c6e964d1!2sLabim%20Mall%20Galli%2C%20Lalitpur%2044600!5e0!3m2!1sen!2snp!4v1739724671107!5m2!1sen!2snp" width="100%" height="450" style={{ border: 0 }} allowFullScreen  loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </div>
  );
};

export default LocationPage;