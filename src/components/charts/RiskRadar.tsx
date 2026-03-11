import ReactECharts from 'echarts-for-react'
import type { EChartsOption } from 'echarts'

export interface RiskDimension {
  name: string
  value: number
}

interface RiskRadarProps {
  data: RiskDimension[]
  maxValue?: number
  title?: string
}

const DEFAULT_DIMENSIONS = [
  '承保风险',
  '市场风险',
  '信用风险',
  '操作风险',
  '流动性风险',
  '合规风险',
]

export default function RiskRadar({ data, maxValue = 100, title }: RiskRadarProps) {
  const dimensions = data.length > 0 ? data.map((d) => d.name) : DEFAULT_DIMENSIONS
  const values = data.length > 0 ? data.map((d) => d.value) : []

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
      trigger: 'item',
      backgroundColor: 'rgba(255,255,255,0.96)',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      textStyle: { color: '#1a202c', fontSize: 13 },
    },
    radar: {
      indicator: dimensions.map((name) => ({
        name,
        max: maxValue,
      })),
      shape: 'polygon',
      center: ['50%', title ? '55%' : '50%'],
      radius: '65%',
      axisName: {
        color: '#64748b',
        fontSize: 12,
      },
      splitNumber: 4,
      splitArea: {
        areaStyle: {
          color: ['#ffffff', '#f8fafc', '#f1f5f9', '#e8edf3'],
        },
      },
      splitLine: {
        lineStyle: { color: '#e2e8f0' },
      },
      axisLine: {
        lineStyle: { color: '#e2e8f0' },
      },
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: values,
            name: '风险评分',
            areaStyle: {
              color: 'rgba(26, 54, 93, 0.30)',
            },
            lineStyle: {
              color: '#d4a843',
              width: 2,
            },
            itemStyle: {
              color: '#d4a843',
              borderColor: '#d4a843',
              borderWidth: 2,
            },
            symbol: 'circle',
            symbolSize: 6,
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
