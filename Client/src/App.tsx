import NavBar from "./components/NavBar";
import Keep from "./components/Keep";
import { Route, Routes } from "react-router-dom";
export default  function App() {
  return (
    <>
    <NavBar/>
    <Routes>
      <Route
      path="/"
      element={<Keep/>}
      />
      <Route
      path="/Notes"/>
      <Route
      path="/Reminders"/>
      <Route
      path="/Archive"/>
      <Route
      path="/Bin"/>
    </Routes>
    </>
  )
}

