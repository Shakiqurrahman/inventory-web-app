export const isValidEAN13Code = (
  code: string,
  type?: "product" | "saleInvoice" | "receiveInvoice"
): boolean => {
  if (!/^\d{13}$/.test(code)) {
    return false;
  }
  

  // check starting digit based on type
  if ((!type || type === "product") && !code.startsWith("1")) {
    
    return false;
  } else if (type === "saleInvoice" && !code.startsWith("2")) {
    return false;
  } else if (type === "receiveInvoice" && !code.startsWith("3")) {
    return false;
  }

  const digits = code.split("").map(Number);

  let sum = 0;
  // Calculate the checksum
  for (let i = 0; i < 12; i++) {
    sum += i % 2 === 0 ? digits[i] : digits[i] * 3;
  }

  const checksum = (10 - (sum % 10)) % 10;
  return checksum === digits[12];
};
