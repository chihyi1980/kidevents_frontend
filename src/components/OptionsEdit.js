import React from 'react';
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import SettingsList from './options/settings-list';

const OptionsEdit = () => {
  return (

    <>
      <Container maxWidth="xl" sx={{ mt: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <SettingsList title='Location' dataSource="loc" />
          </Grid>
          <Grid item xs={3}>
            <SettingsList title='Tag' dataSource="tag" />
          </Grid>
        </Grid>
      </Container>
    </>

  );
};

export default OptionsEdit;
