import Constants from 'expo-constants'

import axios from 'axios'

const API_URL = Constants.expoConfig?.extra?.apiUrl

export const api = axios.create({
  baseURL: API_URL ?? 'http://127.0.1.1:3333',
})
