import React from "react";
import {Container, Drawer, Grid, Paper} from "@mantine/core";
import Sidebar from "../navigation/Sidebar.tsx";
import {Header} from "../navigation/Header.tsx";
import {useDisclosure} from "@mantine/hooks";

interface IHomeProps {
  from: string
  children: React.ReactNode
}

const Layout: React.FC<IHomeProps> = ({ from, children  }) => {
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure(false)

  return (
    <>
      <Container size="lg">
        <Grid>
          {from === 'authenticated' &&
            <Grid.Col span={{ base: 12, xs: 4 }} visibleFrom ="md">
              <Sidebar />
            </Grid.Col>}

          <Grid.Col span={{ base: 12, xs: from === 'authenticated' ? 8 : 12 }}>
            <Grid>
              <Grid.Col span={12}>
                <Header
                  from={from}
                  onBurgerClick={openDrawer}
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <Paper>
                  {children}
                </Paper>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
      </Container>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        title="Sidebar"
        padding="md"
        size="md"
      >
        <Sidebar />
      </Drawer>
    </>
  )
}

export default Layout