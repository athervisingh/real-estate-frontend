import "./App.css";
import Navbar from "./component/navbar";
import { Routes, Route } from "react-router-dom";
import AdminPanel from "./routes/AdminPanel.jsx";
import HomePage from "./routes/HomePage.jsx";
import Emiratepages from "./routes/Emiratepages.jsx";
import AreaPage from "./routes/AreaPage.jsx";
import PropertyDetailPage from "./routes/PropertyDetailPage.jsx";
import ContactPage from "./routes/ContactPage.jsx";
import AboutPage from './routes/AboutPage.jsx';
import Footer from "./component/footer.jsx";
import ScrollToTop from "./component/scrollToTop.jsx";
import Login from "./routes/Login.jsx";
import ResetPassword from "./routes/ResetPassword.jsx";
import ForgotPassword from './routes/ForgetPassword.jsx';
import PrivateRoute from "./component/privateRoute.jsx";
import SobhaPage from "./routes/SobhaPage.jsx";
import Page3DSpace from "./routes/Page3DSpace.jsx";
function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<><ContactPage /><Footer /></>} />
        <Route path="/about" element={<><AboutPage /><Footer/></>} />
        <Route path="/admin/dashboard" element={<>
          <PrivateRoute>
            <AdminPanel /><Footer/>
          </PrivateRoute></>} />
        <Route path="/dubai/sobha" element={<><SobhaPage /><Footer /></>} />
        <Route path="/:cityName" element={<><Emiratepages /><Footer/></>} />
        <Route path="/:cityName/:areaName" element={<><AreaPage /><Footer/></>} />
        <Route path="/property/:propertySlug" element={<><PropertyDetailPage /><Footer/></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/3dspace" element={<><Page3DSpace /><Footer /></>} />
      </Routes>
    </>
  );
}

export default App;
