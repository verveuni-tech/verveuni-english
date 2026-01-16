import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Session from "./pages/Session";
import PostSessionForm from "./pages/PostSessionForm";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FeedbackPage from "./pages/Feedback";
import HistoryLookup from "./pages/HistoryLookup";


export default function App() {
  return (
    <BrowserRouter>

      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/session" element={<Session />} />
        <Route path="/form" element={<PostSessionForm />} />
         <Route path="/feedback/:sessionId" element={<FeedbackPage />} />
          <Route path="/history" element={<HistoryLookup />} />
       
      </Routes>
      <Footer />

    </BrowserRouter>
  );
}
