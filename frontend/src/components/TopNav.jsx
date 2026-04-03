import homeWhite from "../assets/icon-home-white.png";
import homeBlack from "../assets/icon-home-black.png";
import locationWhite from "../assets/icon-location-white.png";
import locationBlack from "../assets/icon-location-black.png";
import heartWhite from "../assets/icon-heart-white.png";
import heartBlack from "../assets/icon-heart-black.png";
import starWhite from "../assets/icon-star-white.png";
import starBlack from "../assets/icon-star-black.png";

function TopNav({
  activeSection,
  onChangeSection,
  onOpenAdmin,
  isAdminLogged,
  pendingCount,
}) {
  const getIcon = (section, whiteIcon, blackIcon) => {
    return activeSection === section ? blackIcon : whiteIcon;
  };

  return (
    <nav className="top-nav">
      <div className="top-nav-center">
        <button
          className={`nav-pill ${activeSection === "home" ? "active" : ""}`}
          onClick={() => onChangeSection("home")}
          type="button"
        >
          <img
            src={getIcon("home", homeWhite, homeBlack)}
            alt="Home"
            className="nav-icon"
          />
        </button>

        <button
          className={`nav-pill ${activeSection === "location" ? "active" : ""}`}
          onClick={() => onChangeSection("location")}
          type="button"
        >
          <img
            src={getIcon("location", locationWhite, locationBlack)}
            alt="Location"
            className="nav-icon"
          />
        </button>

        <button
          className={`nav-pill ${activeSection === "heart" ? "active" : ""}`}
          onClick={() => onChangeSection("heart")}
          type="button"
        >
          <img
            src={getIcon("heart", heartWhite, heartBlack)}
            alt="Heart"
            className="nav-icon"
          />
        </button>

        <button
          className={`nav-pill ${activeSection === "star" ? "active" : ""}`}
          onClick={() => onChangeSection("star")}
          type="button"
        >
          <img
            src={getIcon("star", starWhite, starBlack)}
            alt="Star"
            className="nav-icon"
          />
        </button>
      </div>

      <button
        className={`admin-button ${isAdminLogged ? "admin-button-logged" : "admin-button-public"}`}
        onClick={onOpenAdmin}
        type="button"
        title="Área de administración"
      >
        <svg
          className="admin-icon-svg"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-4.418 0-8 2.239-8 5v3h16v-3c0-2.761-3.582-5-8-5z"
            fill="currentColor"
          />
        </svg>

        {isAdminLogged && pendingCount > 0 && (
          <span className="admin-notification-badge">{pendingCount}</span>
        )}
      </button>
    </nav>
  );
}

export default TopNav;