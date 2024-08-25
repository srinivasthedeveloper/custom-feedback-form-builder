const formatDate = (date) => {
  if (!date) return '';
  const formattedDate = new Date(date);
  return `${formattedDate.getDate()}/${formattedDate.getMonth() + 1}/${formattedDate.getFullYear()}`;
};

export { formatDate };
