import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/common/Layout";
import AuthProvider from "./components/provider/auth/AuthProvider";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Todos from "./pages/Todos";
import UserName from "./pages/UserName";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route index element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/signup/name' element={<UserName />} />
            <Route path='/todos' element={<Todos />} />
            <Route path='/todos/profile' element={<Profile />} />
            <Route path='/forgotpassword' element={<ForgotPassword />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}
