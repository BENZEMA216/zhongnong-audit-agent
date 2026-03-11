import { useState } from 'react'
import { Alert, Button } from 'antd'
import { CloseOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

export interface AlertItem {
  id: string
  type: 'risk' | 'compliance' | 'financial'
  message: string
  severity: 'high' | 'medium' | 'low'
  link?: string
}

interface AlertBannerProps {
  alerts: AlertItem[]
}

const severityConfig = {
  high: { color: '#fef2f2', border: '#fca5a5', icon: '#ef4444', type: 'error' as const },
  medium: { color: '#fffbeb', border: '#fcd34d', icon: '#f59e0b', type: 'warning' as const },
  low: { color: '#f0f9ff', border: '#93c5fd', icon: '#3b82f6', type: 'info' as const },
}

export default function AlertBanner({ alerts: initialAlerts }: AlertBannerProps) {
  const [alerts, setAlerts] = useState(initialAlerts)
  const navigate = useNavigate()

  const handleDismiss = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id))
  }

  if (alerts.length === 0) return null

  return (
    <div
      style={{
        display: 'flex',
        gap: 12,
        overflowX: 'auto',
        paddingBottom: 4,
        marginBottom: 16,
      }}
    >
      {alerts.map((alert) => {
        const config = severityConfig[alert.severity]
        return (
          <Alert
            key={alert.id}
            type={config.type}
            showIcon
            icon={<ExclamationCircleFilled style={{ color: config.icon }} />}
            message={
              <span
                style={{
                  cursor: alert.link ? 'pointer' : 'default',
                  fontSize: 13,
                }}
                onClick={() => alert.link && navigate(alert.link)}
              >
                {alert.message}
              </span>
            }
            action={
              <Button
                type="text"
                size="small"
                icon={<CloseOutlined />}
                onClick={() => handleDismiss(alert.id)}
                style={{ color: '#94a3b8' }}
              />
            }
            style={{
              borderRadius: 8,
              border: `1px solid ${config.border}`,
              background: config.color,
              minWidth: 280,
              flexShrink: 0,
            }}
          />
        )
      })}
    </div>
  )
}
