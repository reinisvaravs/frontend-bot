import { useState } from "react";
import api from "../api/axios.js";

function UserMemoryViewer() {
  const [userId, setUserId] = useState("");
  const [memory, setMemory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMemory = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get(`/admin/memory/${userId}`);
      if (res.data.success && res.data.memory.length) {
        setMemory(res.data.memory);
      } else {
        setMemory([]);
        setError("No memory found for this user.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch memory.");
    } finally {
      setLoading(false);
    }
  };

  const resetMemory = async () => {
    if (!userId) return;

    setLoading(true);
    setError("");

    try {
      const res = await api.post(`/admin/memory/${userId}/reset`);
      if (res.data.success) {
        setMemory([]);
        setError(""); // clear message
      } else {
        setError("Failed to reset memory.");
      }
    } catch (err) {
      console.error(err);
      setError("Error resetting memory.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-xl mx-auto mt-8 p-4 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          User Memory Viewer
        </h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded px-3 py-2"
            placeholder="Enter Discord User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <button
            onClick={fetchMemory}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Fetch
          </button>
        </div>

        {loading && <p className="text-sm text-gray-500">Loading...</p>}
        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="space-y-2 mt-4">
          {memory.map((msg, i) => (
            <div key={i} className="border p-2 rounded bg-gray-50">
              <span className="text-sm font-medium">
                {msg.role} ({msg.name})
              </span>
              <p className="text-gray-800">{msg.content}</p>
            </div>
          ))}
        </div>
      </div>
      {memory.length > 0 && (
        <button
          onClick={resetMemory}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          🧹 Reset Memory
        </button>
      )}
    </>
  );
}

export default UserMemoryViewer;
