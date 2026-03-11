import { useMemo, useCallback } from 'react'
import useChatStore from '../stores/chatStore'
import type { AgentStep } from '../stores/chatStore'
import useModuleStore from '../stores/moduleStore'

/* ── Script definitions ── */
interface ChatScript {
  keywords: string[]
  module?: string
  steps: string[]
  response: string
}

const SCRIPTS: ChatScript[] = [
  {
    keywords: ['报销', '报销单', '审核报销'],
    steps: ['检索本周报销记录', '核对发票信息', '合规性校验'],
    response: `### 本周报销单审核结果

共检索到 **23** 笔待审报销申请，总金额 **¥186,540.00**。

| 项目 | 笔数 | 金额 | 状态 |
|------|------|------|------|
| 差旅费 | 12 | ¥98,200 | 3笔需复核 |
| 办公用品 | 6 | ¥32,100 | 全部通过 |
| 业务招待 | 5 | ¥56,240 | 2笔超标预警 |

**异常发现：**
- 报销单 #2024-0892：餐饮发票金额超出标准 35%，建议退回
- 报销单 #2024-0901：差旅日期与考勤记录不匹配，需确认`,
  },
  {
    keywords: ['风险', '预警', '风险预警'],
    steps: ['加载风险指标', '计算预警阈值', '生成风险概览'],
    response: `### 当前风险预警概览

系统监测到 **5** 项风险预警，其中 **2** 项为高风险。

**高风险：**
1. **信用风险** - 合作方"XX农业保险公司"信用评级下调至 BBB-，涉及在保金额 ¥2.3亿
2. **流动性风险** - 短期偿付能力充足率降至 **132%**，接近监管红线(120%)

**中风险：**
3. 操作风险 - 本月凭证差错率 1.8%，高于阈值(1.5%)
4. 合规风险 - 3份合同未完成年度合规审查
5. 市场风险 - 债券投资组合久期偏差超出策略范围

建议立即关注信用风险和流动性风险项，我可以帮您生成详细分析报告。`,
  },
  {
    keywords: ['Q3', '财务分析', '季度', '三季度'],
    steps: ['汇总Q3财务数据', '计算关键指标', '生成趋势分析', '形成分析报告'],
    response: `### Q3 财务分析摘要

**核心指标：**
- 营业收入：¥45.28亿（同比 +12.3%）
- 已赚保费：¥38.65亿（同比 +9.7%）
- 综合成本率：96.2%（环比下降 1.1个百分点）
- 投资收益率：4.85%（年化）
- 净利润：¥6.82亿（同比 +18.5%）

**亮点：**
- 农业保险分保收入增长 15.8%，高于行业平均
- 综合费用率持续优化，管理费用同比降低 8.2%

**关注点：**
- 赔付率较上季度上升 2.3%，主要受极端天气影响
- 应收再保账款周转天数增加至 62天

需要我生成完整的季度财务分析报告吗？`,
  },
  {
    keywords: ['合同', '合同审查', '条款'],
    steps: ['检索合同库', '提取关键条款', '合规性比对'],
    response: `### 合同审查状态

当前系统中共有 **156** 份有效合同，审查情况如下：

- 已完成年度审查：128份 (82.1%)
- 待审查：21份
- 审查中：7份

**待关注合同：**
1. 再保险合同 #RC-2024-045 - 即将到期（30天内），需启动续期流程
2. 服务合同 #SC-2024-012 - 发现条款与最新监管要求不一致
3. 投资合同 #IC-2024-008 - 对手方信用评级变动，需重新评估

需要我详细分析某份具体合同吗？`,
  },
  {
    keywords: ['税', '纳税', '税务', '增值税'],
    steps: ['加载纳税数据', '核算税额', '生成申报建议'],
    response: `### 税务管理概览

**本月纳税情况：**
- 增值税：¥1,245万（已申报）
- 企业所得税：¥3,680万（预缴，Q3）
- 印花税：¥28.6万（待申报，截止日：本月15日）

**税务风险提示：**
- 2笔跨境再保交易的预提税处理需确认
- 部分免税项目凭证材料不完整，建议补充

**优化建议：**
- 本季度可申请的税收优惠约 ¥380万
- 建议调整再保安排以优化税负结构`,
  },
  {
    keywords: ['农业', '农险', '保险数据', '农业保险'],
    steps: ['汇总农险数据', '分析区域分布', '生成统计报告'],
    response: `### 农业保险数据概览

**2024年累计数据：**
- 承保面积：**2.86亿亩**（同比 +8.2%）
- 保费收入：¥158.6亿（同比 +11.5%）
- 赔付支出：¥92.3亿
- 赔付率：58.2%

**Top 5 险种：**
1. 三大粮食作物保险 - ¥68.2亿
2. 生猪保险 - ¥24.5亿
3. 森林保险 - ¥18.3亿
4. 蔬菜价格指数保险 - ¥12.8亿
5. 水产养殖保险 - ¥9.6亿

**灾害影响：**
本季度极端天气导致额外赔付约 ¥12.4亿，主要集中在华北和东北地区。`,
  },
  {
    keywords: ['合规', '监管', '检查'],
    steps: ['扫描合规数据库', '比对监管要求', '输出检查结果'],
    response: `### 合规检查报告

**合规状态总览：**
- 合规项：**186/195**（合规率 95.4%）
- 待整改：6项
- 整改中：3项

**重点关注：**
1. 银保监会新规 [2024]28号 - 再保险信息披露要求更新，需在12月前完成系统改造
2. 偿付能力监管要求 - 风险综合评级需提交补充材料
3. 反洗钱 - 2笔大额交易报告待补报

**近期监管动态：**
- 农业保险条例修订稿已公开征求意见
- 再保险公司分类监管评价办法即将实施`,
  },
  {
    keywords: ['投资', '投资组合', '收益'],
    steps: ['加载投资数据', '计算收益指标', '评估风险敞口'],
    response: `### 投资管理概览

**资产配置：**
| 类别 | 金额(亿) | 占比 | 收益率 |
|------|---------|------|--------|
| 固收类 | 420.5 | 62.3% | 4.12% |
| 权益类 | 128.6 | 19.1% | 6.85% |
| 另类投资 | 89.2 | 13.2% | 5.43% |
| 现金管理 | 36.4 | 5.4% | 2.15% |

**整体表现：**
- 总投资收益率：4.85%（年化）
- 基准超额收益：+0.32%
- 风险价值(VaR)：¥8.6亿（99%置信度）

**关注事项：**
- 信用债集中度偏高，建议适度分散
- 权益仓位接近上限，需关注市场波动风险`,
  },
]

const DEFAULT_RESPONSE = `感谢您的提问。我正在分析您的需求，以下是我的初步建议：

1. 您可以尝试更具体地描述您的需求，例如指定时间范围、金额区间或具体模块
2. 如果需要查看特定报表，请告诉我报表名称和期间
3. 您也可以点击下方的建议提问快速开始

如需进一步帮助，请随时告诉我。`

const DEFAULT_PROMPTS = [
  '审核本周报销单',
  '查看风险预警',
  '生成Q3财务分析',
  '合同审查状态',
]

const MODULE_PROMPTS: Record<string, string[]> = {
  accounting: ['核对本月凭证', '查看科目余额', '生成试算平衡表'],
  'financial-review': ['审核本周报销单', '检查费用超标', '查看审批流程'],
  'financial-analysis': ['生成Q3财务分析', '对比预算执行', '查看盈利趋势'],
  tax: ['本月纳税申报', '税务风险检查', '查看税收优惠'],
  contract: ['合同到期提醒', '审查合同条款', '查看合同状态'],
  'risk-monitoring': ['查看风险预警', '信用风险评估', '生成风险报告'],
  'agricultural-data': ['农险数据概览', '区域分布分析', '灾害赔付统计'],
  'knowledge-center': ['搜索审计案例', '查看最新法规', '知识库统计'],
  compliance: ['合规检查报告', '监管动态', '整改进度'],
  investment: ['投资组合分析', '收益率报告', '风险敞口评估'],
  hr: ['薪酬审计', '人员变动分析', '绩效考核数据'],
  'it-project': ['项目进度总览', '预算执行情况', '风险评估'],
}

/* ── Keyword matching ── */
function matchScript(input: string, _module: string): ChatScript | null {
  let bestMatch: ChatScript | null = null
  let bestScore = 0

  for (const script of SCRIPTS) {
    let score = 0
    for (const kw of script.keywords) {
      if (input.includes(kw)) {
        score += kw.length // longer keyword match = higher score
      }
    }
    if (score > bestScore) {
      bestScore = score
      bestMatch = script
    }
  }

  return bestMatch
}

/* ── Random thinking steps ── */
function generateThinkingSteps(steps: string[]): AgentStep[] {
  return steps.map((label, i) => ({
    id: `step_${Date.now()}_${i}`,
    label,
    status: 'pending' as const,
    timestamp: Date.now(),
  }))
}

/* ── Hook ── */
export default function useChat() {
  const { addMessage, updateLastMessage, setStreaming } = useChatStore()
  const { activeModule } = useModuleStore()

  const suggestedPrompts = useMemo(() => {
    if (activeModule) {
      return MODULE_PROMPTS[activeModule.id] || DEFAULT_PROMPTS
    }
    return DEFAULT_PROMPTS
  }, [activeModule])

  const sendMessage = useCallback(
    async (text: string) => {
      // 1. Add user message
      addMessage({ role: 'user', content: text, module: activeModule?.id })

      // 2. Match a script
      const moduleId = activeModule?.id || ''
      const script = matchScript(text, moduleId)
      const steps = script
        ? script.steps
        : ['正在检索数据...', '分析中...', '生成回复...']
      const response = script ? script.response : DEFAULT_RESPONSE

      // 3. Add assistant message with thinking steps
      const thinkingSteps = generateThinkingSteps(steps)
      addMessage({
        role: 'assistant',
        content: '',
        module: activeModule?.id,
        agentSteps: thinkingSteps,
      })

      setStreaming(true)

      // 4. Simulate step-by-step progress
      for (let i = 0; i < thinkingSteps.length; i++) {
        await delay(600 + Math.random() * 400)

        updateLastMessage((msg) => {
          const updatedSteps = msg.agentSteps!.map((s, idx) => {
            if (idx === i) return { ...s, status: 'running' as const }
            if (idx < i) return { ...s, status: 'done' as const }
            return s
          })
          return { ...msg, agentSteps: updatedSteps }
        })

        await delay(400 + Math.random() * 300)

        updateLastMessage((msg) => {
          const updatedSteps = msg.agentSteps!.map((s, idx) => {
            if (idx <= i) return { ...s, status: 'done' as const }
            return s
          })
          return { ...msg, agentSteps: updatedSteps }
        })
      }

      // 5. Show response
      await delay(300)
      updateLastMessage((msg) => ({ ...msg, content: response }))

      setStreaming(false)
    },
    [activeModule, addMessage, updateLastMessage, setStreaming],
  )

  return { sendMessage, suggestedPrompts }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
