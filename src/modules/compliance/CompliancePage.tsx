import { Row, Col, Card, Table, Tag } from 'antd'
import {
  SafetyCertificateOutlined,
  CheckCircleOutlined,
  ToolOutlined,
  FileSearchOutlined,
  RobotOutlined,
} from '@ant-design/icons'
import { motion } from 'framer-motion'
import type { ColumnsType } from 'antd/es/table'
import PageHeader from '../../components/common/PageHeader'

// ── KPI Data ──

const kpiData = [
  { label: '合规指标', value: '42项', icon: <SafetyCertificateOutlined />, color: '#1a365d', trend: '+3项', trendUp: true },
  { label: '达标率', value: '95.2%', icon: <CheckCircleOutlined />, color: '#10b981', trend: '+1.8%', trendUp: true },
  { label: '待整改', value: '3项', icon: <ToolOutlined />, color: '#ef4444', trend: '-2项', trendUp: false },
  { label: '新规跟踪', value: '8条', icon: <FileSearchOutlined />, color: '#6366f1', trend: '+3条', trendUp: true },
]

// ── Regulatory Change Tracking ──

interface RegChange {
  key: string
  regulation: string
  issuer: string
  effectiveDate: string
  impactArea: string
  status: '已落实' | '整改中' | '待评估' | '已知悉'
  urgency: '紧急' | '重要' | '一般'
}

const regChangeData: RegChange[] = [
  { key: '1', regulation: '再保险公司分类监管评价办法', issuer: '金融监管总局', effectiveDate: '2025-10-01', impactArea: '公司治理', status: '整改中', urgency: '紧急' },
  { key: '2', regulation: '偿付能力监管规则II更新', issuer: '金融监管总局', effectiveDate: '2025-12-01', impactArea: '资本管理', status: '待评估', urgency: '紧急' },
  { key: '3', regulation: '保险资金运用管理办法(修订)', issuer: '金融监管总局', effectiveDate: '2026-01-01', impactArea: '投资管理', status: '已知悉', urgency: '重要' },
  { key: '4', regulation: '反洗钱管理办法(修订)', issuer: '中国人民银行', effectiveDate: '2025-11-01', impactArea: '合规管理', status: '整改中', urgency: '重要' },
  { key: '5', regulation: '农业保险信息披露指引', issuer: '金融监管总局', effectiveDate: '2025-09-30', impactArea: '信息披露', status: '已落实', urgency: '紧急' },
  { key: '6', regulation: '数据安全法实施细则', issuer: '网信办', effectiveDate: '2026-01-01', impactArea: 'IT合规', status: '待评估', urgency: '重要' },
  { key: '7', regulation: '企业内控评价指引更新', issuer: '财政部', effectiveDate: '2025-12-31', impactArea: '内控管理', status: '已知悉', urgency: '一般' },
  { key: '8', regulation: '保险科技风险管理指引', issuer: '金融监管总局', effectiveDate: '2026-03-01', impactArea: 'IT合规', status: '待评估', urgency: '一般' },
]

const regChangeColumns: ColumnsType<RegChange> = [
  { title: '法规名称', dataIndex: 'regulation', key: 'regulation', width: 240 },
  { title: '发布机构', dataIndex: 'issuer', key: 'issuer', width: 120, render: (t: string) => <Tag color="blue">{t}</Tag> },
  { title: '生效日期', dataIndex: 'effectiveDate', key: 'effectiveDate', width: 110 },
  { title: '影响领域', dataIndex: 'impactArea', key: 'impactArea', width: 100 },
  {
    title: '状态', dataIndex: 'status', key: 'status', width: 100,
    render: (s: string) => {
      const m: Record<string, string> = { '已落实': 'green', '整改中': 'orange', '待评估': 'blue', '已知悉': 'default' }
      return <Tag color={m[s]}>{s}</Tag>
    },
  },
  {
    title: '紧急度', dataIndex: 'urgency', key: 'urgency', width: 80,
    render: (u: string) => {
      const m: Record<string, string> = { '紧急': 'red', '重要': 'orange', '一般': 'default' }
      return <Tag color={m[u]}>{u}</Tag>
    },
  },
]

// ── Contract Review AI Results ──

const contractReviewResults = [
  { contract: '华北地区玉米种植险再保合同', result: '合规', issues: 0, detail: '条款完整，费率合规，无异常条款' },
  { contract: '转分保框架协议', result: '需关注', issues: 2, detail: '汇率风险条款不完整；合同期限条款与监管新规存在冲突' },
  { contract: '巨灾保险再保合同', result: '需整改', issues: 3, detail: '缺少气候风险评估附件；赔付触发条件定义模糊；信息披露条款不满足新规要求' },
  { contract: 'IT系统运维合同', result: '合规', issues: 0, detail: 'SLA指标明确，数据安全条款完善' },
]

// ── Compliance Risk Heatmap ──

const heatmapData = [
  { area: '公司治理', dimensions: ['组织架构', '议事规则', '信息披露', '关联交易'], scores: [95, 92, 88, 90] },
  { area: '资本管理', dimensions: ['偿付能力', '资本规划', '风险资本', '压力测试'], scores: [96, 85, 90, 78] },
  { area: '业务合规', dimensions: ['承保合规', '理赔合规', '再保合规', '精算合规'], scores: [98, 95, 87, 93] },
  { area: '投资合规', dimensions: ['集中度', '关联交易', '委托投资', '境外投资'], scores: [92, 96, 88, 85] },
  { area: '运营合规', dimensions: ['反洗钱', '消费者保护', '数据安全', '外包管理'], scores: [82, 90, 75, 88] },
]

// ── Animation ──

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } }
const itemVariants = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } } }

function getHeatmapColor(score: number): string {
  if (score >= 95) return '#059669'
  if (score >= 90) return '#10b981'
  if (score >= 85) return '#34d399'
  if (score >= 80) return '#f59e0b'
  if (score >= 75) return '#f97316'
  return '#ef4444'
}

// ── Main Component ──

export default function CompliancePage() {
  return (
    <motion.div className="p-6" variants={containerVariants} initial="hidden" animate="visible">
      <PageHeader
        title="合规管理"
        description="监管政策合规性审查与风险提示"
        suggestedPrompts={['合规检查报告', '监管新规影响评估', '查看整改进度', '合规风险热力图']}
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
                    <div className="text-xs mt-1.5" style={{ color: item.label === '待整改' ? '#10b981' : item.trendUp ? '#10b981' : '#ef4444' }}>{item.trend}</div>
                  </div>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-base" style={{ background: `${item.color}12`, color: item.color }}>{item.icon}</div>
                </div>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      {/* Regulatory Change Tracking */}
      <motion.div variants={itemVariants} className="mb-4">
        <Card
          title={<span className="text-sm font-semibold text-[#1a365d]">监管变化跟踪</span>}
          style={{ borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: 'none' }}
        >
          <Table columns={regChangeColumns} dataSource={regChangeData} pagination={false} size="small" scroll={{ x: 800 }} />
        </Card>
      </motion.div>

      {/* Bottom Row: Contract Review + Heatmap */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <motion.div variants={itemVariants}>
            <Card
              title={<span><RobotOutlined style={{ color: '#8b5cf6', marginRight: 8 }} />AI合同合规审查</span>}
              style={{ borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: 'none', height: '100%' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {contractReviewResults.map((r, i) => (
                  <div key={i} style={{
                    padding: 12, borderRadius: 8,
                    background: r.result === '合规' ? '#f0fdf4' : r.result === '需关注' ? '#fffbeb' : '#fef2f2',
                    border: `1px solid ${r.result === '合规' ? '#bbf7d0' : r.result === '需关注' ? '#fde68a' : '#fecaca'}`,
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <span style={{ fontWeight: 600, fontSize: 13 }}>{r.contract}</span>
                      <Tag color={r.result === '合规' ? 'green' : r.result === '需关注' ? 'orange' : 'red'}>
                        {r.result}{r.issues > 0 && ` (${r.issues}项)`}
                      </Tag>
                    </div>
                    <div style={{ fontSize: 12, color: '#64748b' }}>{r.detail}</div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </Col>
        <Col xs={24} lg={12}>
          <motion.div variants={itemVariants}>
            <Card
              title={<span className="text-sm font-semibold text-[#1a365d]">合规风险热力图</span>}
              style={{ borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: 'none', height: '100%' }}
            >
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                  <thead>
                    <tr>
                      <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontWeight: 500 }}>领域</th>
                      {heatmapData[0].dimensions.map((d, i) => (
                        <th key={i} style={{ padding: '8px 12px', textAlign: 'center', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontWeight: 500, minWidth: 80 }}>{d}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {heatmapData.map((row, ri) => (
                      <tr key={ri}>
                        <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9', fontWeight: 500, color: '#1a202c' }}>{row.area}</td>
                        {row.scores.map((score, ci) => (
                          <td key={ci} style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>
                            <div style={{
                              display: 'inline-block',
                              padding: '4px 12px',
                              borderRadius: 6,
                              background: `${getHeatmapColor(score)}18`,
                              color: getHeatmapColor(score),
                              fontWeight: 600,
                              minWidth: 48,
                            }}>
                              {score}
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ marginTop: 12, display: 'flex', gap: 12, fontSize: 11, color: '#94a3b8' }}>
                <span><span style={{ display: 'inline-block', width: 12, height: 12, borderRadius: 3, background: '#059669', marginRight: 4, verticalAlign: 'middle' }} />95+</span>
                <span><span style={{ display: 'inline-block', width: 12, height: 12, borderRadius: 3, background: '#10b981', marginRight: 4, verticalAlign: 'middle' }} />90-94</span>
                <span><span style={{ display: 'inline-block', width: 12, height: 12, borderRadius: 3, background: '#34d399', marginRight: 4, verticalAlign: 'middle' }} />85-89</span>
                <span><span style={{ display: 'inline-block', width: 12, height: 12, borderRadius: 3, background: '#f59e0b', marginRight: 4, verticalAlign: 'middle' }} />80-84</span>
                <span><span style={{ display: 'inline-block', width: 12, height: 12, borderRadius: 3, background: '#f97316', marginRight: 4, verticalAlign: 'middle' }} />75-79</span>
                <span><span style={{ display: 'inline-block', width: 12, height: 12, borderRadius: 3, background: '#ef4444', marginRight: 4, verticalAlign: 'middle' }} />&lt;75</span>
              </div>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </motion.div>
  )
}
