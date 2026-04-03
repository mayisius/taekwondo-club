import { useState } from "react";
import girlWhite from "../assets/girl-white.png";
import tatami from "../assets/tatami.png";
import tatamiHub from "../assets/tatami-hub.png";
import kTae from "../assets/k-tae.png";
import kKwon from "../assets/k-kwon.png";
import kDo from "../assets/k-do.png";

import valuesBg from "../assets/home-values-bg.png";
import classesBg from "../assets/home-classes-bg.png";
import socialBg from "../assets/home-social-bg.png";
import contactBg from "../assets/home-contact-bg.png";

const API_BASE = "http://localhost:3001";

function HomeSection({ homeView, setHomeView }) {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState("");

  const handleContactChange = (event) => {
    const { name, value } = event.target;
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    setFormStatus("Enviando...");

    try {
      const response = await fetch(`${API_BASE}/api/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactForm),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "No se pudo enviar el mensaje");
      }

      setContactForm({
        name: "",
        email: "",
        message: "",
      });

      setFormStatus("Mensaje enviado correctamente.");
    } catch (error) {
      setFormStatus(error.message);
    }
  };

  if (homeView === "landing") {
    return (
      <section className="home-stage">
        <div className="main-layout">
          <aside className="korean-column">
            <img src={kTae} alt="Tae" className="korean-syllable" />
            <img src={kKwon} alt="Kwon" className="korean-syllable" />
            <img src={kDo} alt="Do" className="korean-syllable" />
          </aside>

          <section className="hero-card">
            <div className="hero-text-layer">
              <h1 className="hero-club">CLUB</h1>
              <h1 className="hero-taekwondo">TAEKWONDO</h1>
            </div>

            <div className="tatami-wrapper">
              <button
                className="tatami-button"
                onClick={() => setHomeView("hub")}
                type="button"
              >
                <img src={tatami} alt="Tatami" className="tatami-image" />
                <span className="tatami-text blinking-text">
                  Para información sobre las clases haz clic aquí
                </span>
              </button>
            </div>

            <div className="hero-bottom">
              <h2>VILLANUEVA DEL</h2>
              <h2>PARDILLO</h2>
            </div>
          </section>
        </div>

        <img
          src={girlWhite}
          alt="Taekwondo silhouette"
          className="main-girl-page-centered"
        />
      </section>
    );
  }

  if (homeView === "hub") {
    return (
        <section className="tatami-hub-page">
        <button
            type="button"
            className="back-arrow-button"
            onClick={() => setHomeView("landing")}
          >
            ↩
          </button>
          
          <div className="tatami-hub-inner">
            <div className="hub-tatami-zone">
            <img
                src={tatamiHub}
                alt="Tatami desplegado"
                className="hub-tatami-full"
            />

            <button
                type="button"
                className="hub-title hub-title-top-left"
                onClick={() => setHomeView("values")}
            >
                Misión y Valores
            </button>

            <button
                type="button"
                className="hub-title hub-title-top-right"
                onClick={() => setHomeView("classes")}
            >
                Clases y Horarios
            </button>

            <button
                type="button"
                className="hub-title hub-title-bottom-left"
                onClick={() => setHomeView("social")}
            >
                Redes Sociales
            </button>

            <button
                type="button"
                className="hub-title hub-title-bottom-right"
                onClick={() => setHomeView("contact")}
            >
                Contacto
            </button>

            <div className="hub-center-text">Haz clic en una esquina</div>

            <button
                type="button"
                className="hub-hotspot hotspot-top-left"
                onClick={() => setHomeView("values")}
                aria-label="Misión y Valores"
            />

            <button
                type="button"
                className="hub-hotspot hotspot-top-right"
                onClick={() => setHomeView("classes")}
                aria-label="Clases y Horarios"
            />

            <button
                type="button"
                className="hub-hotspot hotspot-bottom-left"
                onClick={() => setHomeView("social")}
                aria-label="Redes Sociales"
            />

            <button
                type="button"
                className="hub-hotspot hotspot-bottom-right"
                onClick={() => setHomeView("contact")}
                aria-label="Contacto"
            />
            </div>
        </div>
        </section>
        );
    }

  if (homeView === "values") {
    return (
      <section
        className="tatami-detail-page tatami-values-page"
        style={{ backgroundImage: `url(${valuesBg})` }}
      >
        <button
          type="button"
          className="detail-back-button"
          onClick={() => setHomeView("hub")}
        >
          ↩
        </button>

        <div className="values-overlay">
          <h2>Misión y Valores</h2>

          <div className="values-grid">
            <article className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Comunidad</h3>
              <p>
                Unidos en nuestro camino, celebramos los logros y apoyamos el
                crecimiento de cada miembro.
              </p>
            </article>

            <article className="value-card">
              <div className="value-icon">🎯</div>
              <h3>Disciplina</h3>
              <p>
                Fomentamos la concentración, el compromiso y la dedicación en
                cada paso del entrenamiento.
              </p>
            </article>

            <article className="value-card">
              <div className="value-icon">🚀</div>
              <h3>Autosuperación</h3>
              <p>
                Nos esforzamos por mejorar constantemente, superando nuestros
                propios límites día a día.
              </p>
            </article>

            <article className="value-card">
              <div className="value-icon">🏅</div>
              <h3>Competición</h3>
              <p>
                Participamos en torneos locales e internacionales, aprendiendo a
                competir con integridad y respeto.
              </p>
            </article>
          </div>
        </div>
      </section>
    );
  }

  if (homeView === "classes") {
    return (
      <section
        className="tatami-detail-page tatami-classes-page"
        style={{ backgroundImage: `url(${classesBg})` }}
      >
        <button
          type="button"
          className="detail-back-button"
          onClick={() => setHomeView("hub")}
        >
          ↩
        </button>

        <div className="classes-overlay">
          <h2>Clases y Horarios</h2>
          <p className="classes-intro">
            Se imparten clases los lunes y miércoles en los siguientes horarios:
          </p>
          <div className="schedule-box">
            <div className="schedule-row">
              <span>Pequeños (4-7 años)</span>
              <span>17:30 a 18:30</span>
            </div>

            <div className="schedule-row">
              <span>Cadetes (8-12 años)</span>
              <span>18:30 a 19:30</span>
            </div>

            <div className="schedule-row">
              <span>Junior (13-15 años)</span>
              <span>19:30 a 20:30</span>
            </div>

            <div className="schedule-row">
              <span>Adultos (desde 16 años)</span>
              <span>20:30 a 22:00</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (homeView === "social") {
    return (
      <section
        className="tatami-detail-page tatami-social-page"
        style={{ backgroundImage: `url(${socialBg})` }}
      >
        <button
          type="button"
          className="detail-back-button"
          onClick={() => setHomeView("hub")}
        >
          ↩
        </button>

        <div className="social-overlay">
          <h2>Redes Sociales</h2>
          <p>¡Haz clic en el icono para descubrir nuestra trayectoria!</p>

          <div className="social-buttons">
            <a
              href="https://www.instagram.com/tkd_villanueva/"
              target="_blank"
              rel="noreferrer"
              className="social-button instagram"
            >
              Instagram
            </a>

            <a
              href="https://www.facebook.com/taekwondoVva.Pardillo/"
              target="_blank"
              rel="noreferrer"
              className="social-button facebook"
            >
              Facebook
            </a>
          </div>
        </div>
      </section>
    );
  }

  if (homeView === "contact") {
    return (
      <section
        className="tatami-detail-page tatami-contact-page"
        style={{ backgroundImage: `url(${contactBg})` }}
      >
        <button
          type="button"
          className="detail-back-button"
          onClick={() => setHomeView("hub")}
        >
          ↩
        </button>

        <div className="tatami-contact-overlay">
          <h2>Contacto</h2>

          <form className="contact-form" onSubmit={handleContactSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              value={contactForm.name}
              onChange={handleContactChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={contactForm.email}
              onChange={handleContactChange}
            />

            <textarea
              name="message"
              placeholder="Mensaje"
              rows="5"
              value={contactForm.message}
              onChange={handleContactChange}
            />

            <button type="submit">Enviar</button>
          </form>

          {formStatus && <p className="form-status">{formStatus}</p>}
        </div>
      </section>
    );
  }

  return null;
}

export default HomeSection;