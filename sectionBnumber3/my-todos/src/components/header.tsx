import { Button } from "@mui/material";
import { Menu } from "lucide-react";

export default function Header() {
  return (
    <div
      className={`p-4 bg-white fixed mb-80 w-full mr-0 top-0 z-20 shadow-md flex items-center`}
    >
      <div className="flex gap-4">
        <div className="md:hidden block">
          <Menu color="#000" />
        </div>

        <Button>Back</Button>
      </div>
    </div>
  );
}
