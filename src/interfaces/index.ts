export interface TransactionProps {
  id: string;
  amount: string;
  transactionId: string;
  transactionType: string;
  transactionDate: string;
  time: string;
  status: string;
};

export interface BankDetailsProps {
  accountNumber: string;
  bankName: string;
}
export type RevenueProps = {
  percentage: string;
  totalRevenue: string;

}
export interface DashboardChartProps  {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    barThickness: number;
  }[];
};