import { useState } from 'react'
import { Modal, Table, Tag } from 'antd'
import ReactECharts from 'echarts-for-react'
import type { EChartsOption } from 'echarts'
import ChartCard from '../../components/dashboard/ChartCard'

/* ── Province Risk Data ── */

interface CropBreakdown {
  crop: string
  premium: number
  claimRate: number
  area: number
}

interface ProvinceRisk {
  name: string
  riskLevel: number // claim rate %
  premium: number   // in 亿
  crops: CropBreakdown[]
}

const provinceRiskData: ProvinceRisk[] = [
  {
    name: '河南',
    riskLevel: 87,
    premium: 142,
    crops: [
      { crop: '玉米', premium: 52, claimRate: 92.3, area: 1260 },
      { crop: '小麦', premium: 48, claimRate: 78.5, area: 980 },
      { crop: '大豆', premium: 22, claimRate: 88.1, area: 326 },
      { crop: '花生', premium: 12, claimRate: 72.4, area: 185 },
      { crop: '其他', premium: 8, claimRate: 65.0, area: 120 },
    ],
  },
  {
    name: '安徽',
    riskLevel: 82,
    premium: 96,
    crops: [
      { crop: '水稻', premium: 38, claimRate: 75.2, area: 860 },
      { crop: '大豆', premium: 18, claimRate: 88.6, area: 245 },
      { crop: '小麦', premium: 25, claimRate: 82.1, area: 520 },
      { crop: '玉米', premium: 10, claimRate: 79.3, area: 186 },
      { crop: '其他', premium: 5, claimRate: 58.0, area: 95 },
    ],
  },
  {
    name: '黑龙江',
    riskLevel: 72,
    premium: 168,
    crops: [
      { crop: '水稻', premium: 62, claimRate: 68.5, area: 1850 },
      { crop: '大豆', premium: 38, claimRate: 76.8, area: 985 },
      { crop: '玉米', premium: 45, claimRate: 72.3, area: 1320 },
      { crop: '小麦', premium: 15, claimRate: 65.2, area: 380 },
      { crop: '其他', premium: 8, claimRate: 60.0, area: 210 },
    ],
  },
  {
    name: '吉林',
    riskLevel: 68,
    premium: 62,
    crops: [
      { crop: '玉米', premium: 28, claimRate: 72.5, area: 580 },
      { crop: '水稻', premium: 18, claimRate: 62.3, area: 420 },
      { crop: '大豆', premium: 10, claimRate: 68.1, area: 215 },
      { crop: '其他', premium: 6, claimRate: 55.0, area: 130 },
    ],
  },
  {
    name: '山东',
    riskLevel: 62,
    premium: 128,
    crops: [
      { crop: '小麦', premium: 52, claimRate: 58.2, area: 1120 },
      { crop: '玉米', premium: 38, claimRate: 65.8, area: 820 },
      { crop: '花生', premium: 22, claimRate: 62.1, area: 380 },
      { crop: '蔬菜', premium: 10, claimRate: 58.5, area: 165 },
      { crop: '其他', premium: 6, claimRate: 52.0, area: 95 },
    ],
  },
  {
    name: '湖北',
    riskLevel: 58,
    premium: 76,
    crops: [
      { crop: '水稻', premium: 35, claimRate: 56.8, area: 680 },
      { crop: '小麦', premium: 18, claimRate: 52.3, area: 320 },
      { crop: '油菜', premium: 12, claimRate: 62.5, area: 245 },
      { crop: '其他', premium: 11, claimRate: 48.0, area: 180 },
    ],
  },
  {
    name: '四川',
    riskLevel: 55,
    premium: 85,
    crops: [
      { crop: '水稻', premium: 32, claimRate: 52.6, area: 620 },
      { crop: '玉米', premium: 18, claimRate: 58.3, area: 380 },
      { crop: '生猪', premium: 22, claimRate: 55.8, area: 185 },
      { crop: '其他', premium: 13, claimRate: 48.0, area: 210 },
    ],
  },
  {
    name: '湖南',
    riskLevel: 52,
    premium: 68,
    crops: [
      { crop: '水稻', premium: 30, claimRate: 50.2, area: 580 },
      { crop: '生猪', premium: 16, claimRate: 55.6, area: 142 },
      { crop: '柑橘', premium: 12, claimRate: 48.3, area: 185 },
      { crop: '其他', premium: 10, claimRate: 45.0, area: 160 },
    ],
  },
  {
    name: '江苏',
    riskLevel: 48,
    premium: 89,
    crops: [
      { crop: '水稻', premium: 38, claimRate: 45.6, area: 756 },
      { crop: '小麦', premium: 25, claimRate: 48.2, area: 520 },
      { crop: '油菜', premium: 14, claimRate: 52.1, area: 280 },
      { crop: '其他', premium: 12, claimRate: 42.0, area: 195 },
    ],
  },
  {
    name: '内蒙古',
    riskLevel: 45,
    premium: 58,
    crops: [
      { crop: '玉米', premium: 22, claimRate: 48.5, area: 485 },
      { crop: '小麦', premium: 15, claimRate: 42.3, area: 320 },
      { crop: '大豆', premium: 12, claimRate: 45.8, area: 265 },
      { crop: '其他', premium: 9, claimRate: 38.0, area: 180 },
    ],
  },
]

/* ── Risk color helper ── */

function getRiskColor(level: number): string {
  if (level >= 80) return '#ef4444'
  if (level >= 60) return '#f59e0b'
  return '#10b981'
}

function getRiskLabel(level: number): string {
  if (level >= 80) return '高风险'
  if (level >= 60) return '中风险'
  return '低风险'
}

function getRiskTagColor(level: number): string {
  if (level >= 80) return 'red'
  if (level >= 60) return 'orange'
  return 'green'
}

/* ── Chart Option ── */

const barOption: EChartsOption = {
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
      const province = provinceRiskData.find((p) => p.name === items[0].name)
      if (!province) return ''
      return `<div style="font-weight:600;margin-bottom:4px">${province.name}</div>
              <div>赔付率：${province.riskLevel}%</div>
              <div>保费收入：¥${province.premium}亿</div>
              <div style="color:${getRiskColor(province.riskLevel)};font-weight:600;margin-top:4px">${getRiskLabel(province.riskLevel)}</div>
              <div style="color:#94a3b8;font-size:11px;margin-top:4px">点击查看作物明细</div>`
    },
  },
  grid: { left: 80, right: 40, top: 12, bottom: 24 },
  xAxis: {
    type: 'value',
    max: 100,
    axisLabel: {
      color: '#94a3b8',
      fontSize: 11,
      formatter: (v: number) => `${v}%`,
    },
    axisLine: { show: false },
    axisTick: { show: false },
    splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
  },
  yAxis: {
    type: 'category',
    data: [...provinceRiskData]
      .sort((a, b) => a.riskLevel - b.riskLevel)
      .map((d) => d.name),
    axisLine: { lineStyle: { color: '#e2e8f0' } },
    axisTick: { show: false },
    axisLabel: { color: '#1a202c', fontSize: 12, fontWeight: 500 },
  },
  series: [
    {
      type: 'bar',
      data: [...provinceRiskData]
        .sort((a, b) => a.riskLevel - b.riskLevel)
        .map((d) => ({
          value: d.riskLevel,
          itemStyle: {
            color: getRiskColor(d.riskLevel),
            borderRadius: [0, 4, 4, 0],
          },
        })),
      barMaxWidth: 20,
      label: {
        show: true,
        position: 'right',
        formatter: (p: { value: number }) => `${p.value}%`,
        color: '#64748b',
        fontSize: 11,
        fontWeight: 600,
      },
    },
  ],
}

/* ── Crop Detail Columns ── */

const cropColumns = [
  {
    title: '作物',
    dataIndex: 'crop',
    key: 'crop',
    width: 80,
  },
  {
    title: '保费(亿元)',
    dataIndex: 'premium',
    key: 'premium',
    width: 100,
    align: 'right' as const,
    render: (v: number) => `¥${v}`,
  },
  {
    title: '赔付率',
    dataIndex: 'claimRate',
    key: 'claimRate',
    width: 100,
    align: 'right' as const,
    render: (v: number) => (
      <span style={{ color: getRiskColor(v), fontWeight: 600 }}>
        {v.toFixed(1)}%
      </span>
    ),
  },
  {
    title: '承保面积(万亩)',
    dataIndex: 'area',
    key: 'area',
    width: 120,
    align: 'right' as const,
    render: (v: number) => v.toLocaleString(),
  },
  {
    title: '风险等级',
    key: 'risk',
    width: 90,
    align: 'center' as const,
    render: (_: unknown, record: CropBreakdown) => (
      <Tag color={getRiskTagColor(record.claimRate)} style={{ margin: 0 }}>
        {getRiskLabel(record.claimRate)}
      </Tag>
    ),
  },
]

/* ── Component ── */

export default function ProvinceRiskMap() {
  const [selectedProvince, setSelectedProvince] = useState<ProvinceRisk | null>(null)

  const handleChartClick = (params: { name?: string }) => {
    if (!params.name) return
    const province = provinceRiskData.find((p) => p.name === params.name)
    if (province) setSelectedProvince(province)
  }

  return (
    <>
      <ChartCard title="各省农险风险等级分布" subtitle="按赔付率排序" height={400}>
        <ReactECharts
          option={barOption}
          style={{ width: '100%', height: '100%' }}
          opts={{ renderer: 'svg' }}
          onEvents={{ click: handleChartClick }}
        />

        {/* Legend */}
        <div
          style={{
            display: 'flex',
            gap: 20,
            justifyContent: 'center',
            marginTop: 8,
            paddingBottom: 4,
          }}
        >
          {[
            { label: '高风险 (>80%)', color: '#ef4444' },
            { label: '中风险 (60-80%)', color: '#f59e0b' },
            { label: '低风险 (<60%)', color: '#10b981' },
          ].map((item) => (
            <div
              key={item.label}
              style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#64748b' }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 2,
                  background: item.color,
                  display: 'inline-block',
                }}
              />
              {item.label}
            </div>
          ))}
        </div>
      </ChartCard>

      {/* Detail Modal */}
      <Modal
        title={
          selectedProvince ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>{selectedProvince.name}省 - 农险风险详情</span>
              <Tag color={getRiskTagColor(selectedProvince.riskLevel)}>
                {getRiskLabel(selectedProvince.riskLevel)}
              </Tag>
            </div>
          ) : null
        }
        open={!!selectedProvince}
        onCancel={() => setSelectedProvince(null)}
        footer={null}
        width={640}
        styles={{
          body: { paddingTop: 16 },
        }}
      >
        {selectedProvince && (
          <div>
            {/* Summary */}
            <div
              style={{
                display: 'flex',
                gap: 24,
                marginBottom: 16,
                padding: '12px 16px',
                background: '#f8fafc',
                borderRadius: 8,
              }}
            >
              <div>
                <div style={{ fontSize: 12, color: '#94a3b8' }}>保费收入</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#1a202c' }}>
                  ¥{selectedProvince.premium}亿
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: '#94a3b8' }}>综合赔付率</div>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: getRiskColor(selectedProvince.riskLevel),
                  }}
                >
                  {selectedProvince.riskLevel}%
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: '#94a3b8' }}>承保品种</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#1a202c' }}>
                  {selectedProvince.crops.length}种
                </div>
              </div>
            </div>

            {/* Crop Table */}
            <Table
              dataSource={selectedProvince.crops.map((c, i) => ({ ...c, key: i }))}
              columns={cropColumns}
              pagination={false}
              size="small"
            />
          </div>
        )}
      </Modal>
    </>
  )
}
