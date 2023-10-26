import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import img from '../../../image/logo.png'
// import img2 from '../../../image/atleta1.png'
// import img3 from '../../../image/atleta2.png'
import { Content, ContentFundo, ContentImage, ContentImageAtleta1, ContentImageAtleta2 } from './Login.styled'
import { Data } from './Login.interface';
// import { useAuthGeral } from 'src/features/auth/authHook';

// import { useNotification } from 'src/features/notification/notificationHooks';
import { fields } from './Login.field';
import Form from 'src/components/fields/Form';

const theme = createTheme();

export default function Login() {

  // const { loginGeral } = useAuthGeral()
  // const { displayError } = useNotification()

  const onSubmit = (data: any) => console.log(data)

  // loginGeral(data).catch((err) => {
  //   displayError({ message: err.data.messagem, notificationType: "error", position: 'top' })

  // })

  return (
    <Content>
      {/* <ContentImageAtleta1 url={img2} />
      <ContentImageAtleta2 url={img3} /> */}
      <ThemeProvider theme={theme}>

        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >

            <ContentFundo>
              {/* <ContentImage url={img} /> */}
              <Typography component="h1" variant="h4">
                Entrar
              </Typography>
              <Typography component="h1" variant="h6">
                Bem-vindo ao nosso sistema
              </Typography>

              <Form
                fields={fields}
                onSubmit={onSubmit}
                locationButton={"center"}
                textButton={"Entra"} />

              <Grid container style={{
                justifyContent: "flex-end"
              }}>
                <Grid>
                  <Link href="#" variant="body2">
                    Esqueceu a senha?
                  </Link>
                </Grid>
                <Grid >
                  <Link href="#" variant="body2">
                    Não tem uma conta? Entre em contato
                  </Link>
                </Grid>
              </Grid>
            </ContentFundo>
          </Box>
        </Container>
      </ThemeProvider>
    </Content >
  );
}