import { Row, Col, Card, Table, Tag, Progress } from 'antd'
import {
  LaptopOutlined,
  RobotOutlined,
  CheckCircleOutlined,
  FileTextOutlined,
  BulbOutlined,
} from '@ant-design/icons'
import { motion } from 'framer-motion'
import ReactECharts from 'echarts-for-react'
import type { EChartsOption } from 'echarts'
import type { ColumnsType } from 'antd/es/table'
import PageHeader from '../../components/common/PageHeader'

// ── KPI Data ──

const kpiData = [
  { label: '在建项目', value: '8个', icon: <LaptopOutlined />, color: '#1a365d', trend: '+2个', trendUp: true },
  { label: 'AI编码率', value: '35%', icon: <RobotOutlined />, color: '#8b5cf6', trend: '+12%', trendUp: true },
  { label: '测试通过率', value: '92%', icon: <CheckCircleOutlined />, color: '#10b981', trend: '+3%', trendUp: true },
  { label: '文档质量分', value: '87分', icon: <FileTextOutlined />, color: '#d4a843', trend: '+5分', trendUp: true },
]

// ── Project Table ──

interface ProjectItem {
  key: string
  name: string
  phase: string
  progress: number
  aiRate: number
  qualityScore: number
  manager: string
  budget: string
  status: '进行中' | '已完成' | '启动中' | '暂停'
}

const projectData: ProjectItem[] = [
  { key: '1', name: 'AI智能审计系统', phase: '开发阶段', progress: 68, aiRate: 52, qualityScore: 92, manager: '张明', budget: '¥980万', status: '进行中' },
  { key: '2', name: '核心业务系统升级', phase: '测试阶段', progress: 85, aiRate: 28, qualityScore: 88, manager: '周强', budget: '¥2,800万', status: '进行中' },
  { key: '3', name: '数据中台建设', phase: '开发阶段', progress: 45, aiRate: 42, qualityScore: 85, manager: '林悦', budget: '¥1,500万', status: '进行中' },
  { key: '4', name: '移动办公平台', phase: '需求阶段', progress: 22, aiRate: 35, qualityScore: 90, manager: '陈峰', budget: '¥560万', status: '启动中' },
  { key: '5', name: '灾备中心迁移', phase: '验收阶段', progress: 95, aiRate: 15, qualityScore: 91, manager: '王涛', budget: '¥650万', status: '进行中' },
  { key: '6', name: '网络安全加固', phase: '已完成', progress: 100, aiRate: 20, qualityScore: 94, manager: '李华', budget: '¥420万', status: '已完成' },
  { key: '7', name: '农险数据分析平台', phase: '开发阶段', progress: 55, aiRate: 48, qualityScore: 86, manager: '赵晨', budget: '¥780万', status: '进行中' },
  { key: '8', name: '智能知识库系统', phase: '设计阶段', progress: 30, aiRate: 38, qualityScore: 83, manager: '吴婷', budget: '¥320万', status: '启动中' },
]

const projectColumns: ColumnsType<ProjectItem> = [
  { title: '项目名称', dataIndex: 'name', key: 'name', width: 180 },
  {
    title: '阶段', dataIndex: 'phase', key: 'phase', width: 100,
    render: (p: string) => {
      const m: Record<string, string> = { '需求阶段': 'default', '设计阶段': 'blue', '开发阶段': 'processing', '测试阶段': 'orange', '验收阶段': 'green', '已完成': 'success' }
      return <Tag color={m[p] || 'default'}>{p}</Tag>
    },
  },
  {
    title: '进度', dataIndex: 'progress', key: 'progress', width: 150,
    render: (v: number) => <Progress percent={v} size="small" strokeColor={v >= 80 ? '#10b981' : v >= 50 ? '#3b82f6' : '#f59e0b'} />,
  },
  {
    title: 'AI辅助率', dataIndex: 'aiRate', key: 'aiRate', width: 120,
    render: (v: number) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <Progress percent={v} size="small" strokeColor="#8b5cf6" showInfo={false} style={{ flex: 1 }} />
        <span style={{ fontSize: 12, color: '#8b5cf6', fontWeight: 500, minWidth: 32 }}>{v}%</span>
      </div>
    ),
  },
  {
    title: '质量评分', dataIndex: 'qualityScore', key: 'qualityScore', width: 100, align: 'center',
    render: (v: number) => (
      <span style={{
        padding: '2px 10px', borderRadius: 12, fontSize: 12, fontWeight: 600,
        background: v >= 90 ? '#dcfce7' : v >= 85 ? '#dbeafe' : '#fef3c7',
        color: v >= 90 ? '#166534' : v >= 85 ? '#1e40af' : '#92400e',
      }}>
        {v}
      </span>
    ),
  },
  { title: '负责人', dataIndex: 'manager', key: 'manager', width: 80 },
  { title: '预算', dataIndex: 'budget', key: 'budget', width: 100 },
  {
    title: '状态', dataIndex: 'status', key: 'status', width: 90,
    render: (s: string) => {
      const m: Record<string, string> = { '进行中': 'processing', '已完成': 'success', '启动中': 'blue', '暂停': 'default' }
      return <Tag color={m[s]}>{s}</Tag>
    },
  },
]

// ── Document Quality Check ──

const docCheckData = [
  { name: '立项建议书', project: 'AI智能审计系统', score: 95, issues: 0, status: '通过' },
  { name: '需求规格说明书', project: '数据中台建设', score: 82, issues: 3, status: '需修改' },
  { name: '招标文件', project: '移动办公平台', score: 78, issues: 5, status: '需修改' },
  { name: '概要设计文档', project: '核心业务系统升级', score: 91, issues: 1, status: '通过' },
  { name: '测试报告', project: '灾备中心迁移', score: 94, issues: 0, status: '通过' },
  { name: '验收方案', project: '网络安全加固', score: 96, issues: 0, status: '通过' },
]

// ── Code Generation Metrics Chart ──

const codeMetricsOption: EChartsOption = {
  title: { text: 'AI代码生成指标', textStyle: { fontSize: 14, fontWeight: 600, color: '#1a365d' }, left: 0 },
  tooltip: { trigger: 'axis', backgroundColor: 'rgba(255,255,255,0.96)', borderColor: '#e2e8f0', textStyle: { color: '#1a202c' } },
  legend: { top: 28, right: 0, textStyle: { fontSize: 12, color: '#64748b' } },
  grid: { left: 12, right: 16, bottom: 8, top: 56, containLabel: true },
  xAxis: {
    type: 'category',
    data: ['4月', '5月', '6月', '7月', '8月', '9月'],
    axisLine: { lineStyle: { color: '#e2e8f0' } },
    axisTick: { show: false },
    axisLabel: { color: '#94a3b8', fontSize: 11 },
  },
  yAxis: [
    {
      type: 'value',
      name: '代码行数(千)',
      nameTextStyle: { color: '#94a3b8', fontSize: 11 },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#94a3b8', fontSize: 11 },
      splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
    },
    {
      type: 'value',
      name: 'AI占比(%)',
      nameTextStyle: { color: '#94a3b8', fontSize: 11 },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#94a3b8', fontSize: 11, formatter: '{value}%' },
      splitLine: { show: false },
    },
  ],
  series: [
    {
      name: '总代码量',
      type: 'bar',
      data: [18, 22, 28, 32, 35, 38],
      barMaxWidth: 28,
      itemStyle: { color: '#1a365d', borderRadius: [4, 4, 0, 0] },
    },
    {
      name: 'AI生成量',
      type: 'bar',
      data: [4, 6, 9, 12, 14, 16],
      barMaxWidth: 28,
      itemStyle: { color: '#8b5cf6', borderRadius: [4, 4, 0, 0] },
    },
    {
      name: 'AI占比',
      type: 'line',
      yAxisIndex: 1,
      data: [22, 27, 32, 37, 40, 42],
      smooth: true,
      symbol: 'circle',
      symbolSize: 6,
      lineStyle: { width: 2.5, color: '#10b981' },
      itemStyle: { color: '#10b981' },
    },
  ],
}

// ── Animation ──

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } }
const itemVariants = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } } }

// ── Main Component ──

export default function ITProjectPage() {
  return (
    <motion.div className="p-6" variants={containerVariants} initial="hidden" animate="visible">
      <PageHeader
        title="IT项目管理"
        description="IT项目审计、进度追踪与预算管控"
        suggestedPrompts={['项目进度总览', 'AI编码效率报告', '文档质量检查', '预算执行分析']}
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

      {/* Project Table */}
      <motion.div variants={itemVariants} className="mb-4">
        <Card
          title={<span className="text-sm font-semibold text-[#1a365d]">项目清单</span>}
          style={{ borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: 'none' }}
        >
          <Table columns={projectColumns} dataSource={projectData} pagination={false} size="small" scroll={{ x: 900 }} />
        </Card>
      </motion.div>

      {/* Bottom Row: Doc Quality + Code Metrics */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={10}>
          <motion.div variants={itemVariants}>
            <Card
              title={<span><BulbOutlined style={{ color: '#d4a843', marginRight: 8 }} />文档质量检查</span>}
              style={{ borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: 'none', height: '100%' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {docCheckData.map((d, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '10px 14px', borderRadius: 8, background: '#f8fafc', border: '1px solid #e2e8f0',
                  }}>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: 13, color: '#1a202c' }}>{d.name}</div>
                      <div style={{ fontSize: 11, color: '#94a3b8' }}>{d.project}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{
                        padding: '2px 10px', borderRadius: 12, fontSize: 12, fontWeight: 600,
                        background: d.score >= 90 ? '#dcfce7' : d.score >= 80 ? '#fef3c7' : '#fef2f2',
                        color: d.score >= 90 ? '#166534' : d.score >= 80 ? '#92400e' : '#991b1b',
                      }}>
                        {d.score}分
                      </span>
                      <Tag color={d.status === '通过' ? 'green' : 'orange'}>{d.status}</Tag>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </Col>
        <Col xs={24} lg={14}>
          <motion.div variants={itemVariants}>
            <Card style={{ borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: 'none', height: '100%' }}>
              <ReactECharts option={codeMetricsOption} style={{ width: '100%', height: 360 }} opts={{ renderer: 'svg' }} />
            </Card>
          </motion.div>
        </Col>
      </Row>
    </motion.div>
  )
}
