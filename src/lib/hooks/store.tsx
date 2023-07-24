import { create } from "zustand";

export type Transaction =
    {
        from: string;
        to: string;
        amount: string;
        hash: `0x${string}` | null;
        timeAgo: string;
        timestamp: number;
    }

export interface TransactionState {
    ethTransactions: Transaction[],
    setEthTransactions: (transactions: Transaction[]) => void,
    polygonTransactions: Transaction[],
    setPolygonTransactions: (transactions: Transaction[]) => void
}
const useTransactionsStore = create<TransactionState>((set) => (
    {
        ethTransactions: [],
        polygonTransactions: [],
        setEthTransactions: (transactions) => {
            console.log("yes yes yes yes i am working ", transactions.toString())
            set((state) => ({
                ethTransactions: transactions
            }))
        },
        setPolygonTransactions(transactions) {
            console.log("yes yes yes yes i am working ", transactions)
            set((state) => ({
                polygonTransactions: transactions
            }))
        },
    }
))
export default useTransactionsStore;