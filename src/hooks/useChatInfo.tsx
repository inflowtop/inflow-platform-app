import { useContext } from 'react'

import { ChatContext } from '@contexts/ChatContext'

export const useAuth = () => {
  const context = useContext(ChatContext)
  return context
}
