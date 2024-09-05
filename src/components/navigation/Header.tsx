import React from "react";
import { Menu, Group, Center, Burger, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import classes from './Header.module.css';

const publicLinks = [
  {
    link: '#1',
    label: 'Sign Up'
  },
  {
    link: '#2',
    label: 'Login'
  },
]

const links = [
  {
    link: '#1',
    label: 'Welcome',
    links: [
      { link: '/faq', label: 'Profile' },
      { link: '/forums', label: 'Logout' },
    ],
  },
];

interface IHeaderProps {
  from: string
  onBurgerClick: () => void
}

export const Header: React.FC<IHeaderProps> = ({ from, onBurgerClick }) => {
  const [opened] = useDisclosure(false);

  const items = publicLinks.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </a>
    );
  });

  return (
    <header className={classes.header}>
      <Container size="md">
        <div className={classes.inner}>
          <Group className={classes.leftItems}>
            {/* Add other items here if needed */}
          </Group>
          <Group className={classes.rightItems}>
            {items}
            {from === 'authenticated' &&
              <Burger
                opened={opened}
                onClick={onBurgerClick}
                size="sm"
                className={classes.burger}
              />}
          </Group>
        </div>
      </Container>
    </header>
  );
}
