import React from "react";
import "./style/MainArea.css";

function Subscriptions() {
  // Example data
  const subscriptions = [
    // { id: 1, channel: "Channel Name", thumbnail: "https://via.placeholder.com/160x90" }
  ];

  return (
    <div className="mainarea">
      <div className="mainarea-content">
        <h2>Subscriptions</h2>
        {subscriptions.length === 0 ? (
          <div style={{ color: "#888", fontSize: 20, marginTop: 40 }}>
            No subscriptions yet.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {subscriptions.map((sub) => (
              <div
                key={sub.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "#fafafa",
                  borderRadius: 12,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  padding: 16,
                }}
              >
                <img
                  src={sub.thumbnail}
                  alt={sub.channel}
                  style={{
                    width: 160,
                    height: 90,
                    borderRadius: 8,
                    marginRight: 24,
                  }}
                />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 18 }}>
                    {sub.channel}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Subscriptions;
