import { reimbursements } from '../../data/mock-datasets/reimbursements'
import type { Reimbursement } from '../../data/mock-datasets/reimbursements'

/* ── Department stats ── */

export interface DepartmentStat {
  department: string
  totalAmount: number
  count: number
  avgAmount: number
  anomalyCount: number
  anomalyRate: number
}

export function computeDepartmentStats(): DepartmentStat[] {
  const map = new Map<
    string,
    { total: number; count: number; anomalies: number }
  >()

  for (const r of reimbursements) {
    const cur = map.get(r.department) ?? { total: 0, count: 0, anomalies: 0 }
    cur.total += r.amount
    cur.count += 1
    if (r.riskScore >= 70) cur.anomalies += 1
    map.set(r.department, cur)
  }

  return Array.from(map.entries())
    .map(([dept, v]) => ({
      department: dept,
      totalAmount: v.total,
      count: v.count,
      avgAmount: Math.round(v.total / v.count),
      anomalyCount: v.anomalies,
      anomalyRate: v.count > 0 ? v.anomalies / v.count : 0,
    }))
    .sort((a, b) => b.totalAmount - a.totalAmount)
}

/* ── Monthly trend ── */

export interface MonthlyTrend {
  month: string
  amount: number
  count: number
}

export function computeMonthlyTrend(): MonthlyTrend[] {
  const map = new Map<string, { amount: number; count: number }>()

  for (const r of reimbursements) {
    const month = r.submitDate.slice(0, 7) // e.g. "2025-01"
    const cur = map.get(month) ?? { amount: 0, count: 0 }
    cur.amount += r.amount
    cur.count += 1
    map.set(month, cur)
  }

  return Array.from(map.entries())
    .map(([month, v]) => ({ month, ...v }))
    .sort((a, b) => a.month.localeCompare(b.month))
}

/* ── Risk distribution ── */

export interface RiskDistribution {
  level: '低风险' | '中风险' | '高风险'
  count: number
  color: string
}

export function computeRiskDistribution(): RiskDistribution[] {
  let low = 0
  let medium = 0
  let high = 0

  for (const r of reimbursements) {
    if (r.riskScore < 30) low++
    else if (r.riskScore < 70) medium++
    else high++
  }

  return [
    { level: '低风险', count: low, color: '#10b981' },
    { level: '中风险', count: medium, color: '#f59e0b' },
    { level: '高风险', count: high, color: '#ef4444' },
  ]
}

/* ── Summary stats ── */

export interface SummaryStats {
  totalCount: number
  autoReviewed: number
  autoReviewRate: number
  anomalyCount: number
  totalAmount: number
}

export function computeSummaryStats(): SummaryStats {
  const total = reimbursements.length
  const anomalies = reimbursements.filter((r) => r.riskScore >= 70)
  const autoReviewed = total - anomalies.length
  const totalAmount = reimbursements.reduce((sum, r) => sum + r.amount, 0)

  return {
    totalCount: total,
    autoReviewed,
    autoReviewRate: autoReviewed / total,
    anomalyCount: anomalies.length,
    totalAmount,
  }
}

/* ── Applicant history (fake 6-month data for detail view) ── */

export function getApplicantHistory(applicant: string): { month: string; amount: number }[] {
  const months = ['2025-04', '2025-05', '2025-06', '2025-07', '2025-08', '2025-09']

  // Build real data from reimbursements
  const realData = new Map<string, number>()
  for (const r of reimbursements) {
    if (r.applicant !== applicant) continue
    const month = r.submitDate.slice(0, 7)
    realData.set(month, (realData.get(month) ?? 0) + r.amount)
  }

  // Fill in synthetic data for months without real entries
  const seed = applicant.charCodeAt(0) + applicant.charCodeAt(1)
  return months.map((month, i) => ({
    month,
    amount: realData.get(month) ?? Math.round(2000 + ((seed * (i + 1) * 137) % 8000)),
  }))
}

/* ── Department average for comparison ── */

export function getDepartmentAvg(department: string): number {
  const deptRecords = reimbursements.filter((r) => r.department === department)
  if (deptRecords.length === 0) return 0
  return Math.round(
    deptRecords.reduce((sum, r) => sum + r.amount, 0) / deptRecords.length,
  )
}

/* ── Contract review data ── */

export interface ContractReview {
  id: string
  name: string
  counterparty: string
  amount: number
  type: string
  riskLevel: '低' | '中' | '高'
  aiComment: string
  submitDate: string
}

export const contractReviews: ContractReview[] = [
  {
    id: 'HT-2025-001',
    name: '水稻种植险再保险合同',
    counterparty: '人保财险',
    amount: 45_800_000,
    type: '再保险合同',
    riskLevel: '低',
    aiComment: '条款完整，费率符合精算模型预估，无异常条款。',
    submitDate: '2025-08-15',
  },
  {
    id: 'HT-2025-002',
    name: '转分保框架协议',
    counterparty: '慕尼黑再保险',
    amount: 120_000_000,
    type: '转分保合同',
    riskLevel: '中',
    aiComment: '注意：汇率风险敞口条款缺少上限约定，建议补充汇率波动超过5%时的调整机制。',
    submitDate: '2025-08-20',
  },
  {
    id: 'HT-2025-003',
    name: 'IT系统运维服务合同',
    counterparty: '中软国际',
    amount: 8_500_000,
    type: '服务合同',
    riskLevel: '低',
    aiComment: 'SLA指标明确，违约责任条款齐全，价格在市场合理区间。',
    submitDate: '2025-08-25',
  },
  {
    id: 'HT-2025-004',
    name: '办公楼租赁续约合同',
    counterparty: '北京金融街物业',
    amount: 18_000_000,
    type: '租赁合同',
    riskLevel: '高',
    aiComment: '警告：租金涨幅8%高于市场平均水平（3-5%），且缺少提前终止权条款。建议重新谈判租金及补充退出条款。',
    submitDate: '2025-09-01',
  },
  {
    id: 'HT-2025-005',
    name: '生猪养殖险再保险合同',
    counterparty: '太平洋财险',
    amount: 32_100_000,
    type: '再保险合同',
    riskLevel: '低',
    aiComment: '赔付触发条件明确，附加条款与主险一致，合规性良好。',
    submitDate: '2025-09-05',
  },
  {
    id: 'HT-2025-006',
    name: '棉花种植险合作协议',
    counterparty: '新疆农业保险公司',
    amount: 25_600_000,
    type: '合作协议',
    riskLevel: '中',
    aiComment: '注意：自然灾害免赔条款范围较窄，极端天气事件可能导致超额赔付。建议增加巨灾止损条款。',
    submitDate: '2025-09-08',
  },
]

/* ── Procurement review data ── */

export interface ProcurementItem {
  id: string
  name: string
  vendor: string
  amount: number
  category: string
  status: '待审核' | '审核中' | '已通过'
  submitDate: string
}

export const procurementItems: ProcurementItem[] = [
  {
    id: 'CG-2025-001',
    name: '服务器集群扩容采购',
    vendor: '华为技术有限公司',
    amount: 2_800_000,
    category: 'IT设备',
    status: '审核中',
    submitDate: '2025-09-01',
  },
  {
    id: 'CG-2025-002',
    name: '办公家具批量更新',
    vendor: '圣奥集团',
    amount: 580_000,
    category: '办公用品',
    status: '待审核',
    submitDate: '2025-09-03',
  },
  {
    id: 'CG-2025-003',
    name: '网络安全审计系统',
    vendor: '奇安信科技',
    amount: 1_200_000,
    category: 'IT软件',
    status: '已通过',
    submitDate: '2025-08-28',
  },
  {
    id: 'CG-2025-004',
    name: '年度体检服务采购',
    vendor: '美年大健康',
    amount: 486_000,
    category: '员工福利',
    status: '待审核',
    submitDate: '2025-09-05',
  },
]
