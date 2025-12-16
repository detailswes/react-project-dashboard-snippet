import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import EmailAuth from "./pages/EmailAuth";
import PhoneAuth from "./pages/PhoneAuth";
import "react-toastify/dist/ReactToastify.css";
import Projects from "./pages/Projects";

import "./i18n";

function App(): React.ReactElement {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/auth" />} />
            <Route path="/auth" element={<PhoneAuth />} />
            <Route path="/auth/email" element={<EmailAuth />} />
            <Route path="/pro" element={<Projects />} />
        </Routes>
    );
}

export default App;
