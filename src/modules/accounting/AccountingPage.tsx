import { useState } from 'react'
import { Row, Col, Card, Table, Tag, Tabs, Progress, Button } from 'antd'
import {
  FileTextOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  BarChartOutlined,
  RobotOutlined,
  DownloadOutlined,
} from '@ant-design/icons'
import { motion } from 'framer-motion'
import type { ColumnsType } from 'antd/es/table'
import PageHeader from '../../components/common/PageHeader'

// ── KPI Data ──

const kpiData = [
  { label: '本月凭证数', value: '2,456笔', icon: <FileTextOutlined />, color: '#1a365d', trend: '+12.3%', trendUp: true },
  { label: '自动生成率', value: '68.3%', icon: <RobotOutlined />, color: '#8b5cf6', trend: '+5.2%', trendUp: true },
  { label: '核对差异', value: '23笔', icon: <WarningOutlined />, color: '#ef4444', trend: '-8笔', trendUp: false },
  { label: '管理报表', value: '12份', icon: <BarChartOutlined />, color: '#10b981', trend: '+3份', trendUp: true },
]

// ── Tab 1: 智能核对数据 ──

interface ReconciliationItem {
  key: string
  businessItem: string
  businessAmount: number
  financeAmount: number
  difference: number
  status: '已核对' | '有差异' | '待处理'
  source: string
}

const reconciliationData: ReconciliationItem[] = [
  { key: '1', businessItem: '保费收入-玉米种植险', businessAmount: 28650000, financeAmount: 28650000, difference: 0, status: '已核对', source: '核心业务系统' },
  { key: '2', businessItem: '赔付支出-大豆种植险', businessAmount: 15230000, financeAmount: 15180000, difference: 50000, status: '有差异', source: '理赔系统' },
  { key: '3', businessItem: '手续费支出-分保费', businessAmount: 8900000, financeAmount: 8900000, difference: 0, status: '已核对', source: '再保系统' },
  { key: '4', businessItem: '投资收益-债券利息', businessAmount: 4560000, financeAmount: 4530000, difference: 30000, status: '有差异', source: '投资系统' },
  { key: '5', businessItem: '保费收入-生猪养殖险', businessAmount: 12800000, financeAmount: 12800000, difference: 0, status: '已核对', source: '核心业务系统' },
  { key: '6', businessItem: '赔付支出-小麦种植险', businessAmount: 9670000, financeAmount: 9670000, difference: 0, status: '已核对', source: '理赔系统' },
  { key: '7', businessItem: '再保分入保费', businessAmount: 35200000, financeAmount: 35120000, difference: 80000, status: '待处理', source: '再保系统' },
  { key: '8', businessItem: '管理费用-薪酬', businessAmount: 3250000, financeAmount: 3250000, difference: 0, status: '已核对', source: 'HR系统' },
]

const reconciliationColumns: ColumnsType<ReconciliationItem> = [
  { title: '业务项目', dataIndex: 'businessItem', key: 'businessItem', width: 200 },
  { title: '数据来源', dataIndex: 'source', key: 'source', width: 120, render: (t: string) => <Tag color="blue">{t}</Tag> },
  { title: '业务数据', dataIndex: 'businessAmount', key: 'businessAmount', width: 130, align: 'right', render: (v: number) => `¥${(v / 10000).toFixed(2)}万` },
  { title: '财务数据', dataIndex: 'financeAmount', key: 'financeAmount', width: 130, align: 'right', render: (v: number) => `¥${(v / 10000).toFixed(2)}万` },
  {
    title: '差异金额', dataIndex: 'difference', key: 'difference', width: 120, align: 'right',
    render: (v: number) => v === 0 ? <span style={{ color: '#10b981' }}>-</span> : <span style={{ color: '#ef4444' }}>¥{(v / 10000).toFixed(2)}万</span>,
  },
  {
    title: '状态', dataIndex: 'status', key: 'status', width: 100,
    render: (s: string) => {
      const colorMap: Record<string, string> = { '已核对': 'green', '有差异': 'orange', '待处理': 'red' }
      return <Tag color={colorMap[s]}>{s}</Tag>
    },
  },
]

// ── Tab 2: 预分录数据 ──

interface JournalEntry {
  key: string
  date: string
  debitAccount: string
  creditAccount: string
  amount: number
  description: string
  confidence: number
  status: '已确认' | '待审核' | '已驳回'
}

const journalEntryData: JournalEntry[] = [
  { key: '1', date: '2025-09-05', debitAccount: '1001-银行存款', creditAccount: '2001-保费收入', amount: 28650000, description: '玉米种植险保费收入确认', confidence: 98, status: '已确认' },
  { key: '2', date: '2025-09-05', debitAccount: '4001-赔付支出', creditAccount: '1001-银行存款', amount: 15180000, description: '大豆种植险赔付支出', confidence: 95, status: '已确认' },
  { key: '3', date: '2025-09-04', debitAccount: '6001-管理费用', creditAccount: '2201-应付职工薪酬', amount: 3250000, description: '9月份员工薪酬计提', confidence: 92, status: '待审核' },
  { key: '4', date: '2025-09-04', debitAccount: '1501-投资资产', creditAccount: '1001-银行存款', amount: 50000000, description: '国债投资购入', confidence: 89, status: '待审核' },
  { key: '5', date: '2025-09-03', debitAccount: '1001-银行存款', creditAccount: '3001-再保分入保费', amount: 35120000, description: '再保分入保费确认', confidence: 96, status: '已确认' },
  { key: '6', date: '2025-09-03', debitAccount: '5001-手续费支出', creditAccount: '1001-银行存款', amount: 8900000, description: '分保手续费支付', confidence: 78, status: '已驳回' },
]

const journalColumns: ColumnsType<JournalEntry> = [
  { title: '日期', dataIndex: 'date', key: 'date', width: 110 },
  { title: '借方科目', dataIndex: 'debitAccount', key: 'debitAccount', width: 160 },
  { title: '贷方科目', dataIndex: 'creditAccount', key: 'creditAccount', width: 160 },
  { title: '金额', dataIndex: 'amount', key: 'amount', width: 130, align: 'right', render: (v: number) => `¥${(v / 10000).toFixed(2)}万` },
  { title: '摘要', dataIndex: 'description', key: 'description' },
  {
    title: 'AI置信度', dataIndex: 'confidence', key: 'confidence', width: 130,
    render: (v: number) => <Progress percent={v} size="small" strokeColor={v >= 90 ? '#10b981' : v >= 80 ? '#f59e0b' : '#ef4444'} />,
  },
  {
    title: '状态', dataIndex: 'status', key: 'status', width: 100,
    render: (s: string) => {
      const colorMap: Record<string, string> = { '已确认': 'green', '待审核': 'orange', '已驳回': 'red' }
      return <Tag color={colorMap[s]}>{s}</Tag>
    },
  },
]

// ── Tab 3: 管理报表数据 ──

interface Report {
  key: string
  name: string
  period: string
  type: string
  generatedAt: string
  status: '已生成' | '生成中'
}

const reportData: Report[] = [
  { key: '1', name: '月度利润表', period: '2025年8月', type: '财务报表', generatedAt: '2025-09-03 08:30', status: '已生成' },
  { key: '2', name: '资产负债表', period: '2025年8月', type: '财务报表', generatedAt: '2025-09-03 08:30', status: '已生成' },
  { key: '3', name: '偿付能力报告', period: '2025年Q3', type: '监管报表', generatedAt: '2025-09-03 09:15', status: '已生成' },
  { key: '4', name: '保费收入明细表', period: '2025年8月', type: '业务报表', generatedAt: '2025-09-03 10:00', status: '已生成' },
  { key: '5', name: '投资收益分析报告', period: '2025年8月', type: '分析报告', generatedAt: '2025-09-04 14:20', status: '已生成' },
  { key: '6', name: '赔付率统计表', period: '2025年8月', type: '业务报表', generatedAt: '2025-09-04 15:30', status: '已生成' },
  { key: '7', name: '管理费用分析', period: '2025年8月', type: '分析报告', generatedAt: '2025-09-05 09:00', status: '已生成' },
  { key: '8', name: '现金流量表', period: '2025年8月', type: '财务报表', generatedAt: '2025-09-05 09:00', status: '已生成' },
  { key: '9', name: '风险综合评估报告', period: '2025年Q3', type: '监管报表', generatedAt: '2025-09-05 10:30', status: '生成中' },
]

const reportColumns: ColumnsType<Report> = [
  { title: '报表名称', dataIndex: 'name', key: 'name', width: 180 },
  { title: '报告期', dataIndex: 'period', key: 'period', width: 120 },
  { title: '类型', dataIndex: 'type', key: 'type', width: 100, render: (t: string) => <Tag color="blue">{t}</Tag> },
  { title: '生成时间', dataIndex: 'generatedAt', key: 'generatedAt', width: 160 },
  {
    title: '状态', dataIndex: 'status', key: 'status', width: 100,
    render: (s: string) => <Tag color={s === '已生成' ? 'green' : 'processing'}>{s}</Tag>,
  },
  {
    title: '操作', key: 'action', width: 100,
    render: (_: unknown, record: Report) => (
      record.status === '已生成' ? <Button type="link" size="small" icon={<DownloadOutlined />}>下载</Button> : <span style={{ color: '#94a3b8' }}>-</span>
    ),
  },
]

// ── Animation ──

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

// ── Main Component ──

export default function AccountingPage() {
  const [activeTab, setActiveTab] = useState('reconciliation')

  return (
    <motion.div className="p-6" variants={containerVariants} initial="hidden" animate="visible">
      <PageHeader
        title="会计核算"
        description="智能会计核算、凭证审核与账务处理"
        suggestedPrompts={['核对本月业财数据', '生成Q3管理报表', '查看预分录明细', '分析凭证差异']}
      />

      {/* KPI Cards */}
      <Row gutter={[16, 16]} className="mb-4">
        {kpiData.map((item) => (
          <Col key={item.label} xs={12} sm={12} lg={6}>
            <motion.div variants={itemVariants}>
              <Card
                style={{ borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: 'none' }}
                styles={{ body: { padding: '16px 20px' } }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[#94a3b8] text-xs mb-1.5">{item.label}</div>
                    <div className="text-[#1a202c] text-xl font-semibold">{item.value}</div>
                    <div className="text-xs mt-1.5" style={{ color: item.trendUp ? '#10b981' : '#ef4444' }}>
                      {item.trend}
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-base" style={{ background: `${item.color}12`, color: item.color }}>
                    {item.icon}
                  </div>
                </div>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      {/* Tabs */}
      <motion.div variants={itemVariants}>
        <Card
          style={{ borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: 'none' }}
        >
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={[
              {
                key: 'reconciliation',
                label: (
                  <span><CheckCircleOutlined style={{ marginRight: 6 }} />智能核对</span>
                ),
                children: (
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <Tag color="green">已核对: 2,433笔</Tag>
                      <Tag color="orange">有差异: 15笔</Tag>
                      <Tag color="red">待处理: 8笔</Tag>
                    </div>
                    <Table
                      columns={reconciliationColumns}
                      dataSource={reconciliationData}
                      pagination={false}
                      size="small"
                      scroll={{ x: 800 }}
                    />
                  </div>
                ),
              },
              {
                key: 'journal',
                label: (
                  <span><RobotOutlined style={{ marginRight: 6 }} />预分录</span>
                ),
                children: (
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <Tag color="purple">AI自动生成: 1,678笔</Tag>
                      <Tag color="green">已确认: 1,523笔</Tag>
                      <Tag color="orange">待审核: 142笔</Tag>
                      <Tag color="red">已驳回: 13笔</Tag>
                    </div>
                    <Table
                      columns={journalColumns}
                      dataSource={journalEntryData}
                      pagination={false}
                      size="small"
                      scroll={{ x: 900 }}
                    />
                  </div>
                ),
              },
              {
                key: 'reports',
                label: (
                  <span><BarChartOutlined style={{ marginRight: 6 }} />管理报表</span>
                ),
                children: (
                  <Table
                    columns={reportColumns}
                    dataSource={reportData}
                    pagination={false}
                    size="small"
                    scroll={{ x: 700 }}
                  />
                ),
              },
            ]}
          />
        </Card>
      </motion.div>
    </motion.div>
  )
}
