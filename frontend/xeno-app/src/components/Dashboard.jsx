import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import OrdersChart from "./OrdersChart";

export default function Dashboard({ user, onLogout }) {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [ordersData, setOrdersData] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    // Initial load ke liye
    fetchDashboardData();
  }, [user.id]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const customersResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/api/data/customers-count`,
        { credentials: "include" }
      );
      const customersData = await customersResponse.json();
      setTotalCustomers(customersData.total_customers);

      const ordersResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/api/data/orders-by-date?store=${user.id}&startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`,
        { credentials: "include" }
      );
      const ordersData = await ordersResponse.json();
      setOrdersData(ordersData.orders || []);

      const topCustomersResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/api/data/top-customers?store=${user.id}`,
        { credentials: "include" }
      );
      const topCustomersData = await topCustomersResponse.json();
      setTopCustomers(topCustomersData.topCustomers || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e) => {
    setDateRange({
      ...dateRange,
      [e.target.name]: e.target.value,
    });
  };

  const cardStyle = {
    backgroundColor: "#fdf7f5ff",
    borderRadius: "12px",
    boxShadow: "0 1px 3px rgba(226, 234, 235, 1)",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
  };

  const cardHeaderStyle = {
    marginBottom: "12px",
  };

  const cardTitleStyle = {
    fontSize: "18px",
    fontWeight: 700,
    color: "#b2b9c9ff",
  };

  const metricsStyle = {
    fontSize: "32px",
    fontWeight: 900,
    color: "#37b1cfff",
  };

  const inputStyle = {
    padding: "8px 12px",
    border: "1px solid #99adccff",
    borderRadius: "6px",
    fontSize: "14px",
    outline: "none",
  };

  const gridStyle = {
    display: "grid",
    gap: "24px",
  };

  const gridCols3 = {
    gridTemplateColumns: "repeat(3, 1fr)",
  };

  const gridCols2 = {
    gridTemplateColumns: "repeat(2, 1fr)",
  };

  const loadingStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "200px",
    fontSize: "18px",
    color: "#757c88ff",
  };

  const chartContainerStyle = {
    width: "100%",
    maxWidth: "500px",
    height: "300px",
    margin: "auto",
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#e1e5e9ff" }}>
      {/* Header */}
      <header
        style={{
          backgroundColor: "#1c5391ff",
          borderBottom: "1px solid #e5e7eb",
          padding: "16px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1 style={{ fontSize: "30px", fontWeight: 900, color: "#cececeff" }}>
            Shopify Analytics
          </h1>
          <p style={{ fontsize:"20px", color: "#082d79ff" }}>Welcome back, {user.store_name}</p>
        </div>
        <button
          onClick={onLogout}
          style={{
            backgroundColor: "#bbddecff",
            border: "5px solid #c7cedaff",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main style={{ padding: "24px" }}>
        {loading ? (
          <div style={loadingStyle}>Loading dashboard...</div>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            {/* Date Range Controls */}
            <div style={cardStyle}>
              <div style={cardHeaderStyle}>
                <h3 style={cardTitleStyle}>Date Range</h3>
                <p style={{ color: "#6b7280", fontSize: "14px" }}>
                  Select date range for orders data
                </p>
              </div>
              <div style={{ display: "flex", gap: "16px", alignItems: "flex-end" }}>
                <div>
                  <label
                    htmlFor="startDate"
                    style={{ display: "block", fontSize: "14px", marginBottom: "4px" }}
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={dateRange.startDate}
                    onChange={handleDateChange}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label
                    htmlFor="endDate"
                    style={{ display: "block", fontSize: "14px", marginBottom: "4px" }}
                  >
                    End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={dateRange.endDate}
                    onChange={handleDateChange}
                    style={inputStyle}
                  />
                </div>

                {/* Submit button */}
                <button
                  onClick={fetchDashboardData}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#69c8e0ff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: 600,
                    height: "38px",
                  }}
                >
                  Submit
                </button>
              </div>
            </div>

            {/* Metrics Cards */}
            <div style={{ ...gridStyle, ...gridCols3 }}>
              <div style={cardStyle}>
                <div style={cardHeaderStyle}>
                  <h3 style={cardTitleStyle}>Total Customers</h3>
                </div>
                <div style={metricsStyle}>
                  {Number(totalCustomers || 0).toLocaleString()}
                </div>
              </div>
              <div style={cardStyle}>
                <div style={cardHeaderStyle}>
                  <h3 style={cardTitleStyle}>Total Orders</h3>
                </div>
                <div style={metricsStyle}>
                  {ordersData.length.toLocaleString()}
                </div>
              </div>
              <div style={cardStyle}>
                <div style={cardHeaderStyle}>
                  <h3 style={cardTitleStyle}>Total Revenue</h3>
                </div>
                <div style={metricsStyle}>
                  ₹
                  {ordersData
                    .reduce((sum, order) => sum + Number(order.order_price), 0)
                    .toLocaleString()}
                </div>
              </div>
            </div>

            {/* Charts */}
            <div style={{ ...gridStyle, ...gridCols2 }}>
              <div style={cardStyle}>
                <OrdersChart ordersData={ordersData} />
              </div>
              <div style={{ ...cardStyle, ...chartContainerStyle }}>
                <h3 style={cardTitleStyle}>Top Customers</h3>
                <Pie
                  data={{
                    labels: topCustomers.map((c) => c.name),
                    datasets: [
                      {
                        label: "Top Customers",
                        data: topCustomers.map((c) => c.totalSpent),
                        backgroundColor: [
                          "#5b8bc2ff",
                          "#ddceb4ff",
                          "#92dac2ff",
                          "#d3c5c5ff",
                          "#c6bedaff",
                        ],
                      },
                    ],
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
