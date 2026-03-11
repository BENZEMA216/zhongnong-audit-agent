import { Row, Col, Card, Table, Tag, Input } from 'antd'
import {
  BookOutlined,
  PlusCircleOutlined,
  FileTextOutlined,
  SearchOutlined,
  BankOutlined,
  SafetyCertificateOutlined,
  BarChartOutlined,
  ApartmentOutlined,
} from '@ant-design/icons'
import { motion } from 'framer-motion'
import type { ColumnsType } from 'antd/es/table'
import PageHeader from '../../components/common/PageHeader'

// ── KPI Data ──

const kpiData = [
  { label: '知识条目', value: '8,456条', icon: <BookOutlined />, color: '#1a365d', trend: '+256条', trendUp: true },
  { label: '本月新增', value: '128条', icon: <PlusCircleOutlined />, color: '#10b981', trend: '+32%', trendUp: true },
  { label: '政策更新', value: '15条', icon: <FileTextOutlined />, color: '#6366f1', trend: '+5条', trendUp: true },
  { label: '用户查询', value: '2,340次', icon: <SearchOutlined />, color: '#d4a843', trend: '+18.7%', trendUp: true },
]

// ── Recent Policy Updates ──

interface PolicyUpdate {
  key: string
  name: string
  source: string
  date: string
  category: string
  aiSummary: string
  impact: '高' | '中' | '低'
}

const policyUpdates: PolicyUpdate[] = [
  { key: '1', name: '农业保险条例修订稿', source: '国务院', date: '2025-09-03', category: '法律法规', aiSummary: '扩大农业保险覆盖范围，新增水产养殖、设施农业等品种，提高保障水平要求。对再保险人的责任分摊比例提出新要求。', impact: '高' },
  { key: '2', name: '再保险公司分类监管评价办法', source: '金融监管总局', date: '2025-09-01', category: '监管政策', aiSummary: '建立再保险公司A/B/C/D四级分类评价体系，评价结果直接影响业务范围和资本充足率要求。', impact: '高' },
  { key: '3', name: '保险资金运用管理办法(修订)', source: '金融监管总局', date: '2025-08-28', category: '监管政策', aiSummary: '放宽保险资金投资范围，允许投资REITs和绿色债券；强化集中度管理和关联交易监管。', impact: '中' },
  { key: '4', name: '偿付能力监管规则II更新', source: '金融监管总局', date: '2025-08-25', category: '监管政策', aiSummary: '调整风险因子计量方法，新增气候风险资本要求；对农业再保险人给予差异化资本优惠。', impact: '高' },
  { key: '5', name: '企业内部控制评价指引', source: '财政部', date: '2025-08-20', category: '公司制度', aiSummary: '细化内控评价方法，强调IT环境下的控制有效性评估，增加数据安全和算法审计要求。', impact: '中' },
  { key: '6', name: '农业保险大灾风险准备金管理办法', source: '财政部', date: '2025-08-15', category: '行业研究', aiSummary: '明确大灾准备金计提比例、使用条件和管理要求，建立跨年度风险调节机制。', impact: '中' },
  { key: '7', name: '反洗钱和反恐怖融资管理办法(修订)', source: '中国人民银行', date: '2025-08-10', category: '法律法规', aiSummary: '提高可疑交易报告标准，增加保险业特定情景识别要求，强化客户尽职调查。', impact: '低' },
]

const policyColumns: ColumnsType<PolicyUpdate> = [
  { title: '政策名称', dataIndex: 'name', key: 'name', width: 240 },
  { title: '发布机构', dataIndex: 'source', key: 'source', width: 120, render: (t: string) => <Tag color="blue">{t}</Tag> },
  { title: '分类', dataIndex: 'category', key: 'category', width: 100, render: (t: string) => <Tag>{t}</Tag> },
  { title: '日期', dataIndex: 'date', key: 'date', width: 110 },
  { title: 'AI摘要', dataIndex: 'aiSummary', key: 'aiSummary', ellipsis: true },
  {
    title: '影响度', dataIndex: 'impact', key: 'impact', width: 80,
    render: (i: string) => {
      const m: Record<string, string> = { '高': 'red', '中': 'orange', '低': 'green' }
      return <Tag color={m[i]}>{i}</Tag>
    },
  },
]

// ── Knowledge Categories ──

const categories = [
  { icon: <BankOutlined />, name: '法律法规', count: 2345, description: '国家法律、行政法规、部门规章', color: '#1a365d', recent: 3 },
  { icon: <SafetyCertificateOutlined />, name: '监管政策', count: 1856, description: '金融监管总局、央行发布的监管文件', color: '#6366f1', recent: 8 },
  { icon: <BarChartOutlined />, name: '行业研究', count: 2123, description: '保险行业报告、研究论文、案例分析', color: '#10b981', recent: 2 },
  { icon: <ApartmentOutlined />, name: '公司制度', count: 2132, description: '内部管理制度、操作流程、工作规范', color: '#d4a843', recent: 2 },
]

// ── Animation ──

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } }
const itemVariants = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } } }

// ── Main Component ──

export default function KnowledgeCenterPage() {
  return (
    <motion.div className="p-6" variants={containerVariants} initial="hidden" animate="visible">
      <PageHeader
        title="智能知识中心"
        description="审计知识沉淀、案例检索与经验共享"
        suggestedPrompts={['搜索再保险相关法规', '最新监管政策解读', '查看审计案例库', '农业保险政策汇总']}
      />

      {/* KPI Cards */}
      <Row gutter={[16, 16]} className="mb-4">
        {kpiData.map((item) => (
          <Col key={item.label} xs={12} sm={12} lg={6}>
            <motion.div variants={itemVariants}>
              <Card style={{ borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: 'none' }} styles={{ body: { padding: '16px 20px' } }}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[#94a3b8] text-xs mb-1.5">{item.label}</div>
                    <div className="text-[#1a202c] text-xl font-semibold">{item.value}</div>
                    <div className="text-xs mt-1.5" style={{ color: '#10b981' }}>{item.trend}</div>
                  </div>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-base" style={{ background: `${item.color}12`, color: item.color }}>{item.icon}</div>
                </div>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      {/* Search Bar */}
      <motion.div variants={itemVariants} className="mb-4">
        <Card style={{ borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: 'none' }}>
          <Input.Search
            placeholder="搜索知识库：输入关键词、法规名称或问题描述，AI将为您精准检索和解读..."
            size="large"
            enterButton="智能搜索"
            style={{ maxWidth: 800 }}
          />
          <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, color: '#94a3b8' }}>热门搜索：</span>
            {['偿付能力', '农业保险条例', '再保合同条款', '大灾准备金', '反洗钱'].map((t) => (
              <Tag key={t} style={{ cursor: 'pointer', fontSize: 12 }}>{t}</Tag>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Knowledge Categories */}
      <Row gutter={[16, 16]} className="mb-4">
        {categories.map((cat) => (
          <Col key={cat.name} xs={12} sm={12} lg={6}>
            <motion.div variants={itemVariants}>
              <Card
                style={{ borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: 'none', cursor: 'pointer' }}
                hoverable
                styles={{ body: { padding: '20px 24px' } }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: `${cat.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: cat.color }}>
                    {cat.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: '#1a202c', fontSize: 15 }}>{cat.name}</div>
                    <div style={{ fontSize: 12, color: '#94a3b8' }}>{cat.count.toLocaleString()} 条</div>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>{cat.description}</div>
                {cat.recent > 0 && (
                  <Tag color="blue" style={{ fontSize: 11 }}>本月新增 {cat.recent} 条</Tag>
                )}
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      {/* Recent Policy Updates Table */}
      <motion.div variants={itemVariants}>
        <Card
          title={<span className="text-sm font-semibold text-[#1a365d]">最新政策更新</span>}
          style={{ borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: 'none' }}
        >
          <Table columns={policyColumns} dataSource={policyUpdates} pagination={false} size="small" scroll={{ x: 900 }} />
        </Card>
      </motion.div>
    </motion.div>
  )
}
