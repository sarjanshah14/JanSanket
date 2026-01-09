
import React, { useState, useEffect, useRef } from "react";

function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const bellRef = useRef();

  // Function to fetch initial notifications
  const fetchInitialNotifications = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000'}/api/disasters/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} `);
      }
      const data = await response.json();


      // Get dismissed IDs from local storage
      const dismissedIds = JSON.parse(localStorage.getItem("dismissedNotifications") || "[]");

      // Filter: Only VERIFIED disasters, NOT dismissed, and created within the last 24 HOURS
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

      const newNotes = data
        .filter(d => {
          if (!d.is_verified) return false;
          if (dismissedIds.includes(d.id)) return false;

          // Time check
          const disasterTime = new Date(d.timestamp || d.created_at);
          return disasterTime > oneDayAgo;
        })
        .map(disaster => ({
          id: disaster.id,
          type: disaster.type,
          address: disaster.address,
          message: disaster.description,
          timestamp: new Date(disaster.timestamp || disaster.created_at),
        }));

      setNotifications(newNotes.reverse()); // Display newest first
    } catch (error) {
      console.error("Error fetching initial notifications:", error);
    }
  };

  useEffect(() => {
    // Fetch initial notifications
    fetchInitialNotifications();

    // Polling for new notifications every 30 seconds
    const interval = setInterval(fetchInitialNotifications, 30000);
    return () => clearInterval(interval);
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

    // Save to local storage so it doesn't come back on refresh
    const dismissedIds = JSON.parse(localStorage.getItem("dismissedNotifications") || "[]");
    if (!dismissedIds.includes(id)) {
      dismissedIds.push(id);
      localStorage.setItem("dismissedNotifications", JSON.stringify(dismissedIds));
    }
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
        <div className="notification-dropdown">
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
