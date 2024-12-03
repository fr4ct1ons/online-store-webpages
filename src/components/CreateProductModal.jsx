import { Modal, Stack, TextField, Typography, Button, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { StoreManager } from "../login/store_manager";

function CreateProductModal({open, setOpen, storeId, products, setProducts}) {

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")

    let mng = new StoreManager()
    function CreateProduct()
    {
        mng.CreateProduct(storeId, name, description, price)
        .then((response) => {
            setProducts(
                [
                    ...products,
                    {
                        name: response.name,
                        id: response.id,
                        description: response.description,
                        price: response.price,
                        
                    }
                ]
            )
        })
    }

    return ( 
        <Modal open={open} onClose={() => setOpen(false)}>
            <Stack 
            sx={{
                width: 400, 
                top: "50%", 
                left: "50%", 
                position: "absolute", 
                bgcolor: "background.paper", 
                p: "1rem",
                borderRadius: "2px",
                transform: 'translate(-50%, -50%)',
            }} 
            direction="column" 
            spacing={"2rem"} >
                <Typography>Cadastrar novo produto</Typography>

                <TextField value={name} onChange={(e) => setName(e.target.value)} label="Nome" />
                <TextField value={description} onChange={(e) => setDescription(e.target.value)} label="Descrição" />
                <TextField type="number" value={price} onChange={(e) => setPrice(e.target.value)} label="Preço" />

                <Box sx={{width: "100%", display:'flex', justifyContent: "end"}}>
                    <Button variant="contained" sx={{mr: "3rem", mb: "1rem"}} onClick={CreateProduct}>Criar</Button>
                </Box>
            </Stack>
        </Modal>
     );
}

export default CreateProductModal;