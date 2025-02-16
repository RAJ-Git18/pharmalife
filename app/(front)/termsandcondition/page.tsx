import React from "react";

const TermsAndConditions: React.FC = () => {
  return (
    <div className="container mx-auto px-8 py-12">
      {/* Header */}
      <h1 className="text-3xl font-semibold text-center mb-8">Terms and Conditions</h1>

      {/* Introduction */}
      <div className="mb-8">
        <p className="text-lg text-justify">
          Welcome to <strong>First Choice</strong>. These terms and conditions outline the rules and regulations for the use of our website and services.
          By accessing this website and using our services, you agree to comply with and be bound by these terms.
        </p>
      </div>

      {/* General Terms */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">General Terms</h2>
        <ul className="list-disc pl-6 space-y-2 text-lg text-justify">
          <li>By using our services, you agree to our terms and conditions.</li>
          <li>All content on our website is owned by <strong>First Choice</strong>.</li>
          <li>We reserve the right to modify or update these terms at any time without notice.</li>
          <li>All users must be at least 18 years old to use our services.</li>
        </ul>
      </div>

      {/* Usage of Services */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Use of Services</h2>
        <p className="text-lg text-justify">
          You are permitted to use our services only for lawful purposes and in accordance with our acceptable use policies. You agree not to misuse the website or services in any manner, including, but not limited to:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-lg">
          <li>Engaging in any activity that disrupts or damages the website or services.</li>
          <li>Using the services for any illegal or unauthorized purpose.</li>
          <li>Attempting to gain unauthorized access to any of our systems.</li>
        </ul>
      </div>

      {/* Privacy and Data Collection */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Privacy and Data Collection</h2>
        <p className="text-lg text-justify">
          We value your privacy. When you use our services, we may collect personal data in accordance with our privacy policy. By using our services, you consent to the collection and use of your data as described in the policy.
        </p>
      </div>

      {/* Limitation of Liability */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
        <p className="text-lg text-justify">
          <strong>First Choice</strong> is not liable for any indirect, incidental, special, consequential, or punitive damages arising from the use of our website or services. Our liability is limited to the extent permitted by law.
        </p>
      </div>

      {/* Governing Law */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
        <p className="text-lg text-justify">
          These terms and conditions are governed by the laws of the jurisdiction in which <strong>First Choice</strong> operates. Any disputes arising from the use of our services will be resolved in the courts of that jurisdiction.
        </p>
      </div>

      {/* Conclusion */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
        <p className="text-lg text-justify">
          By using our website and services, you acknowledge that you have read and understood these terms and agree to be bound by them. If you do not agree to these terms, please refrain from using our website and services.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
