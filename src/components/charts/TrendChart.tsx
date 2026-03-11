import ReactECharts from 'echarts-for-react'
import type { EChartsOption } from 'echarts'

export interface TrendDataPoint {
  date: string
  value: number
  name?: string
}

interface TrendChartProps {
  data: TrendDataPoint[][]
  title?: string
  yAxisLabel?: string
  seriesType?: 'line' | 'bar' | 'area'
  seriesNames?: string[]
}

const SERIES_COLORS = ['#1a365d', '#d4a843', '#10b981', '#6366f1', '#ef4444']

function formatYuanValue(value: number): string {
  if (Math.abs(value) >= 1_0000_0000) {
    return `¥${(value / 1_0000_0000).toFixed(2)}亿`
  }
  if (Math.abs(value) >= 1_0000) {
    return `¥${(value / 1_0000).toFixed(2)}万`
  }
  return `¥${value.toLocaleString('zh-CN')}`
}

export default function TrendChart({
  data,
  title,
  yAxisLabel,
  seriesType = 'area',
  seriesNames,
}: TrendChartProps) {
  const categories = data[0]?.map((d) => d.date) ?? []

  const series: EChartsOption['series'] = data.map((seriesData, idx) => {
    const color = SERIES_COLORS[idx % SERIES_COLORS.length]
    const name = seriesNames?.[idx] ?? seriesData[0]?.name ?? `系列${idx + 1}`

    const baseSeries = {
      name,
      data: seriesData.map((d) => d.value),
      smooth: true,
      itemStyle: { color },
      emphasis: { focus: 'series' as const },
    }

    if (seriesType === 'bar') {
      return {
        ...baseSeries,
        type: 'bar' as const,
        barMaxWidth: 40,
      }
    }

    return {
      ...baseSeries,
      type: 'line' as const,
      symbol: 'circle',
      symbolSize: 6,
      lineStyle: { width: 2.5, color },
      ...(seriesType === 'area'
        ? {
            areaStyle: {
              color: {
                type: 'linear' as const,
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: `${color}40` },
                  { offset: 1, color: `${color}05` },
                ],
              },
            },
          }
        : {}),
    }
  })

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
      backgroundColor: 'rgba(255,255,255,0.96)',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      textStyle: { color: '#1a202c', fontSize: 13 },
      formatter: (params: unknown) => {
        const items = params as { seriesName: string; value: number; color: string }[]
        if (!Array.isArray(items) || items.length === 0) return ''
        const header = `<div style="font-weight:600;margin-bottom:4px">${(items[0] as { axisValue?: string }).axisValue ?? ''}</div>`
        const rows = items
          .map(
            (item) =>
              `<div style="display:flex;align-items:center;gap:6px">
                <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${item.color}"></span>
                <span>${item.seriesName}：${formatYuanValue(item.value)}</span>
              </div>`,
          )
          .join('')
        return header + rows
      },
    },
    legend:
      data.length > 1
        ? {
            top: title ? 28 : 0,
            right: 0,
            textStyle: { fontSize: 12, color: '#64748b' },
          }
        : undefined,
    grid: {
      left: 12,
      right: 16,
      bottom: 8,
      top: title ? (data.length > 1 ? 56 : 36) : data.length > 1 ? 36 : 12,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: categories,
      boundaryGap: seriesType === 'bar',
      axisLine: { lineStyle: { color: '#e2e8f0' } },
      axisTick: { show: false },
      axisLabel: { color: '#94a3b8', fontSize: 11 },
    },
    yAxis: {
      type: 'value',
      name: yAxisLabel,
      nameTextStyle: { color: '#94a3b8', fontSize: 11, padding: [0, 40, 0, 0] },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#94a3b8', fontSize: 11 },
      splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
    },
    series,
  }

  return (
    <ReactECharts
      option={option}
      style={{ width: '100%', height: '100%', minHeight: 300 }}
      opts={{ renderer: 'svg' }}
    />
  )
}
