import { Modal, Stack, TextField, Typography, Button, Box } from "@mui/material";
import { useEffect } from "react";

function ProductCommentsModal({open, setOpen, comments, productName}) {


    let components = <Typography sx={{fontStyle: "italic", color: "gray"}}>Sem comentários aqui.</Typography>;

    if(comments.length > 0)
    {
        console.log("Doing isso", comments)
        components = comments?.map((c) => {
            return <Typography sx={{fontSize: 14, fontStyle: "italic", mt:"1000"}}>- {c.content}</Typography>
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
                maxHeight: "80%",
            }} 
            direction="column" 
             >
                <Typography sx={{fontSize: 20, mb: "1.5rem"}}>Comentários em {productName}</Typography>
                <Stack sx={{overflow: "auto"}} spacing={"1rem"}>
                {components}
                </Stack>
                <Box sx={{width: "100%", display:'flex', justifyContent: "end"}}>
                </Box>
            </Stack>
        </Modal>
     );
}

export default ProductCommentsModal;