import Constants from 'expo-constants'

import axios from 'axios'

const apiUrl = Constants.expoConfig?.extra?.apiUrl

export const api = axios.create({
  baseURL: apiUrl,
})
