import ReactECharts from 'echarts-for-react'
import type { EChartsOption } from 'echarts'

export interface FlowItem {
  name: string
  value: number
  type: 'income' | 'expense' | 'profit'
}

interface SankeyFlowProps {
  data: FlowItem[]
  title?: string
}

function formatYuanBrief(value: number): string {
  const abs = Math.abs(value)
  if (abs >= 1_0000_0000) {
    return `${value < 0 ? '-' : ''}¥${(abs / 1_0000_0000).toFixed(1)}亿`
  }
  if (abs >= 1_0000) {
    return `${value < 0 ? '-' : ''}¥${(abs / 1_0000).toFixed(1)}万`
  }
  return `${value < 0 ? '-' : ''}¥${abs.toLocaleString('zh-CN')}`
}

export default function SankeyFlow({ data, title }: SankeyFlowProps) {
  // Build waterfall: each bar shows its contribution,
  // with a transparent "base" stacked underneath for positioning
  const names = data.map((d) => d.name)
  const baseValues: number[] = []
  const barValues: number[] = []
  const barColors: string[] = []

  let runningTotal = 0

  for (const item of data) {
    if (item.type === 'income') {
      baseValues.push(runningTotal)
      barValues.push(item.value)
      barColors.push('#10b981')
      runningTotal += item.value
    } else if (item.type === 'expense') {
      runningTotal -= item.value
      baseValues.push(runningTotal)
      barValues.push(item.value)
      barColors.push('#ef4444')
    } else {
      // profit / result
      baseValues.push(0)
      barValues.push(runningTotal)
      barColors.push(runningTotal >= 0 ? '#1a365d' : '#ef4444')
    }
  }

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
        const items = params as { seriesIndex: number; name: string; value: number }[]
        if (!Array.isArray(items)) return ''
        // The visible bar is the second series (index 1)
        const bar = items.find((i) => i.seriesIndex === 1)
        if (!bar) return ''
        const idx = names.indexOf(bar.name)
        const item = data[idx]
        if (!item) return ''
        const label =
          item.type === 'income' ? '收入' : item.type === 'expense' ? '支出' : '结果'
        return `<div style="font-weight:600">${bar.name}</div>
          <div>${label}：${formatYuanBrief(item.value)}</div>`
      },
    },
    grid: {
      left: 12,
      right: 12,
      bottom: 8,
      top: title ? 40 : 16,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: names,
      axisLine: { lineStyle: { color: '#e2e8f0' } },
      axisTick: { show: false },
      axisLabel: {
        color: '#64748b',
        fontSize: 11,
        interval: 0,
        rotate: names.length > 6 ? 20 : 0,
      },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#94a3b8',
        fontSize: 11,
        formatter: (value: number) => formatYuanBrief(value),
      },
      splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
    },
    series: [
      // Invisible base
      {
        name: '基准',
        type: 'bar',
        stack: 'waterfall',
        data: baseValues,
        itemStyle: {
          color: 'transparent',
          borderColor: 'transparent',
        },
        emphasis: {
          itemStyle: {
            color: 'transparent',
            borderColor: 'transparent',
          },
        },
        barMaxWidth: 40,
      },
      // Visible bar
      {
        name: '金额',
        type: 'bar',
        stack: 'waterfall',
        data: barValues.map((v, i) => ({
          value: v,
          itemStyle: {
            color: barColors[i],
            borderRadius: [4, 4, 0, 0],
          },
        })),
        barMaxWidth: 40,
        label: {
          show: true,
          position: 'top',
          formatter: (params: { dataIndex: number }) => {
            return formatYuanBrief(barValues[params.dataIndex])
          },
          fontSize: 11,
          color: '#64748b',
        },
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
