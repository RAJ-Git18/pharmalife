'use client'

import axios from 'axios'
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Menu, X } from "lucide-react";
import { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useRouter, usePathname } from 'next/navigation';
import GoogleSignIn from './GoogleSignIn';
import { User } from 'lucide-react'
import { useCartContext } from '@/context/CardContext';

const apiUrl = process.env.NEXT_PUBLIC_API_URL

interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const { cartCount, setCartCount } = useCartContext()

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [showAuthForm, setShowAuthForm] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [loginstatus, setloginstatus] = useState<boolean>(false)
  const [toggleuser, settoggleuser] = useState<boolean>(false)

  useEffect(() => {
    const isloggedin = localStorage.getItem('status')
    if (isloggedin === 'Logged In') {
      setloginstatus(true)
    }
  }, [])

  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: ''
  });

  const [signupData, setSignupData] = useState<SignupData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });

    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value
    });

    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateLogin = (): boolean => {
    let valid = true;
    const newErrors: FormErrors = {};

    if (!loginData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(loginData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    if (!loginData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (loginData.password.length < 6) {
      newErrors.password = 'Incorrect password';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const validateSignup = (): boolean => {
    let valid = true;
    const newErrors: FormErrors = {};

    if (!signupData.name) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!signupData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(signupData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    if (!signupData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (signupData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    if (!signupData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      valid = false;
    } else if (signupData.password !== signupData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLogin()) {
      return
    };

    try {
      const response = await axios.post(`${apiUrl}/api/login/`, loginData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      localStorage.setItem('access', response.data.access)
      localStorage.setItem('refresh', response.data.refresh)

      console.log(response.data)

      if (response.data.message === "Login successful") {
        localStorage.setItem('status', response.data.status)
        setloginstatus(true)
        if (response.data.isadmin) {
          window.location.href = ('/adminsite/dashboard')
          setShowAuthForm(false)
        }
        else {
          window.location.href = '/'
          setShowAuthForm(false)
        }
      }

    } catch (error) {
      console.error("Failed to login", error)
    }
  }

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSignup()) return;

    try {
      const registrationData = {
        username: signupData.name,
        email: signupData.email,
        password: signupData.password,
      };

      const response = await axios.post(
        `${apiUrl}/accounts/register/`,
        registrationData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("Registration successful:", response.data);
      setShowAuthForm(false);
      resetForms();

    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const backendErrors = error.response.data;
          const formattedErrors: FormErrors = {};

          if (backendErrors.email) {
            formattedErrors.email = backendErrors.email.join(' ');
          }
          if (backendErrors.username) {
            formattedErrors.name = backendErrors.username.join(' ');
          }
          if (backendErrors.password) {
            formattedErrors.password = backendErrors.password.join(' ');
          }

          setErrors(formattedErrors);
        }
        console.error("Registration failed:", error.response?.data);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  const handleGoogleSignIn = () => {
    console.log('Signing in with Google');
  };

  const resetForms = () => {
    setLoginData({ email: '', password: '' });
    setSignupData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  const toggleAuthForm = () => {
    setShowAuthForm(!showAuthForm);
    if (!showAuthForm) {
      resetForms();
    }
  };

  const handleLogout = () => {
    setloginstatus(false)
    settoggleuser(false)
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('status');
    (pathname === '/') ? router.refresh() : router.push('/')
  }

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="max-w-[1200px] w-full px-4 md:px-32 flex items-center justify-between py-3 mx-auto">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/images/logo/pharmalogo.png"
              alt="Pharma Logo"
              width={170}
              height={10}
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-black font-semibold hover:text-gray-400">Home</Link>
            <Link href="/about" className="text-black font-semibold hover:text-gray-400">About</Link>
            <Link href="/shop" className="text-black font-semibold hover:text-gray-400">Shop</Link>
            <Link href="/contact" className="text-black font-semibold hover:text-gray-400">Contact</Link>
          </div>

          {/* Right Section (Search, Register, Cart) */}
          <div className="hidden md:flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 rounded-md bg-gray-200 text-black"
            />
            <Link href="/cart" className="relative">
              <ShoppingCart size={34} className="text-green" />
              {cartCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 -right-2">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Authentication Section */}
            {!loginstatus ? (
              <button
                onClick={toggleAuthForm}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-semibold"
              >
                Login
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => settoggleuser(!toggleuser)}
                  className="flex items-center space-x-1 focus:outline-none"
                >
                  <User className="h-8 w-8 text-gray-700 hover:text-green-600 transition-colors" />
                </button>

                {/* Dropdown Menu */}
                {toggleuser && (
                  <div className="absolute -right-16 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <Link
                      href="/adminsite/dashboard"
                      className="block text-center border-b font-semibold px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => settoggleuser(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                        href="/adminsite/products"
                      className="block text-center border-b font-semibold px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => settoggleuser(false)}
                    >
                      Products
                    </Link>
                    <Link
                        href="/adminsite/inquiry"
                      className="block text-center border-b font-semibold px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => settoggleuser(false)}
                    >
                      Customer Inquiry
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block text-center font-semibold w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-[64px] left-0 w-full bg-white shadow-md flex flex-col items-center py-4 space-y-4 md:hidden">
            <Link href="/" className="text-black font-semibold hover:text-gray-400" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/about" className="text-black font-semibold hover:text-gray-400" onClick={() => setMenuOpen(false)}>About</Link>
            <Link href="/shop" className="text-black font-semibold hover:text-gray-400" onClick={() => setMenuOpen(false)}>Shop</Link>
            <Link href="/contact" className="text-black font-semibold hover:text-gray-400" onClick={() => setMenuOpen(false)}>Contact</Link>
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 rounded-md bg-gray-200 text-black w-3/4"
            />
            <button
              onClick={() => {
                toggleAuthForm();
                setMenuOpen(false);
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 w-3/4"
            >
              {showAuthForm ? 'Close' : 'Login/Signup'}
            </button>
          </div>
        )}
      </nav>

      {/* Authentication Form */}
      {showAuthForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-0">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{isLogin ? 'Login' : 'Sign Up'}</h2>
              <button
                onClick={toggleAuthForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex border-b mb-4">
              <button
                onClick={() => {
                  setIsLogin(true);
                  setErrors({});
                }}
                className={`flex-1 py-2 ${isLogin ? 'border-b-2 border-green-600 font-medium' : 'text-gray-500'}`}
              >
                Login
              </button>
              <button
                onClick={() => {
                  setIsLogin(false);
                  setErrors({});
                }}
                className={`flex-1 py-2 ${!isLogin ? 'border-b-2 border-green-600 font-medium' : 'text-gray-500'}`}
              >
                Sign Up
              </button>
            </div>

            {isLogin ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    className={`w-full px-3 py-2 border rounded-md ${errors.email ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    className={`w-full px-3 py-2 border rounded-md ${errors.password ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
                >
                  Login
                </button>
              </form>
            ) : (
              <>
                <form onSubmit={handleSignupSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Username</label>
                    <input
                      type="text"
                      name="name"
                      value={signupData.name}
                      onChange={handleSignupChange}
                      className={`w-full px-3 py-2 border rounded-md ${errors.name ? 'border-red-500' : ''}`}
                      required
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={signupData.email}
                      onChange={handleSignupChange}
                      className={`w-full px-3 py-2 border rounded-md ${errors.email ? 'border-red-500' : ''}`}
                      required
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={signupData.password}
                      onChange={handleSignupChange}
                      className={`w-full px-3 py-2 border rounded-md ${errors.password ? 'border-red-500' : ''}`}
                      required
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={signupData.confirmPassword}
                      onChange={handleSignupChange}
                      className={`w-full px-3 py-2 border rounded-md ${errors.confirmPassword ? 'border-red-500' : ''}`}
                      required
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
                  >
                    Sign Up
                  </button>
                </form>

                <div className="relative flex items-center py-4">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="flex-shrink mx-4 text-gray-500">or</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <button
                  onClick={handleGoogleSignIn}
                  className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <FcGoogle size={20} />
                  <span><GoogleSignIn /></span>
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Prevent Content Overlap */}
      <div className="mt-[3rem]"></div>
    </>
  );
}