// Génère une date valide pour les inputs de type datetime-local
function toLocalIsoString(stringDate) {
  let newDate = new Date(stringDate || Date.now());
  const localHours = String(newDate.getHours()).padStart(2, '0');
  newDate = newDate.toISOString().slice(0, -8).replace(/[0-9]{2}:/, localHours + ":");
  return newDate;
}

// Permet d'obtenir la date du jour au format des imputs de type datetime-local
function today() {
  return toLocalIsoString().slice(0, -5) + "00:00";
}

export default {
  toLocalIsoString,
  today
};