import { AppBar, Box, Button, Container, IconButton, Input, Stack, TextField, Toolbar, Typography } from '@mui/material';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { Children, useState } from 'react';
import { useNavigate } from 'react-router';
import CartButton from './components/CartButton';

function Template({children}) {

    const navigate = useNavigate();

    const [query, setQuery] = useState("")

    function SearchStores()
    {
        if(!query)
        {
            return
        }

        navigate("/store_search/" + query)
    }

    return ( 
        <Container maxWidth="xl" >
        <AppBar>
            <Toolbar sx={{justifyContent: "space-between"}}>
            <Typography sx={{cursor: "pointer"}} onClick={() => {navigate("/")}} >Online Store</Typography>

            <Box sx={{width: "30%", bgcolor: "white", border: "1.5px solid", borderColor: "primary.dark", borderRadius: 32, px: "1.5rem", py: ".25rem"}}>
                <form onSubmit={SearchStores}>
                    <Input sx={{width: "100%",}} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Pesquisar loja"></Input>
                </form>
            </Box>

            <Stack direction={"row"} spacing={"1rem"}>
                <CartButton onClick={() => navigate("/cart")}></CartButton>
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