import { Typography, Button } from "@mui/material";
import Template from "../Template";
import { useNavigate } from "react-router";

function NotFound() {
    const navigate = useNavigate()

    return ( 
        <Template>
            <Typography mb={"1rem"} >Opa! Página não encontrada.</Typography>
            <Button variant="contained" onClick={() => {navigate("/")}}>Voltar à home</Button>
        </Template>
     );
}

export default NotFound;