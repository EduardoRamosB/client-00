import React, { useState } from 'react';
import { Table, Anchor, ActionIcon, Group, Select, Progress, Text, Notification } from '@mantine/core';
import { IconPencil, IconCheck, IconX } from '@tabler/icons-react';
import {User} from "../../types.ts";

interface Adoption {
  id: number;
  animal: {
    name: string;
  };
  adopter: {
    full_name: string;
  };
  status: string;
}

interface AdoptionTableProps {
  user: User;
  adoptions: Adoption[];
  handleEdit: (adoption: Adoption) => void;
  jwt: string | null;
}

const AdoptionTable: React.FC<AdoptionTableProps> = ({ user, adoptions, handleEdit, jwt }) => {
  const [editingAdoptionId, setEditingAdoptionId] = useState<number | null>(null);
  const [editedStatus, setEditedStatus] = useState<string>('');
  const [notification, setNotification] = useState<{ message: string, color: string } | null>(null);

  const statusOptions = [
    { value: 'requested', label: 'Solicitado' },
    { value: 'in_progress', label: 'En Proceso' },
    { value: 'completed', label: 'Adoptado' },
    { value: 'cancelled', label: 'Cancelado' }
  ];

  const getStatusLabel = (status: string) => {
    const option = statusOptions.find((opt) => opt.value === status);
    return option ? option.label : status;
  };

  const handleSaveStatus = () => {
    if (editingAdoptionId !== null) {
      handleEdit({
        id: editingAdoptionId,
        animal: { name: '' },
        adopter: { full_name: '' },
        status: editedStatus
      });
      setEditingAdoptionId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingAdoptionId(null);
  };

  const rows = adoptions.map((adoption) => (
    <Table.Tr key={adoption.id}>
      <Table.Td>
        <Anchor component="button" fz="sm">
          {adoption.animal.name}
        </Anchor>
      </Table.Td>
      <Table.Td>
        <Anchor component="button" fz="sm">
          {adoption.adopter.full_name}
        </Anchor>
      </Table.Td>
      {(user.role === 'admin' || user.role === 'volunteer') &&
        <Table.Td>
          {editingAdoptionId === adoption.id ? (
            <Group gap="xs">
              <Select
                value={editedStatus}
                onChange={setEditedStatus}
                data={statusOptions}
                placeholder="Selecciona un estado"
              />
              <ActionIcon color="teal" onClick={handleSaveStatus}>
                <IconCheck size={16} />
              </ActionIcon>
              <ActionIcon color="red" onClick={handleCancelEdit}>
                <IconX size={16} />
              </ActionIcon>
            </Group>
          ) : (
            <Group gap="xs">
              <Text>{getStatusLabel(adoption.status)}</Text>
              <ActionIcon onClick={() => {
                setEditingAdoptionId(adoption.id);
                setEditedStatus(adoption.status);
              }}>
                <IconPencil size={16} />
              </ActionIcon>
            </Group>
          )}
        </Table.Td>}

      <Table.Td>
        <Progress.Root size="xl">
          <Progress.Section
            value={adoption.status === 'requested' ? 33 : (adoption.status === 'in_progress' ? 33 : (adoption.status === 'completed' ? 33 : 0))}
            color={adoption.status === 'completed' ? 'green' : 'cyan'}>
            <Progress.Label>Solicitado</Progress.Label>
          </Progress.Section>
          <Progress.Section
            value={adoption.status === 'in_progress' ? 33 : (adoption.status === 'completed' ? 33 : 0)}
            color={adoption.status === 'completed' ? 'green' : (adoption.status === 'in_progress' ? 'cyan' : 'transparent')}>
            <Progress.Label>En Proceso</Progress.Label>
          </Progress.Section>
          <Progress.Section
            value={adoption.status === 'completed' ? 34 : 0}
            color={adoption.status === 'completed' ? 'green' : 'transparent'}>
            <Progress.Label>Adoptado</Progress.Label>
          </Progress.Section>
        </Progress.Root>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      {notification && (
        <Notification color={notification.color} onClose={() => setNotification(null)}>
          {notification.message}
        </Notification>
      )}
      <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing="xs">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Animal</Table.Th>
              <Table.Th>Adoptante</Table.Th>
              {(user.role === 'admin' || user.role === 'volunteer') && <Table.Th>Estado</Table.Th>}
              <Table.Th>Progreso</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </>
  );
};

export default AdoptionTable;
