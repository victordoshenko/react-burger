import React, {useEffect, useState} from 'react';
import StyleApp from './app.module.css'
import { AppHeader } from "../app-header/app-header";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { request } from "../../utils/utils";

const UrlDomain = "https://norma.nomoreparties.space";

export const App = () => {

     const [state, setState] = useState({
         error: false,
         loading: false,
         data: []
     });

     useEffect(() => {
        const getData = () => {
            setState({ ...state, error: false, loading: true });
            request(UrlDomain + "/api/ingredients")
            .then((res) => {return res})
            .then((res) => {setState({ ...state, data: res.data, loading: false });})
            .catch((err) => {
               alert(err);
               setState({ ...state, error: true, loading: false });});
        };

        getData();        
     }, []);

  return (
    <div className={StyleApp.app}>
        <AppHeader />
        <main className={StyleApp.mainConstructor}>
            <BurgerIngredients products={ state.data }/>
            <BurgerConstructor ingredients={ state.data }/>
        </main>
    </div>
  );
}
