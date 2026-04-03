import { useEffect } from "react";
import ContactShortcut from "./ContactShortcut";

const GOOGLE_REVIEWS_URL = "https://www.google.com/search?hl=es-ES&gl=es&q=CLUB+TAEKWONDO+VVA.+DEL+PARDILLO,+C.+R%C3%ADo+Ebro,+2,+28229+Villanueva+del+Pardillo,+Madrid&ludocid=15214901377532501328&lsig=AB86z5W7yCLHSVeb7XXdCL_g8oTy#lrd=0xd419c6cdd43cd0b:0xd3263030dc6d1d50,3";

function StarSection({ onContactShortcut }) {
  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="https://elfsightcdn.com/platform.js"]'
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://elfsightcdn.com/platform.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section className="section-page section-with-shortcut star-layout">
      <h2 className="star-title">Reseñas del club</h2>

      <div className="star-reviews-wrapper">
        <div
          className="elfsight-app-b35385b5-3ed1-4c8f-b21f-75f029947da8"
          data-elfsight-app-lazy
        ></div>
      </div>

      <a
        href={GOOGLE_REVIEWS_URL}
        target="_blank"
        rel="noreferrer"
        className="reviews-link"
      >
        ¡Déjanos un comentario!
      </a>

      <ContactShortcut onClick={onContactShortcut} />
    </section>
  );
}

export default StarSection;