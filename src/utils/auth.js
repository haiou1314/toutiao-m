import storages from './storage'

const TOKEN_KEY = 'TOKEN_KEY'

export const setToken = (token) => storages.set(TOKEN_KEY, token)

export const getToken = () => storages.get(TOKEN_KEY)

export const removeToken = () => storages.remove(TOKEN_KEY)
