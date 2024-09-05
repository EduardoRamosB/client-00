import './App.css'
import '@mantine/core/styles.css';
import {Container, Grid, MantineProvider, Drawer, Paper} from "@mantine/core";
import Sidebar from "./components/navigation/Sidebar.tsx";
import {useDisclosure} from "@mantine/hooks";
import {Header} from "./components/navigation/Header.tsx";

function App() {
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure(false)

  return (
    <MantineProvider defaultColorScheme="dark">
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
    </MantineProvider>
  )
}

export default App