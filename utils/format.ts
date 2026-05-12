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

export const getPasswordStrength = (
  password: string,
): {
  label: string;
  width: `${number}%`;
  color: string;
} => {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9!@#$%^&*]/.test(password)) score++;

  if (score === 1) {
    return {
      label: "Weak",
      width: "33%",
      color: "#F04438",
    };
  }

  if (score === 2) {
    return {
      label: "Medium",
      width: "66%",
      color: "#F79009",
    };
  }

  if (score === 3) {
    return {
      label: "Strong",
      width: "100%",
      color: "#1457D9",
    };
  }

  return {
    label: "Weak",
    width: "10%",
    color: "#D0D5DD",
  };
};
