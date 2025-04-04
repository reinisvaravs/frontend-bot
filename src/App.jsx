import UserMemoryViewer from "./components/UserMemoryViewer";
import TokenLogViewer from "./components/TokenLogViewer";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <UserMemoryViewer />
      <TokenLogViewer />
    </div>
  );
}

export default App;
