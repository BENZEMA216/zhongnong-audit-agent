import { Row, Col, Card, Table, Tag, Progress } from 'antd'
import {
  FileProtectOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  DollarOutlined,
  RobotOutlined,
} from '@ant-design/icons'
import { motion } from 'framer-motion'
import type { ColumnsType } from 'antd/es/table'
import PageHeader from '../../components/common/PageHeader'

// ── KPI Data ──

const kpiData = [
  { label: '有效合同', value: '156份', icon: <FileProtectOutlined />, color: '#1a365d', trend: '+8份', trendUp: true },
  { label: '执行率', value: '87.3%', icon: <CheckCircleOutlined />, color: '#10b981', trend: '-3.2%', trendUp: false },
  { label: '到期预警', value: '12份', icon: <WarningOutlined />, color: '#ef4444', trend: '+4份', trendUp: true },
  { label: '总金额', value: '¥2,340亿', icon: <DollarOutlined />, color: '#6366f1', trend: '+15.6%', trendUp: true },
]

// ── Contract Table Data ──

interface ContractItem {
  key: string
  contractId: string
  name: string
  counterparty: string
  type: string
  amount: number
  executionRate: number
  status: '执行中' | '即将到期' | '已到期' | '审批中'
  riskLevel: '低' | '中' | '高'
  startDate: string
  endDate: string
}

const contractData: ContractItem[] = [
  { key: '1', contractId: 'RC-2025-001', name: '华北地区玉米种植险再保合同', counterparty: '人保财险', type: '比例再保', amount: 186, executionRate: 92, status: '执行中', riskLevel: '低', startDate: '2025-01-01', endDate: '2025-12-31' },
  { key: '2', contractId: 'RC-2025-002', name: '全国生猪养殖险再保合同', counterparty: '太平洋财险', type: '比例再保', amount: 128, executionRate: 85, status: '执行中', riskLevel: '低', startDate: '2025-01-01', endDate: '2025-12-31' },
  { key: '3', contractId: 'RC-2025-003', name: '东北大豆种植险超赔合同', counterparty: '慕尼黑再保险', type: '超额赔付', amount: 95, executionRate: 72, status: '执行中', riskLevel: '中', startDate: '2025-01-01', endDate: '2025-12-31' },
  { key: '4', contractId: 'RC-2025-004', name: '巨灾保险再保合同', counterparty: '瑞士再保险', type: '巨灾超赔', amount: 320, executionRate: 68, status: '执行中', riskLevel: '高', startDate: '2025-01-01', endDate: '2025-12-31' },
  { key: '5', contractId: 'RC-2024-018', name: '转分保框架协议(到期)', counterparty: '中再集团', type: '转分保', amount: 250, executionRate: 98, status: '即将到期', riskLevel: '中', startDate: '2024-07-01', endDate: '2025-09-30' },
  { key: '6', contractId: 'SC-2025-012', name: 'IT系统运维合同', counterparty: '中软国际', type: '服务合同', amount: 0.85, executionRate: 78, status: '执行中', riskLevel: '低', startDate: '2025-03-01', endDate: '2026-02-28' },
  { key: '7', contractId: 'RC-2025-008', name: '森林火灾险再保合同', counterparty: '劳合社', type: '比例再保', amount: 56, executionRate: 45, status: '审批中', riskLevel: '中', startDate: '2025-04-01', endDate: '2026-03-31' },
  { key: '8', contractId: 'RC-2024-012', name: '水产养殖险合作协议(已到期)', counterparty: '平安财险', type: '合作协议', amount: 42, executionRate: 100, status: '已到期', riskLevel: '低', startDate: '2024-01-01', endDate: '2025-06-30' },
]

const contractColumns: ColumnsType<ContractItem> = [
  { title: '合同编号', dataIndex: 'contractId', key: 'contractId', width: 130, render: (t: string) => <span style={{ fontFamily: 'monospace', fontSize: 12 }}>{t}</span> },
  { title: '合同名称', dataIndex: 'name', key: 'name', width: 220 },
  { title: '对手方', dataIndex: 'counterparty', key: 'counterparty', width: 120 },
  { title: '类型', dataIndex: 'type', key: 'type', width: 100, render: (t: string) => <Tag color="blue">{t}</Tag> },
  { title: '金额(亿)', dataIndex: 'amount', key: 'amount', width: 100, align: 'right', render: (v: number) => v >= 1 ? `¥${v}` : `¥${(v * 10000).toFixed(0)}万` },
  {
    title: '执行率', dataIndex: 'executionRate', key: 'executionRate', width: 150,
    render: (v: number) => (
      <Progress percent={v} size="small" strokeColor={v >= 85 ? '#10b981' : v >= 70 ? '#f59e0b' : '#ef4444'} />
    ),
  },
  {
    title: 'AI风险', dataIndex: 'riskLevel', key: 'riskLevel', width: 80,
    render: (l: string) => {
      const m: Record<string, string> = { '低': 'green', '中': 'orange', '高': 'red' }
      return <Tag color={m[l]}>{l}风险</Tag>
    },
  },
  {
    title: '状态', dataIndex: 'status', key: 'status', width: 100,
    render: (s: string) => {
      const m: Record<string, string> = { '执行中': 'processing', '即将到期': 'warning', '已到期': 'default', '审批中': 'blue' }
      return <Tag color={m[s]}>{s}</Tag>
    },
  },
  { title: '到期日', dataIndex: 'endDate', key: 'endDate', width: 110 },
]

// ── AI Risk Assessments ──

const aiAssessments = [
  {
    contract: 'RC-2025-004 巨灾保险再保合同',
    risk: 'high',
    findings: [
      '执行率仅68%，低于同类合同平均水平85%',
      '极端天气事件增多，巨灾赔付触发概率上升至35%',
      '汇率风险敞口缺少对冲安排',
    ],
    recommendation: '建议与瑞士再保险协商补充汇率保护条款，并加速分保流程',
  },
  {
    contract: 'RC-2024-018 转分保框架协议',
    risk: 'medium',
    findings: [
      '合同将于2025年9月30日到期，剩余不足30天',
      '续约条件谈判尚未启动',
      '该合同承担了约¥250亿的风险分散功能',
    ],
    recommendation: '紧急启动续约谈判，建议预留备选方案',
  },
]

// ── Animation ──

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } }
const itemVariants = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } } }

// ── Main Component ──

export default function ContractPage() {
  return (
    <motion.div className="p-6" variants={containerVariants} initial="hidden" animate="visible">
      <PageHeader
        title="合同管理"
        description="合同全生命周期管理与关键条款提取"
        suggestedPrompts={['查看到期合同', '合同执行分析', '审查合同条款', '对手方信用评估']}
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
                    <div className="text-xs mt-1.5" style={{ color: item.label === '到期预警' ? '#ef4444' : item.trendUp ? '#10b981' : '#ef4444' }}>{item.trend}</div>
                  </div>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-base" style={{ background: `${item.color}12`, color: item.color }}>{item.icon}</div>
                </div>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      {/* Contract Table */}
      <motion.div variants={itemVariants} className="mb-4">
        <Card
          title={<span className="text-sm font-semibold text-[#1a365d]">合同清单</span>}
          style={{ borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: 'none' }}
        >
          <Table columns={contractColumns} dataSource={contractData} pagination={false} size="small" scroll={{ x: 1100 }} />
        </Card>
      </motion.div>

      {/* AI Risk Assessments */}
      <motion.div variants={itemVariants}>
        <Card
          title={<span><RobotOutlined style={{ color: '#8b5cf6', marginRight: 8 }} />AI合同风险评估</span>}
          style={{ borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: 'none' }}
        >
          <Row gutter={[16, 16]}>
            {aiAssessments.map((a, i) => (
              <Col key={i} xs={24} lg={12}>
                <div style={{
                  padding: 16, borderRadius: 8,
                  background: a.risk === 'high' ? '#fef2f2' : '#fffbeb',
                  border: `1px solid ${a.risk === 'high' ? '#fecaca' : '#fde68a'}`,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <span style={{ fontWeight: 600, fontSize: 13, color: '#1a202c' }}>{a.contract}</span>
                    <Tag color={a.risk === 'high' ? 'red' : 'orange'}>{a.risk === 'high' ? '高风险' : '中风险'}</Tag>
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    {a.findings.map((f, j) => (
                      <div key={j} style={{ fontSize: 12, color: '#475569', marginBottom: 4, paddingLeft: 12, position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0 }}>-</span>{f}
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: 12, color: '#1a365d', fontWeight: 500, padding: '8px 12px', background: 'rgba(255,255,255,0.7)', borderRadius: 6 }}>
                    <strong>AI建议：</strong>{a.recommendation}
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Card>
      </motion.div>
    </motion.div>
  )
}
