import { useState, useEffect, useCallback, useRef } from 'react'
import { Card, Badge } from 'antd'
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  SafetyCertificateOutlined,
  DollarOutlined,
  PercentageOutlined,
  WarningOutlined,
} from '@ant-design/icons'
import { motion, useSpring, useTransform } from 'framer-motion'

/* ── Types ── */

interface KPIConfig {
  key: string
  title: string
  baseValue: number
  unit: string
  prefix?: string
  decimals: number
  icon: React.ReactNode
  color: string
  bgGradient: string
  fluctuation: number // max ± fluctuation per tick
  trend: 'up' | 'down' | 'stable'
  trendValue: string
  badgeCount?: number
}

/* ── KPI definitions ── */

const KPI_CONFIGS: KPIConfig[] = [
  {
    key: 'premium',
    title: '承保保费',
    baseValue: 1823,
    unit: '亿',
    prefix: '¥',
    decimals: 0,
    icon: <DollarOutlined />,
    color: '#1a365d',
    bgGradient: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
    fluctuation: 2,
    trend: 'up',
    trendValue: '+12.3%',
  },
  {
    key: 'claims',
    title: '赔付金额',
    baseValue: 1179,
    unit: '亿',
    prefix: '¥',
    decimals: 0,
    icon: <SafetyCertificateOutlined />,
    color: '#d97706',
    bgGradient: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
    fluctuation: 3,
    trend: 'up',
    trendValue: '+8.7%',
  },
  {
    key: 'claimRate',
    title: '综合赔付率',
    baseValue: 64.7,
    unit: '%',
    prefix: '',
    decimals: 1,
    icon: <PercentageOutlined />,
    color: '#059669',
    bgGradient: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
    fluctuation: 0.3,
    trend: 'down',
    trendValue: '-2.1pp',
  },
  {
    key: 'alerts',
    title: '活跃预警',
    baseValue: 7,
    unit: '项',
    prefix: '',
    decimals: 0,
    icon: <WarningOutlined />,
    color: '#dc2626',
    bgGradient: 'linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)',
    fluctuation: 0,
    trend: 'stable',
    trendValue: '本周+2',
    badgeCount: 7,
  },
]

/* ── Animated number component ── */

function AnimatedNumber({
  value,
  decimals,
  prefix = '',
  unit = '',
  color,
}: {
  value: number
  decimals: number
  prefix?: string
  unit?: string
  color: string
}) {
  const spring = useSpring(0, { stiffness: 80, damping: 20 })
  const display = useTransform(spring, (v) => {
    const formatted = v.toFixed(decimals)
    // Add thousand separators for integers
    if (decimals === 0) {
      return `${prefix}${Number(formatted).toLocaleString('zh-CN')}${unit}`
    }
    return `${prefix}${formatted}${unit}`
  })

  useEffect(() => {
    spring.set(value)
  }, [value, spring])

  return (
    <motion.span
      style={{
        fontSize: 32,
        fontWeight: 700,
        color,
        fontVariantNumeric: 'tabular-nums',
        letterSpacing: '-0.02em',
      }}
    >
      {display}
    </motion.span>
  )
}

/* ── KPI Card ── */

function KPICard({ config, currentValue }: { config: KPIConfig; currentValue: number }) {
  const trendColor =
    config.trend === 'up' && config.key !== 'claims'
      ? '#059669'
      : config.trend === 'down'
        ? '#059669'
        : config.key === 'claims' && config.trend === 'up'
          ? '#d97706'
          : '#64748b'

  const TrendIcon =
    config.trend === 'up' ? ArrowUpOutlined : config.trend === 'down' ? ArrowDownOutlined : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        style={{
          borderRadius: 12,
          border: 'none',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
          overflow: 'hidden',
        }}
        styles={{ body: { padding: 24 } }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 14,
                color: '#64748b',
                marginBottom: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              {config.title}
              {config.badgeCount !== undefined && (
                <Badge
                  count={config.badgeCount}
                  style={{ backgroundColor: '#ef4444' }}
                  size="small"
                />
              )}
            </div>

            <AnimatedNumber
              value={currentValue}
              decimals={config.decimals}
              prefix={config.prefix}
              unit={config.unit}
              color={config.color}
            />

            <div
              style={{
                marginTop: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                fontSize: 13,
                color: trendColor,
              }}
            >
              {TrendIcon && <TrendIcon />}
              <span>同比 {config.trendValue}</span>
            </div>
          </div>

          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: config.bgGradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
              color: config.color,
            }}
          >
            {config.icon}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

/* ── Main component ── */

export default function RealtimeDashboard() {
  const [values, setValues] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {}
    for (const cfg of KPI_CONFIGS) {
      initial[cfg.key] = cfg.baseValue
    }
    return initial
  })

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const fluctuate = useCallback(() => {
    setValues((prev) => {
      const next = { ...prev }
      for (const cfg of KPI_CONFIGS) {
        if (cfg.fluctuation === 0) continue
        const delta = (Math.random() - 0.5) * 2 * cfg.fluctuation
        next[cfg.key] = cfg.baseValue + delta
      }
      return next
    })
  }, [])

  useEffect(() => {
    intervalRef.current = setInterval(fluctuate, 3000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [fluctuate])

  return (
    <div>
      {/* Realtime badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 16,
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '4px 12px',
            borderRadius: 20,
            background: '#ecfdf5',
            border: '1px solid #a7f3d0',
            fontSize: 13,
            color: '#059669',
            fontWeight: 500,
          }}
        >
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#10b981',
              display: 'inline-block',
            }}
          />
          实时监控中
        </span>
        <span style={{ fontSize: 12, color: '#94a3b8' }}>
          数据每3秒自动刷新
        </span>
      </div>

      {/* KPI Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
        }}
      >
        {KPI_CONFIGS.map((cfg) => (
          <KPICard key={cfg.key} config={cfg} currentValue={values[cfg.key]} />
        ))}
      </div>
    </div>
  )
}
