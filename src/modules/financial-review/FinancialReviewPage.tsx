import { Row, Col, Card, Table, Tag, Badge } from 'antd'
import {
  AuditOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  WarningOutlined,
} from '@ant-design/icons'
import PageHeader from '../../components/common/PageHeader'
import StatCard from '../../components/dashboard/StatCard'

const reimbursementData = [
  { key: '1', id: 'BX-2024-0892', applicant: '王建', dept: '业务一部', amount: '¥8,650', type: '差旅费', date: '2024-09-15', status: '待审核', risk: 'high' },
  { key: '2', id: 'BX-2024-0893', applicant: '李芳', dept: '财务部', amount: '¥2,340', type: '办公用品', date: '2024-09-15', status: '已通过', risk: 'low' },
  { key: '3', id: 'BX-2024-0894', applicant: '张伟', dept: '精算部', amount: '¥15,800', type: '业务招待', date: '2024-09-14', status: '待审核', risk: 'medium' },
  { key: '4', id: 'BX-2024-0895', applicant: '陈静', dept: '投资部', amount: '¥4,200', type: '培训费', date: '2024-09-14', status: '已通过', risk: 'low' },
  { key: '5', id: 'BX-2024-0896', applicant: '刘洋', dept: '业务二部', amount: '¥12,500', type: '差旅费', date: '2024-09-13', status: '退回', risk: 'high' },
  { key: '6', id: 'BX-2024-0897', applicant: '赵敏', dept: '人力资源部', amount: '¥3,680', type: '办公用品', date: '2024-09-13', status: '已通过', risk: 'low' },
]

const columns = [
  { title: '单号', dataIndex: 'id', key: 'id', width: 140 },
  { title: '申请人', dataIndex: 'applicant', key: 'applicant', width: 80 },
  { title: '部门', dataIndex: 'dept', key: 'dept', width: 100 },
  { title: '金额', dataIndex: 'amount', key: 'amount', width: 100 },
  { title: '类型', dataIndex: 'type', key: 'type', width: 90, render: (t: string) => <Tag>{t}</Tag> },
  { title: '日期', dataIndex: 'date', key: 'date', width: 110 },
  {
    title: '风险',
    dataIndex: 'risk',
    key: 'risk',
    width: 80,
    render: (r: string) => {
      const map: Record<string, { color: string; text: string }> = {
        high: { color: 'red', text: '高' },
        medium: { color: 'orange', text: '中' },
        low: { color: 'green', text: '低' },
      }
      const conf = map[r] || map.low
      return <Tag color={conf.color}>{conf.text}</Tag>
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 90,
    render: (s: string) => {
      const map: Record<string, 'success' | 'warning' | 'error' | 'processing'> = {
        '已通过': 'success', '待审核': 'warning', '退回': 'error',
      }
      return <Badge status={map[s] || 'default'} text={s} />
    },
  },
]

export default function FinancialReviewPage() {
  return (
    <div>
      <PageHeader
        title="财务审核"
        description="费用报销审核、异常检测与合规校验"
        suggestedPrompts={['审核本周报销单', '检查费用超标', '查看审批流程']}
      />

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="本周待审"
            value="23"
            prefix={<AuditOutlined />}
            trend="up"
            trendValue="+5 新增"
            color="#3b82f6"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="已通过"
            value="186"
            prefix={<CheckCircleOutlined />}
            trend="up"
            trendValue="+12.3%"
            color="#10b981"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="平均审核时间"
            value="1.8天"
            prefix={<ClockCircleOutlined />}
            trend="down"
            trendValue="-0.3天"
            color="#8b5cf6"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="异常标记"
            value="5"
            prefix={<WarningOutlined />}
            trend="up"
            trendValue="+2 本周"
            color="#ef4444"
          />
        </Col>
      </Row>

      <Card
        title="报销单审核列表"
        style={{ borderRadius: 12, border: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
      >
        <Table columns={columns} dataSource={reimbursementData} pagination={false} size="small" scroll={{ x: 800 }} />
      </Card>
    </div>
  )
}
