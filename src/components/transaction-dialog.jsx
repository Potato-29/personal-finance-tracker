import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { expenseTags, incomeTags, tagColors } from "@/constants/tags";

const TransactionDialog = ({
  isIncome,
  isOpen,
  setIsOpen,
  setNewEntry,
  newEntry,
  handleAddEntry,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isIncome ? "Add Income" : "Add Expense"}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            placeholder="Title"
            value={newEntry.title}
            onChange={(e) =>
              setNewEntry({ ...newEntry, title: e.target.value })
            }
          />
          <Input
            type="number"
            placeholder="Amount"
            value={newEntry.amount || ""}
            onChange={(e) =>
              setNewEntry({
                ...newEntry,
                amount: parseFloat(e.target.value) || 0,
              })
            }
          />
          <Select
            value={newEntry.tag}
            onValueChange={(value) => setNewEntry({ ...newEntry, tag: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a tag" />
            </SelectTrigger>
            <SelectContent>
              {(isIncome ? incomeTags : expenseTags).map((tag) => (
                <SelectItem key={tag} value={tag}>
                  <div className="flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full mr-2 ${tagColors[tag]}`}
                    ></div>
                    {tag}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => handleAddEntry(isIncome)}>Add Entry</Button>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDialog;
