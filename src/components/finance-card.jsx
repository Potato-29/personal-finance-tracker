"use client";
import { ArrowDownIcon, ArrowUpIcon, PiggyBankIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function FinanceCard({
  month = "January",
  income = 0,
  expenses = 0,
  savings = 0,
}) {
  const savingsPercentage = income > 0 ? (savings / income) * 100 : 0;
  const formattedSavingsPercentage = savingsPercentage.toFixed(1);

  return (
    <Card className="w-[300px] max-w-md hover:scale-105 transition-all duration-300 cursor-pointer">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold">{month}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <div className="flex items-center space-x-1">
              <ArrowUpIcon className="h-4 w-4 text-green-500" />
              <span className="text-muted-foreground">Income</span>
            </div>
            <p className="font-bold">₹{income?.toLocaleString() ?? "0"}</p>
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <ArrowDownIcon className="h-4 w-4 text-red-500" />
              <span className="text-muted-foreground">Expenses</span>
            </div>
            <p className="font-bold">₹{expenses?.toLocaleString() ?? "0"}</p>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1">
              <PiggyBankIcon className="h-4 w-4 text-blue-500" />
              <span className="text-muted-foreground">Savings</span>
            </div>
            <span>{formattedSavingsPercentage}% of income</span>
          </div>
          <p className="font-bold">₹{savings?.toLocaleString() ?? "0"}</p>
          <Progress value={savingsPercentage} className="h-1.5 mt-1" />
        </div>
      </CardContent>
    </Card>
  );
}
