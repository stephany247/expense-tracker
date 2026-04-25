export const formatAmount = (value: string) => {
  const num = Number(value);
  if (isNaN(num)) return "";
  return num.toFixed(2);
};

export const normalizeCat = (str?: string) =>
  str?.trim().toLowerCase();
