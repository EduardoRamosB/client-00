import React, {useState, useEffect} from "react";
import { Group, Code } from '@mantine/core';
import {
  IconFingerprint,
  IconSettings,
  IconSwitchHorizontal,
  IconLogout, IconCalendarHeart, IconUsersGroup, IconHome
} from '@tabler/icons-react';
import classes from './NavbarSimple.module.css';
import { Link, useLocation, useNavigate } from "react-router-dom";

// Define the type for icons
type IconComponent = React.FC<{ className?: string; stroke?: number; }>;

interface NavItem {
  link: string;
  label: string;
  icon: IconComponent;
}

const data: NavItem[] = [
  { link: '/users/dashboard', label: 'Dashboard', icon: IconHome as IconComponent },
  { link: '/users/animals', label: 'Animales', icon: IconFingerprint as IconComponent },
  { link: '/users/adoptions', label: 'Adopciones', icon: IconCalendarHeart as IconComponent },
  { link: '/users/volunteers', label: 'Voluntarios', icon: IconUsersGroup as IconComponent },
  { link: '/settings', label: 'Other Settings', icon: IconSettings as IconComponent },
];

const Sidebar = () => {
  const [active, setActive] = useState('Dashboard');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentLink = data.find(item => item.link === location.pathname);
    if (currentLink) {
      setActive(currentLink.label);
    }
  }, [location.pathname]);

  const handleClickLink = (item: NavItem) => {
    setActive(item.label);
    navigate(item.link);
  }

  const links = data.map((item) => (
    <Link
      key={item.label}
      to={item.link}
      className={classes.link}
      data-active={item.label === active || undefined}
      onClick={() => handleClickLink(item)}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Code fw={700}>v3.1.2</Code>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  )
}

export default Sidebar;
