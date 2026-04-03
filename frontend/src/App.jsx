import { useEffect, useState } from "react";
import IntroScreen from "./components/IntroScreen";
import TopNav from "./components/TopNav";
import HomeSection from "./components/HomeSection";
import LocationSection from "./components/LocationSection";
import HeartSection from "./components/HeartSection";
import StarSection from "./components/StarSection";
import AuthModal from "./components/AuthModal";
import MessageInbox from "./components/MessageInbox";
import Footer from "./components/Footer";

const API_BASE = "http://localhost:3001";

function App() {
  const [started, setStarted] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [homeView, setHomeView] = useState("landing");

  const [authOpen, setAuthOpen] = useState(false);
  const [messagesOpen, setMessagesOpen] = useState(false);
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("adminToken") || ""
  );

  const [pendingCount, setPendingCount] = useState(0);

  const fetchPendingCount = async (tokenToUse) => {
    if (!tokenToUse) {
      setPendingCount(0);
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/messages/pending-count`, {
        headers: {
          Authorization: `Bearer ${tokenToUse}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "No se pudo obtener el contador");
      }

      setPendingCount(data.total || 0);
    } catch (error) {
      console.error("Error al obtener mensajes pendientes:", error);
    }
  };

  const handleNavChange = (section) => {
    setActiveSection(section);

    if (section === "home") {
      setHomeView("landing");
    }
  };

  const goToTatamiContact = () => {
    setActiveSection("home");
    setHomeView("contact");
  };

  const handleOpenAdmin = async () => {
    if (!adminToken) {
      setAuthOpen(true);
      return;
    }

    await fetchPendingCount(adminToken);
    setMessagesOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setAdminToken("");
    setMessagesOpen(false);
    setPendingCount(0);
  };

  const handleLogin = async ({ username, password }) => {
    const response = await fetch(`${API_BASE}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Error al iniciar sesión");
    }

    localStorage.setItem("adminToken", data.token);
    setAdminToken(data.token);
    setAuthOpen(false);
    await fetchPendingCount(data.token);
    setMessagesOpen(true);
  };

  useEffect(() => {
    const saved = localStorage.getItem("adminToken");
    if (saved) {
      setAdminToken(saved);
      fetchPendingCount(saved);
    }
  }, []);

  return (
    <div className="app">
      {!started ? (
        <IntroScreen onStart={() => setStarted(true)} />
      ) : (
        <main className="main-screen">
          <TopNav
            activeSection={activeSection}
            onChangeSection={handleNavChange}
            onOpenAdmin={handleOpenAdmin}
            isAdminLogged={Boolean(adminToken)}
            pendingCount={pendingCount}
          />

          {activeSection === "home" && (
            <HomeSection homeView={homeView} setHomeView={setHomeView} />
          )}

          {activeSection === "location" && (
            <LocationSection onContactShortcut={goToTatamiContact} />
          )}

          {activeSection === "heart" && (
            <HeartSection onContactShortcut={goToTatamiContact} />
          )}

          {activeSection === "star" && (
            <StarSection onContactShortcut={goToTatamiContact} />
          )}

          {authOpen && (
            <AuthModal
              onClose={() => setAuthOpen(false)}
              onLogin={handleLogin}
            />
          )}

          {messagesOpen && (
            <MessageInbox
              token={adminToken}
              onClose={() => setMessagesOpen(false)}
              onLogout={handleLogout}
              onMessagesUpdated={() => fetchPendingCount(adminToken)}
            />
          )}

          <Footer />
        </main>
      )}
    </div>
  );
}

export default App;