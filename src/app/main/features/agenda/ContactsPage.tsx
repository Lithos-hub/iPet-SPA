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
    field: "contact_phone_2",
    type: "text",
    value: "",
  },
  {
    field: "city",
    type: "text",
    value: "",
  },
  {
    field: "email",
    type: "text",
    value: "",
  },
];

export const ContactsPage = () => {
  return (
    <>
      <div>
        <div className="p-3">
          <TableForm defineCol={defineCol} category="contacts" />
        </div>
        <hr className="border border-pink-200 my-10" />
        <div className="shadow-xl p-3">
          <Table defineCol={defineCol} category="contacts" />
        </div>
      </div>
    </>
  );
};
