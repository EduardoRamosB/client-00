import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout.tsx";
import { useAuth } from "../hooks/useAuth.tsx";
import { getVolunteers, createVolunteer, updateVolunteer, deleteVolunteer } from "../api/users.api.ts";
import { User } from "../types.ts";
import { Button, Modal, Group } from "@mantine/core";
import VolunteerForm from "../components/forms/VolunteerForm.tsx";
import VolunteerTable from "../components/tables/VolunteerTable.tsx";
import { IconPlus } from "@tabler/icons-react";

const Volunteers: React.FC = () => {
  const { user, jwt } = useAuth();
  const [volunteers, setVolunteers] = useState<User[]>([]);
  const [modalOpened, setModalOpened] = useState(false);
  const [editingVolunteer, setEditingVolunteer] = useState<User | null>(null);
  const [form, setForm] = useState<User>({
    username: '',
    email: '',
    role: 'volunteer',
    first_name: '',
    last_name: '',
  });
  const [confirmDeleteModalOpened, setConfirmDeleteModalOpened] = useState(false);
  const [volunteerToDelete, setVolunteerToDelete] = useState<number | null>(null);

  useEffect(() => {
    const fetchVolunteers = async () => {
      if (jwt) {
        const fetchedVolunteers = await getVolunteers(jwt, 'volunteer');
        setVolunteers(fetchedVolunteers);
      }
    };

    fetchVolunteers();
  }, [jwt]);

  const handleSubmit = async () => {
    if (!user?.id) {
      console.error("User ID is not available.");
      return;
    }

    const volunteerData: User = {
      ...form,
      id: editingVolunteer ? editingVolunteer.id : undefined,
    };

    console.log('volunteerData:', volunteerData)

    if (editingVolunteer) {
      if (editingVolunteer.id) {
        await updateVolunteer(editingVolunteer.id, volunteerData, jwt!, 'volunteer');
      }
    } else {
      await createVolunteer(volunteerData, jwt!, 'volunteer');
    }

    const fetchedVolunteers = await getVolunteers(jwt!, 'volunteer');
    setVolunteers(fetchedVolunteers);
    setModalOpened(false);
    setForm({
      username: '',
      email: '',
      role: 'volunteer',
      first_name: '',
      last_name: '',
    });
    setEditingVolunteer(null);
  };

  const handleEdit = (volunteer: User) => {
    setEditingVolunteer(volunteer);
    setForm({
      username: volunteer.username,
      email: volunteer.email,
      role: volunteer.role,
      first_name: volunteer.first_name || '',
      last_name: volunteer.last_name || '',
    });
    setModalOpened(true);
  };

  const handleDeleteClick = (id: number) => {
    setVolunteerToDelete(id);
    setConfirmDeleteModalOpened(true);
  };

  return (
    <Layout user={user} from="authenticated">
      <Group mb="md">
        <h1>Voluntarios</h1>
        <Button leftSection={<IconPlus />} onClick={() => setModalOpened(true)}>
          Agregar
        </Button>
      </Group>

      <VolunteerTable
        users={volunteers}
        handleEdit={handleEdit}
        handleDeleteClick={handleDeleteClick}
      />

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title={editingVolunteer ? 'Editar Voluntario' : 'Agregar Voluntario'}
      >
        <VolunteerForm
          form={form}
          setForm={setForm}
          onSubmit={handleSubmit}
          editingVolunteer={editingVolunteer}
        />
      </Modal>

      <Modal
        opened={confirmDeleteModalOpened}
        onClose={() => setConfirmDeleteModalOpened(false)}
        title="Confirmar Eliminación"
      >
        <p>¿Estás seguro de que deseas eliminar este voluntario?</p>
        <Group align="center" mt="md">
          <Button onClick={() => setConfirmDeleteModalOpened(false)}>Cancelar</Button>
          <Button
            color="red"
            onClick={async () => {
              if (volunteerToDelete !== null) {
                await deleteVolunteer(volunteerToDelete, jwt!, 'volunteer');
                const fetchedVolunteers = await getVolunteers(jwt!, 'volunteer');
                setVolunteers(fetchedVolunteers);
              }
              setConfirmDeleteModalOpened(false);
              setVolunteerToDelete(null);
            }}
          >
            Eliminar
          </Button>
        </Group>
      </Modal>
    </Layout>
  );
};

export default Volunteers;
