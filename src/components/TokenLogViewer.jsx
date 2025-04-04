import { useEffect, useState } from "react";
import api from "../api/axios";

function TokenLogViewer() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchLogs() {
      try {
        const res = await api.get("/admin/logs");
        if (res.data.success && Array.isArray(res.data.logs)) {
          setLogs(res.data.logs);
        } else {
          setLogs([]); // safe fallback
          setError("No logs found");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching logs");
      } finally {
        setLoading(false);
      }
    }

    fetchLogs();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Token Usage Log</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && logs.length === 0 && <p>No usage logs yet.</p>}

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="py-2 px-3">User ID</th>
              <th className="py-2 px-3">Model</th>
              <th className="py-2 px-3">Tokens</th>
              <th className="py-2 px-3">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, i) => (
              <tr key={i} className="border-b">
                <td className="py-1 px-3 font-mono">{log.user_id}</td>
                <td className="py-1 px-3">{log.model}</td>
                <td className="py-1 px-3">{log.tokens}</td>
                <td className="py-1 px-3 text-xs text-gray-600">
                  {new Date(log.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TokenLogViewer;
