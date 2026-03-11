import { Row, Col, Card, Table, Tag } from 'antd'
import {
  AccountBookOutlined,
  PercentageOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import { motion } from 'framer-motion'
import type { ColumnsType } from 'antd/es/table'
import PageHeader from '../../components/common/PageHeader'

// ── KPI Data ──

const kpiData = [
  { label: '应纳税额', value: '¥12.8亿', icon: <AccountBookOutlined />, color: '#1a365d', trend: '+3.2%', trendUp: true },
  { label: '税负率', value: '2.8%', icon: <PercentageOutlined />, color: '#10b981', trend: '-0.3%', trendUp: false },
  { label: '申报进度', value: '85%', icon: <CheckCircleOutlined />, color: '#6366f1', trend: '正常', trendUp: true },
  { label: '风险项', value: '3个', icon: <WarningOutlined />, color: '#ef4444', trend: '-1个', trendUp: false },
]

// ── Tax Filing Table ──

interface TaxFiling {
  key: string
  taxType: string
  period: string
  taxableAmount: number
  paidAmount: number
  remainingAmount: number
  dueDate: string
  status: '已申报' | '待申报' | '申报中' | '已逾期'
}

const taxFilingData: TaxFiling[] = [
  { key: '1', taxType: '企业所得税', period: '2025年Q3', taxableAmount: 68000, paidAmount: 68000, remainingAmount: 0, dueDate: '2025-10-15', status: '已申报' },
  { key: '2', taxType: '增值税', period: '2025年8月', taxableAmount: 12450, paidAmount: 12450, remainingAmount: 0, dueDate: '2025-09-15', status: '已申报' },
  { key: '3', taxType: '印花税', period: '2025年8月', taxableAmount: 286, paidAmount: 0, remainingAmount: 286, dueDate: '2025-09-15', status: '待申报' },
  { key: '4', taxType: '城市维护建设税', period: '2025年8月', taxableAmount: 872, paidAmount: 872, remainingAmount: 0, dueDate: '2025-09-15', status: '已申报' },
  { key: '5', taxType: '教育费附加', period: '2025年8月', taxableAmount: 374, paidAmount: 374, remainingAmount: 0, dueDate: '2025-09-15', status: '已申报' },
  { key: '6', taxType: '个人所得税(代扣)', period: '2025年8月', taxableAmount: 1856, paidAmount: 1856, remainingAmount: 0, dueDate: '2025-09-15', status: '已申报' },
  { key: '7', taxType: '房产税', period: '2025年H2', taxableAmount: 1240, paidAmount: 0, remainingAmount: 1240, dueDate: '2025-12-31', status: '待申报' },
  { key: '8', taxType: '企业所得税(预缴)', period: '2025年Q4', taxableAmount: 45200, paidAmount: 0, remainingAmount: 45200, dueDate: '2026-01-15', status: '待申报' },
]

const taxFilingColumns: ColumnsType<TaxFiling> = [
  { title: '税种', dataIndex: 'taxType', key: 'taxType', width: 160 },
  { title: '所属期', dataIndex: 'period', key: 'period', width: 120 },
  { title: '应纳税额(万)', dataIndex: 'taxableAmount', key: 'taxableAmount', width: 130, align: 'right', render: (v: number) => `¥${v.toLocaleString()}` },
  { title: '已缴税额(万)', dataIndex: 'paidAmount', key: 'paidAmount', width: 130, align: 'right', render: (v: number) => v > 0 ? `¥${v.toLocaleString()}` : '-' },
  { title: '待缴金额(万)', dataIndex: 'remainingAmount', key: 'remainingAmount', width: 130, align: 'right', render: (v: number) => v > 0 ? <span style={{ color: '#ef4444' }}>¥{v.toLocaleString()}</span> : <span style={{ color: '#10b981' }}>-</span> },
  { title: '截止日期', dataIndex: 'dueDate', key: 'dueDate', width: 120 },
  {
    title: '状态', dataIndex: 'status', key: 'status', width: 100,
    render: (s: string) => {
      const colorMap: Record<string, string> = { '已申报': 'green', '待申报': 'orange', '申报中': 'processing', '已逾期': 'red' }
      return <Tag color={colorMap[s]}>{s}</Tag>
    },
  },
]

// ── Risk Assessment Data ──

interface TaxRisk {
  id: number
  title: string
  severity: 'high' | 'medium' | 'low'
  description: string
  suggestion: string
  amount: string
}

const taxRisks: TaxRisk[] = [
  {
    id: 1,
    title: '跨境再保交易预提税处理',
    severity: 'high',
    description: '2笔与境外再保险人的分保交易，预提税率适用存在争议，涉及金额¥2,340万。需确认是否适用税收协定优惠税率。',
    suggestion: '建议联系税务顾问确认税率适用，并在申报前完成事前裁定申请。',
    amount: '¥2,340万',
  },
  {
    id: 2,
    title: '免税项目凭证不完整',
    severity: 'medium',
    description: '农业保险保费收入免征增值税，但部分业务缺少完整的免税备案资料，涉及12笔免税交易。',
    suggestion: '尽快补充免税备案所需的保单和理赔资料，避免税务稽查时产生争议。',
    amount: '涉及免税额约¥860万',
  },
  {
    id: 3,
    title: '研发费用加计扣除归集',
    severity: 'low',
    description: 'AI审计系统研发支出¥580万可享受加计扣除，但部分费用归集不够精确，可能影响扣除额度。',
    suggestion: '建议重新梳理研发费用辅助账，确保人工费用、材料费用等分类准确。',
    amount: '潜在优惠¥145万',
  },
]

// ── Policy Matching ──

const policyMatches = [
  { title: '财税[2024]28号', content: '再保险合同印花税减免政策，适用于2024年1月1日后签订的再保合同', impact: '预计减免¥45万' },
  { title: '国税函[2024]156号', content: '农业保险经营所得税优惠政策延续', impact: '继续免征增值税' },
  { title: '财税[2025]12号', content: '保险业责任准备金税前扣除新规', impact: '可扣除额度增加约¥3,200万' },
]

// ── Animation ──

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } }
const itemVariants = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } } }

// ── Main Component ──

export default function TaxPage() {
  return (
    <motion.div className="p-6" variants={containerVariants} initial="hidden" animate="visible">
      <PageHeader
        title="纳税管理"
        description="税务合规检查、税负分析与申报辅助"
        suggestedPrompts={['本月纳税申报进度', '税务风险分析', '查看可用税收优惠', '生成税负分析报告']}
      />

      {/* KPI Cards */}
      <Row gutter={[16, 16]} className="mb-4">
        {kpiData.map((item) => (
          <Col key={item.label} xs={12} sm={12} lg={6}>
            <motion.div variants={itemVariants}>
              <Card style={{ borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: 'none' }} styles={{ body: { padding: '16px 20px' } }}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[#94a3b8] text-xs mb-1.5">{item.label}</div>
                    <div className="text-[#1a202c] text-xl font-semibold">{item.value}</div>
                    <div className="text-xs mt-1.5" style={{ color: item.trendUp ? '#10b981' : '#ef4444' }}>{item.trend}</div>
                  </div>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-base" style={{ background: `${item.color}12`, color: item.color }}>{item.icon}</div>
                </div>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      {/* Tax Filing Table */}
      <motion.div variants={itemVariants} className="mb-4">
        <Card
          title={<span className="text-sm font-semibold text-[#1a365d]">纳税申报状态</span>}
          style={{ borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: 'none' }}
        >
          <Table columns={taxFilingColumns} dataSource={taxFilingData} pagination={false} size="small" scroll={{ x: 800 }} />
        </Card>
      </motion.div>

      {/* Bottom Row: Risk Assessment + Policy Matching */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={14}>
          <motion.div variants={itemVariants}>
            <Card
              title={<span><ExclamationCircleOutlined style={{ color: '#ef4444', marginRight: 8 }} />税务风险评估</span>}
              style={{ borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: 'none', height: '100%' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {taxRisks.map((risk) => {
                  const severityMap: Record<string, { color: string; bg: string; label: string }> = {
                    high: { color: '#ef4444', bg: '#fef2f2', label: '高风险' },
                    medium: { color: '#f59e0b', bg: '#fffbeb', label: '中风险' },
                    low: { color: '#10b981', bg: '#f0fdf4', label: '低风险' },
                  }
                  const s = severityMap[risk.severity]
                  return (
                    <div key={risk.id} style={{ padding: 16, borderRadius: 8, background: s.bg, border: `1px solid ${s.color}20` }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <span style={{ fontWeight: 600, color: '#1a202c', fontSize: 14 }}>{risk.title}</span>
                        <Tag color={risk.severity === 'high' ? 'red' : risk.severity === 'medium' ? 'orange' : 'green'}>{s.label}</Tag>
                      </div>
                      <div style={{ fontSize: 13, color: '#475569', marginBottom: 8 }}>{risk.description}</div>
                      <div style={{ fontSize: 12, color: '#64748b' }}>
                        <strong>建议：</strong>{risk.suggestion}
                      </div>
                      <div style={{ fontSize: 12, color: s.color, marginTop: 6, fontWeight: 500 }}>涉及金额：{risk.amount}</div>
                    </div>
                  )
                })}
              </div>
            </Card>
          </motion.div>
        </Col>
        <Col xs={24} lg={10}>
          <motion.div variants={itemVariants}>
            <Card
              title={<span className="text-sm font-semibold text-[#1a365d]">AI政策匹配</span>}
              style={{ borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: 'none', height: '100%' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {policyMatches.map((p, i) => (
                  <div key={i} style={{ padding: 12, borderRadius: 8, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontWeight: 600, color: '#1a365d', fontSize: 13, marginBottom: 4 }}>{p.title}</div>
                    <div style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>{p.content}</div>
                    <Tag color="blue">{p.impact}</Tag>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </motion.div>
  )
}
