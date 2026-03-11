import { Row, Col, Card, Tag } from 'antd'
import {
  TeamOutlined,
  UserAddOutlined,
  ReadOutlined,
  TrophyOutlined,
  RobotOutlined,
} from '@ant-design/icons'
import { motion } from 'framer-motion'
import ReactECharts from 'echarts-for-react'
import type { EChartsOption } from 'echarts'
import PageHeader from '../../components/common/PageHeader'

// ── KPI Data ──

const kpiData = [
  { label: '员工总数', value: '486人', icon: <TeamOutlined />, color: '#1a365d', trend: '+18人', trendUp: true },
  { label: '本年招聘', value: '52人', icon: <UserAddOutlined />, color: '#10b981', trend: '完成率78%', trendUp: true },
  { label: '培训覆盖率', value: '89%', icon: <ReadOutlined />, color: '#6366f1', trend: '+12%', trendUp: true },
  { label: '人才储备', value: '28人', icon: <TrophyOutlined />, color: '#d4a843', trend: '+5人', trendUp: true },
]

// ── Radar Chart: Talent Capabilities ──

const radarOption: EChartsOption = {
  title: { text: '人才能力雷达图', textStyle: { fontSize: 14, fontWeight: 600, color: '#1a365d' }, left: 0 },
  tooltip: {},
  radar: {
    indicator: [
      { name: '专业能力', max: 100 },
      { name: '管理能力', max: 100 },
      { name: '创新能力', max: 100 },
      { name: '团队协作', max: 100 },
      { name: '学习能力', max: 100 },
    ],
    radius: '65%',
    center: ['50%', '55%'],
    axisName: { color: '#64748b', fontSize: 12 },
    splitArea: { areaStyle: { color: ['#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1'] } },
  },
  series: [
    {
      type: 'radar',
      data: [
        {
          value: [88, 75, 72, 92, 85],
          name: '公司平均',
          areaStyle: { color: 'rgba(26, 54, 93, 0.15)' },
          lineStyle: { color: '#1a365d', width: 2 },
          itemStyle: { color: '#1a365d' },
        },
        {
          value: [82, 78, 80, 85, 90],
          name: '行业标杆',
          areaStyle: { color: 'rgba(16, 185, 129, 0.1)' },
          lineStyle: { color: '#10b981', width: 2, type: 'dashed' },
          itemStyle: { color: '#10b981' },
        },
      ],
    },
  ],
  legend: {
    bottom: 0,
    textStyle: { fontSize: 12, color: '#64748b' },
  },
}

// ── Bar Chart: Department Headcount ──

const barChartOption: EChartsOption = {
  title: { text: '部门人员分布', textStyle: { fontSize: 14, fontWeight: 600, color: '#1a365d' }, left: 0 },
  tooltip: { trigger: 'axis', backgroundColor: 'rgba(255,255,255,0.96)', borderColor: '#e2e8f0', textStyle: { color: '#1a202c' } },
  grid: { left: 12, right: 16, bottom: 8, top: 36, containLabel: true },
  xAxis: {
    type: 'category',
    data: ['承保部', '理赔部', '再保部', '精算部', '投资部', '财务部', '合规部', '科技部', '综合部', '审计部'],
    axisLine: { lineStyle: { color: '#e2e8f0' } },
    axisTick: { show: false },
    axisLabel: { color: '#94a3b8', fontSize: 11, rotate: 30 },
  },
  yAxis: {
    type: 'value',
    name: '人',
    nameTextStyle: { color: '#94a3b8', fontSize: 11 },
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { color: '#94a3b8', fontSize: 11 },
    splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
  },
  series: [
    {
      type: 'bar',
      data: [
        { value: 86, itemStyle: { color: '#1a365d' } },
        { value: 72, itemStyle: { color: '#3b82f6' } },
        { value: 58, itemStyle: { color: '#6366f1' } },
        { value: 42, itemStyle: { color: '#8b5cf6' } },
        { value: 45, itemStyle: { color: '#10b981' } },
        { value: 38, itemStyle: { color: '#d4a843' } },
        { value: 28, itemStyle: { color: '#f59e0b' } },
        { value: 56, itemStyle: { color: '#0ea5e9' } },
        { value: 35, itemStyle: { color: '#94a3b8' } },
        { value: 26, itemStyle: { color: '#ef4444' } },
      ],
      barMaxWidth: 36,
      itemStyle: { borderRadius: [4, 4, 0, 0] },
    },
  ],
}

// ── AI Talent Recommendations ──

const talentRecommendations = [
  {
    name: '张明',
    department: '精算部',
    position: '高级精算师',
    matchScore: 96,
    strengths: ['精算模型开发', 'Python数据分析', '农业保险定价'],
    targetRole: '精算部副总经理',
    avatar: '张',
  },
  {
    name: '李婷',
    department: '科技部',
    position: '高级系统架构师',
    matchScore: 92,
    strengths: ['系统架构设计', 'AI/ML应用', '大规模数据处理'],
    targetRole: '科技部技术总监',
    avatar: '李',
  },
  {
    name: '王磊',
    department: '合规部',
    position: '合规经理',
    matchScore: 88,
    strengths: ['保险法规', '监管沟通', '内控体系建设'],
    targetRole: '合规部副总经理',
    avatar: '王',
  },
]

// ── Animation ──

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } }
const itemVariants = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } } }

// ── Main Component ──

export default function HRPage() {
  return (
    <motion.div className="p-6" variants={containerVariants} initial="hidden" animate="visible">
      <PageHeader
        title="HR智能"
        description="人力资源智能分析与薪酬审计"
        suggestedPrompts={['人才盘点报告', '薪酬审计分析', '培训覆盖统计', '组织架构优化建议']}
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

      {/* Charts Row */}
      <Row gutter={[16, 16]} className="mb-4">
        <Col xs={24} lg={12}>
          <motion.div variants={itemVariants}>
            <Card style={{ borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: 'none', height: '100%' }}>
              <ReactECharts option={radarOption} style={{ width: '100%', height: 360 }} opts={{ renderer: 'svg' }} />
            </Card>
          </motion.div>
        </Col>
        <Col xs={24} lg={12}>
          <motion.div variants={itemVariants}>
            <Card style={{ borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: 'none', height: '100%' }}>
              <ReactECharts option={barChartOption} style={{ width: '100%', height: 360 }} opts={{ renderer: 'svg' }} />
            </Card>
          </motion.div>
        </Col>
      </Row>

      {/* AI Talent Recommendations */}
      <motion.div variants={itemVariants}>
        <Card
          title={<span><RobotOutlined style={{ color: '#8b5cf6', marginRight: 8 }} />AI人才推荐</span>}
          style={{ borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: 'none' }}
        >
          <Row gutter={[16, 16]}>
            {talentRecommendations.map((t, i) => (
              <Col key={i} xs={24} sm={24} lg={8}>
                <div style={{
                  padding: 20,
                  borderRadius: 10,
                  background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                  border: '1px solid #e2e8f0',
                  height: '100%',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #1a365d, #3b82f6)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontWeight: 700, fontSize: 16,
                    }}>
                      {t.avatar}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 15, color: '#1a202c' }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: '#64748b' }}>{t.department} / {t.position}</div>
                    </div>
                    <div style={{
                      marginLeft: 'auto',
                      padding: '4px 10px',
                      borderRadius: 20,
                      background: t.matchScore >= 95 ? '#dcfce7' : t.matchScore >= 90 ? '#dbeafe' : '#fef3c7',
                      color: t.matchScore >= 95 ? '#166534' : t.matchScore >= 90 ? '#1e40af' : '#92400e',
                      fontSize: 13, fontWeight: 700,
                    }}>
                      {t.matchScore}%
                    </div>
                  </div>

                  <div style={{ marginBottom: 10 }}>
                    <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>推荐岗位</div>
                    <Tag color="blue">{t.targetRole}</Tag>
                  </div>

                  <div>
                    <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>核心优势</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {t.strengths.map((s) => (
                        <Tag key={s} style={{ fontSize: 11, borderRadius: 4 }}>{s}</Tag>
                      ))}
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Card>
      </motion.div>
    </motion.div>
  )
}
