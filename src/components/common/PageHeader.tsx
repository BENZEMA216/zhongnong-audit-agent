import { Tag } from 'antd'
import { RobotOutlined } from '@ant-design/icons'
import useChatStore from '../../stores/chatStore'

interface PageHeaderProps {
  title: string
  description?: string
  suggestedPrompts?: string[]
}

export default function PageHeader({
  title,
  description,
  suggestedPrompts = [],
}: PageHeaderProps) {
  const addMessage = useChatStore((s) => s.addMessage)

  const handlePromptClick = (prompt: string) => {
    // Add the prompt as a user message to trigger the chat
    addMessage({ role: 'user', content: prompt })
  }

  return (
    <div style={{ marginBottom: 24 }}>
      <h2
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: '#1a202c',
          margin: 0,
          marginBottom: description ? 6 : 0,
        }}
      >
        {title}
      </h2>

      {description && (
        <div style={{ fontSize: 14, color: '#64748b', marginBottom: 12 }}>
          {description}
        </div>
      )}

      {suggestedPrompts.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
          <RobotOutlined style={{ color: '#3b82f6', fontSize: 14, marginTop: 4 }} />
          {suggestedPrompts.map((prompt) => (
            <Tag
              key={prompt}
              style={{
                cursor: 'pointer',
                borderRadius: 16,
                padding: '3px 12px',
                fontSize: 13,
                border: '1px solid #dbeafe',
                color: '#1d4ed8',
                background: '#eff6ff',
                transition: 'all 0.2s',
              }}
              onClick={() => handlePromptClick(prompt)}
            >
              {prompt}
            </Tag>
          ))}
        </div>
      )}
    </div>
  )
}
