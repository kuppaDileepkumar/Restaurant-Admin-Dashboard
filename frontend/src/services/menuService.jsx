// src/services/menuService.js
import axios from 'axios'

const BASE_URL = 'https://restaurant-admin-dashboard-0jjp.onrender.com/api/menu'
// Get all menu items with optional filters
export const getMenuItems = async ({ category, isAvailable, search } = {}) => {
  const params = {}
  if (category) params.category = category
  if (isAvailable !== undefined) params.availability = isAvailable
  if (search) params.q = search

  const { data } = await axios.get(BASE_URL, { params })
  return data
}

// Get a single menu item by ID
export const getMenuItem = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/${id}`)
  return data
}

// Create a new menu item
export const createMenuItem = async (menuItem) => {
  const { data } = await axios.post(BASE_URL, menuItem)
  return data
}

// Update a menu item
export const updateMenuItem = async (id, updates) => {
  const { data } = await axios.put(`${BASE_URL}/${id}`, updates)
  return data
}

// Delete a menu item
export const deleteMenuItem = async (id) => {
  const { data } = await axios.delete(`${BASE_URL}/${id}`)
  return data
}

// Toggle availability
export const toggleAvailability = async (id) => {
  const { data } = await axios.patch(`${BASE_URL}/${id}/availability`)
  return data
}
