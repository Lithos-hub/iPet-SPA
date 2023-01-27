import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useUIStore } from "@/hooks";
import { User } from "@/models/interfaces/User";
import { Pet_Backend } from "@/models/interfaces/Pet";

// Global
import { Button } from "@/components/Button";
import { NoDataMessage } from "@/components/NoDataMessage";
import { NotificationModal } from "@/components/Modal/NotificationModal";

// Local
import { AddPetForm } from "@/app/main/features/pets/components/AddPetForm";
import { PetRowItem } from "@/app/main/features/pets/components/PetRowItem";

import { useGetUserQuery } from "@/services/apis/userApi";
import { useDeletePetMutation } from "@/services/apis";

export const PetsPage = () => {
  // RTK
  const { data: user, refetch } = useGetUserQuery();
  const { pets: petsData } = user as User;
  const [petId, setPetId] = useState<number | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  const [deletePet] = useDeletePetMutation();

  const { t } = useTranslation();

  const navigate = useNavigate();
  const { setOpenFormModal } = useUIStore();

  useEffect(() => {
    refetch();
  }, []);

  const onCreateClick = () => {
    setOpenFormModal("CREATE");
  };

  const onEdit = (id: number) => {
    setPetId(id);
    setOpenFormModal("EDIT");
  };

  const onDelete = async (id: number) => {
    setPetId(id);
    showNotificationModal(true);
  };

  const triggerDelete = async () => {
    await deletePet(petId as number);
    await refetch();
    setShowNotification(false);
  };

  const showNotificationModal = (bool: boolean) => setShowNotification(bool);

  const onSeeDetails = (id: string) => navigate(`/app/pet/${id}`);

  return (
    <>
      <header className="flex justify-between items-center mb-5">
        <h2 className="text__primary--gradient">{t("PETS.title")}</h2>
        <Button
          variant="primary"
          title={t("PETS.CREATE") as string}
          onClick={onCreateClick}
        />
      </header>

      <main className="bg-white shadow-lg rounded-xl p-5">
        {petsData.length ? (
          <div className="flex flex-col gap-5">
            {petsData.map((petData: Pet_Backend, index: number) => (
              <PetRowItem
                key={index}
                {...petData}
                onSeeDetails={onSeeDetails}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        ) : (
          <NoDataMessage message={t("PETS.no_data") as string} />
        )}
      </main>

      <AddPetForm id={petId as number} />

      <NotificationModal
        open={showNotification}
        subtitle="Vas a borrar una mascota. ¿Deseas continuar?"
        close={() => showNotificationModal(false)}
        onAccept={triggerDelete}
      >
        <img src="/3d-icons/dog-crying.png" className="h-[200px] mx-auto" />
      </NotificationModal>
    </>
  );
};
