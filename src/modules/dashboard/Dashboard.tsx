import { Row, Col, Card, Table, Tag, Badge } from 'antd'
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  DollarOutlined,
  PercentageOutlined,
  SafetyCertificateOutlined,
  FileProtectOutlined,
  WarningOutlined,
  RobotOutlined,
  CloseOutlined,
} from '@ant-design/icons'
import { motion } from 'framer-motion'
import { useState } from 'react'
import TrendChart from '../../components/charts/TrendChart'
import RiskRadar from '../../components/charts/RiskRadar'
import ChinaMapChart from '../../components/charts/ChinaMapChart'
import SankeyFlow from '../../components/charts/SankeyFlow'
import type { ProvinceData } from '../../components/charts/ChinaMapChart'
import type { FlowItem } from '../../components/charts/SankeyFlow'
import type { RiskDimension } from '../../components/charts/RiskRadar'
import type { TrendDataPoint } from '../../components/charts/TrendChart'
import type { ColumnsType } from 'antd/es/table'

// ── Alert Data ──

interface AlertItem {
  id: number
  level: 'critical' | 'warning'
  message: string
}

const alertsData: AlertItem[] = [
  {
    id: 1,
    level: 'critical',
    message: '河南省农业险赔付率达87%，超过预警阈值80%',
  },
  {
    id: 2,
    level: 'warning',
    message: 'Q3再保险合同执行进度落后12%，请关注',
  },
  {
    id: 3,
    level: 'warning',
    message: '发现5笔可疑报销单据，建议优先审核',
  },
]

// ── KPI Data ──

interface KpiItem {
  label: string
  value: string
  trend: string
  trendUp: boolean
  positive: boolean // whether "up" is good
  icon: React.ReactNode
  color: string
}

const kpiData: KpiItem[] = [
  {
    label: '保费收入',
    value: '¥1,823亿',
    trend: '+8.3%',
    trendUp: true,
    positive: true,
    icon: <DollarOutlined />,
    color: '#1a365d',
  },
  {
    label: '综合赔付率',
    value: '64.7%',
    trend: '-2.1%',
    trendUp: false,
    positive: true, // lower is better
    icon: <PercentageOutlined />,
    color: '#10b981',
  },
  {
    label: '偿付能力充足率',
    value: '248%',
    trend: '+5%',
    trendUp: true,
    positive: true,
    icon: <SafetyCertificateOutlined />,
    color: '#6366f1',
  },
  {
    label: '合同执行率',
    value: '87.3%',
    trend: '-3.2%',
    trendUp: false,
    positive: false, // lower is bad
    icon: <FileProtectOutlined />,
    color: '#d4a843',
  },
  {
    label: '风险预警',
    value: '7项',
    trend: '+2',
    trendUp: true,
    positive: false, // more warnings is bad
    icon: <WarningOutlined />,
    color: '#ef4444',
  },
  {
    label: 'AI处理任务',
    value: '1,247项',
    trend: '+156',
    trendUp: true,
    positive: true,
    icon: <RobotOutlined />,
    color: '#8b5cf6',
  },
]

// ── Premium Trend Data ──

const premiumTrendData: TrendDataPoint[] = [
  { date: '1月', value: 168 },
  { date: '2月', value: 155 },
  { date: '3月', value: 192 },
  { date: '4月', value: 185 },
  { date: '5月', value: 201 },
  { date: '6月', value: 218 },
  { date: '7月', value: 210 },
  { date: '8月', value: 195 },
  { date: '9月', value: 199 },
]

// ── Risk Radar Data ──

const riskRadarData: RiskDimension[] = [
  { name: '承保风险', value: 72 },
  { name: '市场风险', value: 58 },
  { name: '信用风险', value: 45 },
  { name: '操作风险', value: 38 },
  { name: '流动性风险', value: 32 },
  { name: '合规风险', value: 28 },
]

// ── Province Data ──

const provinceData: ProvinceData[] = [
  { province: '河南', value: 87, riskLevel: 'high' },
  { province: '安徽', value: 78, riskLevel: 'medium' },
  { province: '山东', value: 75, riskLevel: 'medium' },
  { province: '河北', value: 72, riskLevel: 'medium' },
  { province: '黑龙江', value: 68, riskLevel: 'medium' },
  { province: '吉林', value: 65, riskLevel: 'medium' },
  { province: '江苏', value: 62, riskLevel: 'medium' },
  { province: '湖北', value: 58, riskLevel: 'low' },
  { province: '四川', value: 55, riskLevel: 'low' },
  { province: '湖南', value: 52, riskLevel: 'low' },
  { province: '内蒙古', value: 50, riskLevel: 'low' },
  { province: '新疆', value: 48, riskLevel: 'low' },
  { province: '广东', value: 45, riskLevel: 'low' },
  { province: '云南', value: 42, riskLevel: 'low' },
  { province: '辽宁', value: 40, riskLevel: 'low' },
]

// ── Fund Flow Data ──

const fundFlowData: FlowItem[] = [
  { name: '保费收入', value: 1823_0000_0000, type: 'income' },
  { name: '赔付支出', value: 1179_0000_0000, type: 'expense' },
  { name: '手续费', value: 182_0000_0000, type: 'expense' },
  { name: '管理费', value: 146_0000_0000, type: 'expense' },
  { name: '投资收益', value: 89_0000_0000, type: 'income' },
  { name: '营业利润', value: 0, type: 'profit' },
]

// ── AI Task Table Data ──

interface AiTask {
  key: string
  time: string
  module: string
  description: string
  status: '已完成' | '进行中'
  findings: string
}

const aiTaskData: AiTask[] = [
  { key: '1', time: '10:32', module: '财务审核', description: '本周报销单智能审核', status: '已完成', findings: '5项异常' },
  { key: '2', time: '09:45', module: '风险监控', description: '承保数据质量巡检', status: '已完成', findings: '2项预警' },
  { key: '3', time: '09:15', module: '合规管理', description: '新规影响评估', status: '进行中', findings: '-' },
  { key: '4', time: '08:50', module: '会计核算', description: '日终凭证自动核对', status: '已完成', findings: '3笔差异' },
  { key: '5', time: '08:30', module: '合同管理', description: '再保合同条款变更检测', status: '已完成', findings: '1项变更' },
  { key: '6', time: '08:00', module: '投资管理', description: '投资组合风险日报生成', status: '已完成', findings: '1项预警' },
  { key: '7', time: '昨日 17:30', module: '农业数据', description: '各省赔付率异常扫描', status: '已完成', findings: '1省异常' },
  { key: '8', time: '昨日 16:45', module: '纳税管理', description: '增值税进项发票匹配', status: '已完成', findings: '无异常' },
  { key: '9', time: '昨日 15:20', module: '知识中心', description: '新审计案例自动归档', status: '已完成', findings: '12条入库' },
  { key: '10', time: '昨日 14:00', module: '财务分析', description: '月度财务指标自动对标', status: '已完成', findings: '2项偏差' },
]

const taskColumns: ColumnsType<AiTask> = [
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
    width: 110,
    render: (text: string) => <span className="text-[#94a3b8] text-xs">{text}</span>,
  },
  {
    title: '模块',
    dataIndex: 'module',
    key: 'module',
    width: 100,
    render: (text: string) => (
      <Tag
        color="blue"
        style={{ fontSize: 12, borderRadius: 4, border: 'none', background: '#eff6ff', color: '#1a365d' }}
      >
        {text}
      </Tag>
    ),
  },
  {
    title: '任务描述',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 90,
    render: (status: string) => (
      <Badge
        status={status === '已完成' ? 'success' : 'processing'}
        text={<span className="text-xs">{status}</span>}
      />
    ),
  },
  {
    title: '发现数',
    dataIndex: 'findings',
    key: 'findings',
    width: 100,
    render: (text: string) => {
      if (text === '-' || text === '无异常') {
        return <span className="text-[#94a3b8] text-xs">{text}</span>
      }
      return <span className="text-[#ef4444] text-xs font-medium">{text}</span>
    },
  },
]

// ── Animation Variants ──

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
}

// ── Alert Banner Component ──

function AlertBanner({
  alerts,
  onClose,
}: {
  alerts: AlertItem[]
  onClose: (id: number) => void
}) {
  if (alerts.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="mb-4 space-y-2"
    >
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`flex items-center justify-between rounded-lg px-4 py-2.5 text-sm ${
            alert.level === 'critical'
              ? 'bg-[#fef2f2] border border-[#fecaca] text-[#991b1b]'
              : 'bg-[#fffbeb] border border-[#fde68a] text-[#92400e]'
          }`}
        >
          <div className="flex items-center gap-2">
            <WarningOutlined
              style={{
                color: alert.level === 'critical' ? '#ef4444' : '#f59e0b',
                fontSize: 14,
              }}
            />
            <span>{alert.message}</span>
          </div>
          <CloseOutlined
            className="cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
            style={{ fontSize: 12 }}
            onClick={() => onClose(alert.id)}
          />
        </div>
      ))}
    </motion.div>
  )
}

// ── Stat Card Component ──

function StatCard({ item, index }: { item: KpiItem; index: number }) {
  const isGood = item.trendUp === item.positive
  const trendColor = isGood ? '#10b981' : '#ef4444'
  const TrendIcon = item.trendUp ? ArrowUpOutlined : ArrowDownOutlined

  return (
    <motion.div variants={itemVariants} custom={index}>
      <Card
        style={{
          borderRadius: 8,
          boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
          border: 'none',
        }}
        styles={{ body: { padding: '16px 20px' } }}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[#94a3b8] text-xs mb-1.5">{item.label}</div>
            <div className="text-[#1a202c] text-xl font-semibold tracking-tight">
              {item.value}
            </div>
            <div
              className="text-xs mt-1.5 flex items-center gap-1"
              style={{ color: trendColor }}
            >
              <TrendIcon style={{ fontSize: 10 }} />
              <span>{item.trend}</span>
            </div>
          </div>
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-base"
            style={{ background: `${item.color}12`, color: item.color }}
          >
            {item.icon}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

// ── Chart Card Wrapper ──

function ChartCard({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div variants={itemVariants}>
      <Card
        className={className}
        style={{
          borderRadius: 8,
          boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
          border: 'none',
          height: '100%',
        }}
        styles={{ body: { padding: '16px 20px', height: '100%' } }}
      >
        {children}
      </Card>
    </motion.div>
  )
}

// ── Main Dashboard ──

export default function Dashboard() {
  const [alerts, setAlerts] = useState<AlertItem[]>(alertsData)

  const handleCloseAlert = (id: number) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id))
  }

  return (
    <motion.div
      className="p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Alert Banner */}
      <AlertBanner alerts={alerts} onClose={handleCloseAlert} />

      {/* KPI Cards */}
      <Row gutter={[16, 16]} className="mb-4">
        {kpiData.map((item, index) => (
          <Col key={item.label} xs={12} sm={8} lg={4}>
            <StatCard item={item} index={index} />
          </Col>
        ))}
      </Row>

      {/* Row 1: Trend + Province Map */}
      <Row gutter={[16, 16]} className="mb-4">
        <Col xs={24} lg={12}>
          <ChartCard>
            <TrendChart
              data={[premiumTrendData]}
              title="保费收入趋势（亿元）"
              yAxisLabel="亿元"
              seriesNames={['保费收入']}
              seriesType="area"
            />
          </ChartCard>
        </Col>
        <Col xs={24} lg={12}>
          <ChartCard>
            <ChinaMapChart data={provinceData} />
          </ChartCard>
        </Col>
      </Row>

      {/* Row 2: Risk Radar + Fund Flow */}
      <Row gutter={[16, 16]} className="mb-4">
        <Col xs={24} lg={12}>
          <ChartCard>
            <RiskRadar data={riskRadarData} title="风险全景雷达" />
          </ChartCard>
        </Col>
        <Col xs={24} lg={12}>
          <ChartCard>
            <SankeyFlow data={fundFlowData} title="资金流向（瀑布图）" />
          </ChartCard>
        </Col>
      </Row>

      {/* AI Task Table */}
      <motion.div variants={itemVariants}>
        <Card
          title={
            <div className="flex items-center gap-2">
              <RobotOutlined style={{ color: '#1a365d' }} />
              <span className="text-sm font-semibold text-[#1a365d]">
                最近AI审计任务
              </span>
            </div>
          }
          style={{
            borderRadius: 8,
            boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
            border: 'none',
          }}
        >
          <Table
            columns={taskColumns}
            dataSource={aiTaskData}
            pagination={false}
            size="small"
            scroll={{ x: 600 }}
          />
        </Card>
      </motion.div>
    </motion.div>
  )
}
