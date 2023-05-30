import { createContext } from 'react'

import { Children } from '@@types/Children'

export const ChatContext = createContext()

export const ChatContextProvider = ({ children }: Children) => {
  return <ChatContext.Provider value={{}}>{children}</ChatContext.Provider>
}
