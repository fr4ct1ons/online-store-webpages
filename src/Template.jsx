import { AppBar, Box, Button, Container, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { Children } from 'react';
import { useNavigate } from 'react-router';

function Template({children}) {

    const navigate = useNavigate();

    return ( 
        <Container maxWidth="xl" >
        <AppBar>
            <Toolbar sx={{justifyContent: "space-between"}}>
            <Typography>Online Store</Typography>

            <Stack direction={"row"} spacing={"1rem"}>
            <IconButton onClick={() => navigate("/storefront")}>
                <StorefrontRoundedIcon />
            </IconButton>

            <IconButton onClick={() => navigate("/user")}>
                <PersonRoundedIcon />
            </IconButton>
            </Stack>

            </Toolbar>
        </AppBar>
      <Box height={"6rem"} />
        {children}
    </Container>
     );
}

export default Template;