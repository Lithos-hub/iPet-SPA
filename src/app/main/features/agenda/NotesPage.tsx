import { TableForm } from "@/app/main/features/agenda/components/TableForm";
import { Table } from "@/app/main/features/agenda/components/Table";

import { InputsRow } from "@/models/interfaces/InputsRow";

import InfoIcon from "@mui/icons-material/Info";
import { useTranslation } from "react-i18next";

const defineCol: InputsRow[] = [
  {
    field: "description",
    type: "text",
    value: "",
  },
];

export const NotesPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <div>
        <div className="p-3">
          <TableForm defineCol={defineCol} category="notes" textarea />
        </div>
        <hr className="border border-pink-200 my-5" />
        <div className="flex items-center">
          <InfoIcon className="text-blue-500 mr-2" fontSize="small" />
          <i className="text-sm text-blue-500">{t("AGENDA.NOTES.tip")}</i>
        </div>
        <div className="flex items-center">
          <InfoIcon className="text-blue-500 mr-2" fontSize="small" />
          <i className="text-sm text-blue-500">{t("AGENDA.NOTES.tip-2")}</i>
        </div>
        <div className="shadow-xl p-5 mt-5 dark:bg-slate-900 rounded-xl">
          <Table defineCol={defineCol} category="notes" />
        </div>
      </div>
    </>
  );
};
