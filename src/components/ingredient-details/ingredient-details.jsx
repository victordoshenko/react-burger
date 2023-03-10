import React from "react";
import StyleIngredientDetails from "./ingredient-details.module.css";
import PropTypes from "prop-types";

export const IngredientDetails = ({product}) => {
    return (
        <>
        <p className={`text text_type_main-large ml-10 mt-10`}>Детали ингридиента</p>
        <div className={`${StyleIngredientDetails.description}`}>
            <img className={`mr-4 ml-4`} src={product.image_large} alt={product.name}/>
            <h3 className={`text text_type_main-medium`}>{product.name}</h3>

            <table className={`${StyleIngredientDetails.energyValue} mt-8 mb-15`}>
                <tbody>
                <tr>
                    <th className="text text_type_main-default text_color_inactive">Калории,ккал</th>
                    <th className="text text_type_main-default text_color_inactive">Белки, г</th>
                    <th className="text text_type_main-default text_color_inactive">Жиры, г</th>
                    <th className="text text_type_main-default text_color_inactive">Углеводы, г</th>
                </tr>
                <tr>
                    <th className="text text_type_main-default text_color_inactive">{product.calories}</th>
                    <th className="text text_type_main-default text_color_inactive">{product.proteins}</th>
                    <th className="text text_type_main-default text_color_inactive">{product.fat}</th>
                    <th className="text text_type_main-default text_color_inactive">{product.carbohydrates}</th>
                </tr>
                </tbody>
            </table>
        </div>
        </>
    )
}

IngredientDetails.propTypes = {
        name: PropTypes.string,
        thumbnail: PropTypes.string,
        price: PropTypes.number,
        type: PropTypes.oneOf(["top" | "bottom" | undefined]),
        isLocked: PropTypes.oneOf([PropTypes.bool | undefined]),
        extraClass: PropTypes.oneOf([PropTypes.string | undefined]),
        handleClose: PropTypes.func,
    }