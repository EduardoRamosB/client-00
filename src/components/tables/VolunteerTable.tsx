import {ActionIcon, Avatar, Group, ScrollArea, Table, Text} from "@mantine/core";
import React from "react";
import {User} from "../../types.ts";
import {IconPencil, IconTrash} from "@tabler/icons-react";

/*const data = [
  {
    id: '1',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png',
    name: 'Robert Wolfkisser',
    job: 'Engineer',
    email: 'rob_wolf@gmail.com',
  },
  {
    id: '2',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png',
    name: 'Jill Jailbreaker',
    job: 'Engineer',
    email: 'jj@breaker.com',
  },
  {
    id: '3',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
    name: 'Henry Silkeater',
    job: 'Designer',
    email: 'henry@silkeater.io',
  },
  {
    id: '4',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png',
    name: 'Bill Horsefighter',
    job: 'Designer',
    email: 'bhorsefighter@gmail.com',
  },
  {
    id: '5',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-10.png',
    name: 'Jeremy Footviewer',
    job: 'Manager',
    email: 'jeremy@foot.dev',
  },
];*/

interface IVolunteerTableProps {
  users: User[];
  handleEdit: (user: User) => void;
  handleDeleteClick: (id: number) => void;
}

const VolunteerTable: React.FC<IVolunteerTableProps> = ({ users, handleEdit, handleDeleteClick }) => {
  const rows = users.map((user) => {
    return (
      <Table.Tr key={user.id} >
        <Table.Td>
          <Group gap="sm">
            <Avatar size={26} src={''} radius={26} />
            <Text size="sm" fw={500}>
              {user.username}
            </Text>
          </Group>
        </Table.Td>
        <Table.Td>{user.email}</Table.Td>
        <Table.Td>{user.first_name}</Table.Td>
        <Table.Td>{user.last_name}</Table.Td>
        <Table.Td>
          <Group>
            <ActionIcon color="blue" onClick={() => handleEdit(user)}>
              <IconPencil size={16} />
            </ActionIcon>
            <ActionIcon
              color="red"
              onClick={() => {
                if (user.id !== undefined) {
                  handleDeleteClick(user.id);
                } else {
                  console.error("User ID es indefinido");
                }
              }}
            >
              <IconTrash size={16} />
            </ActionIcon>
          </Group>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <ScrollArea>
      <Table miw={800} verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>User</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Nombre</Table.Th>
            <Table.Th>Apellioo</Table.Th>
            <Table.Th>&nbsp;</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  )
}

export default VolunteerTable