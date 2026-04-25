export const formatAmount = (value: string) => {
  const num = Number(value);
  if (isNaN(num)) return "";
  return num.toFixed(2);
};

export const normalizeCat = (str?: string) => str?.trim().toLowerCase();

export const formatTime = (id: number) => {
  const date = new Date(id);

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
