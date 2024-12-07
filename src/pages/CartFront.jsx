
import React from 'react';
import { useCart } from '../helpers/cart.js';

import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import Template from '../Template.jsx';
import { UserManager } from "../login/user_manager";
import { GetCookie } from "../helpers/cookieHelper";
import { useNavigate } from 'react-router';

const userIdKey = "userId"

const CartFront = () => {
    const navigate = useNavigate();
    const { cart, removeFromCart, clearCart} = useCart();
    const userIdCookie = GetCookie(userIdKey)

    var mng = new UserManager();

    function MakePurchase(userId) {
        if (!userId) {
            navigate('/user')
        }
        else {
            let productIds = cart.map((product) => product.id);
            mng.makePurchase(userId, productIds)
                .then((response) => {
                    if (response) {
                        clearCart();
                        alert("Compra realizada com sucesso!");
                    }
                    console.log(response)
                })
        }
    }

    return (
        <div style={{ padding: '20px' }}>
            <Template>
                <Typography variant="h4" gutterBottom>
                    Seu carrinho
                </Typography>
                {cart.length === 0 ? (
                    <Typography variant="h6" color="textSecondary">
                        Seu carrinho está vazio, adicione alguns produtos.
                    </Typography>
                ) : (
                    <TableContainer component={Paper} elevation={3}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cart.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item.title}</TableCell>
                                        <TableCell>{item.description}</TableCell>
                                        <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                                        <TableCell align="right">
                                            <Button
                                                variant="outlined"
                                                color="destructive"
                                                size="small"
                                                onClick={() => removeFromCart(item.id)}
                                            >
                                                Remover
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                <div style={{ marginTop: '20px', textAlign: 'right' }}>
                    <Typography variant="h5">
                        Total: R${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '10px' }}
                        disabled={cart.length === 0}
                        onClick={() => MakePurchase(userIdCookie)}
                    >
                        Comprar
                    </Button>
                </div>
            </Template>
        </div>
    );
};
export default CartFront;