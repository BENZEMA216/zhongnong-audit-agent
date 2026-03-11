import { useState } from 'react'
import { Card, Table, Tag, Button, Modal, Input, Space, Progress } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import {
  PlusOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  RobotOutlined,
} from '@ant-design/icons'
import { motion } from 'framer-motion'

/* ── Types ── */

interface ThresholdRule {
  key: string
  name: string
  indicator: string
  threshold: string
  currentValue: string
  currentPercent: number
  status: 'normal' | 'warning' | 'breached'
  lastChecked: string
}

/* ── Data ── */

const thresholdRules: ThresholdRule[] = [
  {
    key: '1',
    name: '省级赔付率预警',
    indicator: '各省综合赔付率',
    threshold: '>80%',
    currentValue: '87.3%（河南）',
    currentPercent: 109,
    status: 'breached',
    lastChecked: '2025-09-15 14:30',
  },
  {
    key: '2',
    name: '单笔赔付金额预警',
    indicator: '单笔赔付金额',
    threshold: '>500万',
    currentValue: '¥320万（最大）',
    currentPercent: 64,
    status: 'normal',
    lastChecked: '2025-09-15 14:30',
  },
  {
    key: '3',
    name: '月度保费偏差预警',
    indicator: '月度保费收入偏差',
    threshold: '>±15%',
    currentValue: '-12.8%',
    currentPercent: 85,
    status: 'warning',
    lastChecked: '2025-09-15 14:30',
  },
  {
    key: '4',
    name: '数据一致性检查',
    indicator: '系统间数据一致性',
    threshold: '<98%',
    currentValue: '97.8%',
    currentPercent: 91,
    status: 'warning',
    lastChecked: '2025-09-15 14:30',
  },
  {
    key: '5',
    name: '承保集中度预警',
    indicator: '单省承保占比',
    threshold: '>15%',
    currentValue: '10.2%（河南）',
    currentPercent: 68,
    status: 'normal',
    lastChecked: '2025-09-15 14:30',
  },
  {
    key: '6',
    name: '报案金额环比增长',
    indicator: '月度报案金额环比',
    threshold: '>100%',
    currentValue: '230%（安徽水稻）',
    currentPercent: 230,
    status: 'breached',
    lastChecked: '2025-09-15 14:25',
  },
  {
    key: '7',
    name: '准备金充足率',
    indicator: '已报告案件准备金',
    threshold: '<110%',
    currentValue: '118%',
    currentPercent: 42,
    status: 'normal',
    lastChecked: '2025-09-15 14:20',
  },
  {
    key: '8',
    name: '再保分出比例',
    indicator: '总分出保费占比',
    threshold: '>40%',
    currentValue: '35.2%',
    currentPercent: 88,
    status: 'warning',
    lastChecked: '2025-09-15 14:15',
  },
]

/* ── Status helpers ── */

const statusConfig = {
  normal: {
    color: '#10b981',
    bg: '#ecfdf5',
    border: '#a7f3d0',
    icon: <CheckCircleOutlined />,
    label: '正常',
  },
  warning: {
    color: '#f59e0b',
    bg: '#fffbeb',
    border: '#fcd34d',
    icon: <ExclamationCircleOutlined />,
    label: '接近阈值',
  },
  breached: {
    color: '#ef4444',
    bg: '#fef2f2',
    border: '#fca5a5',
    icon: <CloseCircleOutlined />,
    label: '已触发',
  },
}

/* ── Component ── */

export default function ThresholdAlerts() {
  const [modalOpen, setModalOpen] = useState(false)
  const [ruleText, setRuleText] = useState('')
  const [parsedRule, setParsedRule] = useState<string | null>(null)

  const handleParseRule = () => {
    if (!ruleText.trim()) return
    // Simulated AI parsing
    setParsedRule(
      `已解析规则：\n指标：${ruleText.includes('赔付') ? '赔付率' : '保费偏差'}\n` +
        `条件：${ruleText.includes('连续') ? '连续3个月' : '单次'}超过阈值\n` +
        `动作：系统预警 + 邮件通知审计组长`,
    )
  }

  const columns: ColumnsType<ThresholdRule> = [
    {
      title: '规则名称',
      dataIndex: 'name',
      key: 'name',
      width: 180,
      render: (text: string, record: ThresholdRule) => {
        const cfg = statusConfig[record.status]
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {record.status === 'breached' ? (
              <motion.span
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                style={{ color: cfg.color, fontSize: 14 }}
              >
                {cfg.icon}
              </motion.span>
            ) : (
              <span style={{ color: cfg.color, fontSize: 14 }}>{cfg.icon}</span>
            )}
            <span style={{ fontWeight: 500 }}>{text}</span>
          </div>
        )
      },
    },
    {
      title: '监控指标',
      dataIndex: 'indicator',
      key: 'indicator',
      width: 160,
    },
    {
      title: '阈值',
      dataIndex: 'threshold',
      key: 'threshold',
      width: 100,
      render: (text: string) => (
        <span style={{ fontFamily: 'monospace', color: '#1a365d', fontWeight: 600 }}>{text}</span>
      ),
    },
    {
      title: '当前值',
      dataIndex: 'currentValue',
      key: 'currentValue',
      width: 180,
      render: (text: string, record: ThresholdRule) => {
        const cfg = statusConfig[record.status]
        return (
          <span style={{ color: cfg.color, fontWeight: 500 }}>
            {text}
          </span>
        )
      },
    },
    {
      title: '阈值使用率',
      key: 'progress',
      width: 160,
      render: (_: unknown, record: ThresholdRule) => {
        const color =
          record.status === 'breached'
            ? '#ef4444'
            : record.status === 'warning'
              ? '#f59e0b'
              : '#10b981'
        return (
          <Progress
            percent={Math.min(record.currentPercent, 100)}
            size="small"
            strokeColor={color}
            trailColor="#f1f5f9"
            format={() => `${record.currentPercent}%`}
          />
        )
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (_: unknown, record: ThresholdRule) => {
        const cfg = statusConfig[record.status]
        return (
          <Tag
            style={{
              color: cfg.color,
              backgroundColor: cfg.bg,
              borderColor: cfg.border,
              borderRadius: 6,
            }}
          >
            {cfg.label}
          </Tag>
        )
      },
    },
    {
      title: '最近检查',
      dataIndex: 'lastChecked',
      key: 'lastChecked',
      width: 160,
      render: (text: string) => (
        <span style={{ fontSize: 13, color: '#94a3b8' }}>{text}</span>
      ),
    },
  ]

  return (
    <>
      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 16, fontWeight: 600, color: '#1a365d' }}>
              预警阈值配置
            </span>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setModalOpen(true)
                setRuleText('')
                setParsedRule(null)
              }}
              style={{ borderRadius: 8 }}
            >
              自然语言添加规则
            </Button>
          </div>
        }
        style={{
          borderRadius: 12,
          border: 'none',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        }}
        styles={{ body: { padding: 0 } }}
      >
        <Table
          columns={columns}
          dataSource={thresholdRules}
          pagination={false}
          size="middle"
          rowClassName={(record) =>
            record.status === 'breached' ? 'threshold-breached-row' : ''
          }
        />

        {/* Inline style for flashing rows */}
        <style>{`
          .threshold-breached-row {
            background-color: #fef2f2 !important;
          }
          .threshold-breached-row:hover > td {
            background-color: #fee2e2 !important;
          }
        `}</style>
      </Card>

      {/* Natural language rule modal */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <RobotOutlined style={{ color: '#3b82f6' }} />
            <span>自然语言添加预警规则</span>
          </div>
        }
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        width={560}
      >
        <div style={{ padding: '16px 0' }}>
          <p style={{ color: '#64748b', fontSize: 14, marginBottom: 16 }}>
            用自然语言描述您想要添加的预警规则，AI将自动解析并创建：
          </p>

          <Space.Compact style={{ width: '100%', marginBottom: 16 }}>
            <Input
              value={ruleText}
              onChange={(e) => {
                setRuleText(e.target.value)
                setParsedRule(null)
              }}
              placeholder="例如：当某省连续3个月赔付率超过70%时预警"
              onPressEnter={handleParseRule}
              size="large"
            />
            <Button type="primary" size="large" onClick={handleParseRule}>
              AI 解析
            </Button>
          </Space.Compact>

          {/* Example prompts */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>示例规则：</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {[
                '当某省连续3个月赔付率超过70%时预警',
                '单个再保合同赔付超过限额90%则报警',
                '每周检查保费数据与业务系统一致性',
              ].map((example) => (
                <Tag
                  key={example}
                  style={{
                    cursor: 'pointer',
                    borderRadius: 16,
                    padding: '4px 12px',
                    fontSize: 13,
                    border: '1px solid #e2e8f0',
                    color: '#475569',
                    background: '#f8fafc',
                  }}
                  onClick={() => {
                    setRuleText(example)
                    setParsedRule(null)
                  }}
                >
                  {example}
                </Tag>
              ))}
            </div>
          </div>

          {/* Parsed result */}
          {parsedRule && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                padding: 16,
                borderRadius: 8,
                background: '#f0f9ff',
                border: '1px solid #bae6fd',
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#0369a1',
                  marginBottom: 8,
                }}
              >
                AI 解析结果
              </div>
              <pre
                style={{
                  fontSize: 13,
                  color: '#334155',
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'inherit',
                }}
              >
                {parsedRule}
              </pre>
              <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                <Button type="primary" size="small" onClick={() => setModalOpen(false)}>
                  确认添加
                </Button>
                <Button size="small" onClick={() => setParsedRule(null)}>
                  重新描述
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </Modal>
    </>
  )
}
