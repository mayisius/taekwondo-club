function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateMessageInput({ name, email, message }) {
  if (!name || !email || !message) {
    return 'Todos los campos son obligatorios';
  }

  if (!isValidEmail(email)) {
    return 'El correo no tiene un formato válido';
  }

  return null;
}

module.exports = {
  isValidEmail,
  validateMessageInput,
};