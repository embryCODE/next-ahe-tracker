import Head from 'next/head';
import {
  Box,
  Container,
  Paper,
  ThemeProvider,
  Typography,
} from '@material-ui/core';
import { TrackerForm } from '../components/TrackerForm';
import { useState } from 'react';
import { getHealthStatusColor } from '../helpers';
import { HealthContextValue, HealthStatus } from '../types';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import HealthContext from '../data/HealthContext';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

export default function Home() {
  const [healthStatus, setHealthStatus] = useState<HealthStatus>(
    HealthStatus.Unknown
  );

  const healthContextValue: HealthContextValue = [
    HealthStatus.Good,
    setHealthStatus,
  ];

  return (
    <HealthContext.Provider value={healthContextValue}>
      <ThemeProvider theme={theme}>
        <Box p={2} minHeight="100vh" bgcolor={getHealthStatusColor(healthStatus)}>
          <Head>
            <title>Agnostic Healthy Eating Tracker</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <Container maxWidth="xl" component="main">
            <Typography variant="h1" align="center">
              Agnostic Healthy Eating Tracker
            </Typography>

            <Box mt={3}>
              <Container maxWidth="md">
                <Typography variant="subtitle1">
                  Eat each type of <em>essential</em> food more often than any
                  type of <em>recommended</em> food. Eat each type of{' '}
                  <em>recommended</em> food more often than any type of{' '}
                  <em>acceptable</em> food. For extra credit, eat each of the
                  ten food types in the diet-quality hierarchy more often than
                  any food type of lower rank.
                </Typography>
              </Container>
            </Box>

            <Container maxWidth="sm">
              <Paper>
                <Box mt={5} px={2} py={1}>
                  <TrackerForm />
                </Box>
              </Paper>
            </Container>
          </Container>
        </Box>
      </ThemeProvider>
    </HealthContext.Provider>
  );
}
