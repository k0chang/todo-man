import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/common/Layout";
import AuthProvider from "./components/provider/auth/AuthProvider";
import { useAuthContext } from "./hooks/useAuthContext";
import Exit from "./pages/Exit";
import Forgot from "./pages/Forgot";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import SentEmail from "./pages/SentEmail";
import Signup from "./pages/Signup";
import Todos from "./pages/Todos";

export default function App() {
  const { user } = useAuthContext();
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route index element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/signup/sent-email' element={<SentEmail />} />
            <Route path='/todos' element={<Todos />} />
            <Route path='/todos/profile' element={<Profile />} />
            <Route path='/forgot' element={<Forgot />} />
            <Route path='/exit' element={<Exit />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}
