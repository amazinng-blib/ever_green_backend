function formatDateToDDMMYY(date) {
  const day = date.getDate().toString().padStart(2, '0'); // Get day and pad with leading zero if necessary
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get month (zero-based) and pad with leading zero if necessary
  const year = date.getFullYear().toString().slice(-2); // Get year and extract last two digits

  return `${year}-${day}-${month}`;
}

module.exports = formatDateToDDMMYY;
