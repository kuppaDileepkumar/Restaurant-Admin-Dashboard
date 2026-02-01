const Order = require('../models/Order')

/**
 * GET /api/orders
 * Query params: page, limit, status
 */
exports.getAllOrders = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const status = req.query.status

    const filter = {}
    if (status) filter.status = status

    const totalOrders = await Order.countDocuments(filter)

    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)

    res.json({
      totalOrders,
      currentPage: page,
      totalPages: Math.ceil(totalOrders / limit),
      orders
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

/**
 * GET /api/orders/:id
 */
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      'items.menuItem'
    )

    if (!order)
      return res.status(404).json({ message: 'Order not found' })

    res.json(order)
  } catch (error) {
    res.status(400).json({ error: 'Invalid order ID' })
  }
}

/**
 * POST /api/orders
 */
exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body)
    res.status(201).json(order)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

/**
 * PATCH /api/orders/:id/status
 */
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body

    const allowedStatuses = [
      'Pending',
      'Preparing',
      'Ready',
      'Delivered',
      'Cancelled'
    ]

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' })
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )

    if (!order)
      return res.status(404).json({ message: 'Order not found' })

    res.json({
      message: 'Order status updated',
      order
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
