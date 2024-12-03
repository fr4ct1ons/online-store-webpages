import { Stack, Typography, Box } from "@mui/material";
import Grid from '@mui/material/Grid';

function StoreProductListing({name, price, id, description}) {
    return ( 
        <Grid xs={5.5} item >
            <Box height={120} sx={{border: "1.5px solid #ddd", p:"1rem", borderRadius: "8px"}}>
                <Stack mb={"1rem"} direction="row" justifyContent="space-between" alignItems="end">
                    <Typography fontSize={22}>{name}</Typography>
                    <Typography fontSize={12}>R$ {price}{Number.isInteger(price) ? ".00" : ""}</Typography>
                </Stack>
                <Box  >
                    <Typography sx={{overflow: "hidden"}} textOverflow={"hidden"} fontSize={14}>{description}</Typography>
                </Box>
            </Box>
        </Grid>
     );
}

export default StoreProductListing;