import { ADD_CONSTRUCTOR_ITEM, MOVE_CONSTRUCTOR_ITEM, REMOVE_CONSTRUCTOR_ITEM } from "../actions/burger-constructor";

const initialState = {
    selectedIngredients: [],
    selectedCounts: {},
}

export const burgerConstructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CONSTRUCTOR_ITEM: {
            const ingredient = { ...action.payload };

            const prevSelectedIngredients = [ ...state.selectedIngredients ];
            const newSelectedCounts = { ...state.selectedCounts };
            let newSelectedIngredients = [];
            const ingredientCount = ingredient.type === 'bun' ? 2 : 1;

            if (ingredient.type === 'bun') {
                let noBunIngredients = [];
                prevSelectedIngredients.forEach( item => { 
                    if (item.type !== 'bun') {
                        noBunIngredients.push(item);
                    } else {
                        newSelectedCounts[`id${item._id}`] -= ingredientCount;
                    }
                })

                newSelectedIngredients = noBunIngredients;
                newSelectedIngredients.push(ingredient)
                
            } else {
                newSelectedIngredients = prevSelectedIngredients;
                newSelectedIngredients.push(ingredient);
            }

            if (!newSelectedCounts[`id${ingredient._id}`]) {
                newSelectedCounts[`id${ingredient._id}`] = ingredientCount;
            } else {
                newSelectedCounts[`id${ingredient._id}`] += ingredientCount;
            }

            return {
                ...state,
                selectedIngredients: newSelectedIngredients,
                selectedCounts: newSelectedCounts,
            }
        }
        case REMOVE_CONSTRUCTOR_ITEM: {
            const ingredient = { ...action.payload };
            const newSelectedCounts = { ...state.selectedCounts };
            const ingredientCount = ingredient.type === 'bun' ? 2 : 1;

            newSelectedCounts[`id${ingredient._id}`] -= ingredientCount;
            const newSelectedIngredients = state.selectedIngredients.filter( item => {
                return item.uuid !== ingredient.uuid
            })

            return {
                ...state,
                selectedIngredients: newSelectedIngredients,
                selectedCounts: newSelectedCounts,
            }
        }
        case MOVE_CONSTRUCTOR_ITEM: {
            const prevSelectedIngredients = [ ...state.selectedIngredients ];
            const prevSelectedFillingIngredients = prevSelectedIngredients.filter(el => el.type !== 'bun');
            const prevSelectedBunIngredient = prevSelectedIngredients.find(el => el.type === 'bun')

            const sortedSelectedIngredients = [ ... prevSelectedFillingIngredients ];
            const indexFrom = action.payload.from;
            const indexTo = action.payload.to;

            sortedSelectedIngredients.splice(indexFrom, 1)
            sortedSelectedIngredients.splice(indexTo, 0, prevSelectedFillingIngredients[indexFrom])
            
            prevSelectedBunIngredient && sortedSelectedIngredients.unshift(prevSelectedBunIngredient)

            return {
                ...state,
                selectedCounts: { ...state.selectedCounts },
                selectedIngredients: sortedSelectedIngredients,
            }
        }
        default:
            return state;
    }
}