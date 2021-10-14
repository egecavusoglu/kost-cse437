function formatDate(rawDate) {
  try {
    const date = new Date(rawDate);
    return date.toLocaleDateString();
  } catch (err) {
    return rawDate;
  }
}

export { formatDate };
