import ContactShortcut from "./ContactShortcut";

const GOOGLE_REVIEWS_URL = "https://www.google.com/maps";

function StarSection({ onContactShortcut }) {
  return (
    <section className="section-page section-with-shortcut">
      <h2>Reseñas del club</h2>

      <p className="reviews-intro">
        Aquí dejaremos preparada la sección de reseñas. Para una integración
        real con Google Reviews necesitaremos después un enlace o servicio de
        terceros, porque Google no ofrece un widget simple de reseñas incrustadas
        como tal.
      </p>

      <div className="reviews-grid">
        <article className="review-card">
          <div className="review-stars">★★★★★</div>
          <p>
            Ambiente cercano, clases muy bien organizadas y gran atención a los
            alumnos.
          </p>
          <span>— Reseña destacada</span>
        </article>

        <article className="review-card">
          <div className="review-stars">★★★★★</div>
          <p>
            Muy buena combinación entre disciplina, técnica y motivación para
            seguir mejorando.
          </p>
          <span>— Reseña destacada</span>
        </article>

        <article className="review-card">
          <div className="review-stars">★★★★★</div>
          <p>
            Club muy recomendable para niños y adultos; se nota el cuidado por
            el grupo.
          </p>
          <span>— Reseña destacada</span>
        </article>
      </div>

      <a
        href={GOOGLE_REVIEWS_URL}
        target="_blank"
        rel="noreferrer"
        className="reviews-link"
      >
        Ver reseñas en Google
      </a>

      <ContactShortcut onClick={onContactShortcut} />
    </section>
  );
}

export default StarSection;