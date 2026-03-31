import { useEffect, useState } from "react";
import IntroScreen from "./components/IntroScreen";
import TopNav from "./components/TopNav";
import HomeSection from "./components/HomeSection";
import LocationSection from "./components/LocationSection";
import HeartSection from "./components/HeartSection";
import StarSection from "./components/StarSection";
import AuthModal from "./components/AuthModal";
import MessageInbox from "./components/MessageInbox";

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

  const handleOpenAdmin = () => {
    if (!adminToken) {
      setAuthOpen(true);
      return;
    }

    setMessagesOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setAdminToken("");
    setMessagesOpen(false);
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
    setMessagesOpen(true);
  };

  useEffect(() => {
    const saved = localStorage.getItem("adminToken");
    if (saved) {
      setAdminToken(saved);
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
            />
          )}
        </main>
      )}
    </div>
  );
}

export default App;