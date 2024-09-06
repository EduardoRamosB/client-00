import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout.tsx";
import { useAuth } from "../hooks/useAuth.tsx";
import { getAdoptions, createAdoption, updateAdoption, deleteAdoption } from "../api/adoptions.api.ts";
import { Adoption } from "../types.ts";
import { Button, Modal, Group } from "@mantine/core";
import AdoptionForm from "../components/forms/AdoptionForm.tsx";
import AdoptionTable from "../components/tables/AdoptionTable.tsx";
import {IconPlus} from "@tabler/icons-react";

const Adoptions: React.FC = () => {
  const { user, jwt } = useAuth();
  const [adoptions, setAdoptions] = useState<Adoption[]>([]);
  const [modalOpened, setModalOpened] = useState(false);
  const [editingAdoption, setEditingAdoption] = useState<Adoption | null>(null);

  const [form, setForm] = useState({
    animal: 0,
    volunteer: 0,
    adopter: 0,
    status: '',
  });

  const [confirmDeleteModalOpened, setConfirmDeleteModalOpened] = useState(false);
  const [adoptionToDelete, setAdoptionToDelete] = useState<number | null>(null);

  useEffect(() => {
    const fetchAdoptions = async () => {
      const fetchedAdoptions = await getAdoptions();
      setAdoptions(fetchedAdoptions);
    };

    fetchAdoptions();
  }, []);

  const handleSubmit = async () => {
    if (!user?.id) {
      console.error("User ID is not available.");
      return;
    }

    const adoptionData: Adoption = {
      ...form,
      created_by_id: !editingAdoption ? user.id : undefined,
      updated_by_id: user.id
    };

    if (editingAdoption) {
      if (editingAdoption.id) {
        await updateAdoption(editingAdoption.id, adoptionData, jwt!);
      }
    } else {
      await createAdoption(adoptionData, jwt!);
    }

    const fetchedAdoptions = await getAdoptions();
    setAdoptions(fetchedAdoptions);
    setModalOpened(false);
    setForm({ animal: 0, volunteer: 0, adopter: 0, status: '' });
    setEditingAdoption(null);
  };

  const handleEdit = (adoption: Adoption) => {
    setEditingAdoption(adoption);
    setForm({
      animal: adoption.animal,
      volunteer: adoption.volunteer,
      adopter: adoption.adopter,
      status: adoption.status,
    });
    setModalOpened(true);
  };

  const handleDeleteClick = (id: number) => {
    setAdoptionToDelete(id);
    setConfirmDeleteModalOpened(true);
  };

  return (
    <Layout user={user} from="authenticated">
      <Group mb="md">
        <h1>Adopciones</h1>
        <Button leftSection={<IconPlus />} onClick={() => setModalOpened(true)}>
          Agregar
        </Button>
      </Group>

      <AdoptionTable
        adoptions={adoptions}
        handleEdit={handleEdit}
        handleDeleteClick={handleDeleteClick}/>

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title={editingAdoption ? 'Editar Adopción' : 'Agregar Adopción'}
      >
        <AdoptionForm
          form={form}
          setForm={setForm}
          onSubmit={handleSubmit}
          editingAdoption={editingAdoption}
        />
      </Modal>

      <Modal
        opened={confirmDeleteModalOpened}
        onClose={() => setConfirmDeleteModalOpened(false)}
        title="Confirmar Eliminación"
      >
        <p>¿Estás seguro de que deseas eliminar esta adopción?</p>
        <Group align ="center" mt="md">
          <Button onClick={() => setConfirmDeleteModalOpened(false)}>Cancelar</Button>
          <Button
            color="red"
            onClick={async () => {
              if (adoptionToDelete !== null) {
                await deleteAdoption(adoptionToDelete, jwt!);
                const fetchedAdoptions = await getAdoptions();
                setAdoptions(fetchedAdoptions);
              }
              setConfirmDeleteModalOpened(false);
              setAdoptionToDelete(null);
            }}
          >
            Eliminar
          </Button>
        </Group>
      </Modal>
    </Layout>
  );
};

export default Adoptions;
