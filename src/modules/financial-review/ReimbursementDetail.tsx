import { Drawer, Descriptions, Table, Tag, Button, Space, Divider, Typography } from 'antd'
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons'
import ReactECharts from 'echarts-for-react'
import type { EChartsOption } from 'echarts'
import type { Reimbursement, ReimbursementItem } from '../../data/mock-datasets/reimbursements'
import { getApplicantHistory, getDepartmentAvg } from './data'
import RiskKeywordAlert from './RiskKeywordAlert'
import { formatCurrency } from '../../utils/formatters'

const { Text, Title } = Typography

/* ── Props ── */

interface ReimbursementDetailProps {
  open: boolean
  record: Reimbursement | null
  onClose: () => void
}

/* ── AI result config ── */

const resultConfig = {
  pass: {
    color: '#10b981',
    bg: '#f0fdf4',
    border: '#bbf7d0',
    icon: <CheckCircleOutlined />,
    label: '审核通过',
  },
  review: {
    color: '#f59e0b',
    bg: '#fffbeb',
    border: '#fde68a',
    icon: <ExclamationCircleOutlined />,
    label: '需人工复核',
  },
  reject: {
    color: '#ef4444',
    bg: '#fef2f2',
    border: '#fecaca',
    icon: <CloseCircleOutlined />,
    label: '建议退回',
  },
}

/* ── Component ── */

export default function ReimbursementDetail({
  open,
  record,
  onClose,
}: ReimbursementDetailProps) {
  if (!record) return null

  const cfg = resultConfig[record.aiReviewResult]
  const history = getApplicantHistory(record.applicant)
  const deptAvg = getDepartmentAvg(record.department)

  /* Risk score progress color */
  const scoreColor =
    record.riskScore < 30 ? '#10b981' : record.riskScore < 70 ? '#f59e0b' : '#ef4444'

  /* Expense items table columns */
  const expenseColumns = [
    {
      title: '费用项目',
      dataIndex: 'description',
      key: 'description',
      width: '40%',
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      width: '20%',
      render: (v: number) => formatCurrency(v, 0),
    },
    {
      title: '类别',
      dataIndex: 'category',
      key: 'category',
      width: '20%',
    },
    {
      title: '票据',
      dataIndex: 'receipt',
      key: 'receipt',
      width: '20%',
      render: (v: boolean) =>
        v ? (
          <Tag color="green">已附</Tag>
        ) : (
          <Tag color="default">免票</Tag>
        ),
    },
  ]

  /* History bar chart option */
  const chartOption: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      formatter: (params: unknown) => {
        const items = params as { name: string; value: number }[]
        if (!Array.isArray(items) || !items[0]) return ''
        return `${items[0].name}<br/>报销金额：¥${items[0].value.toLocaleString()}`
      },
    },
    grid: {
      left: 8,
      right: 8,
      top: 8,
      bottom: 4,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: history.map((h) => h.month),
      axisLabel: { fontSize: 11, color: '#94a3b8' },
      axisLine: { lineStyle: { color: '#e2e8f0' } },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        fontSize: 11,
        color: '#94a3b8',
        formatter: (v: number) => `¥${(v / 1000).toFixed(0)}k`,
      },
      splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        type: 'bar',
        data: history.map((h) => h.amount),
        barMaxWidth: 28,
        itemStyle: {
          color: '#1a365d',
          borderRadius: [4, 4, 0, 0],
        },
        emphasis: {
          itemStyle: { color: '#2a4a7f' },
        },
      },
    ],
  }

  return (
    <Drawer
      title={null}
      placement="right"
      width={640}
      open={open}
      onClose={onClose}
      styles={{
        body: { padding: 0 },
      }}
      closable={false}
    >
      {/* ── Custom header ── */}
      <div
        style={{
          padding: '20px 24px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={onClose}
          style={{ color: '#64748b' }}
        />
        <div style={{ flex: 1 }}>
          <Title level={5} style={{ margin: 0, color: '#1a365d' }}>
            {record.id}
          </Title>
          <Text type="secondary" style={{ fontSize: 13 }}>
            {record.applicant} - {record.department}
          </Text>
        </div>
        <Tag
          color={
            record.aiReviewResult === 'pass'
              ? 'success'
              : record.aiReviewResult === 'review'
                ? 'warning'
                : 'error'
          }
          style={{ fontSize: 13, padding: '2px 12px' }}
        >
          {cfg.icon} {cfg.label}
        </Tag>
      </div>

      <div style={{ padding: '20px 24px', overflowY: 'auto', height: 'calc(100vh - 140px)' }}>
        {/* ── 基本信息 ── */}
        <SectionTitle>基本信息</SectionTitle>
        <Descriptions
          column={2}
          size="small"
          style={{ marginBottom: 24 }}
          labelStyle={{ color: '#64748b', fontSize: 13 }}
          contentStyle={{ fontWeight: 500, fontSize: 13 }}
        >
          <Descriptions.Item label="报销类型">
            <Tag>{record.type}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="报销金额">
            <Text strong style={{ color: '#1a365d', fontSize: 15 }}>
              {formatCurrency(record.amount, 0)}
            </Text>
          </Descriptions.Item>
          <Descriptions.Item label="提交日期">{record.submitDate}</Descriptions.Item>
          <Descriptions.Item label="费用明细">
            {record.items.length} 项
          </Descriptions.Item>
        </Descriptions>

        <Divider style={{ margin: '16px 0' }} />

        {/* ── AI审核结果 ── */}
        <SectionTitle>AI审核结果</SectionTitle>

        {/* Risk score bar */}
        <div style={{ marginBottom: 16 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 6,
            }}
          >
            <Text style={{ fontSize: 13, color: '#64748b' }}>风险评分</Text>
            <Text strong style={{ fontSize: 20, color: scoreColor }}>
              {record.riskScore}
              <span style={{ fontSize: 12, fontWeight: 400, color: '#94a3b8' }}> / 100</span>
            </Text>
          </div>
          <div
            style={{
              height: 8,
              background: '#f1f5f9',
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${record.riskScore}%`,
                background: scoreColor,
                borderRadius: 4,
                transition: 'width 0.6s ease',
              }}
            />
          </div>
        </div>

        {/* Risk flags */}
        <div style={{ marginBottom: 16 }}>
          <RiskKeywordAlert flags={record.riskFlags} />
        </div>

        {/* AI comment */}
        <div
          style={{
            padding: '12px 16px',
            background: cfg.bg,
            border: `1px solid ${cfg.border}`,
            borderRadius: 8,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              marginBottom: 6,
            }}
          >
            <span style={{ color: cfg.color, fontSize: 14 }}>{cfg.icon}</span>
            <Text strong style={{ fontSize: 13, color: cfg.color }}>
              AI审核意见
            </Text>
          </div>
          <Text style={{ fontSize: 13, color: '#374151', lineHeight: 1.6 }}>
            {record.aiReviewComment}
          </Text>
        </div>

        <Divider style={{ margin: '16px 0' }} />

        {/* ── 费用明细 ── */}
        <SectionTitle>费用明细</SectionTitle>
        <Table<ReimbursementItem>
          dataSource={record.items}
          columns={expenseColumns}
          rowKey="description"
          pagination={false}
          size="small"
          style={{ marginBottom: 24 }}
          summary={() => (
            <Table.Summary fixed>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>
                  <Text strong>合计</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                  <Text strong style={{ color: '#1a365d' }}>
                    {formatCurrency(
                      record.items.reduce((s, item) => s + item.amount, 0),
                      0,
                    )}
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2} />
                <Table.Summary.Cell index={3}>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {record.items.filter((i) => i.receipt).length}/{record.items.length} 有票
                  </Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )}
        />

        <Divider style={{ margin: '16px 0' }} />

        {/* ── 历史对比 ── */}
        <SectionTitle>历史对比</SectionTitle>

        <Text
          type="secondary"
          style={{ fontSize: 12, display: 'block', marginBottom: 8 }}
        >
          {record.applicant}近6个月报销统计
        </Text>
        <div style={{ height: 180, marginBottom: 16 }}>
          <ReactECharts
            option={chartOption}
            style={{ width: '100%', height: '100%' }}
            opts={{ renderer: 'svg' }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            gap: 16,
            marginBottom: 24,
          }}
        >
          <ComparisonCard
            label="本次报销"
            value={formatCurrency(record.amount, 0)}
            highlight
          />
          <ComparisonCard
            label={`${record.department}人均`}
            value={formatCurrency(deptAvg, 0)}
          />
          <ComparisonCard
            label="差异"
            value={
              record.amount > deptAvg
                ? `+${((record.amount / deptAvg - 1) * 100).toFixed(0)}%`
                : `${((record.amount / deptAvg - 1) * 100).toFixed(0)}%`
            }
            color={record.amount > deptAvg * 1.5 ? '#ef4444' : '#10b981'}
          />
        </div>

        <Divider style={{ margin: '16px 0' }} />

        {/* ── Action buttons ── */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: 16 }}>
          <Space>
            <Button
              type="primary"
              icon={<CheckCircleOutlined />}
              style={{ background: '#10b981', borderColor: '#10b981' }}
            >
              通过
            </Button>
            <Button
              danger
              icon={<CloseCircleOutlined />}
            >
              退回
            </Button>
            <Button icon={<ExclamationCircleOutlined />}>标记待查</Button>
          </Space>
        </div>
      </div>
    </Drawer>
  )
}

/* ── Helper components ── */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 15,
        fontWeight: 600,
        color: '#1a365d',
        marginBottom: 12,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <div
        style={{
          width: 3,
          height: 16,
          background: '#1a365d',
          borderRadius: 2,
        }}
      />
      {children}
    </div>
  )
}

function ComparisonCard({
  label,
  value,
  highlight,
  color,
}: {
  label: string
  value: string
  highlight?: boolean
  color?: string
}) {
  return (
    <div
      style={{
        flex: 1,
        padding: '12px 14px',
        background: highlight ? '#eff6ff' : '#f8fafc',
        borderRadius: 8,
        border: `1px solid ${highlight ? '#bfdbfe' : '#e2e8f0'}`,
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>
        {label}
      </div>
      <div
        style={{
          fontSize: 16,
          fontWeight: 600,
          color: color ?? (highlight ? '#1a365d' : '#374151'),
        }}
      >
        {value}
      </div>
    </div>
  )
}
