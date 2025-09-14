"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

export default function OrdersChart({ ordersData }) {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")

    // Group orders by date
    const ordersByDate = ordersData.reduce((acc, order) => {
      const date = new Date(order.created_at).toLocaleDateString()
      if (!acc[date]) {
        acc[date] = { count: 0, revenue: 0 }
      }
      acc[date].count += 1
      acc[date].revenue += Number(order.order_price)
      return acc
    }, {})

    const dates = Object.keys(ordersByDate).sort()
    const counts = dates.map((date) => ordersByDate[date].count)
    const revenues = dates.map((date) => ordersByDate[date].revenue)

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: dates,
        datasets: [
          {
            label: "Orders Count",
            data: counts,
            borderColor: "rgb(59, 130, 246)",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            tension: 0.4,
            yAxisID: "y",
          },
          {
            label: "Revenue ($)",
            data: revenues,
            borderColor: "rgb(34, 197, 94)",
            backgroundColor: "rgba(34, 197, 94, 0.1)",
            tension: 0.4,
            yAxisID: "y1",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: false,
          },
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: "Date",
            },
          },
          y: {
            type: "linear",
            display: true,
            position: "left",
            title: {
              display: true,
              text: "Orders Count",
            },
          },
          y1: {
            type: "linear",
            display: true,
            position: "right",
            title: {
              display: true,
              text: "Revenue (Rs.)",
            },
            grid: {
              drawOnChartArea: false,
            },
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [ordersData])

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Orders Over Time</h3>
        <p className="card-description">Orders count and revenue by date</p>
      </div>
      <div className="card-content">
        <div className="h-80">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  )
}
