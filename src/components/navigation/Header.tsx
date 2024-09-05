import React from "react";
import {Menu, Group, Center, Burger, Container, Button} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import classes from './Header.module.css';
import {Link} from "react-router-dom";

interface LinkItem {
  link: string;
  label: string;
}

interface PublicLink {
  id: string;
  label: string;
  link: string;
  links?: LinkItem[]; // Optional array of sub-links
  color: string
}

const publicLinks: PublicLink[] = [
  {
    id: '#1',
    label: 'Sign Up',
    link: '/users/sign_up',
    color: 'violet'
  },
  {
    id: '#2',
    label: 'Login',
    link: '/users/sign_in',
    color: 'blue'
  },
]

/*const links = [
  {
    link: '#1',
    label: 'Welcome',
    links: [
      { link: '/faq', label: 'Profile' },
      { link: '/forums', label: 'Logout' },
    ],
  },
];*/

interface IHeaderProps {
  from: string
  onBurgerClick: () => void
}

export const Header: React.FC<IHeaderProps> = ({ from, onBurgerClick }) => {
  const [opened] = useDisclosure(false);

  const items = publicLinks.map((link) => {
    const menuItems = link.links?.map((item: LinkItem) => (
      <Menu.Item>
        {item.label}
      </Menu.Item>
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

    if (from === 'public') {
      return (
        <Link key={link.id} to={link.link} style={{ textDecoration: 'none' }}>
          <Button variant="filled" color={link.color}>{link.label}</Button>
        </Link>
      )
    }

    return (
      <Link key={link.id} to={link.link} className={classes.link}>
        {link.label}
      </Link>
    );
  });

  return (
    <header className={classes.header}>
      <Container size="lg">
        <div className={classes.inner}>
          <Group className={classes.leftItems}>
            {/* Add other items here if needed */}
            <Link to='/' className={classes.link}>
              Home
            </Link>
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
