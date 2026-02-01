const MenuItem = require('../models/MenuItem')

/**
 * GET /api/menu
 * Filters: category, availability, minPrice, maxPrice
 */
exports.getAllMenuItems = async (req, res) => {
  try {
    const { category, availability, minPrice, maxPrice, q } = req.query

    const filter = {}

    if (category) filter.category = category
    if (availability !== undefined)
      filter.isAvailable = availability === 'true'

    if (minPrice || maxPrice) {
      filter.price = {}
      if (minPrice) filter.price.$gte = Number(minPrice)
      if (maxPrice) filter.price.$lte = Number(maxPrice)
    }

    // ✅ SEARCH LOGIC (IMPORTANT)
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { ingredients: { $regex: q, $options: 'i' } }
      ]
    }

    const menuItems = await MenuItem.find(filter)
    res.json(menuItems)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


/**
 * GET /api/menu/search?q=query
 */
exports.searchMenuItems = async (req, res) => {
  try {
    const { q } = req.query

    if (!q) {
      return res.status(400).json({ message: 'Search query is required' })
    }

    const items = await MenuItem.find({
      $text: { $search: q }
    })

    res.json(items)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

/**
 * GET /api/menu/:id
 */
exports.getMenuItemById = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id)
    if (!item) return res.status(404).json({ message: 'Menu item not found' })

    res.json(item)
  } catch (error) {
    res.status(400).json({ error: 'Invalid ID' })
  }
}

/**
 * POST /api/menu
 */
exports.createMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.create(req.body)
    res.status(201).json(menuItem)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

/**
 * PUT /api/menu/:id
 */
exports.updateMenuItem = async (req, res) => {
  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!updatedItem)
      return res.status(404).json({ message: 'Menu item not found' })

    res.json(updatedItem)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

/**
 * DELETE /api/menu/:id
 */
exports.deleteMenuItem = async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id)

    if (!deletedItem)
      return res.status(404).json({ message: 'Menu item not found' })

    res.json({ message: 'Menu item deleted successfully 🗑️' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

/**
 * PATCH /api/menu/:id/availability
 */
exports.toggleAvailability = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id)
    if (!item) return res.status(404).json({ message: 'Menu item not found' })

    item.isAvailable = !item.isAvailable
    await item.save()

    res.json({
      message: 'Availability updated',
      isAvailable: item.isAvailable
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
