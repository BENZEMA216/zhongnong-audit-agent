import ReactECharts from 'echarts-for-react'
import type { EChartsOption } from 'echarts'

export interface ProvinceData {
  province: string
  value: number
  riskLevel: string
}

interface ChinaMapChartProps {
  data: ProvinceData[]
  title?: string
  top?: number
}

function getRiskColor(value: number): string {
  if (value >= 80) return '#ef4444'
  if (value >= 60) return '#f59e0b'
  return '#10b981'
}

export default function ChinaMapChart({
  data,
  title = '各省农业险赔付率分布',
  top = 15,
}: ChinaMapChartProps) {
  const sorted = [...data].sort((a, b) => b.value - a.value).slice(0, top)
  const provinces = sorted.map((d) => d.province)
  const values = sorted.map((d) => d.value)
  const colors = sorted.map((d) => getRiskColor(d.value))

  const option: EChartsOption = {
    title: title
      ? {
          text: title,
          textStyle: {
            fontSize: 14,
            fontWeight: 600,
            color: '#1a365d',
          },
          left: 0,
          top: 0,
        }
      : undefined,
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
        const item = items[0]
        const level = item.value >= 80 ? '高风险' : item.value >= 60 ? '中风险' : '低风险'
        const levelColor = getRiskColor(item.value)
        return `<div style="font-weight:600">${item.name}</div>
          <div>赔付率：${item.value}%</div>
          <div>风险等级：<span style="color:${levelColor};font-weight:600">${level}</span></div>`
      },
    },
    grid: {
      left: 12,
      right: 32,
      bottom: 8,
      top: title ? 36 : 12,
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      max: 100,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#94a3b8',
        fontSize: 11,
        formatter: '{value}%',
      },
      splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
    },
    yAxis: {
      type: 'category',
      data: provinces.reverse(),
      axisLine: { lineStyle: { color: '#e2e8f0' } },
      axisTick: { show: false },
      axisLabel: {
        color: '#64748b',
        fontSize: 11,
        width: 60,
        overflow: 'truncate',
      },
    },
    series: [
      {
        type: 'bar',
        data: values.reverse().map((v, i) => ({
          value: v,
          itemStyle: {
            color: colors.reverse()[i],
            borderRadius: [0, 4, 4, 0],
          },
        })),
        barMaxWidth: 16,
        label: {
          show: true,
          position: 'right',
          formatter: '{c}%',
          fontSize: 11,
          color: '#64748b',
        },
      },
    ],
    // Legend for risk levels
    graphic: [
      {
        type: 'group',
        right: 10,
        top: title ? 6 : 0,
        children: [
          {
            type: 'circle',
            shape: { r: 4 },
            style: { fill: '#ef4444' },
            left: 0,
            top: 4,
          },
          {
            type: 'text',
            style: { text: '>80%', fill: '#64748b', fontSize: 10 },
            left: 12,
            top: 0,
          },
          {
            type: 'circle',
            shape: { r: 4 },
            style: { fill: '#f59e0b' },
            left: 50,
            top: 4,
          },
          {
            type: 'text',
            style: { text: '60-80%', fill: '#64748b', fontSize: 10 },
            left: 62,
            top: 0,
          },
          {
            type: 'circle',
            shape: { r: 4 },
            style: { fill: '#10b981' },
            left: 112,
            top: 4,
          },
          {
            type: 'text',
            style: { text: '<60%', fill: '#64748b', fontSize: 10 },
            left: 124,
            top: 0,
          },
        ],
      },
    ],
  }

  return (
    <ReactECharts
      option={option}
      style={{ width: '100%', height: '100%', minHeight: 300 }}
      opts={{ renderer: 'svg' }}
    />
  )
}
