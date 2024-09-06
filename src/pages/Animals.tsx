import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout.tsx";
import { useAuth } from "../hooks/useAuth.tsx";
import { getAnimals, createAnimal, updateAnimal, deleteAnimal } from "../api/animals.api.ts";
import { Animal } from "../types.ts";
import { Button, Modal, Group } from "@mantine/core";
import AnimalForm from "../components/forms/AnimalForm.tsx";
import AnimalTable from "../components/tables/AnimalTable.tsx";
import {IconPlus} from "@tabler/icons-react";

const Animals: React.FC = () => {
  const { user, jwt } = useAuth();
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [modalOpened, setModalOpened] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);

  const [form, setForm] = useState({
    name: '',
    age: '',
    breed: '',
    kind: '',
    status: '',
    reason: ''
  });

  const [confirmDeleteModalOpened, setConfirmDeleteModalOpened] = useState(false);
  const [animalToDelete, setAnimalToDelete] = useState<number | null>(null);

  useEffect(() => {
    const fetchAnimals = async () => {
      const fetchedAnimals = await getAnimals();
      setAnimals(fetchedAnimals);
    };

    fetchAnimals();
  }, []);

  const handleSubmit = async () => {
    if (!user?.id) {
      console.error("User ID is not available.");
      return;
    }

    const animalData: Animal = {
      ...form,
      age: Number(form.age),
      created_by_id: !editingAnimal ? user.id : undefined,
      updated_by_id: user.id
    };

    if (editingAnimal) {
      if (editingAnimal.id) {
        await updateAnimal(editingAnimal.id, animalData, jwt!);
      }
    } else {
      await createAnimal(animalData, jwt!);
    }

    const fetchedAnimals = await getAnimals();
    setAnimals(fetchedAnimals);
    setModalOpened(false);
    setForm({ name: '', age: '', breed: '', kind: '', status: '', reason: '' });
    setEditingAnimal(null);
  };

  const handleEdit = (animal: Animal) => {
    setEditingAnimal(animal);
    setForm({
      name: animal.name,
      age: animal.age.toString(),
      breed: animal.breed,
      kind: animal.kind,
      status: animal.status,
      reason: animal.reason || ''
    });
    setModalOpened(true);
  };

  const handleDeleteClick = (id: number) => {
    setAnimalToDelete(id);
    setConfirmDeleteModalOpened(true);
  };

  return (
    <Layout user={user} from="authenticated">
      <Group mb="md">
        <h1>Animales</h1>
        <Button leftSection={<IconPlus />} onClick={() => setModalOpened(true)}>
          Agregar
        </Button>
      </Group>

      <AnimalTable
        animals={animals}
        handleEdit={handleEdit}
        handleDeleteClick={handleDeleteClick}/>

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title={editingAnimal ? 'Editar Animal' : 'Agregar Animal'}
      >
        <AnimalForm
          form={form}
          setForm={setForm}
          onSubmit={handleSubmit}
          editingAnimal={editingAnimal}
        />
      </Modal>

      <Modal
        opened={confirmDeleteModalOpened}
        onClose={() => setConfirmDeleteModalOpened(false)}
        title="Confirmar Eliminación"
      >
        <p>¿Estás seguro de que deseas eliminar este animal?</p>
        <Group align ="center" mt="md">
          <Button onClick={() => setConfirmDeleteModalOpened(false)}>Cancelar</Button>
          <Button
            color="red"
            onClick={async () => {
              if (animalToDelete !== null) {
                await deleteAnimal(animalToDelete, jwt!);
                const fetchedAnimals = await getAnimals();
                setAnimals(fetchedAnimals);
              }
              setConfirmDeleteModalOpened(false);
              setAnimalToDelete(null);
            }}
          >
            Eliminar
          </Button>
        </Group>
      </Modal>
    </Layout>
  );
};

export default Animals;
