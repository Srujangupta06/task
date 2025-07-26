import { Routes, Route } from "react-router-dom";
import Registration from "./Screens/Registration";
import Users from "./Screens/Users";
function App() {
  return (
    <Routes>
      <Route element={<Registration />} path="/" />
      <Route element={<Users />} path="/users" />
    </Routes>
  );
}

export default App;
