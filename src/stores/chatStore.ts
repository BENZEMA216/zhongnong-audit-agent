import { create } from 'zustand'

// ── Types ──

export interface AgentStep {
  id: string
  label: string
  status: 'pending' | 'running' | 'done' | 'error'
  detail?: string
  timestamp: number
}

export interface ChatAttachment {
  id: string
  name: string
  type: 'image' | 'file' | 'chart'
  url?: string
  data?: unknown
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: number
  module?: string
  attachments?: ChatAttachment[]
  agentSteps?: AgentStep[]
}

// ── Store ──

interface ChatState {
  messages: ChatMessage[]
  currentModule: string | null
  isStreaming: boolean

  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void
  updateLastMessage: (updater: (msg: ChatMessage) => ChatMessage) => void
  clearMessages: () => void
  setCurrentModule: (moduleId: string | null) => void
  setStreaming: (streaming: boolean) => void
}

let messageCounter = 0

function generateId(): string {
  messageCounter += 1
  return `msg_${Date.now()}_${messageCounter}`
}

const useChatStore = create<ChatState>((set) => ({
  messages: [],
  currentModule: null,
  isStreaming: false,

  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...message,
          id: generateId(),
          timestamp: Date.now(),
        },
      ],
    })),

  updateLastMessage: (updater) =>
    set((state) => {
      const msgs = [...state.messages]
      if (msgs.length === 0) return state
      const last = msgs[msgs.length - 1]
      msgs[msgs.length - 1] = updater(last)
      return { messages: msgs }
    }),

  clearMessages: () => set({ messages: [] }),

  setCurrentModule: (moduleId) => set({ currentModule: moduleId }),

  setStreaming: (streaming) => set({ isStreaming: streaming }),
}))

export default useChatStore
