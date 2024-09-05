import React from "react";
import {Menu, Group, Center, Burger, Container, Button} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import classes from './Header.module.css';
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
import {LogOut} from "../../api/users.api.ts";

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

const links = [
  {
    id: '#1',
    label: 'Welcome',
    links: [
      { id: '#l1', link: '/faq', label: 'Profile' },
      { id: '#l2', link: '/forums', label: 'Logout' },
    ],
  },
];

interface IHeaderProps {
  from: string
  onBurgerClick: () => void
}

export const Header: React.FC<IHeaderProps> = ({ from, onBurgerClick }) => {
  const [opened] = useDisclosure(false);
  const { jwt, refresh_token, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async (e) => {
    e.preventDefault()

    try {
      const res = await LogOut(jwt, refresh_token);
      console.log('res:', res);
      logout()
      navigate('/users/sign_in', { replace: true })
    } catch (e) {
      console.log(e)
    } finally {
      logout()
    }
  }

  const selectedLinks = from === 'authenticated' ? links : publicLinks
  const items = selectedLinks.map((link) => {
    const menuItems = link.links?.map((item: LinkItem) => (
      <Menu.Item key={item.id}>
        {item.label}
      </Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <a
              href='#'
              className={classes.link}
              onClick={handleLogout}
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
