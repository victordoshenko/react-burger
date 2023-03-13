import React, {useState} from "react";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import StyleIBurgerProducts from "./product-elem.module.css"
import {Modal} from "../modal/modal";
import {IngredientDetails} from "../ingredient-details/ingredient-details";

export const ProductElem = ({ product }) => {


    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
        console.log("open")
    };

    const closeModal = () => {
        setShowModal(false);
        console.log("close")
    };


        return (
            <div className={`${StyleIBurgerProducts.product}`} onClick={openModal} key={product.id}>
                <img className={`mr-4 ml-4`} src={product.image} alt={product.name}/>
                <Counter count={0} size="default" extraClass="m-1"/>
                <h3 className={`${StyleIBurgerProducts.productName} text text_type_main-default`}>{product.name}</h3>
                <div className={`${StyleIBurgerProducts.productPrice} mt-1 mb-1`}>
                    <p className={`mr-1 text text_type_digits-default`}>{product.price}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                {showModal && (
                    <Modal close={closeModal}>
                        <IngredientDetails product={product}/>
                    </Modal>)
                }

            </div>
        );
    };
