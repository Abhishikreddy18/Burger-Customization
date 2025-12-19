import { GET_INGREDIENTS_REQUEST,GET_INGREDIENTS_FAILURE,GET_INGREDIENTS_SUCCESS,DElETE_INGREDIENT_REQUEST,DElETE_INGREDIENT_SUCCESS,DElETE_INGREDIENT_FAILURE,CREATE_INGREDIENT_REQUEST,CREATE_INGREDIENT_SUCCESS,CREATE_INGREDIENT_FAILURE,UPDATE_INGREDIENT_FAILURE,UPDATE_INGREDIENT_SUCCESS,UPDATE_INGREDIENT_REQUEST  } from "../constants/ingredientsConstants";
const initialState = {
    loading: false,
    initialIngredients: [],
    error: null
}

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST:
            return {
               ...state,
                loading: true
            }
        case GET_INGREDIENTS_SUCCESS:
            return {
               ...state,
                loading: false,
                initialIngredients: action.payload
            }
        case GET_INGREDIENTS_FAILURE:
            return {
               ...state,
                loading: false,
                error: action.payload
            }
        case DElETE_INGREDIENT_REQUEST:
            return {
               ...state,
                loading: true
            }
        case DElETE_INGREDIENT_SUCCESS:
            return {
               ...state,
                loading: false,
                initialIngredients: state.initialIngredients.filter((ingre)=>{
                    return ingre._id!== action.payload._id
                })
            }
        case DElETE_INGREDIENT_FAILURE:
            return {
               ...state,
                loading: false,
                error: action.payload
            }
            case CREATE_INGREDIENT_REQUEST:
                return {
                   ...state,
                    loading: true
                }
            case CREATE_INGREDIENT_SUCCESS:
                return {
                   ...state,
                    loading: false,
                    initialIngredients: [...state.initialIngredients, action.payload]
                }
            case CREATE_INGREDIENT_FAILURE:
                return {
                   ...state,
                    loading: false,
                    error: action.payload
                }
            case UPDATE_INGREDIENT_REQUEST:
                return {
                   ...state,
                    loading: true
                }
            case UPDATE_INGREDIENT_SUCCESS:
                return {
                   ...state,
                    loading: false,
                    initialIngredients: state.initialIngredients.map((ingre)=>{
                        if(ingre._id===action.payload._id){
                            return action.payload
                        }
                        return ingre
                    })
                }
            case UPDATE_INGREDIENT_FAILURE:
                return {
                   ...state,
                    loading: false,
                    error: action.payload
                }
        default:
            return state
    }
}