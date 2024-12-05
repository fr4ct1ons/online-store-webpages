import { Typography, Button, Stack, Box } from "@mui/material";
import Template from "../Template";
import { useNavigate, useParams } from "react-router";
import { StoreManager } from "../login/store_manager";
import { useState } from "react";

function StoreSearch() {
    const navigate = useNavigate()
    const params = useParams();
    console.log(params)
    
    const [stores, setStores] = useState(undefined)
    let query = "Loja1";

    let mng = new StoreManager();

    if(!stores)
    {
        mng.SearchStores(query)
        .then((response) => {
            setStores(response);
        })
    }

    let storeComponents = ""
    if(stores)
    {
        storeComponents = stores.map((s) => {
            return (
                <Stack direction="row" sx={{border: "1.5px solid #ddd", p:"1rem", borderRadius: "8px", width: "100%"}} spacing={".5rem"}>
                    <Box>
                        <Typography fontSize={18} >{s.name}</Typography>
                        <Typography fontSize={14} fontStyle={"italic"}>{s.description}</Typography>
                    </Box>
                    <Button style={{marginLeft: "auto"}} variant='contained'>Conhecer</Button>
                </Stack>
            )
        })
    }

    return ( 
        <Template>
            <Stack direction={"column"} sx={{ mx: "auto", width: "80%", alignItems: "center"}}>
                <Typography mb={"1rem"} >Pesquisa por "{query}"</Typography>
                {storeComponents}
            </Stack>
        </Template>
     );
}

export default StoreSearch;