import { Row, Col, Table, Tag } from 'antd'
import {
  DollarOutlined,
  EnvironmentOutlined,
  PercentageOutlined,
  AppstoreOutlined,
} from '@ant-design/icons'
import { motion } from 'framer-motion'
import ReactECharts from 'echarts-for-react'
import type { EChartsOption } from 'echarts'
import PageHeader from '../../components/common/PageHeader'
import StatCard from '../../components/dashboard/StatCard'
import ChartCard from '../../components/dashboard/ChartCard'
import ProvinceRiskMap from './ProvinceRiskMap'
import TrendPrediction from './TrendPrediction'
import { agriculturalDataScripts } from '../../data/chat-scripts/agricultural-data'

/* ── Constants ── */

const COLORS = {
  navy: '#1a365d',
  gold: '#d4a843',
  green: '#10b981',
  indigo: '#6366f1',
  red: '#ef4444',
  blue: '#3b82f6',
  orange: '#f59e0b',
  teal: '#14b8a6',
}

/* ── Province Premium Data ── */

const provinceData = [
  { name: '黑龙江', value: 168 },
  { name: '河南', value: 142 },
  { name: '山东', value: 128 },
  { name: '安徽', value: 96 },
  { name: '江苏', value: 89 },
  { name: '四川', value: 85 },
  { name: '湖北', value: 76 },
  { name: '湖南', value: 68 },
  { name: '吉林', value: 62 },
  { name: '内蒙古', value: 58 },
]

const provinceBarOption: EChartsOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    textStyle: { color: '#1a202c', fontSize: 13 },
    formatter: (params: unknown) => {
      const items = params as { name: string; value: number }[]
      if (!Array.isArray(items) || items.length === 0) return ''
      return `<div style="font-weight:600">${items[0].name}</div>
              <div>保费收入：¥${items[0].value}亿</div>`
    },
  },
  grid: { left: 80, right: 24, top: 12, bottom: 24 },
  xAxis: {
    type: 'value',
    axisLabel: {
      color: '#94a3b8',
      fontSize: 11,
      formatter: (v: number) => `¥${v}亿`,
    },
    axisLine: { show: false },
    axisTick: { show: false },
    splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
  },
  yAxis: {
    type: 'category',
    data: [...provinceData].reverse().map((d) => d.name),
    axisLine: { lineStyle: { color: '#e2e8f0' } },
    axisTick: { show: false },
    axisLabel: { color: '#1a202c', fontSize: 12, fontWeight: 500 },
  },
  series: [
    {
      type: 'bar',
      data: [...provinceData].reverse().map((d) => d.value),
      barMaxWidth: 24,
      itemStyle: {
        borderRadius: [0, 4, 4, 0],
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            { offset: 0, color: '#1a365d' },
            { offset: 1, color: '#3b82f6' },
          ],
        },
      },
      emphasis: {
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: '#1e40af' },
              { offset: 1, color: '#60a5fa' },
            ],
          },
        },
      },
      label: {
        show: true,
        position: 'right',
        formatter: (p: { value: number }) => `¥${p.value}亿`,
        color: '#64748b',
        fontSize: 11,
      },
    },
  ],
}

/* ── Crop Insurance Pie ── */

const cropData = [
  { name: '水稻', value: 28 },
  { name: '小麦', value: 22 },
  { name: '玉米', value: 20 },
  { name: '生猪', value: 10 },
  { name: '大豆', value: 8 },
  { name: '奶牛', value: 5 },
  { name: '森林', value: 4 },
  { name: '其他', value: 3 },
]

const CROP_COLORS = [
  COLORS.navy,
  COLORS.gold,
  COLORS.green,
  COLORS.red,
  COLORS.indigo,
  COLORS.blue,
  COLORS.orange,
  COLORS.teal,
]

const cropPieOption: EChartsOption = {
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    textStyle: { color: '#1a202c', fontSize: 13 },
    formatter: (p: { name: string; value: number; percent: number }) =>
      `<div style="font-weight:600">${p.name}</div>
       <div>占比：${p.percent}%</div>
       <div>承保面积：${(21.5 * p.value / 100).toFixed(1)}亿亩</div>`,
  },
  legend: {
    orient: 'vertical',
    right: 12,
    top: 'center',
    textStyle: { fontSize: 12, color: '#64748b' },
    itemWidth: 10,
    itemHeight: 10,
    itemGap: 8,
  },
  series: [
    {
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['35%', '50%'],
      avoidLabelOverlap: true,
      itemStyle: { borderRadius: 6, borderColor: '#fff', borderWidth: 2 },
      label: {
        show: true,
        formatter: '{b}\n{d}%',
        fontSize: 11,
        color: '#64748b',
      },
      labelLine: { length: 12, length2: 8 },
      emphasis: {
        label: { show: true, fontWeight: 'bold', fontSize: 13 },
        itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.15)' },
      },
      data: cropData.map((d, i) => ({
        ...d,
        itemStyle: { color: CROP_COLORS[i] },
      })),
    },
  ],
}

/* ── Disaster Type Pie ── */

const disasterData = [
  { name: '干旱', value: 35 },
  { name: '洪涝', value: 25 },
  { name: '台风', value: 15 },
  { name: '病虫害', value: 12 },
  { name: '冰雹', value: 8 },
  { name: '其他', value: 5 },
]

const DISASTER_COLORS = ['#ef4444', '#3b82f6', '#6366f1', '#f59e0b', '#14b8a6', '#94a3b8']

const disasterPieOption: EChartsOption = {
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    textStyle: { color: '#1a202c', fontSize: 13 },
    formatter: (p: { name: string; percent: number }) =>
      `<div style="font-weight:600">${p.name}</div>
       <div>赔付占比：${p.percent}%</div>`,
  },
  legend: {
    orient: 'vertical',
    right: 12,
    top: 'center',
    textStyle: { fontSize: 12, color: '#64748b' },
    itemWidth: 10,
    itemHeight: 10,
    itemGap: 8,
  },
  series: [
    {
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['35%', '50%'],
      avoidLabelOverlap: true,
      itemStyle: { borderRadius: 6, borderColor: '#fff', borderWidth: 2 },
      label: {
        show: true,
        formatter: '{b}\n{d}%',
        fontSize: 11,
        color: '#64748b',
      },
      labelLine: { length: 12, length2: 8 },
      emphasis: {
        label: { show: true, fontWeight: 'bold', fontSize: 13 },
        itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.15)' },
      },
      data: disasterData.map((d, i) => ({
        ...d,
        itemStyle: { color: DISASTER_COLORS[i] },
      })),
    },
  ],
}

/* ── 5-Year Claim Rate Trend ── */

const years = ['2021', '2022', '2023', '2024', '2025']

const claimRateData: Record<string, number[]> = {
  水稻: [62.5, 58.3, 65.1, 60.8, 58.2],
  小麦: [48.2, 52.6, 45.8, 43.3, 45.6],
  玉米: [55.3, 60.1, 58.7, 63.8, 82.3],
  大豆: [50.1, 53.4, 48.9, 61.5, 76.8],
}

const TREND_COLORS = [COLORS.navy, COLORS.gold, COLORS.green, COLORS.red]

const claimRateTrendOption: EChartsOption = {
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    textStyle: { color: '#1a202c', fontSize: 13 },
    formatter: (params: unknown) => {
      const items = params as { seriesName: string; value: number; color: string }[]
      if (!Array.isArray(items) || items.length === 0) return ''
      const header = `<div style="font-weight:600;margin-bottom:4px">${(items[0] as { axisValue?: string }).axisValue ?? ''}年</div>`
      const rows = items
        .map(
          (item) =>
            `<div style="display:flex;align-items:center;gap:6px">
              <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${item.color}"></span>
              <span>${item.seriesName}：${item.value}%</span>
            </div>`,
        )
        .join('')
      return header + rows
    },
  },
  legend: {
    top: 0,
    right: 0,
    textStyle: { fontSize: 12, color: '#64748b' },
    itemWidth: 16,
    itemHeight: 3,
  },
  grid: { left: 12, right: 16, bottom: 8, top: 36, containLabel: true },
  xAxis: {
    type: 'category',
    data: years,
    boundaryGap: false,
    axisLine: { lineStyle: { color: '#e2e8f0' } },
    axisTick: { show: false },
    axisLabel: { color: '#94a3b8', fontSize: 11, formatter: (v: string) => `${v}年` },
  },
  yAxis: {
    type: 'value',
    name: '赔付率 (%)',
    nameTextStyle: { color: '#94a3b8', fontSize: 11, padding: [0, 40, 0, 0] },
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { color: '#94a3b8', fontSize: 11, formatter: (v: number) => `${v}%` },
    splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
    min: 30,
    max: 90,
  },
  series: Object.entries(claimRateData).map(([name, data], idx) => ({
    name,
    type: 'line' as const,
    data,
    smooth: true,
    symbol: 'circle',
    symbolSize: 6,
    lineStyle: { width: 2.5, color: TREND_COLORS[idx] },
    itemStyle: { color: TREND_COLORS[idx] },
    emphasis: { focus: 'series' as const },
  })),
}

/* ── Cross-Validation Table ── */

interface CrossValidationRow {
  key: string
  province: string
  crop: string
  insuredArea: number
  certifiedArea: number
  deviationRate: number
  result: '通过' | '异常'
}

const crossValidationData: CrossValidationRow[] = [
  { key: '1', province: '黑龙江', crop: '水稻', insuredArea: 1850, certifiedArea: 1823, deviationRate: 1.5, result: '通过' },
  { key: '2', province: '河南', crop: '玉米', insuredArea: 1260, certifiedArea: 1185, deviationRate: 6.3, result: '通过' },
  { key: '3', province: '河南', crop: '小麦', insuredArea: 980, certifiedArea: 962, deviationRate: 1.9, result: '通过' },
  { key: '4', province: '山东', crop: '小麦', insuredArea: 1120, certifiedArea: 1098, deviationRate: 2.0, result: '通过' },
  { key: '5', province: '安徽', crop: '水稻', insuredArea: 860, certifiedArea: 842, deviationRate: 2.1, result: '通过' },
  { key: '6', province: '河南', crop: '大豆', insuredArea: 326, certifiedArea: 285, deviationRate: 14.4, result: '异常' },
  { key: '7', province: '黑龙江', crop: '大豆', insuredArea: 198, certifiedArea: 172, deviationRate: 15.1, result: '异常' },
  { key: '8', province: '江苏', crop: '水稻', insuredArea: 756, certifiedArea: 738, deviationRate: 2.4, result: '通过' },
  { key: '9', province: '四川', crop: '水稻', insuredArea: 620, certifiedArea: 605, deviationRate: 2.5, result: '通过' },
  { key: '10', province: '内蒙古', crop: '玉米', insuredArea: 485, certifiedArea: 423, deviationRate: 14.7, result: '异常' },
]

const crossValidationColumns = [
  {
    title: '省份',
    dataIndex: 'province',
    key: 'province',
    width: 100,
  },
  {
    title: '作物',
    dataIndex: 'crop',
    key: 'crop',
    width: 80,
  },
  {
    title: '投保面积(万亩)',
    dataIndex: 'insuredArea',
    key: 'insuredArea',
    width: 130,
    align: 'right' as const,
    render: (v: number) => v.toLocaleString(),
  },
  {
    title: '确权面积(万亩)',
    dataIndex: 'certifiedArea',
    key: 'certifiedArea',
    width: 130,
    align: 'right' as const,
    render: (v: number) => v.toLocaleString(),
  },
  {
    title: '偏差率',
    dataIndex: 'deviationRate',
    key: 'deviationRate',
    width: 100,
    align: 'right' as const,
    render: (v: number) => (
      <span style={{ color: v > 10 ? '#ef4444' : v > 5 ? '#f59e0b' : '#10b981', fontWeight: 600 }}>
        {v.toFixed(1)}%
      </span>
    ),
  },
  {
    title: '验证结果',
    dataIndex: 'result',
    key: 'result',
    width: 100,
    align: 'center' as const,
    render: (v: string) => (
      <Tag color={v === '通过' ? 'green' : 'red'} style={{ margin: 0 }}>
        {v}
      </Tag>
    ),
  },
]

/* ── Page Component ── */

const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
}

export default function AgriculturalDataPage() {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.06 } },
      }}
    >
      {/* Header */}
      <PageHeader
        title="农业保险数据分析"
        description="农业保险承保、理赔、风险数据全景分析"
        suggestedPrompts={agriculturalDataScripts.suggestedPrompts}
      />

      {/* KPI Cards */}
      <motion.div variants={staggerItem}>
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="农险保费收入"
              value="¥1,092亿"
              prefix={<DollarOutlined />}
              trend="up"
              trendValue="占总保费60%"
              color={COLORS.navy}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="承保面积"
              value="21.5亿亩"
              prefix={<EnvironmentOutlined />}
              trend="up"
              trendValue="同比+5.8%"
              color={COLORS.green}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="农险赔付率"
              value="68.2%"
              prefix={<PercentageOutlined />}
              trend="up"
              trendValue="同比+3.5%"
              color={COLORS.orange}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="承保品种"
              value="186种"
              prefix={<AppstoreOutlined />}
              trend="up"
              trendValue="新增12种"
              color={COLORS.indigo}
            />
          </Col>
        </Row>
      </motion.div>

      {/* Row 2: Province Bar + Crop Pie */}
      <motion.div variants={staggerItem}>
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          <Col xs={24} lg={12}>
            <ChartCard title="各省农险保费分布" subtitle="Top 10（单位：亿元）" height={360}>
              <ReactECharts
                option={provinceBarOption}
                style={{ width: '100%', height: '100%' }}
                opts={{ renderer: 'svg' }}
              />
            </ChartCard>
          </Col>
          <Col xs={24} lg={12}>
            <ChartCard title="主要作物承保面积占比" height={360}>
              <ReactECharts
                option={cropPieOption}
                style={{ width: '100%', height: '100%' }}
                opts={{ renderer: 'svg' }}
              />
            </ChartCard>
          </Col>
        </Row>
      </motion.div>

      {/* Row 3: Disaster Pie + Claim Rate Trend */}
      <motion.div variants={staggerItem}>
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          <Col xs={24} lg={12}>
            <ChartCard title="灾害类型赔付分布" height={360}>
              <ReactECharts
                option={disasterPieOption}
                style={{ width: '100%', height: '100%' }}
                opts={{ renderer: 'svg' }}
              />
            </ChartCard>
          </Col>
          <Col xs={24} lg={12}>
            <ChartCard title="近5年赔付率趋势" subtitle="按作物类型" height={360}>
              <ReactECharts
                option={claimRateTrendOption}
                style={{ width: '100%', height: '100%' }}
                opts={{ renderer: 'svg' }}
              />
            </ChartCard>
          </Col>
        </Row>
      </motion.div>

      {/* Row 4: Cross-Validation Table */}
      <motion.div variants={staggerItem}>
        <ChartCard title="数据交叉验证结果" subtitle="投保面积 vs 确权面积 vs 实际面积" height={420}>
          <Table
            dataSource={crossValidationData}
            columns={crossValidationColumns}
            pagination={false}
            size="small"
            scroll={{ x: 640 }}
            rowClassName={(record) =>
              record.result === '异常' ? 'bg-red-50' : ''
            }
            style={{ marginTop: -4 }}
          />
        </ChartCard>
      </motion.div>

      {/* Row 5: Province Risk Map */}
      <motion.div variants={staggerItem} style={{ marginTop: 16 }}>
        <ProvinceRiskMap />
      </motion.div>

      {/* Row 6: Trend Prediction */}
      <motion.div variants={staggerItem} style={{ marginTop: 16 }}>
        <TrendPrediction />
      </motion.div>
    </motion.div>
  )
}
