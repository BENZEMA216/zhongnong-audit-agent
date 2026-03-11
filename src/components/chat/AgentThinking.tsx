import { Steps } from 'antd'
import { LoadingOutlined, CheckCircleFilled } from '@ant-design/icons'
import { motion } from 'framer-motion'
import type { AgentStep } from '../../stores/chatStore'

interface AgentThinkingProps {
  steps: AgentStep[]
}

function getStepIcon(status: AgentStep['status']) {
  switch (status) {
    case 'done':
      return <CheckCircleFilled style={{ color: '#10b981', fontSize: 16 }} />
    case 'running':
      return <LoadingOutlined style={{ color: '#3b82f6', fontSize: 16 }} spin />
    case 'error':
      return <CheckCircleFilled style={{ color: '#ef4444', fontSize: 16 }} />
    default:
      return undefined
  }
}

function getCurrentStep(steps: AgentStep[]): number {
  const runningIdx = steps.findIndex((s) => s.status === 'running')
  if (runningIdx >= 0) return runningIdx
  const lastDone = steps.reduce(
    (acc, s, i) => (s.status === 'done' ? i : acc),
    -1,
  )
  return lastDone + 1
}

export default function AgentThinking({ steps }: AgentThinkingProps) {
  const current = getCurrentStep(steps)
  const allDone = steps.every((s) => s.status === 'done')

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{ marginBottom: allDone ? 12 : 0 }}
    >
      <div
        style={{
          fontSize: 12,
          color: '#94a3b8',
          marginBottom: 8,
          fontWeight: 500,
        }}
      >
        {allDone ? '分析完成' : '正在分析...'}
      </div>
      <Steps
        direction="vertical"
        size="small"
        current={current}
        items={steps.map((step) => ({
          title: (
            <span style={{ fontSize: 13, color: step.status === 'done' ? '#64748b' : '#1a202c' }}>
              {step.label}
            </span>
          ),
          description: step.detail ? (
            <span style={{ fontSize: 12, color: '#94a3b8' }}>{step.detail}</span>
          ) : undefined,
          icon: getStepIcon(step.status),
        }))}
        style={{ padding: 0 }}
      />
    </motion.div>
  )
}
