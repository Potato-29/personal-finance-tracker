import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "./ui/skeleton";

const LedgerCard = ({
  isLoading,
  totalIncome = 37600,
  totalExpense = 30000,
  savings = 7600,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Income</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className={"w-1/2 h-8"} />
          ) : (
            <div className="text-2xl font-bold">${totalIncome.toFixed(2)}</div>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className={"w-1/2 h-8"} />
          ) : (
            <div className="text-2xl font-bold">${totalExpense.toFixed(2)}</div>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Savings</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className={"w-1/2 h-8"} />
          ) : (
            <div className="text-2xl font-bold">${savings.toFixed(2)}</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LedgerCard;
