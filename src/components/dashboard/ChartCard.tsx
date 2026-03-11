import { Card } from 'antd'
import type { ReactNode } from 'react'

interface ChartCardProps {
  title: string
  subtitle?: string
  children: ReactNode
  height?: number
}

export default function ChartCard({
  title,
  subtitle,
  children,
  height = 300,
}: ChartCardProps) {
  return (
    <Card
      style={{
        borderRadius: 12,
        boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        border: 'none',
      }}
      styles={{ body: { padding: 0 } }}
    >
      {/* Title Bar */}
      <div
        style={{
          padding: '16px 24px 0',
          display: 'flex',
          alignItems: 'baseline',
          gap: 8,
        }}
      >
        <div style={{ fontSize: 15, fontWeight: 600, color: '#1a202c' }}>
          {title}
        </div>
        {subtitle && (
          <div style={{ fontSize: 12, color: '#94a3b8' }}>
            {subtitle}
          </div>
        )}
      </div>

      {/* Chart Content */}
      <div style={{ padding: '12px 16px 16px', height }}>
        {children}
      </div>
    </Card>
  )
}
