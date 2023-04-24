import { BURGER_API_URL, ENDPOINT_INGREDIENTS, ENDPOINT_LOGIN, ENDPOINT_LOGOUT, ENDPOINT_MAKE_ORDER, ENDPOINT_PASSWORD_FORGOT, ENDPOINT_PASSWORD_RESET, ENDPOINT_REGISTER, ENDPOINT_TOKEN_REFRESH, ENDPOINT_USER } from '../constants'
import { TIngredient, TUserUpdateData } from '../types';
import { getCookie, saveTokens } from './functions-helper';

type TServerResponse<T> = {
    success: boolean;
} & T;

type TIngredientsResponse = TServerResponse<{
    data: TIngredient[]
}>

type TOrderResponse = TServerResponse<{
    name: string;
    order: {
        number: number;
    }
}>

type TUserResponse = TServerResponse<{
    user: {
        email: string;
        name: string;
    }
}>

type TRegisterResponse = TServerResponse<{
    user: {
        email: string;
        name: string;
    }
    accessToken: string;
    refreshToken: string;
}>

type TLoginResponse = TServerResponse<{
    user: {
        email: string;
        name: string;
    }
    accessToken: string;
    refreshToken: string;
}>

type TForgotPasswordResponse = TServerResponse<{
    message: string
}>

type TResetPasswordResponse = TServerResponse<{
    message: string
}>

type TRefreshResponse = TServerResponse<{
    refreshToken: string;
    accessToken: string;
}>;

type TLogoutResponse = TServerResponse<{
    message: string
}>

type TErrorResponse = TServerResponse<{
    message: string
}>


type TResetPasswordForm = {
    password: string;
    emailCode: string;
}

type TRegisterForm = {
    password: string;
    email: string;
    name: string;
}

type TLoginForm = {
    password: string;
    email: string;
}

const checkReponse = async <T>(res: Response): Promise<T> => {
    if (!res.ok) throw `Ошибка ${res.status}`
    return await res.json()
};

const checkSuccess = <T>(res: any): T => {
    if (res && res.success) {
        return res;
    }
    throw 'Ответ не success'
}

const request = async <T>(endpoint: RequestInfo, options?: RequestInit): Promise<T> => {
    const fetchData = await fetch(`${BURGER_API_URL}${endpoint}`, options)
    const response = await checkReponse<T>(fetchData);
    return checkSuccess<T>(response)
}

export async function getIngredients(): Promise<TIngredientsResponse> {
    return await request<TIngredientsResponse>(ENDPOINT_INGREDIENTS)
}

export const fetchWithRefresh = async <T>(url: RequestInfo, options: RequestInit) => {
    try {
       
        return await request<T>(url, options);
    } catch (err) {
        if ((err as TErrorResponse).message === "jwt expired") {
            let authToken;
            const refreshData = await refreshTokenRequest();

            authToken = refreshData.accessToken.split('Bearer ')[1];
            if (authToken) {
                saveTokens(authToken, refreshData.refreshToken)
            }

            if (options.headers) {
                (options.headers as { [key: string]: string }).authorization =
                  refreshData.accessToken;
            }

            return await request<T>(url, options);
        } else {
            throw 'refresh token err'
        }
    }
  };

export const makeOrder = async (ingredientIds: string[]): Promise<TOrderResponse> => {
    return await request<TOrderResponse>(ENDPOINT_MAKE_ORDER, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            ingredients: ingredientIds
        })
    })
}

export const forgotPasswordRequest = async (email: string): Promise<TForgotPasswordResponse> => {
    return await request<TForgotPasswordResponse>(ENDPOINT_PASSWORD_FORGOT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            email
        })
    })
}


export const resetPasswordRequest = async ({ password, emailCode: token}: TResetPasswordForm): Promise<TResetPasswordResponse> => {
    return await request<TResetPasswordResponse>(ENDPOINT_PASSWORD_RESET, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            password,
            token,
        })
    })
}


export const registerRequest = async ({ email, password, name }: TRegisterForm): Promise <TRegisterResponse> => {
    return await request<TRegisterResponse>(ENDPOINT_REGISTER, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            email, 
            password, 
            name,
        })
    })
}

export const loginRequest = async ({ email, password }: TLoginForm): Promise<TLoginResponse> => {
    return await request<TLoginResponse>(ENDPOINT_LOGIN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            email, 
            password, 
        })
    })
}

export const getUserRequest = async () => {
    return await fetchWithRefresh<TUserResponse>(ENDPOINT_USER, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + getCookie('accessToken')
        }
    })
}

export const updateUserRequest = async (data: TUserUpdateData): Promise<TUserResponse> => {
    return await request<TUserResponse>(ENDPOINT_USER, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + getCookie('accessToken')
        },
        body: JSON.stringify({
            ...data
        })
    })
}

export const refreshTokenRequest = async (): Promise<TRefreshResponse> => {
    return await request<TRefreshResponse>(ENDPOINT_TOKEN_REFRESH, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            'token': localStorage.getItem('refreshToken')
        })
    })
}

export const logoutRequest = async (): Promise<TLogoutResponse> => {
    return await request<TLogoutResponse>(ENDPOINT_LOGOUT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            'token': localStorage.getItem('refreshToken')
        })
    })
}