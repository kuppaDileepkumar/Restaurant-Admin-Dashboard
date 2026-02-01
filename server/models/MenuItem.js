const mongoose = require('mongoose')

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true, // indexed
      trim: true
    },
    description: {
      type: String
    },
    category: {
      type: String,
      required: true,
      enum: ['Appetizer', 'Main Course', 'Dessert', 'Beverage']
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    ingredients: {
      type: [String] // array of strings
    },
    isAvailable: {
      type: Boolean,
      default: true
    },
    preparationTime: {
      type: Number // in minutes
    },
    imageUrl: {
      type: String
    }
  },
  {
    timestamps: true // createdAt & updatedAt
  }
)

module.exports = mongoose.model('MenuItem', menuItemSchema)
