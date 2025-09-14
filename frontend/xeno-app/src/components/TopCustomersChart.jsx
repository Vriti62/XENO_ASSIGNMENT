"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

const TopCustomersChart = ({ topCustomers }) => {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")

    const customerNames = topCustomers.map((customer) => customer.name || "Unknown")
    const customerSpending = topCustomers.map((customer) => customer.totalSpent || 0)

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: customerNames,
        datasets: [
          {
            label: "Total Spent ($)",
            data: customerSpending,
            backgroundColor: [
              "rgba(59, 130, 246, 0.8)",
              "rgba(34, 197, 94, 0.8)",
              "rgba(245, 158, 11, 0.8)",
              "rgba(239, 68, 68, 0.8)",
              "rgba(147, 51, 234, 0.8)",
            ],
            borderColor: [
              "rgb(59, 130, 246)",
              "rgb(34, 197, 94)",
              "rgb(245, 158, 11)",
              "rgb(239, 68, 68)",
              "rgb(147, 51, 234)",
            ],
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
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
              text: "Customers",
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: "Total Spent (Rs.)",
            },
            beginAtZero: true,
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [topCustomers])

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Top 5 Customers</h3>
        <p className="card-description">Customers by total spending</p>
      </div>
      <div className="card-content">
        <div className="h-80">
          <canvas ref={chartRef}></canvas>
        </div>
        <div className="mt-4 space-y-2">
          {topCustomers.map((customer, index) => (
            <div key={customer.id || index} className="flex justify-between items-center text-sm">
              <span className="font-medium">{customer.name || "Unknown"}</span>
              <span className="text-muted-foreground">${(customer.totalSpent || 0).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TopCustomersChart
