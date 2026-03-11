import { Tag, Typography } from 'antd'
import {
  WarningOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons'
import type { RiskFlag, RiskFlagSeverity } from '../../data/mock-datasets/reimbursements'

const { Text } = Typography

/* ── Severity config ── */

const severityConfig: Record<
  RiskFlagSeverity,
  { color: string; bg: string; border: string; icon: React.ReactNode; label: string }
> = {
  high: {
    color: '#ef4444',
    bg: '#fef2f2',
    border: '#fecaca',
    icon: <ExclamationCircleOutlined />,
    label: '高风险',
  },
  medium: {
    color: '#f59e0b',
    bg: '#fffbeb',
    border: '#fde68a',
    icon: <WarningOutlined />,
    label: '中风险',
  },
  low: {
    color: '#3b82f6',
    bg: '#eff6ff',
    border: '#bfdbfe',
    icon: <InfoCircleOutlined />,
    label: '提示',
  },
}

/* ── Component ── */

interface RiskKeywordAlertProps {
  flags: RiskFlag[]
}

export default function RiskKeywordAlert({ flags }: RiskKeywordAlertProps) {
  if (flags.length === 0) {
    return (
      <div
        style={{
          padding: '16px 20px',
          background: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span style={{ color: '#10b981', fontSize: 16 }}>&#10003;</span>
        <Text style={{ color: '#15803d', fontSize: 14 }}>
          未检测到风险关键词，所有指标正常
        </Text>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {flags.map((flag, index) => {
        const cfg = severityConfig[flag.severity]

        return (
          <div
            key={index}
            style={{
              padding: '14px 16px',
              background: cfg.bg,
              border: `1px solid ${cfg.border}`,
              borderRadius: 8,
              borderLeft: `4px solid ${cfg.color}`,
            }}
          >
            {/* Header row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 8,
              }}
            >
              <span style={{ color: cfg.color, fontSize: 16 }}>{cfg.icon}</span>
              <Tag
                color={
                  flag.severity === 'high'
                    ? 'red'
                    : flag.severity === 'medium'
                      ? 'orange'
                      : 'blue'
                }
                style={{ margin: 0, fontSize: 12 }}
              >
                {cfg.label}
              </Tag>
              <Text
                strong
                style={{ fontSize: 13, color: '#1a202c', flex: 1 }}
              >
                {flag.type === 'accommodation_excess' && '住宿标准异常'}
                {flag.type === 'transport_excess' && '交通标准异常'}
                {flag.type === 'destination_anomaly' && '目的地异常'}
                {flag.type === 'purpose_unclear' && '事由疑点'}
                {flag.type === 'meal_excess' && '餐费超标'}
                {flag.type === 'alcohol_excess' && '酒水异常'}
                {flag.type === 'frequency_anomaly' && '频率异常'}
                {flag.type === 'pattern_anomaly' && '模式异常'}
                {flag.type === 'amount_anomaly' && '金额异常'}
                {flag.type === 'item_anomaly' && '科目异常'}
              </Text>
            </div>

            {/* Description */}
            <div style={{ fontSize: 13, color: '#374151', lineHeight: 1.6, marginBottom: 8 }}>
              {flag.description}
            </div>

            {/* Evidence block */}
            <div
              style={{
                padding: '8px 12px',
                background: 'rgba(0,0,0,0.03)',
                borderRadius: 6,
                fontSize: 12,
                color: '#6b7280',
                lineHeight: 1.5,
              }}
            >
              <Text type="secondary" style={{ fontSize: 12 }}>
                <span style={{ fontWeight: 600, marginRight: 4 }}>证据：</span>
                {highlightKeywords(flag.evidence)}
              </Text>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ── Highlight risk keywords in evidence text ── */

const RISK_KEYWORDS = [
  '五星级',
  '豪华房',
  '商务座',
  '景区',
  '门票',
  '观光车',
  '茅台',
  '高端海鲜',
  '人均¥400',
  '超出',
  '超过',
  '不符',
  '异常',
  '5次出差',
  '¥28,500',
  '¥6,800',
  '¥3,600',
  '¥3,200',
  '¥2,800',
  '¥1,748',
]

function highlightKeywords(text: string): React.ReactNode {
  // Build regex from keywords, escape special chars
  const escaped = RISK_KEYWORDS.map((kw) =>
    kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
  )
  const regex = new RegExp(`(${escaped.join('|')})`, 'g')

  const parts = text.split(regex)

  return parts.map((part, i) => {
    if (RISK_KEYWORDS.includes(part)) {
      return (
        <span
          key={i}
          style={{
            color: '#ef4444',
            fontWeight: 600,
            background: '#fef2f2',
            padding: '0 2px',
            borderRadius: 2,
          }}
        >
          {part}
        </span>
      )
    }
    return <span key={i}>{part}</span>
  })
}
