import { Table } from "./components/Table";

import { TableForm } from "./components/TableForm";

import { InputsRow } from "@/models/interfaces/InputsRow";

const defineCol: InputsRow[] = [
  {
    field: "description",
    type: "text",
    value: "",
  },
];

export const NotesPage = () => {
  return (
    <>
      <div>
        <div className="p-3">
          <TableForm defineCol={defineCol} category="notes" textarea />
        </div>
        <hr className="border border-pink-200 my-5" />
        <div className="shadow-xl p-3">
          <Table defineCol={defineCol} category="notes" />
        </div>
      </div>
    </>
  );
};
