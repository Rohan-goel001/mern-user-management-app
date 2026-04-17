import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch users
  const getUsers = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:3000/users");
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Add or Update user
  const addUser = async () => {
    if (!name || !age) {
      alert("Please fill all fields");
      return;
    }

    if (editId) {
      await fetch(`http://localhost:3000/update-user/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, age }),
      });
      alert("User updated!");
      setEditId(null);
    } else {
      await fetch("http://localhost:3000/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, age }),
      });
      alert("User added!");
    }

    setName("");
    setAge("");
    getUsers();
  };

  // Delete user
  const deleteUser = async (id) => {
    await fetch(`http://localhost:3000/delete-user/${id}`, {
      method: "DELETE",
    });
    getUsers();
  };

  return (
    <div className="container">
      <h1 className="title">User Management</h1>

      <div className="form">
        <input
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Enter age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <button onClick={addUser}>
          {editId ? "Update User" : "Add User"}
        </button>
      </div>

      {/* Loading */}
      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}

      {/* Empty State */}
      {!loading && users.length === 0 && (
        <p style={{ textAlign: "center", color: "#555" }}>
          No users found. Add one!
        </p>
      )}

      {/* Users */}
      {users.map((u) => (
        <div className="user-card" key={u._id}>
          <div>
            <strong>{u.name}</strong> ({u.age})
          </div>

          <div className="actions">
            <button
              onClick={() => {
                setName(u.name);
                setAge(u.age);
                setEditId(u._id);
              }}
            >
              Edit
            </button>

            <button
              className="delete"
              onClick={() => deleteUser(u._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;