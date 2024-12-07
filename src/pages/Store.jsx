import { useParams } from "react-router";
import Template from "../Template";
import { useState } from "react";
import { StoreManager } from "../login/store_manager";
import { Box, Button, Chip, Input, Stack, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import StoreProductListing from "../components/StoreProductListing";

function Store() {
    const params = useParams();
    
    const [store, setStore] = useState(undefined)

    let id = params.id

    if(!store)
    {
        let mng = new StoreManager()
        mng.GetStore(id)
        .then((response) => {
            setStore(response);
            console.log(response)
        })
    }

    let productComponents;

    if(store)
    {
        productComponents = store.products.map((p) => {
            return (
                <StoreProductListing description={p.description} name={p.name} price={p.price} id={p.id} comments={p.reviews} userview  product={p}/>
            )
        })
    }

    return ( 
        <Template>
            <Stack width={"48rem"} mx="auto" direction={"column"} spacing={"1rem"} boxShadow={"#ddd 0px 8px 8px"} padding={"1rem"} borderRadius={"8px"} border={"1.5px solid #ccc"}>
                    <Stack direction="row" alignItems="center" justifyContent={"center"}>
                        <Typography sx={{fontSize: "24px"}} >{store? store.name : "Carregando..."}</Typography>
                    </Stack>
                    
                    <Typography sx={{fontSize: "14px", fontStyle: "italic"}}>{store? store.description : "Carregando..."}</Typography>

                    <Stack direction="row" alignItems="center" justifyContent={"center"}>
                        <Typography sx={{fontSize: "24px"}} >Produtos</Typography>
                    </Stack>
                    <Grid container spacing="2rem">
                        {productComponents}
                    </Grid>
                </Stack>
        </Template>
     );
}

export default Store;