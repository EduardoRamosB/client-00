import React, {useState} from "react";
import cx from 'clsx';
import {ActionIcon, Group, ScrollArea, Table} from "@mantine/core";
import classes from './AnimalTable.module.css';
import {IconPencil, IconTrash} from "@tabler/icons-react";
import {Animal} from "../../types.ts";

interface IAnimalTableProps {
  animals: Animal[];
  handleEdit: (animal: Animal) => void;
  handleDeleteClick: (id: number) => void;
}

const AnimalTable: React.FC<IAnimalTableProps> = ({ animals, handleEdit, handleDeleteClick }) => {
  const [scrolled, setScrolled] = useState(false);

  const rows = animals.map((row) => (
    <Table.Tr key={row.id}>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.age}</Table.Td>
      <Table.Td>{row.breed}</Table.Td>
      <Table.Td>{row.kind}</Table.Td>
      <Table.Td>{row.status}</Table.Td>
      <Table.Td>
        <Group>
          <ActionIcon color="blue" onClick={() => handleEdit(row)}>
            <IconPencil size={16} />
          </ActionIcon>
          <ActionIcon
            color="red"
            onClick={() => {
              if (row.id !== undefined) {
                handleDeleteClick(row.id);
              } else {
                console.error("Animal ID is indefinido");
              }
            }}
          >
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea h={300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <Table miw={700}>
        <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <Table.Tr>
            <Table.Th>Nombre</Table.Th>
            <Table.Th>Edad</Table.Th>
            <Table.Th>Raza</Table.Th>
            <Table.Th>Tipo</Table.Th>
            <Table.Th>Estado</Table.Th>
            <Table.Th>&nbsp;</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  )
}

export default AnimalTable