import { FC, useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { ingredientsSelector } from "../store/selectors";
import { NotFound } from "./not-found";
import styles from './ingredient-detail.module.css'
import { TIngredient } from "../types";

export const IngredientDetailPage: FC = () => {
    const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(ingredientsSelector);
    const {id: ingredientId} = useParams();
    let ingredient = ingredients.length ? ingredients.find((el: TIngredient ) => el._id === ingredientId) : null;
    const [ingredientExists, setIngredientExists] = useState<boolean>(true)

    useEffect(() => {
        
        if (!ingredientsFailed && !ingredientsRequest && !ingredient && ingredient !== null) {
            setIngredientExists(false)
        }
    }, [ingredient])

    return (
        <>
            {!ingredientExists && <NotFound />}

            {!ingredientsFailed && !ingredientsRequest && ingredient && (
                <>
                    <div className={styles.detailHeader}>
                        <div className={styles.detailHeaderTitle}>
                            Детали ингредиента
                        </div>
                    </div>
                    <IngredientDetails />
                </>
            )}
        </>
    );
}