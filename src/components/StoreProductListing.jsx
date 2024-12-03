import { Stack, Typography, Box, Button } from "@mui/material";
import Grid from '@mui/material/Grid';
import { createContext, useState } from "react";
import EditProductModal from "./EditProductModal";

function StoreProductListing({name, price, id, description}) {

    const [editModalOpen, setEditModalOpen] = useState(false)

    return ( 
        <Grid xs={5.5} item >
            <Box height={150} sx={{border: "1.5px solid #ddd", p:"1rem", borderRadius: "8px"}}>
                <Stack mb={"1rem"} direction="row" justifyContent="space-between" alignItems="end">
                    <Typography fontSize={22}>{name}</Typography>
                    <Typography fontSize={12}>R$ {price}{Number.isInteger(price) ? ".00" : ""}</Typography>
                </Stack>
                <Box  >
                    <Typography sx={{overflow: "hidden"}} textOverflow={"hidden"} fontSize={14}>{description}</Typography>
                    <Stack mt="auto" direction="row" justifyContent="space-between" alignItems="end">
                        <Button variant="contained">Ver comentários</Button>
                        <Button onClick={() => setEditModalOpen(true)} variant="contained">Editar</Button>
                    </Stack>
                </Box>
            </Box>

            <EditProductModal open={editModalOpen} setOpen={setEditModalOpen} productId={id} />
        </Grid>
     );
}

export default StoreProductListing;