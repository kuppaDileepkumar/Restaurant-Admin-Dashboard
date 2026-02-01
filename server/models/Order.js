const mongoose = require('mongoose')

// Define the schema
const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true
    },
    items: [
      {
        menuItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'MenuItem',
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: 1
        },
        price: {
          type: Number,
          required: true,
          min: 0
        }
      }
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },
    status: {
      type: String,
      enum: ['Pending', 'Preparing', 'Ready', 'Delivered', 'Cancelled'],
      default: 'Pending'
    },
    customerName: {
      type: String,
      required: true
    },
    tableNumber: {
      type: Number,
      required: true,
      min: 1
    }
  },
  {
    timestamps: true // automatically adds createdAt and updatedAt
  }
)

// Auto-generate orderNumber before saving
orderSchema.pre('save', function (next) {
  if (!this.orderNumber) {
    this.orderNumber = `ORD-${Date.now()}`
  }
  next()
})

// Export the model
module.exports = mongoose.model('Order', orderSchema)
