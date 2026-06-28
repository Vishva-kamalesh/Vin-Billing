// GST validation or calculation logic
export const validateGSTIN = (gstin: string) => {
  const regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return regex.test(gstin);
};

export function calculateGst(baseAmount: number, gstRate: number) {
  const gstAmount = (baseAmount * gstRate) / 100;
  const cgst = gstAmount / 2;
  const sgst = gstAmount / 2;
  return { baseAmount, gstAmount, cgst, sgst, totalAmount: baseAmount + gstAmount };
}
