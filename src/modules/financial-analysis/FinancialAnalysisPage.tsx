import { Row, Col, Card, Table, Tag } from 'antd'
import {
  BankOutlined,
  RiseOutlined,
  PercentageOutlined,
  SafetyCertificateOutlined,
  BulbOutlined,
} from '@ant-design/icons'
import { motion } from 'framer-motion'
import ReactECharts from 'echarts-for-react'
import type { EChartsOption } from 'echarts'
import type { ColumnsType } from 'antd/es/table'
import PageHeader from '../../components/common/PageHeader'

// ── KPI Data ──

const kpiData = [
  { label: '总资产', value: '¥892亿', icon: <BankOutlined />, color: '#1a365d', trend: '+6.5%', trendUp: true },
  { label: '净利润', value: '¥45.2亿', icon: <RiseOutlined />, color: '#10b981', trend: '+18.5%', trendUp: true },
  { label: 'ROE', value: '8.3%', icon: <PercentageOutlined />, color: '#6366f1', trend: '+1.2%', trendUp: true },
  { label: '偿付能力', value: '248%', icon: <SafetyCertificateOutlined />, color: '#d4a843', trend: '+5%', trendUp: true },
]

// ── Balance Sheet Data ──

interface BalanceSheetItem {
  key: string
  item: string
  current: number
  previous: number
  change: number
  category: '资产' | '负债' | '权益'
}

const balanceSheetData: BalanceSheetItem[] = [
  { key: '1', item: '货币资金', current: 126.5, previous: 118.2, change: 7.0, category: '资产' },
  { key: '2', item: '投资资产', current: 602.3, previous: 568.1, change: 6.0, category: '资产' },
  { key: '3', item: '应收保费', current: 45.8, previous: 42.3, change: 8.3, category: '资产' },
  { key: '4', item: '再保应收款', current: 38.2, previous: 35.6, change: 7.3, category: '资产' },
  { key: '5', item: '固定资产及其他', current: 79.2, previous: 74.8, change: 5.9, category: '资产' },
  { key: '6', item: '未到期责任准备金', current: 285.6, previous: 262.4, change: 8.8, category: '负债' },
  { key: '7', item: '未决赔款准备金', current: 186.3, previous: 172.8, change: 7.8, category: '负债' },
  { key: '8', item: '应付分保账款', current: 52.1, previous: 48.9, change: 6.5, category: '负债' },
  { key: '9', item: '其他负债', current: 78.5, previous: 73.2, change: 7.2, category: '负债' },
  { key: '10', item: '实收资本', current: 150.0, previous: 150.0, change: 0, category: '权益' },
  { key: '11', item: '盈余公积及未分配利润', current: 93.5, previous: 78.7, change: 18.8, category: '权益' },
]

const balanceColumns: ColumnsType<BalanceSheetItem> = [
  { title: '项目', dataIndex: 'item', key: 'item', width: 180 },
  {
    title: '类别', dataIndex: 'category', key: 'category', width: 80,
    render: (c: string) => {
      const colorMap: Record<string, string> = { '资产': 'blue', '负债': 'orange', '权益': 'green' }
      return <Tag color={colorMap[c]}>{c}</Tag>
    },
  },
  { title: '本期(亿)', dataIndex: 'current', key: 'current', width: 120, align: 'right', render: (v: number) => `¥${v.toFixed(1)}` },
  { title: '上期(亿)', dataIndex: 'previous', key: 'previous', width: 120, align: 'right', render: (v: number) => `¥${v.toFixed(1)}` },
  {
    title: '变动(%)', dataIndex: 'change', key: 'change', width: 100, align: 'right',
    render: (v: number) => <span style={{ color: v > 0 ? '#10b981' : v < 0 ? '#ef4444' : '#94a3b8' }}>{v > 0 ? '+' : ''}{v.toFixed(1)}%</span>,
  },
]

// ── Quarterly Trend Chart ──

const quarterlyChartOption: EChartsOption = {
  title: { text: '季度营收与利润趋势', textStyle: { fontSize: 14, fontWeight: 600, color: '#1a365d' }, left: 0 },
  tooltip: { trigger: 'axis', backgroundColor: 'rgba(255,255,255,0.96)', borderColor: '#e2e8f0', textStyle: { color: '#1a202c' } },
  legend: { top: 28, right: 0, textStyle: { fontSize: 12, color: '#64748b' } },
  grid: { left: 12, right: 16, bottom: 8, top: 56, containLabel: true },
  xAxis: {
    type: 'category',
    data: ['2024Q1', '2024Q2', '2024Q3', '2024Q4', '2025Q1', '2025Q2', '2025Q3'],
    axisLine: { lineStyle: { color: '#e2e8f0' } },
    axisTick: { show: false },
    axisLabel: { color: '#94a3b8', fontSize: 11 },
  },
  yAxis: {
    type: 'value',
    name: '亿元',
    nameTextStyle: { color: '#94a3b8', fontSize: 11 },
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { color: '#94a3b8', fontSize: 11 },
    splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
  },
  series: [
    {
      name: '保费收入',
      type: 'bar',
      data: [420, 458, 485, 460, 445, 478, 502],
      barMaxWidth: 32,
      itemStyle: { color: '#1a365d', borderRadius: [4, 4, 0, 0] },
    },
    {
      name: '净利润',
      type: 'line',
      data: [8.2, 10.5, 12.8, 13.7, 9.5, 14.2, 15.5],
      smooth: true,
      symbol: 'circle',
      symbolSize: 6,
      lineStyle: { width: 2.5, color: '#10b981' },
      itemStyle: { color: '#10b981' },
      areaStyle: {
        color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#10b98140' }, { offset: 1, color: '#10b98105' }] },
      },
    },
  ],
}

// ── Solvency Data ──

const solvencyOption: EChartsOption = {
  title: { text: '偿付能力分析', textStyle: { fontSize: 14, fontWeight: 600, color: '#1a365d' }, left: 0 },
  series: [
    {
      type: 'gauge',
      startAngle: 200,
      endAngle: -20,
      min: 0,
      max: 400,
      radius: '85%',
      center: ['50%', '55%'],
      splitNumber: 8,
      axisLine: {
        lineStyle: {
          width: 20,
          color: [[0.3, '#ef4444'], [0.5, '#f59e0b'], [0.75, '#10b981'], [1, '#059669']],
        },
      },
      pointer: { length: '70%', width: 4, itemStyle: { color: '#1a365d' } },
      axisTick: { distance: -20, length: 6, lineStyle: { color: '#94a3b8', width: 1 } },
      splitLine: { distance: -24, length: 12, lineStyle: { color: '#94a3b8', width: 1 } },
      axisLabel: { color: '#94a3b8', distance: 28, fontSize: 11 },
      detail: {
        valueAnimation: true,
        formatter: '{value}%',
        fontSize: 28,
        fontWeight: 700,
        color: '#1a365d',
        offsetCenter: [0, '70%'],
      },
      data: [{ value: 248 }],
    },
  ],
}

// ── AI Insights ──

const aiInsights = [
  { type: 'positive', text: '保费收入连续3个季度增长，Q3同比增长8.3%，主要受益于农业险政策扩面提标' },
  { type: 'positive', text: 'ROE从去年同期的7.1%提升至8.3%，资本利用效率持续改善' },
  { type: 'warning', text: '综合赔付率Q3环比上升3.5个百分点至64.7%，需关注极端天气对赔付的持续影响' },
  { type: 'info', text: '偿付能力充足率248%，远超监管最低要求(150%)，但建议关注巨灾准备金的充足性' },
]

// ── Animation ──

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } }
const itemVariants = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } } }

// ── Main Component ──

export default function FinancialAnalysisPage() {
  return (
    <motion.div className="p-6" variants={containerVariants} initial="hidden" animate="visible">
      <PageHeader
        title="财务分析"
        description="自动生成财务分析报告与可视化看板"
        suggestedPrompts={['生成Q3财务分析报告', '偿付能力趋势分析', '对比预算执行率', '盈利能力诊断']}
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

      {/* Charts Row */}
      <Row gutter={[16, 16]} className="mb-4">
        <Col xs={24} lg={14}>
          <motion.div variants={itemVariants}>
            <Card style={{ borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: 'none', height: '100%' }}>
              <ReactECharts option={quarterlyChartOption} style={{ width: '100%', height: 340 }} opts={{ renderer: 'svg' }} />
            </Card>
          </motion.div>
        </Col>
        <Col xs={24} lg={10}>
          <motion.div variants={itemVariants}>
            <Card style={{ borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: 'none', height: '100%' }}>
              <ReactECharts option={solvencyOption} style={{ width: '100%', height: 340 }} opts={{ renderer: 'svg' }} />
            </Card>
          </motion.div>
        </Col>
      </Row>

      {/* AI Insights */}
      <motion.div variants={itemVariants} className="mb-4">
        <Card
          title={<span><BulbOutlined style={{ color: '#8b5cf6', marginRight: 8 }} />AI智能分析洞察</span>}
          style={{ borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: 'none' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {aiInsights.map((insight, i) => {
              const colorMap: Record<string, { bg: string; border: string; text: string }> = {
                positive: { bg: '#f0fdf4', border: '#bbf7d0', text: '#166534' },
                warning: { bg: '#fffbeb', border: '#fde68a', text: '#92400e' },
                info: { bg: '#eff6ff', border: '#bfdbfe', text: '#1e40af' },
              }
              const c = colorMap[insight.type]
              return (
                <div key={i} style={{ padding: '10px 16px', borderRadius: 8, background: c.bg, border: `1px solid ${c.border}`, color: c.text, fontSize: 13 }}>
                  {insight.text}
                </div>
              )
            })}
          </div>
        </Card>
      </motion.div>

      {/* Balance Sheet Table */}
      <motion.div variants={itemVariants}>
        <Card
          title={<span className="text-sm font-semibold text-[#1a365d]">资产负债表关键项目（单位：亿元）</span>}
          style={{ borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: 'none' }}
        >
          <Table columns={balanceColumns} dataSource={balanceSheetData} pagination={false} size="small" scroll={{ x: 600 }} />
        </Card>
      </motion.div>
    </motion.div>
  )
}
