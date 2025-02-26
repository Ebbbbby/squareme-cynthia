import { BankDetailsProps } from "@/interfaces";

const bankDetails: BankDetailsProps = {
  bankName:"Sterling Bank",
  accountNumber:"8000000000"

}

export const mockApiService = {
  getBankDetails: async (): Promise<BankDetailsProps> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(bankDetails);
      }, 500);
    });
  },
};