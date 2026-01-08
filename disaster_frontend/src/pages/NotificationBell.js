import React, { useState, useEffect, useRef } from "react";

function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const bellRef = useRef();

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/disasters/");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "disaster_alert") {
        const newNotification = {
          id: data.data.id,
          type: data.data.type,
          address: data.data.address,
          message: data.message,
          timestamp: new Date(),
        };
        setNotifications((prev) => [newNotification, ...prev]);
      }
    };

    return () => ws.close();
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (bellRef.current && !bellRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setDropdownOpen((open) => !open);

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((note) => note.id !== id));
  };

  const unreadCount = notifications.length;

  return (
    <div style={{ position: "relative" }} ref={bellRef}>
      <button
        onClick={toggleDropdown}
        style={{
          position: "relative",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "1.5rem",
          color: "#444",
          marginRight: "9px",
        }}
        aria-label="Notifications"
        title="Notifications"
      >
        <i
          className="bi bi-bell btn btn-outline-secondary"
          style={{ fontSize: "1rem", color: "#6c757d" }}
        ></i>

        {unreadCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-6px",
              right: "-6px",
              background: "red",
              color: "white",
              borderRadius: "50%",
              padding: "2px 6px",
              fontSize: "0.6rem",
              fontWeight: "bold",
              userSelect: "none",
            }}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {dropdownOpen && (
        <div
          style={{
            position: "absolute",
            right: 0,
            marginTop: "10px",
            width: "320px",
            maxHeight: "220px",
            overflowY: "auto",
            background: "white",
            boxShadow: "0 3px 12px rgba(0,0,0,0.15)",
            borderRadius: "8px",
            zIndex: 1000,
            fontSize: "0.9rem",
          }}
        >
          {notifications.length === 0 ? (
            <div style={{ padding: "12px", color: "#666" }}>No notifications</div>
          ) : (
            notifications.slice(0, 5).map((note) => (
              <div
                key={note.id}
                style={{
                  borderBottom: "1px solid #eee",
                  padding: "10px",
                  backgroundColor: "#e3f2fd",
                  position: "relative",
                }}
              >
                <strong>
                  {note.type} at {note.address || "Unknown"}
                </strong>
                <div style={{ fontSize: "0.85rem", color: "#555" }}>{note.message}</div>
                <small style={{ color: "#999", fontSize: "0.75rem" }}>
                  {note.timestamp.toLocaleTimeString()}
                </small>
                <button
                  onClick={() => removeNotification(note.id)}
                  style={{
                    position: "absolute",
                    top: "6px",
                    right: "6px",
                    background: "transparent",
                    border: "none",
                    color: "#888",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    cursor: "pointer",
                    lineHeight: 1,
                  }}
                  aria-label="Remove notification"
                  title="Remove notification"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationBell;
