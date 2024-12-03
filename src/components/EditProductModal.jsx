import { Modal, Stack, TextField, Typography, Button, Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { StoreManager } from "../login/store_manager";
import { ProductsContext, SetProductsContext } from "../pages/Storefront";
import { ProductManager } from "../login/product_manager";

function EditProductModal({open, setOpen, productId}) {

    const setProducts = useContext(SetProductsContext)
    const products = useContext(ProductsContext)

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")

    useEffect(() => {

        let product = products.filter((p) => p.id == productId)[0]
        console.log(product)
        setName(product.name)
        setDescription(product.description)
        setPrice(product.price)

    }, [open, productId], [])

    function UpdateProduct()
    {
        let newProducts = products.map((p) => {
            if(p.id == productId)
            {
                p.price = price;
                p.name = name;
                p.description = description;
            }

            return p;
        })
        setProducts(newProducts)

        let mng = new ProductManager()

        mng.UpdateProduct(productId, description, price, name)
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
                <Typography>Editar produto</Typography>

                <TextField value={name} onChange={(e) => setName(e.target.value)} label="Nome" />
                <TextField value={description} onChange={(e) => setDescription(e.target.value)} label="Descrição" />
                <TextField type="number" value={price} onChange={(e) => setPrice(e.target.value)} label="Preço" />

                <Box sx={{width: "100%", display:'flex', justifyContent: "end"}}>
                    <Button variant="contained" sx={{mr: "3rem", mb: "1rem"}} onClick={UpdateProduct}>Editar</Button>
                </Box>
            </Stack>
        </Modal>
     );
}

export default EditProductModal;