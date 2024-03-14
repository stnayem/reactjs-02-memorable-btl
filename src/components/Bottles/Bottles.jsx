import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../Bottle/Bottle";
import './Bottles.css'
import { addIdToLS, getStoredCart, removeIdFromLS } from "../../utilities/localstorage";
import Cart from "../Cart/Cart";

const Bottles = () => {
    const [bottles, setBottles] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('bottles.json')
            .then(resp => resp.json())
            .then(data => setBottles(data))
    }, []);

    //load cart from local storage
    useEffect(() => {
        // bottles.length>0
        if (bottles.length) {
            const carts = getStoredCart();

            const savedBottles = []
            for (const id of carts) {
                const bottle = bottles.find(btl => btl.id === id);
                savedBottles.push(bottle);
            }
            // console.log(savedBottles);
            setCart(savedBottles)
        }
    }, [bottles]);

    const handleAddToCart = bottle => {
        setCart([...cart, bottle]);
        addIdToLS(bottle.id);
    }

    const handleRemoveFromCart = id => {
        // remove from UI / Visual
        const remainingCart = cart.filter(bottle => bottle.id !== id);
        setCart(remainingCart);
        //remove from LS
        removeIdFromLS(id);
    }

    return (
        <div>
            <h3>Bottles type available: {bottles.length}</h3>
            <Cart handleRemoveFromCart={handleRemoveFromCart} cart={cart}></Cart>
            <div className="bottle-container">
                {
                    bottles.map(bottle => <Bottle key={bottle.id} bottle={bottle} handleAddToCart={handleAddToCart}></Bottle>)
                }
            </div>
        </div>
    );
};

export default Bottles;