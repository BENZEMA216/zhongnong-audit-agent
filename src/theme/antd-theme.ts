import type { ThemeConfig } from 'antd'

const antdTheme: ThemeConfig = {
  token: {
    // Brand colors
    colorPrimary: '#1a365d',
    colorSuccess: '#10b981',
    colorWarning: '#f59e0b',
    colorError: '#ef4444',
    colorInfo: '#1a365d',

    // Border
    borderRadius: 8,

    // Typography
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", "Source Han Sans SC", "WenQuanYi Micro Hei", sans-serif',

    // Layout
    colorBgLayout: '#f0f2f5',
    colorBgContainer: '#ffffff',
  },
  components: {
    Button: {
      controlHeight: 36,
      paddingInline: 16,
    },
    Input: {
      controlHeight: 36,
    },
    Card: {
      paddingLG: 20,
    },
    Menu: {
      itemBorderRadius: 6,
      subMenuItemBorderRadius: 6,
    },
    Table: {
      headerBg: '#f8fafc',
      headerColor: '#1a365d',
    },
  },
}

export default antdTheme
