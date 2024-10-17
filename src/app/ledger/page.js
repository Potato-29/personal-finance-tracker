"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import LedgerCard from "@/components/ledger-card";
import ExpenseChart from "@/components/expense-chart";
import { expenseTags, tagColors } from "@/constants/tags";
import { addTransaction, getFinancesOfMonth } from "@/services";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import TransactionDialog from "@/components/transaction-dialog";
import { useUserStore } from "@/stores/store";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function LedgerPage() {
  const { selectedMonth, selectedYear } = useUserStore();
  const [incomeData, setIncomeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expenseData, setExpenseData] = useState([]);
  const [newEntry, setNewEntry] = useState({
    title: "",
    amount: 0,
    tag: "",
  });
  const [isAddingIncome, setIsAddingIncome] = useState(false);
  const [isAddingExpense, setIsAddingExpense] = useState(false);

  const totalIncome = incomeData.reduce((sum, item) => sum + item.amount, 0);
  const totalExpense = expenseData.reduce((sum, item) => sum + item.amount, 0);
  const savings = totalIncome - totalExpense;

  const handleAddEntry = async (isIncome) => {
    if (newEntry.title && newEntry.amount && newEntry.tag) {
      const newItem = {
        ...newEntry,
        month: selectedMonth.toLowerCase(),
        year: selectedYear,
        type: isIncome ? "income" : "expense",
        amount: Number(newEntry.amount),
      };
      if (isIncome) {
        addTransaction(newItem);
        getMonthData();
        setIsAddingIncome(false);
      } else {
        addTransaction(newItem);
        setIsAddingExpense(false);
      }
      await getMonthData();
      setNewEntry({ title: "", amount: 0, tag: "" });
    }
  };

  const expenseChartData = expenseTags
    .map((tag) => ({
      name: tag,
      value: expenseData
        .filter((item) => item.tag === tag)
        .reduce((sum, item) => sum + item.amount, 0),
    }))
    .filter((item) => item.value > 0);

  const getMonthData = async () => {
    setIsLoading(true);
    try {
      const { expenses, incomes } = await getFinancesOfMonth(
        selectedMonth,
        selectedYear
      );
      setExpenseData(expenses);
      setIncomeData(incomes);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Failed to fetch", error);
    }
  };

  useEffect(() => {
    getMonthData();
  }, []);

  return (
    <div className="container mx-auto p-4 space-y-8">
      <Link href="/" className="flex flex-row items-center cursor-pointer">
        <ArrowLeft />
        <h1 className="text-3xl font-bold mx-1">Go back</h1>
      </Link>
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="chart">Expense Chart</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <LedgerCard
            isLoading={isLoading}
            totalExpense={totalExpense}
            totalIncome={totalIncome}
            savings={savings}
          />
        </TabsContent>
        <TabsContent value="chart">
          <ExpenseChart expenseChartData={expenseChartData} />
        </TabsContent>
      </Tabs>
      <div className="space-y-8">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Income</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button onClick={() => setIsAddingIncome(true)}>
                  Add Income
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Tag</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incomeData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>${item.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className={`${tagColors[item.tag]} text-white`}>
                      {item.tag}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Expenses</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button onClick={() => setIsAddingExpense(true)}>
                  Add Expense
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Tag</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenseData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>${item.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className={`${tagColors[item.tag]} text-white`}>
                      {item.tag}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <TransactionDialog
        isIncome={true}
        isOpen={isAddingIncome}
        setIsOpen={setIsAddingIncome}
        setNewEntry={setNewEntry}
        newEntry={newEntry}
        handleAddEntry={handleAddEntry}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
      />
      <TransactionDialog
        isIncome={false}
        isOpen={isAddingExpense}
        setIsOpen={setIsAddingExpense}
        setNewEntry={setNewEntry}
        newEntry={newEntry}
        handleAddEntry={handleAddEntry}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
      />
    </div>
  );
}
