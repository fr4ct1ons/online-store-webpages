import React from 'react';
import { IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../helpers/cart.js';

const CartButton =  ({ onClick }) => {
  const { cart } = useCart();
  return (
    <div>
      <IconButton onClick={onClick} >
        <Badge 
          badgeContent={cart.length} 
          color="secondary" 
          invisible={cart.length === 0}
        >
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </div>
  );
};

export default CartButton;