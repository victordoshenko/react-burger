import React from "react";
import StylesConstructor from "./burger-constructor.module.css";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ElementConstructor} from "../element-constructor/element-constructor";
import {useState} from "react";
import {Modal} from "../modal/modal";
import {OrderDetails} from "../order-details/order-details";
import {ingredientType} from "../../utils/type";

export const BurgerConstructor = ({ ingredients }) => {

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
        <section className={`StylesConstructor mt-25`}>
            <div className={StylesConstructor.basket}>
                <ElementConstructor ingredients={ingredients}/>
            </div>
            <div className={`${StylesConstructor.result} mt-10`}>
                <div className={`${StylesConstructor.totalAmount} mr-10`}>
                    <p className="text text_type_digits-medium">610</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="medium" onClick={openModal}>
                    Оформить заказ
                </Button>
            </div>
            {showModal && (
                <Modal close={closeModal}>
                    <OrderDetails />
                </Modal>)
            }
        </section>
    )

};

BurgerConstructor.propTypes = {
    ingredients: ingredientType
};

