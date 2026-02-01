// src/pages/Dashboard.jsx
import React, { useEffect, useState, useCallback } from 'react'
import { getOrders, updateOrderStatus } from '../services/orderService'

const statuses = ['Pending', 'Preparing', 'Ready', 'Delivered', 'Cancelled']

const Dashboard = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [statusFilter, setStatusFilter] = useState('')
  const [page, setPage] = useState(1)
  const [limit] = useState(5)
  const [totalPages, setTotalPages] = useState(1)
  const [expandedOrderId, setExpandedOrderId] = useState(null)

  const fetchOrders =  useCallback(async () => {
    setLoading(true)
    try {
      const data = await getOrders({ status: statusFilter, page, limit })
      setOrders(data.orders)
      setTotalPages(data.totalPages)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  },[statusFilter, page,limit])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  const handleStatusChange = async (orderId, newStatus) => {
    await updateOrderStatus(orderId, newStatus)
    fetchOrders()
  }

  const toggleExpand = (id) => {
    setExpandedOrderId(expandedOrderId === id ? null : id)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Orders Dashboard</h1>

      {/* Status Filter */}
      <div className="mb-4 flex gap-4 items-center">
        <label>Status Filter:</label>
        <select
          value={statusFilter}
          onChange={(e) => {
            setPage(1)
            setStatusFilter(e.target.value)
          }}
          className="border px-2 py-1 rounded"
        >
          <option value="">All</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full border rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">Order #</th>
              <th className="border px-2 py-1">Customer</th>
              <th className="border px-2 py-1">Table</th>
              <th className="border px-2 py-1">Total</th>
              <th className="border px-2 py-1">Status</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <React.Fragment key={order._id}>
                <tr className="hover:bg-gray-100">
                  <td className="border px-2 py-1">{order.orderNumber || order._id}</td>
                  <td className="border px-2 py-1">{order.customerName}</td>
                  <td className="border px-2 py-1">{order.tableNumber}</td>
                  <td className="border px-2 py-1">₹{order.totalAmount}</td>
                  <td className="border px-2 py-1">
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        order.status === 'Pending'
                          ? 'bg-yellow-500'
                          : order.status === 'Preparing'
                          ? 'bg-blue-500'
                          : order.status === 'Ready'
                          ? 'bg-purple-500'
                          : order.status === 'Delivered'
                          ? 'bg-green-500'
                          : 'bg-red-500'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="border px-2 py-1 flex gap-2">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="border px-1 rounded"
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => toggleExpand(order._id)}
                      className="bg-gray-400 px-2 py-1 rounded text-white"
                    >
                      {expandedOrderId === order._id ? 'Hide' : 'Details'}
                    </button>
                  </td>
                </tr>

                {expandedOrderId === order._id && (
                  <tr>
                    <td colSpan={6} className="bg-gray-50 p-4">
                      <h3 className="font-bold mb-2">Items:</h3>
                      <ul className="list-disc pl-5">
                        {order.items.map((item, idx) => (
                          <li key={idx}>
                            {item.menuItem?.name || 'Item'} x {item.quantity} - ₹{item.price}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <div className="mt-4 flex gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-2 py-1 border rounded">{page}</span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Dashboard
