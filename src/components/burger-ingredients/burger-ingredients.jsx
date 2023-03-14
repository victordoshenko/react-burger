import React from "react";
import StyleIngredients from "./burger-ingredients.module.css"
import {ProductElem} from "../product-elem/product-elem";
import {BurgerIngredientsHeader} from "../burger-ingredients-header/burger-ingredients-header";
import {ingredientType} from "../../utils/type";

export const BurgerIngredients = ({ products }) => {

    const arrBun = [];
    const arrSauce = [];
    const arrMain = []

    products.map((product) => {
        if (product.type === "bun") {
            arrBun.push(product);
        }
        if (product.type === "sauce") {
            arrSauce.push(product);
        }
        if (product.type === "main") {
            arrMain.push(product);
        }
        return product;
    });

    return (
        <section className="BurgerIngredients">
            <BurgerIngredientsHeader/>
            <div className={`${StyleIngredients.ingredients}`}>
                    <div className={`${StyleIngredients.categoriesName} text text_type_main-medium mt-10`}>Булки</div>
                    <div className={`${StyleIngredients.categories} mt-6`}>
                        {arrBun.map((product)=>(
                            <ProductElem product={product} key={product._id}/>
                        ))}
                    </div>

                    <div className={`${StyleIngredients.categoriesName} text text_type_main-medium mt-10`}>Соусы</div>
                    <div className={`${StyleIngredients.categories} mt-6`}>
                        {arrSauce.map((product, key)=>(
                            <ProductElem product={product} key={product._id}/>
                        ))}
                    </div>

                    <div className={`${StyleIngredients.categoriesName} text text_type_main-medium mt-10`}>Начинки</div>
                    <div className={`${StyleIngredients.categories} mt-6`}>
                        {arrMain.map((product, key)=>(
                            <ProductElem product={product} key={product._id}/>
                        ))}
                    </div>
            </div>
        </section>
    );
}

BurgerIngredients.propTypes = {
    ingredients: ingredientType
};
