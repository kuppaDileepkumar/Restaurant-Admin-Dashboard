// src/services/orderService.js
import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api/orders'

// Get all orders with optional filters and pagination
export const getOrders = async ({ status, page = 1, limit = 5 } = {}) => {
  const params = { status, page, limit }
  const { data } = await axios.get(BASE_URL, { params })
  return data
}

// Get single order with populated menu items
export const getOrder = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/${id}`)
  return data
}

// Create new order
export const createOrder = async (order) => {
  const { data } = await axios.post(BASE_URL, order)
  return data
}

// Update order status
export const updateOrderStatus = async (id, status) => {
  const { data } = await axios.patch(`${BASE_URL}/${id}/status`, { status })
  return data
}
