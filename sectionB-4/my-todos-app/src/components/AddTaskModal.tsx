import { Modal, Box, Button } from "@mui/material";

import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import InputBoxComp from "./inputField";
import style from "./style";

type Props = {
  open: boolean;
  handleClose: () => void;
  setTasks: ({}) => void;
  setRefetch: (value: boolean) => void;
  tasks: {
    title: string;
    id: string;
    amount: string;
    source: string;
  };
};

interface IData {
  id: string;
  task: string;
  time: string;
  status: string;
  Action?: number;
}
function AddTasks({ open, handleClose, setTasks, tasks, setRefetch }: Props) {
  const { control, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      amount: tasks.amount,
      source: tasks.source,
      title: tasks.title,
      id: tasks.id,
    },
  });

  const submit = (data: Omit<IData, "id">) => {
    const info = JSON.parse(localStorage.getItem("expenses") || "[]");
    if (tasks.id) {
      const updateThis = info?.findIndex((row: IData) => row.id === tasks.id);
      if (updateThis !== -1) {
        info[updateThis] = {
          ...data,
          id: tasks.id,
          index: info[updateThis].index,
        };
        localStorage.setItem("expenses", JSON.stringify(info));
        setTasks({});
        handleClose();
        setRefetch(true);
        return;
      }
    }
    const newIndex = info.length;
    const newId = uuidv4();
    const newData = { ...data, id: newId, index: newIndex };
    info.push(newData);
    localStorage.setItem("expenses", JSON.stringify(info));
    setTasks({});
    handleClose();
    setRefetch(true);
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p className="text-secondary font-semibold mb-10">
            {tasks.id ? "Update Expenses" : "Add Expenses"}
          </p>

          <form onSubmit={handleSubmit(submit)}>
            <div className="flex flex-col gap-6">
              <div>
                <InputBoxComp
                  name="task"
                  control={control}
                  type="text"
                  label="Task"
                />
              </div>
              <div>
                <InputBoxComp
                  name="time"
                  control={control}
                  type="text"
                  label="Time"
                />
              </div>
              <div>
                <InputBoxComp
                  name="status"
                  control={control}
                  type="text"
                  label="Status"
                />
              </div>
              <div className="flex flex-end justify-end">
                <Button type="submit" className="bg-secondary text-lightBrown">
                  {tasks.id ? "Update" : "Add"}
                </Button>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default AddTasks;
