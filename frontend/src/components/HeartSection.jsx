import ContactShortcut from "./ContactShortcut";
import logo from "../assets/logo.png";
import "../index.css";

function HeartSection({ onContactShortcut }) {
  const handleLogoClick = () => {
    alert("Esta experiencia está en proceso de diseño y todavía no está disponible.");
  };

  return (
    <section className="section-page section-with-shortcut heart-layout">
      <div className="heart-values-row">
        <article className="heart-box">
          El Taekwondo pone un fuerte énfasis en el trabajo de piernas,
          desarrollando rapidez, agilidad y flexibilidad.
        </article>

        <article className="heart-box">
          No solo mejora tu estado físico, sino que también promueve una
          mentalidad de respeto, autoconfianza y perseverancia.
        </article>

        <article className="heart-box">
          Con su enfoque en la disciplina y el autocontrol, el Taekwondo es un
          camino hacia el crecimiento personal a cualquier edad.
        </article>
      </div>

      <p className="heart-logo-text">
        Si quieres aprender más sobre el Taekwondo, pincha en nuestro logo:
      </p>

      <button className="heart-logo-button" onClick={handleLogoClick} type="button">
        <img src={logo} alt="Logo del club" className="heart-logo-image" />
      </button>

      <ContactShortcut onClick={onContactShortcut} />
    </section>
  );
}

export default HeartSection;