import { Table } from "./components/Table";

import { TableForm } from "./components/TableForm";

import { InputsRow } from "@/models/interfaces/InputsRow";

const defineCol: InputsRow[] = [
  {
    field: "name",
    type: "text",
    value: "",
  },
  {
    field: "contact_phone",
    type: "text",
    value: "",
  },
  {
    field: "emergency_phone",
    type: "text",
    value: "",
  },
  {
    field: "city",
    type: "text",
    value: "",
  },
];

export const VetPage = () => {
  return (
    <>
      <div>
        <div className="p-3">
          <TableForm defineCol={defineCol} category="vets" />
        </div>
        <hr className="border border-pink-200 my-5" />
        <div className="shadow-xl p-3 dark:bg-slate-900 rounded-xl">
          <Table defineCol={defineCol} category="vets" />
        </div>
      </div>
    </>
  );
};
