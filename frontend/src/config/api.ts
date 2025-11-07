export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ryse-wears-backend.vercel.app';

export const API_ENDPOINTS = {
  products: `${API_URL}/api/products`,
  payment: `${API_URL}/api/payment`,
  auth: `${API_URL}/api/auth`,
  admin: `${API_URL}/api/admin`,
};