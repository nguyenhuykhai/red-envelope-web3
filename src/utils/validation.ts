import { EthToUsd } from "./price";

export type FormData = {
  amount: string;
  recipients: number;
  isRandom: boolean;
  message: string;
};

export type FormErrors = {
  amount: string;
  recipients: string;
  message: string;
};

export const validateForm = (
  formData: FormData,
  ethToUsd: EthToUsd
): FormErrors => {
  const errors: FormErrors = {
    amount: "",
    recipients: "",
    message: "",
  };

  if (!formData.amount) {
    errors.amount = "Vui lòng nhập số tiền";
  } else {
    const usdPerPerson = Number(ethToUsd.usdValue) / formData.recipients;
    if (usdPerPerson < 1) {
      errors.amount = "Số tiền chia cho mỗi người phải ít nhất 1 USD";
    }
  }

  if (!formData.recipients) {
    errors.recipients = "Vui lòng nhập số người nhận";
  } else if (formData.recipients < 1) {
    errors.recipients = "Số người nhận phải lớn hơn 0";
  }

  if (!formData.message.trim()) {
    errors.message = "Vui lòng nhập lời chúc";
  }

  return errors;
};

export const isFormValid = (
  formData: FormData,
  errors: FormErrors,
  ethToUsd: EthToUsd
): boolean => {
  return (
    formData.amount &&
    formData.recipients > 0 &&
    formData.message &&
    !Object.values(errors).some((error) => error) &&
    Number(ethToUsd.usdValue) > 0
  );
};
