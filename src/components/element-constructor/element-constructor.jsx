import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import StyleElement from "./element-constructor.module.css"

export const ElementConstructor = ({ingredients}) => {

    const ElementBuild = ({ type, price, name, thumbnail}) => {
        return (
            <div className={`${StyleElement.element}`}>
                <ConstructorElement
                    type={type}
                    isLocked={type === "bun" ? true : false}
                    text={name}
                    price={price}
                    thumbnail={thumbnail}
                />
            </div>
        )
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
    });

    return (
        <>
            {
                arrBun.map((ingredient) => (
                    <ElementBuild type={ingredient.type} price={ingredient.price} name={ingredient.name} thumbnail={ingredient.image} key={ingredient._id}/>
                ))
            }
            {
                arrMain.map((ingredient) => (
                    <ElementBuild price={ingredient.price} name={ingredient.name} thumbnail={ingredient.image} key={ingredient._id}/>
                ))
            }
            {
                arrBun.map((ingredient) => (
                    <ElementBuild type={ingredient.type} price={ingredient.price} name={ingredient.name} thumbnail={ingredient.image} key={ingredient._id}/>
                ))
            }
        </>
    )

}
