const express = require('express')
const router = express.Router()

const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus
} = require('../controllers/orderController')

router.get('/', getAllOrders)
router.get('/:id', getOrderById)
router.post('/', createOrder)
router.patch('/:id/status', updateOrderStatus)

module.exports = router
