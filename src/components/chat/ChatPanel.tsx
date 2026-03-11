import { useEffect, useRef } from 'react'
import { Tag, Button } from 'antd'
import { RobotOutlined, CloseOutlined } from '@ant-design/icons'
import useChat from '../../hooks/useChat'
import useChatStore from '../../stores/chatStore'
import useModuleStore from '../../stores/moduleStore'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'

interface ChatPanelProps {
  onClose: () => void
}

export default function ChatPanel({ onClose }: ChatPanelProps) {
  const { messages, isStreaming } = useChatStore()
  const { activeModule } = useModuleStore()
  const { sendMessage, suggestedPrompts } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const isEmpty = messages.length === 0

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div
        style={{
          padding: '16px 20px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <RobotOutlined style={{ color: '#fff', fontSize: 20 }} />
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 15, color: '#1a365d' }}>
              AI 审计助手
            </div>
            <div style={{ fontSize: 12, color: '#94a3b8' }}>
              {activeModule ? activeModule.name : '全局模式'}
            </div>
          </div>
          {activeModule && (
            <Tag color="blue" style={{ marginLeft: 4 }}>
              {activeModule.name}
            </Tag>
          )}
        </div>
        <Button
          type="text"
          size="small"
          icon={<CloseOutlined />}
          onClick={onClose}
          style={{ color: '#94a3b8' }}
        />
      </div>

      {/* Message List */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        {isEmpty && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 60,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
              }}
            >
              <RobotOutlined style={{ fontSize: 32, color: '#3b82f6' }} />
            </div>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#1a365d', marginBottom: 8 }}>
              您好，我是中农再AI审计助手
            </div>
            <div style={{ fontSize: 14, color: '#64748b', maxWidth: 280, lineHeight: 1.6 }}>
              我可以帮您进行数据审核、风险分析、合规检查等工作。请问有什么需要？
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      {(isEmpty || (!isStreaming && messages.length > 0)) && (
        <div
          style={{
            padding: '8px 20px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            flexShrink: 0,
          }}
        >
          {suggestedPrompts.map((prompt) => (
            <Tag
              key={prompt}
              style={{
                cursor: 'pointer',
                borderRadius: 16,
                padding: '4px 12px',
                fontSize: 13,
                border: '1px solid #e2e8f0',
                color: '#475569',
                background: '#f8fafc',
                transition: 'all 0.2s',
              }}
              onClick={() => sendMessage(prompt)}
            >
              {prompt}
            </Tag>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div style={{ flexShrink: 0 }}>
        <ChatInput onSend={sendMessage} disabled={isStreaming} />
      </div>
    </div>
  )
}
