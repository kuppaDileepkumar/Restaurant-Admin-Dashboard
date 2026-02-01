// src/pages/MenuManagement.jsx
import React, { useEffect, useState , useCallback} from 'react'
import {
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleAvailability
} from '../services/menuService'
import SearchBar from '../components/SearchBar'

const categories = ['Appetizer', 'Main Course', 'Dessert', 'Beverage']

const MenuManagement = () => {
  const [menu, setMenu] = useState([])
  const [loading, setLoading] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState('')
  const [availabilityFilter, setAvailabilityFilter] = useState('')
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    ingredients: '',
    preparationTime: '',
    imageUrl: ''
  })
  const [editingId, setEditingId] = useState(null)

  // Fetch menu items
  const fetchMenu = useCallback(async () => {
    setLoading(true)
    try {
      //console.log('Fetching with search:',search)
      const data = await getMenuItems({
        category: categoryFilter || undefined,
        isAvailable:
          availabilityFilter === ''
            ? undefined
            : availabilityFilter === 'true',
        search: search || undefined
      })
      setMenu(data)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  },[categoryFilter,availabilityFilter,search])

  useEffect(() => {
    fetchMenu()
  }, [fetchMenu])

  


  // Handle Add / Edit form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      ...formData,
      price: Number(formData.price),
      preparationTime: Number(formData.preparationTime),
      ingredients: formData.ingredients.split(',').map((i) => i.trim())
    }

    try {
      if (editingId) {
        await updateMenuItem(editingId, payload)
      } else {
        await createMenuItem(payload)
      }
      setShowForm(false)
      setFormData({
        name: '',
        description: '',
        category: '',
        price: '',
        ingredients: '',
        preparationTime: '',
        imageUrl: ''
      })
      setEditingId(null)
      fetchMenu()
    } catch (err) {
      console.error(err)
    }
  }

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      await deleteMenuItem(id)
      fetchMenu()
    }
  }

  // Handle Toggle Availability
  const handleToggleAvailability = async (id) => {
    await toggleAvailability(id)
    fetchMenu()
  }

  // Handle Edit
  const handleEdit = (item) => {
    setEditingId(item._id)
    setFormData({
      name: item.name,
      description: item.description,
      category: item.category,
      price: item.price,
      ingredients: item.ingredients.join(', '),
      preparationTime: item.preparationTime,
      imageUrl: item.imageUrl
    })
    setShowForm(true)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Menu Management</h1>

      {/* Filters & Search */}
      <div className="flex gap-4 mb-4 items-center">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={availabilityFilter}
          onChange={(e) => setAvailabilityFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="">All</option>
          <option value="true">Available</option>
          <option value="false">Unavailable</option>
        </select>

        <SearchBar onSearch={setSearch} />
        <button
          onClick={() => {
            setShowForm(true)
            setEditingId(null)
            setFormData({
              name: '',
              description: '',
              category: '',
              price: '',
              ingredients: '',
              preparationTime: '',
              imageUrl: ''
            })
          }}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Add Menu Item
        </button>
      </div>

      {/* Menu Grid */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {menu.map((item) => (
            <div
              key={item._id}
              className="border rounded p-4 bg-white shadow relative"
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="h-40 w-full object-cover rounded mb-2"
              />
              <h2 className="text-lg font-bold">{item.name}</h2>
              <p>{item.description}</p>
              <p>
                <span className="font-semibold">Category:</span> {item.category}
              </p>
              <p>
                <span className="font-semibold">Price:</span> ₹{item.price}
              </p>
              <p>
                <span className="font-semibold">Ingredients:</span>{' '}
                {item.ingredients.join(', ')}
              </p>
              <p>
                <span className="font-semibold">Prep Time:</span>{' '}
                {item.preparationTime} min
              </p>
              <p>
                <span
                  className={`px-2 py-1 rounded text-white ${
                    item.isAvailable ? 'bg-green-500' : 'bg-red-500'
                  }`}
                >
                  {item.isAvailable ? 'Available' : 'Unavailable'}
                </span>
              </p>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleToggleAvailability(item._id)}
                  className="bg-yellow-500 px-2 py-1 rounded text-white"
                >
                  Toggle Availability
                </button>
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-blue-500 px-2 py-1 rounded text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 px-2 py-1 rounded text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded w-full max-w-md"
          >
            <h2 className="text-xl font-bold mb-4">
              {editingId ? 'Edit' : 'Add'} Menu Item
            </h2>

            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border p-2 w-full mb-2 rounded"
              required
            />

            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="border p-2 w-full mb-2 rounded"
            />

            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="border p-2 w-full mb-2 rounded"
              required
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="border p-2 w-full mb-2 rounded"
              required
            />

            <input
              type="text"
              placeholder="Ingredients (comma separated)"
              value={formData.ingredients}
              onChange={(e) =>
                setFormData({ ...formData, ingredients: e.target.value })
              }
              className="border p-2 w-full mb-2 rounded"
            />

            <input
              type="number"
              placeholder="Preparation Time (minutes)"
              value={formData.preparationTime}
              onChange={(e) =>
                setFormData({ ...formData, preparationTime: e.target.value })
              }
              className="border p-2 w-full mb-2 rounded"
            />

            <input
              type="text"
              placeholder="Image URL"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
              className="border p-2 w-full mb-4 rounded"
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-3 py-1 rounded border"
              >
                Cancel
              </button>
              <button type="submit" className="px-3 py-1 rounded bg-blue-500 text-white">
                {editingId ? 'Update' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default MenuManagement
