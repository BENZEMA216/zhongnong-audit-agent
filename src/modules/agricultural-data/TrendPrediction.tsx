import { useState } from 'react'
import { Segmented, Typography } from 'antd'
import { FundProjectionScreenOutlined } from '@ant-design/icons'
import ReactECharts from 'echarts-for-react'
import type { EChartsOption } from 'echarts'
import ChartCard from '../../components/dashboard/ChartCard'

const { Text } = Typography

/* ── Metric Data ── */

interface MetricConfig {
  label: string
  unit: string
  historical: number[]
  predicted: number[]
  upperBound: number[]
  lowerBound: number[]
  formatter: (v: number) => string
  aiSummary: string
}

const years = ['2021', '2022', '2023', '2024', '2025', '2026', '2027']
const historicalYears = ['2021', '2022', '2023', '2024', '2025']
const predictionYears = ['2025', '2026', '2027']

const metrics: Record<string, MetricConfig> = {
  premium: {
    label: '保费',
    unit: '亿元',
    historical: [680, 785, 892, 978, 1092],
    predicted: [1092, 1258, 1420],
    upperBound: [1092, 1336, 1528],
    lowerBound: [1092, 1180, 1312],
    formatter: (v: number) => `¥${v}亿`,
    aiSummary:
      '基于历史数据趋势、政策变量和气候模型预测，2026年农险保费预计达到¥1,258亿（同比+15.2%），2027年预计达到¥1,420亿。主要驱动因素：三大粮食作物完全成本保险全面推开（+8%）、新增险种和扩大覆盖面（+5%）、部分高风险地区费率上调（+2%）。95%置信区间为¥1,180亿-¥1,336亿。',
  },
  claimRate: {
    label: '赔付率',
    unit: '%',
    historical: [62.8, 58.5, 64.2, 66.5, 68.2],
    predicted: [68.2, 62.5, 60.8],
    upperBound: [68.2, 67.0, 66.2],
    lowerBound: [68.2, 58.0, 55.4],
    formatter: (v: number) => `${v}%`,
    aiSummary:
      '预测2026年赔付率回落至62.5%（同比-5.7个百分点），2027年进一步降至60.8%。主要因素：极端气候事件概率下降、承保结构优化、费率充足性提升。但需关注厄尔尼诺转拉尼娜可能带来的极端降水风险，以及生猪周期下行期对养殖险赔付的影响。',
  },
  area: {
    label: '承保面积',
    unit: '亿亩',
    historical: [16.8, 18.2, 19.5, 20.3, 21.5],
    predicted: [21.5, 23.2, 24.8],
    upperBound: [21.5, 24.5, 26.5],
    lowerBound: [21.5, 21.9, 23.1],
    formatter: (v: number) => `${v}亿亩`,
    aiSummary:
      '预测2026年承保面积达23.2亿亩（同比+7.9%），2027年达24.8亿亩。增长来源：高标准农田建设带动新增投保面积、中药材和特色经济作物保险扩面、地方优势特色农产品保险试点推广。面积增速可能受到耕地红线和土地流转政策影响。',
  },
}

/* ── Build Chart Option ── */

function buildOption(metric: MetricConfig): EChartsOption {
  // Historical line data (full for all years, null for prediction-only years)
  const historicalData = [...metric.historical, null, null]
  // Predicted line (null for historical years, starts from last historical point)
  const predictedData = [null, null, null, null, ...metric.predicted]
  // Confidence bands
  const upperData = [null, null, null, null, ...metric.upperBound]
  const lowerData = [null, null, null, null, ...metric.lowerBound]

  return {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255,255,255,0.96)',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      textStyle: { color: '#1a202c', fontSize: 13 },
      formatter: (params: unknown) => {
        const items = params as {
          seriesName: string
          value: number | null
          color: string
          axisValue: string
        }[]
        if (!Array.isArray(items) || items.length === 0) return ''
        const year = items[0].axisValue
        const isPrediction = parseInt(year) >= 2026

        let html = `<div style="font-weight:600;margin-bottom:4px">${year}年${isPrediction ? '（预测）' : ''}</div>`

        for (const item of items) {
          if (item.value == null) continue
          if (item.seriesName === '置信上界' || item.seriesName === '置信下界') continue
          html += `<div style="display:flex;align-items:center;gap:6px">
            <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${item.color}"></span>
            <span>${item.seriesName}：${metric.formatter(item.value)}</span>
          </div>`
        }

        // Show confidence interval for prediction years
        if (isPrediction) {
          const upper = items.find((i) => i.seriesName === '置信上界')
          const lower = items.find((i) => i.seriesName === '置信下界')
          if (upper?.value != null && lower?.value != null) {
            html += `<div style="color:#94a3b8;font-size:11px;margin-top:4px">95%置信区间：${metric.formatter(lower.value)} - ${metric.formatter(upper.value)}</div>`
          }
        }

        return html
      },
    },
    legend: {
      top: 0,
      right: 0,
      data: ['历史数据', '预测趋势'],
      textStyle: { fontSize: 12, color: '#64748b' },
      itemWidth: 16,
      itemHeight: 3,
    },
    grid: { left: 12, right: 16, bottom: 8, top: 40, containLabel: true },
    xAxis: {
      type: 'category',
      data: years,
      boundaryGap: false,
      axisLine: { lineStyle: { color: '#e2e8f0' } },
      axisTick: { show: false },
      axisLabel: {
        color: '#94a3b8',
        fontSize: 11,
        formatter: (v: string) => `${v}年`,
      },
    },
    yAxis: {
      type: 'value',
      name: metric.unit,
      nameTextStyle: { color: '#94a3b8', fontSize: 11, padding: [0, 40, 0, 0] },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#94a3b8',
        fontSize: 11,
        formatter: (v: number) => metric.formatter(v),
      },
      splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
    },
    series: [
      // Confidence interval area (upper bound)
      {
        name: '置信上界',
        type: 'line',
        data: upperData,
        lineStyle: { opacity: 0 },
        symbol: 'none',
        stack: 'confidence',
        silent: true,
      },
      // Confidence interval area (fill between upper and lower)
      {
        name: '置信下界',
        type: 'line',
        data: lowerData.map((v, i) => {
          if (v == null || upperData[i] == null) return null
          return v
        }),
        lineStyle: { opacity: 0 },
        symbol: 'none',
        areaStyle: {
          color: 'rgba(59,130,246,0.1)',
        },
        stack: 'confidence',
        silent: true,
      },
      // Historical line
      {
        name: '历史数据',
        type: 'line',
        data: historicalData,
        smooth: true,
        symbol: 'circle',
        symbolSize: 7,
        lineStyle: { width: 3, color: '#1a365d' },
        itemStyle: { color: '#1a365d', borderWidth: 2, borderColor: '#fff' },
        emphasis: { focus: 'series' },
        connectNulls: false,
      },
      // Predicted line
      {
        name: '预测趋势',
        type: 'line',
        data: predictedData,
        smooth: true,
        symbol: 'diamond',
        symbolSize: 8,
        lineStyle: { width: 2.5, color: '#3b82f6', type: 'dashed' },
        itemStyle: { color: '#3b82f6', borderWidth: 2, borderColor: '#fff' },
        emphasis: { focus: 'series' },
        connectNulls: false,
      },
    ],
  }
}

/* ── Component ── */

export default function TrendPrediction() {
  const [activeMetric, setActiveMetric] = useState<string>('premium')
  const metric = metrics[activeMetric]

  return (
    <ChartCard title="趋势预测" subtitle="基于AI模型预测（含95%置信区间）" height={480}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Metric Toggle */}
        <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'flex-end' }}>
          <Segmented
            value={activeMetric}
            onChange={(v) => setActiveMetric(v as string)}
            options={[
              { label: '保费', value: 'premium' },
              { label: '赔付率', value: 'claimRate' },
              { label: '承保面积', value: 'area' },
            ]}
            size="small"
          />
        </div>

        {/* Chart */}
        <div style={{ flex: 1, minHeight: 280 }}>
          <ReactECharts
            option={buildOption(metric)}
            style={{ width: '100%', height: '100%' }}
            opts={{ renderer: 'svg' }}
            notMerge
          />
        </div>

        {/* AI Summary */}
        <div
          style={{
            marginTop: 12,
            padding: '12px 16px',
            background: '#f0f9ff',
            borderRadius: 8,
            border: '1px solid #dbeafe',
            display: 'flex',
            gap: 10,
            alignItems: 'flex-start',
          }}
        >
          <FundProjectionScreenOutlined
            style={{ color: '#3b82f6', fontSize: 16, marginTop: 2, flexShrink: 0 }}
          />
          <div>
            <Text strong style={{ fontSize: 13, color: '#1e40af', display: 'block', marginBottom: 4 }}>
              AI 预测分析
            </Text>
            <Text style={{ fontSize: 13, color: '#374151', lineHeight: 1.7 }}>
              {metric.aiSummary}
            </Text>
          </div>
        </div>

        {/* Data Points Summary */}
        <div
          style={{
            marginTop: 12,
            display: 'flex',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          {historicalYears.map((year, i) => (
            <div
              key={year}
              style={{
                padding: '6px 12px',
                background: '#f8fafc',
                borderRadius: 6,
                fontSize: 12,
                color: '#64748b',
              }}
            >
              <span style={{ fontWeight: 600, color: '#1a202c' }}>{year}</span>
              {' '}
              {metric.formatter(metric.historical[i])}
            </div>
          ))}
          {predictionYears.slice(1).map((year, i) => (
            <div
              key={year}
              style={{
                padding: '6px 12px',
                background: '#eff6ff',
                borderRadius: 6,
                fontSize: 12,
                color: '#3b82f6',
                border: '1px dashed #bfdbfe',
              }}
            >
              <span style={{ fontWeight: 600 }}>{year}</span>
              {' '}
              {metric.formatter(metric.predicted[i + 1])}
              <span style={{ color: '#94a3b8', marginLeft: 4 }}>(预测)</span>
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  )
}
