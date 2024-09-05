import React from "react";
import {Container, Drawer, Grid, Paper} from "@mantine/core";
import Sidebar from "../navigation/Sidebar.tsx";
import {Header} from "../navigation/Header.tsx";
import {useDisclosure} from "@mantine/hooks";

const Layout: React.FC = () => {
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure(false)

  return (
    <>
      <Container size="lg">
        <Grid>
          <Grid.Col span={{ base: 12, xs: 4 }} visibleFrom ="md">
            <Sidebar />
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 8 }}>
            <Grid>
              <Grid.Col span={12}>
                <Header onBurgerClick={openDrawer}/>
              </Grid.Col>
              <Grid.Col span={12}>
                <Paper>
                  Main content
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