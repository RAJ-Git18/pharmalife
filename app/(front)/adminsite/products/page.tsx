'use client'
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image?: string;
}

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  stock: number;
  image: File | null;
}

const ProductsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    image: null
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/products/');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('API Response:', data); // Log the raw response
      
      const formattedProducts = data.map((product: any) => ({
        ...product,
        price: Number(product.price),
        stock: Number(product.stock)
      }));
      
      setProducts(formattedProducts);
    } catch (err) {
      console.error('Full fetch error:', err); 
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        image: e.target.files[0]
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price.toString());
    formDataToSend.append('stock', formData.stock.toString());
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/products/', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        await fetchProducts(); 
        setIsModalOpen(false);
        setFormData({
          name: '',
          description: '',
          price: 0,
          stock: 0,
          image: null
        });
      } else {
        console.error('Error creating product:', await response.json());
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <div className="container mx-auto p-4  bg-white rounded-lg ">
      <div className='flex justify-between'><div>      
      <h1 className='text-2xl mb-10'>Products</h1>
      </div>


      <div><div className='flex justify-between mb-6'>
        <div className='flex gap-4'>
          <button 
            onClick={() => setIsModalOpen(true)}
            className='bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded transition-colors'
          >
            Add Product
          </button>
          <button className='bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded transition-colors mr-10'>
            Delete Product
          </button>
        </div>
        <input 
          type="text" 
          placeholder="Search..." 
          className='border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' 
        />
      </div></div>


       </div> 
      
   
     
      

      {/* Products Table */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-sm ">
          <table className="min-w-full bg-white border ">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border">Image</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Description</th>
                <th className="py-2 px-4 border">Price</th>
                <th className="py-2 px-4 border">Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border">
                      {product.image && (
                        <img 
                          src={`http://127.0.0.1:8000${product.image}`} 
                          alt={product.name} 
                          className="h-16 w-16 object-cover rounded"
                        />
                      )}
                    </td>
                    <td className="py-2 px-4 border">{product.name}</td>
                    <td className="py-2 px-4 border">{product.description}</td>
                    <td className="py-2 px-4 border">Npr.{product.price.toFixed(2)}</td>
                    <td className="py-2 px-4 border">{product.stock}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-gray-500">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Product</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2">Price</label>
                  <input
                    type="number"
                    name="price"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    min="0"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Product Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
