import { supabase } from "@/config/supabase";

export const getFinancesOfMonth = async (month, year) => {
  let { data: expenses, error } = await supabase
    .from("transactions")
    .select("*")
    .ilike("type", "expense")
    .ilike("month", month)
    .ilike("year", year);

  let { data: incomes, incomeError } = await supabase
    .from("transactions")
    .select("*")
    .ilike("type", "income")
    .ilike("month", month)
    .ilike("year", year);

  if (error || incomeError) {
    throw new Error("failed to fetch");
  }
  return { expenses, incomes };
};

export const addTransaction = async (payload) => {
  let { data, error } = await supabase.from("transactions").insert([payload]);
  return data;
};
