"use client";
import { FinanceCard } from "@/components/finance-card";
import MONTHS from "@/constants/months";
import { useUserStore } from "@/stores/store";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { selectedMonth, setSelectedMonth } = useUserStore();
  return (
    <div className="grid grid-cols-12 justify-items-center h-full">
      {Object.values(MONTHS).map((month, index) => (
        <div
          onClick={() => {
            setSelectedMonth(month);
            window.localStorage.setItem("selectedMonth", month);
            router.push("/ledger");
          }}
          key={index}
          className="col-span-4 sm:col-span-3"
        >
          <FinanceCard month={month} />
        </div>
      ))}
    </div>
  );
}
