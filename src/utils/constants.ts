export type ModuleCategory = '财务管理' | '业务管理' | '合规与知识' | '投资与运营'

export interface ModuleDefinition {
  id: string
  name: string
  icon: string
  path: string
  category: ModuleCategory
  description: string
}

export const MODULE_CATEGORIES: ModuleCategory[] = [
  '财务管理',
  '业务管理',
  '合规与知识',
  '投资与运营',
]

export const MODULES: ModuleDefinition[] = [
  // ── 财务管理 ──
  {
    id: 'accounting',
    name: '会计核算',
    icon: 'CalculatorOutlined',
    path: '/accounting',
    category: '财务管理',
    description: '智能会计核算、凭证审核与账务处理',
  },
  {
    id: 'financial-review',
    name: '财务审核',
    icon: 'AuditOutlined',
    path: '/financial-review',
    category: '财务管理',
    description: '费用报销审核、异常检测与合规校验',
  },
  {
    id: 'financial-analysis',
    name: '财务分析',
    icon: 'BarChartOutlined',
    path: '/financial-analysis',
    category: '财务管理',
    description: '自动生成财务分析报告与可视化看板',
  },
  {
    id: 'tax',
    name: '纳税管理',
    icon: 'AccountBookOutlined',
    path: '/tax',
    category: '财务管理',
    description: '税务合规检查、税负分析与申报辅助',
  },

  // ── 业务管理 ──
  {
    id: 'contract',
    name: '合同管理',
    icon: 'FileProtectOutlined',
    path: '/contract',
    category: '业务管理',
    description: '合同全生命周期管理与关键条款提取',
  },
  {
    id: 'risk-monitoring',
    name: '风险监控',
    icon: 'AlertOutlined',
    path: '/risk-monitoring',
    category: '业务管理',
    description: '综合风险评估模型与预警指标监控',
  },
  {
    id: 'agricultural-data',
    name: '农业保险数据',
    icon: 'DatabaseOutlined',
    path: '/agricultural-data',
    category: '业务管理',
    description: '农业保险数据采集、分析与统计报告',
  },

  // ── 合规与知识 ──
  {
    id: 'knowledge-center',
    name: '智能知识中心',
    icon: 'BookOutlined',
    path: '/knowledge-center',
    category: '合规与知识',
    description: '审计知识沉淀、案例检索与经验共享',
  },
  {
    id: 'compliance',
    name: '合规管理',
    icon: 'SafetyCertificateOutlined',
    path: '/compliance',
    category: '合规与知识',
    description: '监管政策合规性审查与风险提示',
  },

  // ── 投资与运营 ──
  {
    id: 'investment',
    name: '投资管理',
    icon: 'StockOutlined',
    path: '/investment',
    category: '投资与运营',
    description: '投资组合审查、收益分析与风险评估',
  },
  {
    id: 'hr',
    name: 'HR智能',
    icon: 'TeamOutlined',
    path: '/hr',
    category: '投资与运营',
    description: '人力资源智能分析与薪酬审计',
  },
  {
    id: 'it-project',
    name: 'IT项目管理',
    icon: 'LaptopOutlined',
    path: '/it-project',
    category: '投资与运营',
    description: 'IT项目审计、进度追踪与预算管控',
  },
]

/** Get modules filtered by category */
export function getModulesByCategory(category: ModuleCategory): ModuleDefinition[] {
  return MODULES.filter((m) => m.category === category)
}

/** Find a module by its ID */
export function getModuleById(id: string): ModuleDefinition | undefined {
  return MODULES.find((m) => m.id === id)
}

/** Find a module by its path */
export function getModuleByPath(path: string): ModuleDefinition | undefined {
  return MODULES.find((m) => m.path === path)
}
