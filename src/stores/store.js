import MONTHS from "@/constants/months";
import { create } from "zustand";

const getInitialMonth = () => {
  if (typeof window !== "undefined") {
    return (
      window.localStorage.getItem("selectedMonth") ||
      MONTHS[new Date().getMonth()]
    );
  }
  return MONTHS[new Date().getMonth()];
};

export const useUserStore = create((set) => ({
  // States
  selectedMonth: getInitialMonth(),
  selectedYear: new Date().getFullYear(),

  // Actions
  setSelectedMonth: (month) => set({ selectedMonth: month }),
  setSelectedYear: (year) => set({ selectedYear: year }),
}));
