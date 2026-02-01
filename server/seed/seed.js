require('dotenv').config()
const mongoose = require('mongoose')
const connectDB = require('../config/db')
const MenuItem = require('../models/MenuItem')
const Order = require('../models/Order')


const seedData = async () => {
  try {
    await connectDB()

    // 🧹 Clear old data
    await MenuItem.deleteMany()
    await Order.deleteMany()
    console.log('Old data cleared 🗑️')

    // 🍽️ Create 10 Menu Items with images
    const menuItems = await MenuItem.insertMany([
      {
        name: 'Paneer Butter Masala',
        description: 'Creamy tomato-based curry with Indian spices',
        category: 'Main Course',
        price: 220,
        ingredients: ['Paneer', 'Butter', 'Tomato', 'Cream', 'Spices'],
        preparationTime: 25,
        isAvailable: true,
        imageUrl: 'http://localhost:5000/images/paneer.jpg'
      },
      {
        name: 'Veg Manchurian',
        description: 'Crispy vegetable balls in spicy sauce',
        category: 'Appetizer',
        price: 150,
        ingredients: ['Cabbage', 'Carrot', 'Garlic', 'Soy Sauce'],
        preparationTime: 15,
        isAvailable: true,
        imageUrl: 'http://localhost:5000/images/VegManchurian.jpg' 
      },
      {
        name: 'Gulab Jamun',
        description: 'Soft milk-solid balls in sugar syrup',
        category: 'Dessert',
        price: 90,
        ingredients: ['Milk Solids', 'Sugar', 'Cardamom'],
        preparationTime: 10,
        isAvailable: true,
        imageUrl: 'http://localhost:5000/images/GulabJamun.jpg' 
      },
      {
        name: 'Masala Chai',
        description: 'Indian spiced tea',
        category: 'Beverage',
        price: 40,
        ingredients: ['Tea Leaves', 'Milk', 'Ginger', 'Cardamom'],
        preparationTime: 5,
        isAvailable: true,
        imageUrl: 'http://localhost:5000/images/MasalaChai.jpg'
      },
      {
        name: 'Butter Naan',
        description: 'Soft Indian flatbread with butter',
        category: 'Main Course',
        price: 30,
        ingredients: ['Wheat Flour', 'Butter', 'Yeast'],
        preparationTime: 10,
        isAvailable: true,
        imageUrl: 'http://localhost:5000/images/ButterNaan.jpg'
      },
      {
        name: 'Veg Spring Rolls',
        description: 'Crispy rolls filled with vegetables',
        category: 'Appetizer',
        price: 120,
        ingredients: ['Cabbage', 'Carrot', 'Capsicum', 'Soy Sauce'],
        preparationTime: 12,
        isAvailable: true,
        imageUrl: 'http://localhost:5000/images/VegSpringRolls.jpg'
      },
      {
        name: 'Chocolate Brownie',
        description: 'Fudgy chocolate dessert',
        category: 'Dessert',
        price: 100,
        ingredients: ['Chocolate', 'Flour', 'Sugar', 'Butter'],
        preparationTime: 15,
        isAvailable: true,
        imageUrl: 'http://localhost:5000/images/ChocolateBrownie.jpg'
      },
      {
        name: 'Lemonade',
        description: 'Refreshing lemon drink',
        category: 'Beverage',
        price: 35,
        ingredients: ['Lemon', 'Sugar', 'Water', 'Mint'],
        preparationTime: 5,
        isAvailable: true,
        imageUrl: 'http://localhost:5000/images/Lemonade.jpg'
      },
      {
        name: 'Paneer Tikka',
        description: 'Grilled marinated paneer cubes',
        category: 'Appetizer',
        price: 180,
        ingredients: ['Paneer', 'Yogurt', 'Spices'],
        preparationTime: 20,
        isAvailable: true,
        imageUrl: 'http://localhost:5000/images/PaneerTikka.jpg'
      },
      {
        name: 'Veg Biryani',
        description: 'Aromatic rice dish with vegetables and spices',
        category: 'Main Course',
        price: 250,
        ingredients: ['Rice', 'Carrot', 'Peas', 'Spices', 'Paneer'],
        preparationTime: 30,
        isAvailable: true,
        imageUrl: 'http://localhost:5000/images/VegBiryani.jpg'
      }
    ])

    console.log('10 Menu items seeded 🍽️')

    // 🧾 Prepare 10 Orders
    const ordersData = [
      { items: [{ menuItem: menuItems[0]._id, quantity: 2, price: 220 }, { menuItem: menuItems[4]._id, quantity: 1, price: 30 }], totalAmount: 470, status: 'Pending', customerName: 'Rahul', tableNumber: 5 },
      { items: [{ menuItem: menuItems[1]._id, quantity: 1, price: 150 }], totalAmount: 150, status: 'Preparing', customerName: 'Anjali', tableNumber: 2 },
      { items: [{ menuItem: menuItems[2]._id, quantity: 3, price: 90 }], totalAmount: 270, status: 'Ready', customerName: 'Kiran', tableNumber: 8 },
      { items: [{ menuItem: menuItems[3]._id, quantity: 2, price: 40 }, { menuItem: menuItems[7]._id, quantity: 1, price: 35 }], totalAmount: 115, status: 'Delivered', customerName: 'Sita', tableNumber: 4 },
      { items: [{ menuItem: menuItems[5]._id, quantity: 2, price: 120 }, { menuItem: menuItems[8]._id, quantity: 1, price: 180 }], totalAmount: 420, status: 'Pending', customerName: 'Ramesh', tableNumber: 7 },
      { items: [{ menuItem: menuItems[9]._id, quantity: 1, price: 250 }], totalAmount: 250, status: 'Preparing', customerName: 'Anitha', tableNumber: 3 },
      { items: [{ menuItem: menuItems[0]._id, quantity: 1, price: 220 }, { menuItem: menuItems[5]._id, quantity: 1, price: 120 }], totalAmount: 340, status: 'Ready', customerName: 'Vikram', tableNumber: 6 },
      { items: [{ menuItem: menuItems[4]._id, quantity: 3, price: 30 }], totalAmount: 90, status: 'Cancelled', customerName: 'Priya', tableNumber: 1 },
      { items: [{ menuItem: menuItems[6]._id, quantity: 2, price: 100 }], totalAmount: 200, status: 'Pending', customerName: 'Amit', tableNumber: 9 },
      { items: [{ menuItem: menuItems[1]._id, quantity: 1, price: 150 }, { menuItem: menuItems[9]._id, quantity: 1, price: 250 }], totalAmount: 400, status: 'Delivered', customerName: 'Neha', tableNumber: 12 }
    ]

    // ✅ Generate unique orderNumber for each order
    ordersData.forEach((order, index) => {
      order.orderNumber = `ORD-${Date.now()}-${index}`
    })

    // Insert orders
    await Order.insertMany(ordersData)

    console.log('10 Orders seeded 🧾')

    process.exit()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

seedData()
