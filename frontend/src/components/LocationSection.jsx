import ContactShortcut from "./ContactShortcut";
import girlBlack from "../assets/girl-black.png";
import tatami from "../assets/tatami.png";

function LocationSection({ onContactShortcut }) {
  return (
    <section className="section-page section-with-shortcut location-layout">
      <h2>CLUB TAEKWONDO VILLANUEVA DEL PARDILLO</h2>
      <p className="location-address">
        Carpe Diem, C/ del Río Ebro, Villanueva del Pardillo, Madrid
      </p>

      <div className="location-visual">
        <img src={tatami} alt="Tatami" className="location-tatami" />
        <img src={girlBlack} alt="Silueta taekwondo" className="location-girl" />
      </div>

      <ContactShortcut onClick={onContactShortcut} />
    </section>
  );
}

export default LocationSection;