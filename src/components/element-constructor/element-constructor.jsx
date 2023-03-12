import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import React from "react";
import StyleElement from "./element-constructor.module.css"

export const ElementConstructor = ({ingredients}) => {

    const ElementBuild = ({ type, price, name, thumbnail}) => {
        return (
            <div className={`${StyleElement.element}`}>
                <ConstructorElement
                    type={type}
                    isLocked={true}
                    text={name}
                    price={price}
                    thumbnail={thumbnail}
                />
            </div>
        )
    }

    Element.propTypes = {
        name: PropTypes.string,
        thumbnail: PropTypes.string,
        price: PropTypes.number,
        type: PropTypes.oneOf(["top" | "bottom" | undefined]),
        isLocked: PropTypes.oneOf([PropTypes.bool | undefined]),
        extraClass: PropTypes.oneOf([PropTypes.string | undefined]),
        handleClose: PropTypes.func,
    }

    const arrBun = [];
    const arrMain = [];

    ingredients.map((ingredient) => {
        if (ingredient.name === "Краторная булка N-200i") {
            arrBun.push(ingredient);
        }
        if (ingredient.type === "sauce" || ingredient.type === "main") {
            arrMain.push(ingredient);
            arrMain.splice(3, 2);
        }
        return ingredient;
    })

    return (
        <>
            {
                arrBun.map((ingredient) => (
                    <ElementBuild type="top" price={ingredient.price} name={ingredient.name} thumbnail={ingredient.image} key={ingredient._id}/>
                ))
            }
            {
                arrMain.map((ingredient) => (
                    <ElementBuild price={ingredient.price} name={ingredient.name} thumbnail={ingredient.image} key={ingredient._id}/>
                ))
            }
            {
                arrBun.map((ingredient) => (
                    <ElementBuild type="bottom" price={ingredient.price} name={ingredient.name} thumbnail={ingredient.image} key={ingredient._id}/>
                ))
            }
        </>
    )

}
