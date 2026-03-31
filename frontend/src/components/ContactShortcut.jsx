import phoneIcon from "../assets/icon-phone.png";

function ContactShortcut({ onClick }) {
  return (
    <button className="contact-shortcut" onClick={onClick} type="button">
      <img src={phoneIcon} alt="Contacto" className="contact-shortcut-icon" />
      <span className="contact-shortcut-tooltip">Contacta con nosotros</span>
    </button>
  );
}

export default ContactShortcut;