import { Row, Col, Card, Table, Tag } from 'antd'
import {
  AlertOutlined,
  SafetyCertificateOutlined,
  WarningOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons'
import ReactECharts from 'echarts-for-react'
import PageHeader from '../../components/common/PageHeader'
import StatCard from '../../components/dashboard/StatCard'
import ChartCard from '../../components/dashboard/ChartCard'

const riskData = [
  { key: '1', category: '信用风险', indicator: '合作方信用评级', value: 'BBB-', threshold: 'A-', status: '超限', severity: 'high' },
  { key: '2', category: '流动性风险', indicator: '偿付能力充足率', value: '132%', threshold: '120%', status: '预警', severity: 'high' },
  { key: '3', category: '操作风险', indicator: '凭证差错率', value: '1.8%', threshold: '1.5%', status: '超限', severity: 'medium' },
  { key: '4', category: '合规风险', indicator: '合同审查完成率', value: '82.1%', threshold: '95%', status: '偏差', severity: 'medium' },
  { key: '5', category: '市场风险', indicator: '久期偏差', value: '0.8年', threshold: '0.5年', status: '超限', severity: 'medium' },
  { key: '6', category: '承保风险', indicator: '赔付率', value: '64.3%', threshold: '70%', status: '正常', severity: 'low' },
]

const columns = [
  { title: '风险类别', dataIndex: 'category', key: 'category', width: 110 },
  { title: '监控指标', dataIndex: 'indicator', key: 'indicator' },
  { title: '当前值', dataIndex: 'value', key: 'value', width: 90 },
  { title: '阈值', dataIndex: 'threshold', key: 'threshold', width: 90 },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 80,
    render: (s: string) => {
      const map: Record<string, string> = { '超限': 'red', '预警': 'orange', '偏差': 'gold', '正常': 'green' }
      return <Tag color={map[s]}>{s}</Tag>
    },
  },
  {
    title: '严重度',
    dataIndex: 'severity',
    key: 'severity',
    width: 80,
    render: (s: string) => {
      const map: Record<string, { color: string; text: string }> = {
        high: { color: 'red', text: '高' }, medium: { color: 'orange', text: '中' }, low: { color: 'green', text: '低' },
      }
      const c = map[s] || map.low
      return <Tag color={c.color}>{c.text}</Tag>
    },
  },
]

const radarOption = {
  tooltip: {},
  radar: {
    indicator: [
      { name: '信用风险', max: 100 },
      { name: '市场风险', max: 100 },
      { name: '操作风险', max: 100 },
      { name: '流动性', max: 100 },
      { name: '合规风险', max: 100 },
      { name: '承保风险', max: 100 },
    ],
    shape: 'circle' as const,
  },
  series: [{
    type: 'radar',
    data: [{
      value: [72, 45, 58, 65, 42, 38],
      name: '当前',
      areaStyle: { color: 'rgba(239, 68, 68, 0.15)' },
      lineStyle: { color: '#ef4444', width: 2 },
      itemStyle: { color: '#ef4444' },
    }, {
      value: [40, 30, 25, 35, 30, 30],
      name: '上月',
      areaStyle: { color: 'rgba(59, 130, 246, 0.1)' },
      lineStyle: { color: '#3b82f6', width: 2, type: 'dashed' as const },
      itemStyle: { color: '#3b82f6' },
    }],
  }],
}

export default function RiskMonitoringPage() {
  return (
    <div>
      <PageHeader
        title="风险监控"
        description="综合风险评估模型与预警指标监控"
        suggestedPrompts={['查看风险预警', '信用风险评估', '生成风险报告']}
      />

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <StatCard title="风险预警" value="5" prefix={<AlertOutlined />} trend="up" trendValue="+2 新增" color="#ef4444" />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard title="高风险项" value="2" prefix={<WarningOutlined />} trend="up" trendValue="需立即处理" color="#ef4444" />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard title="偿付充足率" value="132%" prefix={<SafetyCertificateOutlined />} trend="down" trendValue="-8% 环比" color="#f59e0b" />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard title="已化解" value="12" prefix={<CheckCircleOutlined />} trend="up" trendValue="本季度" color="#10b981" />
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} lg={14}>
          <Card title="风险监控明细" style={{ borderRadius: 12, border: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <Table columns={columns} dataSource={riskData} pagination={false} size="small" scroll={{ x: 600 }} />
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <ChartCard title="风险雷达图" subtitle="当前 vs 上月">
            <ReactECharts option={radarOption} style={{ height: '100%' }} />
          </ChartCard>
        </Col>
      </Row>
    </div>
  )
}
