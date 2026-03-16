export const ADD_TOKEN = 'ADD_TOKEN'
export const ADD_USER_ID = 'ADD_USER_ID'

export const addToken = function(_payload){
    return{
          type: ADD_TOKEN,
          payload: _payload,
    }
}

export const addUserId = function(_payload){
    return{
          type: ADD_USER_ID,
          payload: _payload,
    }
}