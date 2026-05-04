"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  async function fetchOrders() {
    setLoading(true);

    const res = await fetch("/api/get-orders");
    const data = await res.json();

    setOrders(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => {
    fetchOrders();
  }, []);

if (!isLogin) {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d1117",
      color: "#e8edf5",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{
        width: "100%",
        maxWidth: 360,
        background: "#161b24",
        padding: 24,
        borderRadius: 16,
        border: "1px solid rgba(77,184,212,0.2)"
      }}>
        <h2 style={{ marginBottom: 10 }}>Login Admin</h2>
        <p style={{ color: "#8fa3b8", marginBottom: 16 }}>
          Masukkan password admin.
        </p>

        <input
          type="password"
          placeholder="Password admin"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 10,
            border: "1px solid rgba(77,184,212,0.25)",
            background: "#0d1117",
            color: "#fff",
            marginBottom: 12
          }}
        />

        <button
          onClick={async () => {
            const res = await fetch("/api/admin-login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ password })
            });

            const data = await res.json();

            if (data.ok) {
              setIsLogin(true);
              fetchOrders();
            } else {
              alert("Password salah!");
            }
          }}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 10,
            border: "none",
            background: "#4db8d4",
            color: "#fff",
            fontWeight: 700,
            cursor: "pointer"
          }}
        >
          Masuk
        </button>
      </div>
    </div>
  );
}

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d1117",
      color: "#e8edf5",
      padding: 24,
      fontFamily: "Arial, sans-serif"
    }}>
      <h1 style={{ marginBottom: 8 }}>Dashboard Admin</h1>
      <p style={{ color: "#8fa3b8", marginBottom: 24 }}>
        List order masuk dari web auto order.
      </p>

      <button
        onClick={fetchOrders}
        style={{
          padding: "10px 16px",
          borderRadius: 8,
          border: "none",
          background: "#4db8d4",
          color: "#fff",
          marginBottom: 20,
          cursor: "pointer"
        }}
      >
        Refresh Order
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>Belum ada order.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#161b24",
            borderRadius: 12,
            overflow: "hidden"
          }}>
            <thead>
              <tr style={{ background: "#1e2530" }}>
                <th style={th}>Produk</th>
                <th style={th}>Email</th>
                <th style={th}>Amount</th>
                <th style={th}>Status</th>
                <th style={th}>Order ID</th>
                <th style={th}>Transaction ID</th>
                <th style={th}>Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td style={td}>{o.product}</td>
                  <td style={td}>{o.email || "-"}</td>
                  <td style={td}>Rp {Number(o.amount || 0).toLocaleString("id-ID")}</td>
                  <td style={td}>
                    <span style={{
                      padding: "4px 10px",
                      borderRadius: 20,
                      background: o.status === "paid" ? "#14532d" : "#713f12",
                      color: o.status === "paid" ? "#86efac" : "#fde68a",
                      fontSize: 12,
                      fontWeight: 700
                    }}>
                      {o.status}
                    </span>
                  </td>
                  <td style={td}>{o.order_id}</td>
                  <td style={td}>{o.transaction_id}</td>
                  <td style={td}>
                    {o.created_at
                      ? new Date(o.created_at).toLocaleString("id-ID")
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const th = {
  padding: 12,
  textAlign: "left",
  fontSize: 13,
  color: "#67d5e8",
  borderBottom: "1px solid rgba(255,255,255,0.08)"
};

const td = {
  padding: 12,
  fontSize: 13,
  borderBottom: "1px solid rgba(255,255,255,0.06)",
  color: "#e8edf5",
  whiteSpace: "nowrap"
};