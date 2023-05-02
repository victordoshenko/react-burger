import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { configureStore } from "../store";
import { TAuthActions } from "../store/actions/auth";
import { TBurgerConstructorActions } from "../store/actions/burger-constructor";
import { TIngredientDetailActions } from "../store/actions/ingredient-detail";
import { TIngredientsActions } from "../store/actions/ingredients";
import { TOrderActions } from "../store/actions/order";
import { TOrdersFeedActions } from "../store/actions/orders-feed";
import { TOrdersHistoryActions } from "../store/actions/orders-history";
import { TResetPasswordActions } from "../store/actions/reset-password";
import { TViewOrderActions } from "../store/actions/view-order";
import { rootReducer } from "../store/reducers";

const store = configureStore();


export type RootState =  ReturnType<typeof rootReducer>


type TApplicationActions = TAuthActions 
    | TBurgerConstructorActions
    | TIngredientDetailActions
    | TIngredientsActions
    | TOrderActions
    | TResetPasswordActions
    | TViewOrderActions
    | TOrdersFeedActions
    | TOrdersHistoryActions;


export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<Promise<TReturn>, RootState, never, TApplicationActions>
>;















export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>


