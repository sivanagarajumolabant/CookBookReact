import { Box, Grid, TextField, Typography } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import React from 'react'
import MenuAppBar from '../../Components/header'
export default function AdminAccesslist() {
  return (
    <MenuAppBar>
      <Box py={4} px={5}>

        <Grid container direction='row' justifyContent='center'>
          <Grid item>
            <Typography variant='h6'>
              ADMIN ACCESS LIST
            </Typography>
          </Grid>
        </Grid>
        <Grid container direction='row' xs={12}>
          <Grid item xs={3}>
            <Autocomplete
              size="small"
              id="grouped-demo"
              options={[
                { title: "v1", code: 1 },
                { title: "v2", code: 2 },
                { title: "v3", code: 3 },
              ]}

              groupBy={""}
              // defaultValue={{ title: "Oracle To Postgres" }}
              getOptionLabel={(option) => option.title}
              defaultValue={{ title: "v1", code: 1 }}
              style={{ width: 300 }}

              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Migration Type"
                  variant="outlined"
                // borderColor = 'text.primary'




                />
              )}
            />
          </Grid>


        </Grid>
      </Box>
    </MenuAppBar>
  )
}
