import React from "react";

const WishlistFooterSection: React.FC = () => {
  return (
    <div className="wishlist-footer-section p-4 bg-gray-100 rounded-md text-center">
      <h3 className="text-lg font-semibold mb-2">Wishlist</h3>
      <p className="text-sm text-gray-700 mb-4">
        Save your essential medicines for later! Add products to your wishlist and easily find them whenever you need.
      </p>
      <a
        href="/login"
        className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Log in to Save
      </a>
    </div>
  );
};

export default WishlistFooterSection;
