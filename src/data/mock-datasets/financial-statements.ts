export interface BalanceSheetItem {
  name: string;
  amount: number;
  previousAmount: number;
  changeRate: number;
}

export interface IncomeStatementItem {
  name: string;
  amount: number;
  previousAmount: number;
  changeRate: number;
}

export interface AIInsight {
  category: string;
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'critical';
  relatedMetric: string;
}

export interface KPISummary {
  premiumIncome: number;
  claimsRatio: number;
  expenseRatio: number;
  combinedRatio: number;
  investmentReturnRate: number;
  solvencyRatio: number;
  roe: number;
}

export interface FinancialPeriod {
  period: string;
  periodLabel: string;
  balanceSheet: BalanceSheetItem[];
  incomeStatement: IncomeStatementItem[];
  kpiSummary: KPISummary;
  aiInsights: AIInsight[];
}

export const financialStatements: FinancialPeriod[] = [
  // ========== 2024 Q4 ==========
  {
    period: '2024Q4',
    periodLabel: '2024年第四季度',
    balanceSheet: [
      { name: '总资产', amount: 82_500_000_000, previousAmount: 78_300_000_000, changeRate: 5.37 },
      { name: '货币资金', amount: 8_200_000_000, previousAmount: 7_500_000_000, changeRate: 9.33 },
      { name: '交易性金融资产', amount: 5_600_000_000, previousAmount: 5_200_000_000, changeRate: 7.69 },
      { name: '持有至到期投资', amount: 32_000_000_000, previousAmount: 30_500_000_000, changeRate: 4.92 },
      { name: '应收分保账款', amount: 3_800_000_000, previousAmount: 3_200_000_000, changeRate: 18.75 },
      { name: '固定资产', amount: 1_200_000_000, previousAmount: 1_250_000_000, changeRate: -4.00 },
      { name: '其他资产', amount: 31_700_000_000, previousAmount: 30_650_000_000, changeRate: 3.43 },
      { name: '总负债', amount: 62_800_000_000, previousAmount: 59_500_000_000, changeRate: 5.55 },
      { name: '保险合同准备金', amount: 45_200_000_000, previousAmount: 42_800_000_000, changeRate: 5.61 },
      { name: '未到期责任准备金', amount: 28_600_000_000, previousAmount: 27_000_000_000, changeRate: 5.93 },
      { name: '未决赔款准备金', amount: 16_600_000_000, previousAmount: 15_800_000_000, changeRate: 5.06 },
      { name: '应付分保账款', amount: 4_500_000_000, previousAmount: 4_200_000_000, changeRate: 7.14 },
      { name: '其他负债', amount: 13_100_000_000, previousAmount: 12_500_000_000, changeRate: 4.80 },
      { name: '净资产（所有者权益）', amount: 19_700_000_000, previousAmount: 18_800_000_000, changeRate: 4.79 },
      { name: '实收资本', amount: 16_100_000_000, previousAmount: 16_100_000_000, changeRate: 0.00 },
      { name: '盈余公积', amount: 1_800_000_000, previousAmount: 1_500_000_000, changeRate: 20.00 },
      { name: '未分配利润', amount: 1_800_000_000, previousAmount: 1_200_000_000, changeRate: 50.00 },
    ],
    incomeStatement: [
      { name: '已赚保费', amount: 42_800_000_000, previousAmount: 39_500_000_000, changeRate: 8.35 },
      { name: '分保费收入', amount: 45_000_000_000, previousAmount: 41_200_000_000, changeRate: 9.22 },
      { name: '分出保费', amount: -6_800_000_000, previousAmount: -6_200_000_000, changeRate: 9.68 },
      { name: '提取未到期责任准备金', amount: -4_600_000_000, previousAmount: -4_500_000_000, changeRate: 2.22 },
      { name: '赔付支出', amount: -27_200_000_000, previousAmount: -24_500_000_000, changeRate: 11.02 },
      { name: '摊回赔付支出', amount: 4_100_000_000, previousAmount: 3_600_000_000, changeRate: 13.89 },
      { name: '提取保险责任准备金', amount: -3_800_000_000, previousAmount: -3_500_000_000, changeRate: 8.57 },
      { name: '手续费及佣金支出', amount: -3_200_000_000, previousAmount: -2_900_000_000, changeRate: 10.34 },
      { name: '业务及管理费', amount: -2_800_000_000, previousAmount: -2_600_000_000, changeRate: 7.69 },
      { name: '投资收益', amount: 2_500_000_000, previousAmount: 2_200_000_000, changeRate: 13.64 },
      { name: '营业利润', amount: 2_300_000_000, previousAmount: 1_800_000_000, changeRate: 27.78 },
      { name: '利润总额', amount: 2_250_000_000, previousAmount: 1_750_000_000, changeRate: 28.57 },
      { name: '净利润', amount: 1_690_000_000, previousAmount: 1_310_000_000, changeRate: 29.01 },
    ],
    kpiSummary: {
      premiumIncome: 45_000_000_000,
      claimsRatio: 0.636,
      expenseRatio: 0.140,
      combinedRatio: 0.776,
      investmentReturnRate: 0.042,
      solvencyRatio: 2.62,
      roe: 0.086,
    },
    aiInsights: [
      {
        category: '盈利能力',
        title: '全年净利润同比增长29%',
        description: '2024年净利润16.9亿元，同比增长29%。主要得益于保费收入增长和投资收益改善。综合成本率77.6%，处于行业优秀水平。',
        severity: 'info',
        relatedMetric: '净利润',
      },
      {
        category: '业务增长',
        title: '保费收入稳步增长',
        description: '全年分保保费收入450亿元，同比增长9.2%。农业险占比持续提升，反映政策性农业保险深度覆盖。',
        severity: 'info',
        relatedMetric: '分保费收入',
      },
      {
        category: '准备金',
        title: '应收分保账款增速偏高',
        description: '应收分保账款同比增长18.75%，高于保费增速。需关注分保账款回收质量。',
        severity: 'warning',
        relatedMetric: '应收分保账款',
      },
    ],
  },

  // ========== 2025 Q1 ==========
  {
    period: '2025Q1',
    periodLabel: '2025年第一季度',
    balanceSheet: [
      { name: '总资产', amount: 84_800_000_000, previousAmount: 82_500_000_000, changeRate: 2.79 },
      { name: '货币资金', amount: 7_800_000_000, previousAmount: 8_200_000_000, changeRate: -4.88 },
      { name: '交易性金融资产', amount: 5_900_000_000, previousAmount: 5_600_000_000, changeRate: 5.36 },
      { name: '持有至到期投资', amount: 34_500_000_000, previousAmount: 32_000_000_000, changeRate: 7.81 },
      { name: '应收分保账款', amount: 4_200_000_000, previousAmount: 3_800_000_000, changeRate: 10.53 },
      { name: '固定资产', amount: 1_350_000_000, previousAmount: 1_200_000_000, changeRate: 12.50 },
      { name: '其他资产', amount: 31_050_000_000, previousAmount: 31_700_000_000, changeRate: -2.05 },
      { name: '总负债', amount: 64_600_000_000, previousAmount: 62_800_000_000, changeRate: 2.87 },
      { name: '保险合同准备金', amount: 46_800_000_000, previousAmount: 45_200_000_000, changeRate: 3.54 },
      { name: '未到期责任准备金', amount: 30_200_000_000, previousAmount: 28_600_000_000, changeRate: 5.59 },
      { name: '未决赔款准备金', amount: 16_600_000_000, previousAmount: 16_600_000_000, changeRate: 0.00 },
      { name: '应付分保账款', amount: 4_800_000_000, previousAmount: 4_500_000_000, changeRate: 6.67 },
      { name: '其他负债', amount: 13_000_000_000, previousAmount: 13_100_000_000, changeRate: -0.76 },
      { name: '净资产（所有者权益）', amount: 20_200_000_000, previousAmount: 19_700_000_000, changeRate: 2.54 },
      { name: '实收资本', amount: 16_100_000_000, previousAmount: 16_100_000_000, changeRate: 0.00 },
      { name: '盈余公积', amount: 1_800_000_000, previousAmount: 1_800_000_000, changeRate: 0.00 },
      { name: '未分配利润', amount: 2_300_000_000, previousAmount: 1_800_000_000, changeRate: 27.78 },
    ],
    incomeStatement: [
      { name: '已赚保费', amount: 10_200_000_000, previousAmount: 9_600_000_000, changeRate: 6.25 },
      { name: '分保费收入', amount: 11_500_000_000, previousAmount: 10_800_000_000, changeRate: 6.48 },
      { name: '分出保费', amount: -1_800_000_000, previousAmount: -1_600_000_000, changeRate: 12.50 },
      { name: '提取未到期责任准备金', amount: -1_500_000_000, previousAmount: -1_400_000_000, changeRate: 7.14 },
      { name: '赔付支出', amount: -5_800_000_000, previousAmount: -5_200_000_000, changeRate: 11.54 },
      { name: '摊回赔付支出', amount: 900_000_000, previousAmount: 800_000_000, changeRate: 12.50 },
      { name: '提取保险责任准备金', amount: -800_000_000, previousAmount: -750_000_000, changeRate: 6.67 },
      { name: '手续费及佣金支出', amount: -780_000_000, previousAmount: -700_000_000, changeRate: 11.43 },
      { name: '业务及管理费', amount: -680_000_000, previousAmount: -620_000_000, changeRate: 9.68 },
      { name: '投资收益', amount: 680_000_000, previousAmount: 550_000_000, changeRate: 23.64 },
      { name: '营业利润', amount: 620_000_000, previousAmount: 480_000_000, changeRate: 29.17 },
      { name: '利润总额', amount: 600_000_000, previousAmount: 460_000_000, changeRate: 30.43 },
      { name: '净利润', amount: 450_000_000, previousAmount: 345_000_000, changeRate: 30.43 },
    ],
    kpiSummary: {
      premiumIncome: 11_500_000_000,
      claimsRatio: 0.569,
      expenseRatio: 0.143,
      combinedRatio: 0.712,
      investmentReturnRate: 0.045,
      solvencyRatio: 2.58,
      roe: 0.022,
    },
    aiInsights: [
      {
        category: '业务结构',
        title: 'Q1保费收入季节性正常',
        description: 'Q1分保保费收入115亿元，占全年预算约24%，符合季节性特征。冬季农业险保费较低为正常现象。',
        severity: 'info',
        relatedMetric: '分保费收入',
      },
      {
        category: '投资',
        title: '投资收益率提升',
        description: 'Q1投资收益6.8亿元，年化收益率4.5%，较上年同期提升。债券配置增加带动利息收入增长。',
        severity: 'info',
        relatedMetric: '投资收益',
      },
    ],
  },

  // ========== 2025 Q2 ==========
  {
    period: '2025Q2',
    periodLabel: '2025年第二季度',
    balanceSheet: [
      { name: '总资产', amount: 87_100_000_000, previousAmount: 84_800_000_000, changeRate: 2.71 },
      { name: '货币资金', amount: 6_900_000_000, previousAmount: 7_800_000_000, changeRate: -11.54 },
      { name: '交易性金融资产', amount: 6_200_000_000, previousAmount: 5_900_000_000, changeRate: 5.08 },
      { name: '持有至到期投资', amount: 35_800_000_000, previousAmount: 34_500_000_000, changeRate: 3.77 },
      { name: '应收分保账款', amount: 5_600_000_000, previousAmount: 4_200_000_000, changeRate: 33.33 },
      { name: '固定资产', amount: 1_400_000_000, previousAmount: 1_350_000_000, changeRate: 3.70 },
      { name: '其他资产', amount: 31_200_000_000, previousAmount: 31_050_000_000, changeRate: 0.48 },
      { name: '总负债', amount: 67_200_000_000, previousAmount: 64_600_000_000, changeRate: 4.02 },
      { name: '保险合同准备金', amount: 49_500_000_000, previousAmount: 46_800_000_000, changeRate: 5.77 },
      { name: '未到期责任准备金', amount: 31_800_000_000, previousAmount: 30_200_000_000, changeRate: 5.30 },
      { name: '未决赔款准备金', amount: 17_700_000_000, previousAmount: 16_600_000_000, changeRate: 6.63 },
      { name: '应付分保账款', amount: 4_600_000_000, previousAmount: 4_800_000_000, changeRate: -4.17 },
      { name: '其他负债', amount: 13_100_000_000, previousAmount: 13_000_000_000, changeRate: 0.77 },
      { name: '净资产（所有者权益）', amount: 19_900_000_000, previousAmount: 20_200_000_000, changeRate: -1.49 },
      { name: '实收资本', amount: 16_100_000_000, previousAmount: 16_100_000_000, changeRate: 0.00 },
      { name: '盈余公积', amount: 1_800_000_000, previousAmount: 1_800_000_000, changeRate: 0.00 },
      { name: '未分配利润', amount: 2_000_000_000, previousAmount: 2_300_000_000, changeRate: -13.04 },
    ],
    incomeStatement: [
      { name: '已赚保费', amount: 13_800_000_000, previousAmount: 12_500_000_000, changeRate: 10.40 },
      { name: '分保费收入', amount: 15_200_000_000, previousAmount: 13_800_000_000, changeRate: 10.14 },
      { name: '分出保费', amount: -2_100_000_000, previousAmount: -1_900_000_000, changeRate: 10.53 },
      { name: '提取未到期责任准备金', amount: -1_600_000_000, previousAmount: -1_300_000_000, changeRate: 23.08 },
      { name: '赔付支出', amount: -10_200_000_000, previousAmount: -7_800_000_000, changeRate: 30.77 },
      { name: '摊回赔付支出', amount: 1_500_000_000, previousAmount: 1_100_000_000, changeRate: 36.36 },
      { name: '提取保险责任准备金', amount: -1_200_000_000, previousAmount: -900_000_000, changeRate: 33.33 },
      { name: '手续费及佣金支出', amount: -900_000_000, previousAmount: -800_000_000, changeRate: 12.50 },
      { name: '业务及管理费', amount: -720_000_000, previousAmount: -650_000_000, changeRate: 10.77 },
      { name: '投资收益', amount: 720_000_000, previousAmount: 600_000_000, changeRate: 20.00 },
      { name: '营业利润', amount: -100_000_000, previousAmount: 350_000_000, changeRate: -128.57 },
      { name: '利润总额', amount: -120_000_000, previousAmount: 330_000_000, changeRate: -136.36 },
      { name: '净利润', amount: -90_000_000, previousAmount: 250_000_000, changeRate: -136.00 },
    ],
    kpiSummary: {
      premiumIncome: 15_200_000_000,
      claimsRatio: 0.739,
      expenseRatio: 0.117,
      combinedRatio: 0.856,
      investmentReturnRate: 0.043,
      solvencyRatio: 2.48,
      roe: -0.004,
    },
    aiInsights: [
      {
        category: '赔付风险',
        title: '河南干旱导致Q2赔付率飙升',
        description: 'Q2赔付支出102亿元，同比增长30.8%，赔付率达73.9%。主因河南持续干旱，水稻和玉米大面积受灾，赔付集中爆发。建议启动巨灾应急预案。',
        severity: 'critical',
        relatedMetric: '赔付支出',
      },
      {
        category: '流动性',
        title: '应收分保账款大幅增加',
        description: '应收分保账款较上季末增长33.3%至56亿元，主要因河南干旱事件导致大量分保赔付待摊回。需密切关注回收进度。',
        severity: 'warning',
        relatedMetric: '应收分保账款',
      },
      {
        category: '盈利能力',
        title: '季度出现亏损',
        description: 'Q2净亏损0.9亿元，为近两年首次季度亏损。综合成本率85.6%，超过盈亏平衡线。需评估全年盈利预测。',
        severity: 'critical',
        relatedMetric: '净利润',
      },
      {
        category: '偿付能力',
        title: '偿付能力充足率下降',
        description: '偿付能力充足率从258%降至248%，降幅10个百分点。虽仍大幅高于监管红线（100%），但下降趋势需关注。',
        severity: 'warning',
        relatedMetric: '偿付能力充足率',
      },
    ],
  },

  // ========== 2025 Q3 ==========
  {
    period: '2025Q3',
    periodLabel: '2025年第三季度',
    balanceSheet: [
      { name: '总资产', amount: 89_200_000_000, previousAmount: 87_100_000_000, changeRate: 2.41 },
      { name: '货币资金', amount: 7_100_000_000, previousAmount: 6_900_000_000, changeRate: 2.90 },
      { name: '交易性金融资产', amount: 6_500_000_000, previousAmount: 6_200_000_000, changeRate: 4.84 },
      { name: '持有至到期投资', amount: 36_200_000_000, previousAmount: 35_800_000_000, changeRate: 1.12 },
      { name: '应收分保账款', amount: 6_800_000_000, previousAmount: 5_600_000_000, changeRate: 21.43 },
      { name: '固定资产', amount: 1_380_000_000, previousAmount: 1_400_000_000, changeRate: -1.43 },
      { name: '其他资产', amount: 31_220_000_000, previousAmount: 31_200_000_000, changeRate: 0.06 },
      { name: '总负债', amount: 69_500_000_000, previousAmount: 67_200_000_000, changeRate: 3.42 },
      { name: '保险合同准备金', amount: 51_800_000_000, previousAmount: 49_500_000_000, changeRate: 4.65 },
      { name: '未到期责任准备金', amount: 32_500_000_000, previousAmount: 31_800_000_000, changeRate: 2.20 },
      { name: '未决赔款准备金', amount: 19_300_000_000, previousAmount: 17_700_000_000, changeRate: 9.04 },
      { name: '应付分保账款', amount: 4_800_000_000, previousAmount: 4_600_000_000, changeRate: 4.35 },
      { name: '其他负债', amount: 12_900_000_000, previousAmount: 13_100_000_000, changeRate: -1.53 },
      { name: '净资产（所有者权益）', amount: 19_700_000_000, previousAmount: 19_900_000_000, changeRate: -1.01 },
      { name: '实收资本', amount: 16_100_000_000, previousAmount: 16_100_000_000, changeRate: 0.00 },
      { name: '盈余公积', amount: 1_800_000_000, previousAmount: 1_800_000_000, changeRate: 0.00 },
      { name: '未分配利润', amount: 1_800_000_000, previousAmount: 2_000_000_000, changeRate: -10.00 },
    ],
    incomeStatement: [
      { name: '已赚保费', amount: 14_500_000_000, previousAmount: 13_200_000_000, changeRate: 9.85 },
      { name: '分保费收入', amount: 15_800_000_000, previousAmount: 14_200_000_000, changeRate: 11.27 },
      { name: '分出保费', amount: -2_200_000_000, previousAmount: -1_800_000_000, changeRate: 22.22 },
      { name: '提取未到期责任准备金', amount: -700_000_000, previousAmount: -1_200_000_000, changeRate: -41.67 },
      { name: '赔付支出', amount: -11_500_000_000, previousAmount: -8_500_000_000, changeRate: 35.29 },
      { name: '摊回赔付支出', amount: 1_800_000_000, previousAmount: 1_200_000_000, changeRate: 50.00 },
      { name: '提取保险责任准备金', amount: -1_600_000_000, previousAmount: -1_000_000_000, changeRate: 60.00 },
      { name: '手续费及佣金支出', amount: -950_000_000, previousAmount: -850_000_000, changeRate: 11.76 },
      { name: '业务及管理费', amount: -750_000_000, previousAmount: -680_000_000, changeRate: 10.29 },
      { name: '投资收益', amount: 780_000_000, previousAmount: 620_000_000, changeRate: 25.81 },
      { name: '营业利润', amount: -220_000_000, previousAmount: 310_000_000, changeRate: -170.97 },
      { name: '利润总额', amount: -240_000_000, previousAmount: 290_000_000, changeRate: -182.76 },
      { name: '净利润', amount: -180_000_000, previousAmount: 220_000_000, changeRate: -181.82 },
    ],
    kpiSummary: {
      premiumIncome: 15_800_000_000,
      claimsRatio: 0.793,
      expenseRatio: 0.117,
      combinedRatio: 0.910,
      investmentReturnRate: 0.044,
      solvencyRatio: 2.42,
      roe: -0.009,
    },
    aiInsights: [
      {
        category: '赔付风险',
        title: '赔付率持续攀升至79.3%',
        description: 'Q3赔付支出115亿元，同比增长35.3%。赔付率79.3%创近三年新高。河南干旱后续赔付、黑龙江洪涝、安徽台风三重叠加。综合成本率91%接近红线。',
        severity: 'critical',
        relatedMetric: '赔付支出',
      },
      {
        category: '准备金',
        title: '未决赔款准备金大幅增加',
        description: '未决赔款准备金193亿元，较上季末增长9%。大量理赔案件尚在查勘或定损阶段，最终赔付金额存在不确定性。',
        severity: 'critical',
        relatedMetric: '未决赔款准备金',
      },
      {
        category: '流动性',
        title: '应收分保账款持续攀升',
        description: '应收分保账款68亿元，较年初增长79%。部分转分保对手方（中再集团）结算延迟，建议加强催收。',
        severity: 'warning',
        relatedMetric: '应收分保账款',
      },
      {
        category: '盈利能力',
        title: '连续两季度亏损',
        description: 'Q3净亏损1.8亿元，累计上半年+Q3净亏损2.7亿元（扣除Q1盈利后）。全年盈利目标面临挑战，需评估Q4扭转可能性。',
        severity: 'critical',
        relatedMetric: '净利润',
      },
      {
        category: '投资',
        title: '投资收益成为稳定器',
        description: 'Q3投资收益7.8亿元，年化4.4%，表现稳健。在承保端亏损情况下，投资收益成为重要利润来源。建议维持稳健配置。',
        severity: 'info',
        relatedMetric: '投资收益',
      },
      {
        category: '偿付能力',
        title: '偿付能力持续下降需警惕',
        description: '偿付能力充足率从248%降至242%，连续三个季度下降。虽远高于监管红线，但趋势需引起管理层重视。',
        severity: 'warning',
        relatedMetric: '偿付能力充足率',
      },
    ],
  },
];
