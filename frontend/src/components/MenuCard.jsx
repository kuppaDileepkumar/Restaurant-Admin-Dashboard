// src/components/MenuCard.jsx
import React from 'react'

const MenuCard = ({ item, onEdit, onDelete, onToggleAvailability }) => {
  return (
    <div className="border rounded shadow p-4 flex flex-col">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="h-40 w-full object-cover rounded mb-2"
      />
      <h2 className="font-bold text-lg">{item.name}</h2>
      <p className="text-sm text-gray-600">{item.description}</p>
      <p className="font-semibold mt-1">₹{item.price}</p>
      <p className="mt-1 text-gray-500">{item.category}</p>

      <div className="mt-auto flex gap-2 items-center">
        <button
          onClick={onToggleAvailability}
          className={`px-3 py-1 rounded text-white ${item.isAvailable ? 'bg-green-500' : 'bg-red-500'}`}
        >
          {item.isAvailable ? 'Available' : 'Unavailable'}
        </button>

        <button onClick={onEdit} className="bg-yellow-500 px-2 py-1 rounded text-white">
          Edit
        </button>
        <button onClick={onDelete} className="bg-red-600 px-2 py-1 rounded text-white">
          Delete
        </button>
      </div>
    </div>
  )
}

export default MenuCard
