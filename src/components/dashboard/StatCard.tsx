import { Card } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined, MinusOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface StatCardProps {
  title: string
  value: string
  prefix?: ReactNode
  trend?: 'up' | 'down' | 'flat'
  trendValue?: string
  color?: string
}

const trendColors = {
  up: '#10b981',
  down: '#ef4444',
  flat: '#94a3b8',
}

const trendIcons = {
  up: <ArrowUpOutlined />,
  down: <ArrowDownOutlined />,
  flat: <MinusOutlined />,
}

export default function StatCard({
  title,
  value,
  prefix,
  trend = 'flat',
  trendValue,
  color = '#1a365d',
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <Card
        style={{
          borderRadius: 12,
          boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
          border: 'none',
        }}
        styles={{ body: { padding: '20px 24px' } }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
          {/* Icon */}
          {prefix && (
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: `${color}12`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
                color,
                flexShrink: 0,
              }}
            >
              {prefix}
            </div>
          )}

          {/* Content */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, color: '#64748b', marginBottom: 4 }}>
              {title}
            </div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: '#1a202c',
                lineHeight: 1.2,
              }}
            >
              {value}
            </div>
            {trendValue && (
              <div
                style={{
                  marginTop: 6,
                  fontSize: 13,
                  color: trendColors[trend],
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                {trendIcons[trend]}
                <span>{trendValue}</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
