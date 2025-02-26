import {TransactionProps} from "../interfaces"

const mockTransaction: TransactionProps[] = [
  {
    id: "1",
    amount: "₦3,644",
    transactionId: "TR_8401857902",
    transactionType: "Transfer",
    transactionDate: "Feb 12, 2025",
    time: "10:30AM",
    status: "Processed",
  },
  {
    id: "2",
    amount: "₦3,471",
    transactionId: "TR_8401857902",
    transactionType: "Withdrawal",
    transactionDate: "Jan 10, 2025",
    time: "10:30AM",
    status: "Failed",
  },
  {
    id: "3",
    amount: "₦3,644",
    transactionId: "TR_8401857902",
    transactionType: "Deposit",
    transactionDate: "Feb 1, 2025",
    time: "10:30AM",
    status: "Processed",
  },
  {
    id: "4",
    amount: "₦3,471",
    transactionId: "TR_8401857902",
    transactionType: "Request",
    transactionDate: "Jan 8, 2025",
    time: "10:30AM",
    status: "Processed",
  },
  {
    id: "5",
    amount: "₦3,644",
    transactionId: "TR_8401857902",
    transactionType: "Transfer",
    transactionDate: "Feb 14, 2025",
    time: "10:30AM",
    status: "Processed",
  },
  {
    id: "6",
    amount: "₦3,471",
    transactionId: "TR_8401857902",
    transactionType: "Transfer",
    transactionDate: "Feb 18, 2025",
    time: "10:30AM",
    status: "Failed",
  },
  {
    id: "7",
    amount: "₦8,948",
    transactionId: "TR_8401857902",
    transactionType: "Transfer",
    transactionDate: "Feb 25, 2022",
    time: "10:30AM",
    status: "Processed",
  },
];
export const mockApiService = {
  getTransactions: async (): Promise<TransactionProps[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockTransaction);
      }, 500);
    });
  }
}