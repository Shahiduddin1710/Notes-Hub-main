import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import {
  useEffect,
  useState,
  Suspense,
  createContext,
  useContext,
} from "react";

import { AnimatePresence } from "framer-motion";
import { authRoutes } from "./auth/auth.routes";

import Dashboard from "./pages/Dashboard";
import AccessNotes from "./pages/AccessNotes";
import ContactUs from "./pages/ContactUs";
import Subjects from "./pages/Subjects";
import Files from "./pages/Files";

import Navbar from "./components/Navbar";
import PageWrapper from "./components/PageWrapper";
import ScrollToTop from "./components/ScrollToTop";
import Disclaimer from "./pages/Disclaimer";
import TermsModal from "./components/TermsModal";

import "./App.css";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }

    setIsLoading(false);
  }, []);

  const login = (userData, token) => {
    const updatedUser = {
      ...userData,
      termsAccepted: userData?.termsAccepted ?? false,
    };

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setIsAuthenticated(true);
    setUser(updatedUser);
  };

  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLoading, isAuthenticated, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const [showTerms, setShowTerms] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user && !user.termsAccepted) {
      setShowTerms(true);
    }
  }, [isAuthenticated, user]);

  const handleAcceptTerms = () => {
    const updatedUser = { ...user, termsAccepted: true };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setShowTerms(false);
  };

  const handleDeclineTerms = () => {
    logout();
    setShowTerms(false);
  };

  return (
    <>
      <ScrollToTop />

      {isAuthenticated && <Navbar />}

      {showTerms && (
        <TermsModal
          onAccept={handleAcceptTerms}
          onDecline={handleDeclineTerms}
        />
      )}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <PageWrapper>
                  <Dashboard />
                </PageWrapper>
              </ProtectedRoute>
            }
          />

          <Route
            path="/access-notes"
            element={
              <ProtectedRoute>
                <PageWrapper>
                  <AccessNotes />
                </PageWrapper>
              </ProtectedRoute>
            }
          />

          <Route
            path="/subjects/:university/:semester"
            element={
              <ProtectedRoute>
                <PageWrapper>
                  <Subjects />
                </PageWrapper>
              </ProtectedRoute>
            }
          />

          <Route
            path="/notes/:university/:semester/:subject"
            element={
              <ProtectedRoute>
                <PageWrapper>
                  <Files />
                </PageWrapper>
              </ProtectedRoute>
            }
          />

          <Route
            path="/disclaimer"
            element={
              <ProtectedRoute>
                <PageWrapper>
                  <Disclaimer />
                </PageWrapper>
              </ProtectedRoute>
            }
          />

          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <PageWrapper>
                  <ContactUs />
                </PageWrapper>
              </ProtectedRoute>
            }
          />

          {authRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <AnimatedRoutes />
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}
