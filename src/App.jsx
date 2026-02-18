import { BrowserRouter, Routes, Route } from "react-router-dom";
import Session from "./pages/Session";
import PostSessionForm from "./pages/PostSessionForm";

import FeedbackPage from "./pages/Feedback";
import HistoryLookup from "./pages/HistoryLookup";
import InternalSessionsPage from "./pages/InternalSessionsPage";


export default function App() {
  return (
    <BrowserRouter>

     
      <Routes>
        <Route path="/" element={<Session />} />
       
        <Route path="/form" element={<PostSessionForm />} />
         <Route path="/feedback/:sessionId" element={<FeedbackPage />} />
          <Route path="/history" element={<HistoryLookup />} />
       <Route path="/internal/sessions" element={<InternalSessionsPage />} />

      </Routes>
     

    </BrowserRouter>
  );
}
