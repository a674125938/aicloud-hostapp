import { create } from 'zustand';

// 定义应用状态接口
export interface AppState {
  // 用户信息
  user: {
    name: string;
    email: string;
    avatar?: string;
  } | null;
  
  // 主题设置
  theme: 'light' | 'dark';
  
  // 主题色设置
  primaryColor: string;
  
  // 语言设置
  language: 'zh-CN' | 'en-US';
  
  // 全局通知
  notifications: Array<{
    id: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    timestamp: number;
  }>;
  
  // Actions
  setUser: (user: AppState['user']) => void;
  setTheme: (theme: AppState['theme']) => void;
  setPrimaryColor: (color: string) => void;
  setLanguage: (language: AppState['language']) => void;
  addNotification: (notification: Omit<AppState['notifications'][0], 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

// 创建 Zustand store
export const useAppStore = create<AppState>((set) => ({
  // 初始状态
  user: null,
  theme: 'light',
  primaryColor: '#667eea', // 默认主题色
  language: 'zh-CN',
  notifications: [],
  
  // Actions
  setUser: (user) => set({ user }),
  
  setTheme: (theme) => {
    set({ theme });
    // 同步到 localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('app-theme', theme);
    }
  },
  
  setPrimaryColor: (color) => {
    set({ primaryColor: color });
    // 同步到 localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('app-primary-color', color);
      // 更新 CSS 变量
      document.documentElement.style.setProperty('--primary-color', color);
    }
  },
  
  setLanguage: (language) => {
    set({ language });
    // 同步到 localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('app-language', language);
    }
  },
  
  addNotification: (notification) => {
    const newNotification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };
    set((state) => ({
      notifications: [...state.notifications, newNotification],
    }));
    
    // 3秒后自动移除
    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== newNotification.id),
      }));
    }, 3000);
  },
  
  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },
  
  clearNotifications: () => set({ notifications: [] }),
}));

// 初始化函数 - 在客户端挂载后调用，避免 hydration 不匹配
export const initializeAppStore = () => {
  if (typeof window === 'undefined') {
    return;
  }
  
  const savedTheme = localStorage.getItem('app-theme') as AppState['theme'] | null;
  const savedPrimaryColor = localStorage.getItem('app-primary-color');
  const savedLanguage = localStorage.getItem('app-language') as AppState['language'] | null;
  
  if (savedTheme) {
    useAppStore.getState().setTheme(savedTheme);
  }
  if (savedPrimaryColor) {
    useAppStore.getState().setPrimaryColor(savedPrimaryColor);
  } else {
    // 初始化 CSS 变量
    const defaultColor = useAppStore.getState().primaryColor;
    document.documentElement.style.setProperty('--primary-color', defaultColor);
  }
  if (savedLanguage) {
    useAppStore.getState().setLanguage(savedLanguage);
  }
};

