import { Modal, Box, Button } from "@mui/material";

import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";

type Props = {
  open: boolean;
  handleClose: () => void;
  setExpensesInputs: ({}) => void;
  setRefetch: (value: boolean) => void;
  expensesInputs: {
    title: string;
    id: string;
    amount: string;
    source: string;
  };
};

interface IData {
  id: string;
  title: string;
  amount: string;
  source: string;
  index?: number;
}
function AddExpenses({
  open,
  handleClose,
  setExpensesInputs,
  expensesInputs,
  setRefetch,
}: Props) {
  const { control, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      amount: expensesInputs.amount,
      source: expensesInputs.source,
      title: expensesInputs.title,
      id: expensesInputs.id,
    },
  });

  const submit = (data: Omit<IData, "id">) => {
    const info = JSON.parse(localStorage.getItem("expenses") || "[]");
    if (expensesInputs.id) {
      const updateThis = info?.findIndex(
        (row: IData) => row.id === expensesInputs.id
      );
      if (updateThis !== -1) {
        info[updateThis] = {
          ...data,
          id: expensesInputs.id,
          index: info[updateThis].index,
        };
        localStorage.setItem("expenses", JSON.stringify(info));
        setExpensesInputs({});
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
    setExpensesInputs({});
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
            {expensesInputs.id ? "Update Expenses" : "Add Expenses"}
          </p>

          <form onSubmit={handleSubmit(submit)}>
            <div className="flex flex-col gap-6">
              <div>
                <InputBoxComp
                  name="title"
                  control={control}
                  type="text"
                  label="Title"
                />
              </div>
              <div>
                <InputBoxComp
                  name="amount"
                  control={control}
                  type="text"
                  label="Amount"
                />
              </div>
              <div>
                <InputBoxComp
                  name="source"
                  control={control}
                  type="text"
                  label="Source"
                />
              </div>
              <div className="flex flex-end justify-end">
                <Button type="submit" className="bg-secondary text-lightBrown">
                  {expensesInputs.id ? "Update" : "Add"}
                </Button>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default AddExpenses;
