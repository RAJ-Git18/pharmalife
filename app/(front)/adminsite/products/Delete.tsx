'use client'
import React, { useState, ChangeEvent } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image?: string;
}

interface DeleteProps {
  fetchProducts: () => void;
  products: Product[];
  className?: string;
}

const DeleteProduct: React.FC<DeleteProps> = ({ fetchProducts, products, className }) => {
  const [isDeleteMode, setIsDeleteMode] = useState<boolean>(false);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleDeleteClick = () => {
    if (!isDeleteMode) {
      setIsDeleteMode(true);
      setSelectedProducts([]);
    } else {
      if (selectedProducts.length === 0) {
        setIsDeleteMode(false);
        return;
      }
      setIsConfirmDeleteModalOpen(true);
    }
  };

  const confirmDelete = async () => {
    setIsLoading(true);
    try {
      await Promise.all(
        selectedProducts.map(id =>
          fetch(`http://127.0.0.1:8000/products/${id}/`, { method: 'DELETE' })
        )
      );
      await fetchProducts();
    } catch (error) {
      console.error('Error deleting products:', error);
    } finally {
      setIsLoading(false);
      setIsDeleteMode(false);
      setSelectedProducts([]);
      setIsConfirmDeleteModalOpen(false);
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectProduct = (id: number) => {
    setSelectedProducts(prev =>
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={className}>
      {/* Delete Button */}
      <button
        onClick={handleDeleteClick}
        className={`bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded transition-colors ${
          isDeleteMode ? 'bg-red-700' : ''
        }`}
      >
        {isDeleteMode ? 
          (selectedProducts.length > 0 ? `Delete Selected (${selectedProducts.length})` : 'Cancel Delete') 
          : 'Delete Product'}
      </button>

      {/* Delete Confirmation Modal */}
      {isConfirmDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            {/* Close button */}
            <button 
              onClick={() => setIsConfirmDeleteModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>
            
            <h2 className="text-xl font-semibold mb-4">
              Confirm Deletion
            </h2>
            
            <div className="mb-6">
              <p>Are you sure you want to delete {selectedProducts.length} selected product{selectedProducts.length !== 1 ? 's' : ''}?</p>
              <ul className="mt-2 max-h-40 overflow-y-auto border rounded p-2">
                {products
                  .filter(p => selectedProducts.includes(p.id))
                  .map(p => (
                    <li key={p.id} className="py-1 border-b last:border-b-0">
                      {p.name} (Npr. {p.price.toFixed(2)})
                    </li>
                  ))}
              </ul>
            </div>
            
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsConfirmDeleteModalOpen(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isLoading}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Deleting...
                  </>
                ) : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Selection Panel */}
      {isDeleteMode && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-40">
          <div className="bg-white p-6 rounded-lg w-full max-w-3xl relative">
            <button 
              onClick={() => setIsDeleteMode(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>
            
            <h2 className="text-xl font-semibold mb-4">Select Products to Delete</h2>
            
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search products..."
              className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            
            <div className="max-h-[60vh] overflow-y-auto">
              <table className="min-w-full bg-white border">
                <thead className="sticky top-0 bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 border">Select</th>
                    <th className="py-2 px-4 border">Name</th>
                    <th className="py-2 px-4 border">Price</th>
                    <th className="py-2 px-4 border">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(product => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border text-center">
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => handleSelectProduct(product.id)}
                          className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                        />
                      </td>
                      <td className="py-2 px-4 border">{product.name}</td>
                      <td className="py-2 px-4 border">Npr.{product.price.toFixed(2)}</td>
                      <td className="py-2 px-4 border">{product.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={() => setIsDeleteMode(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteClick}
                disabled={selectedProducts.length === 0}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors disabled:opacity-50"
              >
                Delete Selected ({selectedProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteProduct;