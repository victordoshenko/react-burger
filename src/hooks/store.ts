import {
    TypedUseSelectorHook,
    useDispatch,
    useSelector,
  } from 'react-redux';
import { AppDispatch, AppThunk, RootState } from '../types/store';
  
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
  

export const useAppDispatch = () => useDispatch<AppDispatch>()


