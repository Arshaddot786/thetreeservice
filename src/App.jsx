import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import ServiceAreas from "./pages/ServiceAreas";
import ServicePage from "./pages/ServicePage";
import Blog from "./pages/Blog";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service-areas" element={<ServiceAreas />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
