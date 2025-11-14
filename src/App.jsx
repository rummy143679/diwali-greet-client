import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomeComponent from "./components/HomeComponent/HomeComponent";
import LoginComponent from "./components/LoginComponent/LoginComponent";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import SignupComponent from "./components/SignupComponet/SignupComponent";



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomeComponent />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/signup" element={<SignupComponent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
