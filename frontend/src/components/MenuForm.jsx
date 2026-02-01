// src/components/MenuForm.jsx
import React, { useState } from 'react'

const MenuForm = ({ item, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: item?.name || '',
    description: item?.description || '',
    category: item?.category || '',
    price: item?.price || '',
    ingredients: item?.ingredients?.join(', ') || '',
    imageUrl: item?.imageUrl || '',
    isAvailable: item?.isAvailable ?? true
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      ...formData,
      ingredients: formData.ingredients.split(',').map((i) => i.trim())
    }
    onSave(payload)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-lg w-full max-w-md flex flex-col gap-3"
      >
        <h2 className="text-xl font-bold">{item ? 'Edit Menu Item' : 'Add Menu Item'}</h2>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="border px-2 py-1 rounded"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="border px-2 py-1 rounded"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="border px-2 py-1 rounded"
        >
          <option value="">Select Category</option>
          <option value="Appetizer">Appetizer</option>
          <option value="Main Course">Main Course</option>
          <option value="Dessert">Dessert</option>
          <option value="Beverage">Beverage</option>
        </select>

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          required
          className="border px-2 py-1 rounded"
        />

        <input
          type="text"
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          placeholder="Ingredients (comma separated)"
          className="border px-2 py-1 rounded"
        />

        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          className="border px-2 py-1 rounded"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isAvailable"
            checked={formData.isAvailable}
            onChange={handleChange}
          />
          Available
        </label>

        <div className="flex gap-2 mt-3">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Save
          </button>
          <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default MenuForm
