import { useContext } from 'react'

import { ChatContext } from '@contexts/ChatContext'

export const useChatContext = () => {
  const context = useContext(ChatContext)
  return context
}
