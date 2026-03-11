import { Row, Col, Card, Tag } from 'antd'
import {
  StockOutlined,
  RiseOutlined,
  PieChartOutlined,
  FileSearchOutlined,
  BulbOutlined,
} from '@ant-design/icons'
import { motion } from 'framer-motion'
import ReactECharts from 'echarts-for-react'
import type { EChartsOption } from 'echarts'
import PageHeader from '../../components/common/PageHeader'

// ── KPI Data ──

const kpiData = [
  { label: '投资资产', value: '¥602亿', icon: <StockOutlined />, color: '#1a365d', trend: '+8.2%', trendUp: true },
  { label: '收益率', value: '4.2%', icon: <RiseOutlined />, color: '#10b981', trend: '-0.3%', trendUp: false },
  { label: '风险资产占比', value: '18.5%', icon: <PieChartOutlined />, color: '#f59e0b', trend: '+1.2%', trendUp: true },
  { label: '报表待校验', value: '3份', icon: <FileSearchOutlined />, color: '#ef4444', trend: '-2份', trendUp: false },
]

// ── Pie Chart: Portfolio Allocation ──

const pieChartOption: EChartsOption = {
  title: { text: '投资组合配置', textStyle: { fontSize: 14, fontWeight: 600, color: '#1a365d' }, left: 0 },
  tooltip: {
    trigger: 'item',
    formatter: '{b}: ¥{c}亿 ({d}%)',
  },
  legend: {
    orient: 'vertical',
    right: 10,
    top: 'middle',
    textStyle: { fontSize: 12, color: '#64748b' },
  },
  series: [
    {
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['35%', '55%'],
      avoidLabelOverlap: false,
      itemStyle: { borderRadius: 6, borderColor: '#fff', borderWidth: 2 },
      label: { show: false },
      emphasis: {
        label: { show: true, fontSize: 14, fontWeight: 'bold' },
      },
      data: [
        { value: 186, name: '国债', itemStyle: { color: '#1a365d' } },
        { value: 142, name: '金融债', itemStyle: { color: '#3b82f6' } },
        { value: 92, name: '企业债', itemStyle: { color: '#6366f1' } },
        { value: 68, name: '股票', itemStyle: { color: '#10b981' } },
        { value: 45, name: '基金', itemStyle: { color: '#d4a843' } },
        { value: 42, name: '银行存款', itemStyle: { color: '#94a3b8' } },
        { value: 27, name: '不动产', itemStyle: { color: '#f59e0b' } },
      ],
    },
  ],
}

// ── Line Chart: Return vs Benchmark ──

const lineChartOption: EChartsOption = {
  title: { text: '收益率 vs 基准对比', textStyle: { fontSize: 14, fontWeight: 600, color: '#1a365d' }, left: 0 },
  tooltip: { trigger: 'axis', backgroundColor: 'rgba(255,255,255,0.96)', borderColor: '#e2e8f0', textStyle: { color: '#1a202c' } },
  legend: { top: 28, right: 0, textStyle: { fontSize: 12, color: '#64748b' } },
  grid: { left: 12, right: 16, bottom: 8, top: 56, containLabel: true },
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月'],
    axisLine: { lineStyle: { color: '#e2e8f0' } },
    axisTick: { show: false },
    axisLabel: { color: '#94a3b8', fontSize: 11 },
  },
  yAxis: {
    type: 'value',
    name: '%',
    nameTextStyle: { color: '#94a3b8', fontSize: 11 },
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { color: '#94a3b8', fontSize: 11, formatter: '{value}%' },
    splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
  },
  series: [
    {
      name: '实际收益率',
      type: 'line',
      data: [3.8, 3.9, 4.1, 4.3, 4.5, 4.2, 3.9, 4.0, 4.2],
      smooth: true,
      symbol: 'circle',
      symbolSize: 6,
      lineStyle: { width: 2.5, color: '#1a365d' },
      itemStyle: { color: '#1a365d' },
      areaStyle: {
        color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#1a365d30' }, { offset: 1, color: '#1a365d05' }] },
      },
    },
    {
      name: '基准收益率',
      type: 'line',
      data: [4.2, 4.3, 4.4, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5],
      smooth: true,
      symbol: 'circle',
      symbolSize: 4,
      lineStyle: { width: 2, color: '#ef4444', type: 'dashed' },
      itemStyle: { color: '#ef4444' },
    },
  ],
}

// ── AI Investment Analysis ──

const aiAnalysis = [
  { type: 'positive', title: '固收配置稳健', text: '国债+金融债占比54.5%，久期匹配度良好，信用风险可控。预计年化收益4.1%，略优于同业平均。' },
  { type: 'warning', title: '权益类波动加大', text: '股票仓位占比11.3%，本月受A股回调影响回撤1.8%。建议降低单一行业集中度，增配低波动ETF。' },
  { type: 'info', title: '不动产投资机会', text: '物流仓储类REITs收益率达5.8%，建议适度增加配置。当前不动产占比4.5%，距监管上限(15%)仍有空间。' },
  { type: 'warning', title: '信用债集中度预警', text: '前5大企业债发行人合计占比32%，超过内部限额(30%)。建议分散至不同行业和评级的发行人。' },
]

// ── Animation ──

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } }
const itemVariants = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } } }

// ── Main Component ──

export default function InvestmentPage() {
  return (
    <motion.div className="p-6" variants={containerVariants} initial="hidden" animate="visible">
      <PageHeader
        title="投资管理"
        description="投资组合审查、收益分析与风险评估"
        suggestedPrompts={['投资组合分析', '收益率对标报告', '风险敞口评估', '优化资产配置建议']}
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
                    <div className="text-xs mt-1.5" style={{ color: item.label === '报表待校验' ? '#10b981' : item.trendUp ? '#10b981' : '#ef4444' }}>{item.trend}</div>
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
        <Col xs={24} lg={12}>
          <motion.div variants={itemVariants}>
            <Card style={{ borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: 'none', height: '100%' }}>
              <ReactECharts option={pieChartOption} style={{ width: '100%', height: 340 }} opts={{ renderer: 'svg' }} />
            </Card>
          </motion.div>
        </Col>
        <Col xs={24} lg={12}>
          <motion.div variants={itemVariants}>
            <Card style={{ borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: 'none', height: '100%' }}>
              <ReactECharts option={lineChartOption} style={{ width: '100%', height: 340 }} opts={{ renderer: 'svg' }} />
            </Card>
          </motion.div>
        </Col>
      </Row>

      {/* AI Investment Analysis */}
      <motion.div variants={itemVariants}>
        <Card
          title={<span><BulbOutlined style={{ color: '#8b5cf6', marginRight: 8 }} />AI投资分析洞察</span>}
          style={{ borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: 'none' }}
        >
          <Row gutter={[16, 16]}>
            {aiAnalysis.map((item, i) => {
              const colorMap: Record<string, { bg: string; border: string; titleColor: string }> = {
                positive: { bg: '#f0fdf4', border: '#bbf7d0', titleColor: '#166534' },
                warning: { bg: '#fffbeb', border: '#fde68a', titleColor: '#92400e' },
                info: { bg: '#eff6ff', border: '#bfdbfe', titleColor: '#1e40af' },
              }
              const c = colorMap[item.type]
              return (
                <Col key={i} xs={24} lg={12}>
                  <div style={{ padding: 14, borderRadius: 8, background: c.bg, border: `1px solid ${c.border}`, height: '100%' }}>
                    <div style={{ fontWeight: 600, fontSize: 13, color: c.titleColor, marginBottom: 6 }}>
                      {item.title}
                      <Tag color={item.type === 'positive' ? 'green' : item.type === 'warning' ? 'orange' : 'blue'} style={{ marginLeft: 8, fontSize: 11 }}>
                        {item.type === 'positive' ? '正常' : item.type === 'warning' ? '关注' : '建议'}
                      </Tag>
                    </div>
                    <div style={{ fontSize: 12, color: '#475569', lineHeight: 1.6 }}>{item.text}</div>
                  </div>
                </Col>
              )
            })}
          </Row>
        </Card>
      </motion.div>
    </motion.div>
  )
}
