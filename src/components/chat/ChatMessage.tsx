import { RobotOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import ReactMarkdown from 'react-markdown'
import type { ChatMessage as ChatMessageType } from '../../stores/chatStore'
import AgentThinking from './AgentThinking'
import StreamingText from './StreamingText'

interface ChatMessageProps {
  message: ChatMessageType
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'
  const isAssistant = message.role === 'assistant'
  const hasThinkingSteps = message.agentSteps && message.agentSteps.length > 0
  const isThinking =
    hasThinkingSteps &&
    message.agentSteps!.some((s) => s.status === 'running' || s.status === 'pending')

  const time = new Date(message.timestamp)
  const timeStr = `${String(time.getHours()).padStart(2, '0')}:${String(time.getMinutes()).padStart(2, '0')}`

  return (
    <div
      className="animate-fade-in"
      style={{
        display: 'flex',
        flexDirection: isUser ? 'row-reverse' : 'row',
        gap: 10,
        maxWidth: '100%',
      }}
    >
      {/* Avatar */}
      {isAssistant && (
        <Avatar
          size={32}
          icon={<RobotOutlined />}
          style={{
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            flexShrink: 0,
          }}
        />
      )}
      {isUser && (
        <Avatar
          size={32}
          icon={<UserOutlined />}
          style={{ backgroundColor: '#1a365d', flexShrink: 0 }}
        />
      )}

      {/* Message Bubble */}
      <div
        style={{
          maxWidth: 'calc(100% - 50px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: isUser ? 'flex-end' : 'flex-start',
        }}
      >
        <div
          style={{
            padding: '10px 14px',
            borderRadius: isUser ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
            background: isUser ? '#e0f2fe' : '#ffffff',
            border: isUser ? 'none' : '1px solid #e2e8f0',
            fontSize: 14,
            lineHeight: 1.6,
            color: '#1a202c',
            wordBreak: 'break-word',
          }}
        >
          {/* Agent thinking steps */}
          {hasThinkingSteps && <AgentThinking steps={message.agentSteps!} />}

          {/* Content */}
          {isUser ? (
            <div>{message.content}</div>
          ) : message.content ? (
            <div className="chat-markdown">
              <StreamingText text={message.content} speed={12} />
            </div>
          ) : null}
        </div>

        {/* Timestamp */}
        <div
          style={{
            fontSize: 11,
            color: '#94a3b8',
            marginTop: 4,
            paddingLeft: isUser ? 0 : 2,
            paddingRight: isUser ? 2 : 0,
          }}
        >
          {timeStr}
        </div>
      </div>
    </div>
  )
}
