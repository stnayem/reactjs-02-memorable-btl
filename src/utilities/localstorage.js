const saveCartToLS = cart => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

const getStoredCart = () => {
    const prevCart = localStorage.getItem('cart');
    if (prevCart) {
        return JSON.parse(prevCart);
    }
    return [];
}

const addIdToLS = id => {
    const cart = getStoredCart();
    cart.push(id);
    //replace and save new cart in localStorage
    saveCartToLS(cart);
}

const removeIdFromLS = id => {
    const cart = getStoredCart();
    const remainingCart = cart.filter(tempId => tempId !== id);
    //replace and create new cart in localStorage
    saveCartToLS(remainingCart);
}

// saveCartToLS,getStoredCart, addToLS, removeFromLS
//getItem(...), setItem(...), removeItem(...)

export { addIdToLS, getStoredCart, removeIdFromLS }
