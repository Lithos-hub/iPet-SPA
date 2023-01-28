import { useEffect } from "react";

import { useTranslation } from "react-i18next";
import { TableRow } from "./TableRow";
import { InputsRow } from "@/models/interfaces/InputsRow";

import { NoDataMessage } from "@/components/NoDataMessage";
import { useGetUserQuery } from "@/services/apis";
import { Vet } from "@/models/interfaces/Vet";
import { User } from "@/models/interfaces/User";
import { Contact } from "@/models/interfaces/Contact";

export const Table = ({
  defineCol,
  category,
}: {
  defineCol: InputsRow[];
  category: "vets" | "contacts" | "notes";
}) => {
  // RTK
  const { data: user, refetch } = useGetUserQuery();
  const {
    vets: vetsData,
    notes: notesData,
    contacts: contactsData,
  } = user as User;

  const { t } = useTranslation();

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      {category === "vets" && vetsData.length > 0 ? (
        vetsData.map((item: Vet, index: number) => (
          <div key={index} className="my-1">
            <TableRow
              data={item}
              defineCol={defineCol}
              category={category}
              rowIndex={index + 1}
            />
          </div>
        ))
      ) : category === "contacts" && contactsData.length > 0 ? (
        contactsData.map((item: Contact, index: number) => (
          <div key={index} className="my-1">
            <TableRow
              data={item}
              defineCol={defineCol}
              category={category}
              rowIndex={index + 1}
            />
          </div>
        ))
      ) : category === "notes" && notesData.length > 0 ? (
        <div className="my-1 grid grid-cols-4 gap-5">
          {notesData.map((item: Contact, index: number) => (
            <TableRow
              data={item}
              defineCol={defineCol}
              category={category}
              rowIndex={index + 1}
            />
          ))}
        </div>
      ) : (
        <NoDataMessage
          message={t(`AGENDA.${category.toUpperCase()}.no_data`) as string}
        />
      )}
    </>
  );
};
