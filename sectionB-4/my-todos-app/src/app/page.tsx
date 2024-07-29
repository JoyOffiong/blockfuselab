"use client";

import AddTasks from "@/components/AddTaskModal";
import Header from "@/components/header";
import TableComponent from "@/components/tableComponent";
import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";

interface T {
  id: string;
  title: string;
  amount: string;
  source: string;
}
function App() {
  const [open, setOpen] = useState<boolean>(false);
  const [refetch, setRefetch] = useState<boolean>(false);
  const [rows, setRows] = useState<Array<T>>([]);
  const [tasks, setTasks] = useState<T>({});

  const Tableheadings = [
    { label: "S/N" },
    { label: "Task" },
    { label: "time" },
    { label: "Status" },
    { label: "Action" },
  ];

  useEffect(() => {
    const info: T[] = JSON.parse(localStorage.getItem("tasks") || "[]");
    setRows(info);
    setRefetch(false);
  }, [refetch]);

  const handleClose = () => {
    setOpen(false);
  };

  const fetchItemById = (id: string) => {
    setOpen(true);
    const item = rows.find((row) => row.id === id);
    if (item) {
      setTasks(item);
    } else {
      setTasks({});
    }
  };

  const deleteItem = (id: string) => {
    const item = rows.findIndex((row) => row.id === id);
    rows.splice(item, 1);
    localStorage.setItem("tasks", JSON.stringify(rows));
    setRefetch(true);
  };

  return (
    <div className="flex   min-h-screen gap-4 mt-20 gap-y-8 p-4 flex-col items-center w-full">
      <Header />
      <div className="rounded-lg  flex flex-col md:flex-row gap-4 bg-[#949491] justify-between shadow-md p-6 w-full ">
        <div>
          <p className="text-secondary text-4xl font-semibold">My Taks</p>
        </div>

        <div className="w-1/2 justify-center flex ">
          <img
            src="./images/tasks1.jpeg"
            alt="tasks image"
            height={150}
            width={150}
            className="rounded-md"
          />
        </div>
      </div>

      <div className="flex flex-col w-full items-center justify-start md:justify-between md:flex-row ">
        <p className="text-2xl font-semibold text-secondary">Task for today</p>

        <Button
          sx={{ backgroundColor: "#272934", color: "#fff4a3" }}
          onClick={() => setOpen(true)}
        >
          Add Tasks
        </Button>
      </div>
      <div className="w-full">
        <TableComponent
          Tableheadings={Tableheadings}
          rows={rows}
          setRefetch={setRefetch}
          deleteItem={deleteItem}
          fetchItemById={fetchItemById}
        />
      </div>

      {open && (
        <AddTasks
          open={open}
          handleClose={handleClose}
          setRefetch={setRefetch}
          setTasks={setTasks}
          tasks={tasks}
        />
      )}
    </div>
  );
}

export default App;
