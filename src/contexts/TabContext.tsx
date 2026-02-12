import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface Tab {
  id: string;
  path: string;
  title: string;
}

interface TabContextType {
  tabs: Tab[];
  activeTabId: string | null;
  addTab: (path: string, title: string) => void;
  removeTab: (id: string) => void;
  switchTab: (id: string) => void;
  updateActiveTabTitle: (title: string) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

const PAGE_TITLES: Record<string, string> = {
  '/': 'Home',
  '/products': 'Products',
  '/services': 'Services',
  '/visualizer': 'Visualizer',
  '/estimation': 'Estimation',
  '/catalogs': 'Catalogs',
  '/contact': 'Contact',
  '/about': 'About Us',
  '/auth': 'Sign In',
  '/cart': 'Cart',
  '/wishlist': 'Wishlist',
  '/orders': 'Orders',
  '/profile': 'Profile',
  '/chat': 'Chat',
  '/admin': 'Dashboard',
  '/admin/products': 'Products',
  '/admin/categories': 'Categories',
  '/admin/orders': 'Orders',
  '/admin/enquiries': 'Enquiries',
  '/admin/estimations': 'Estimations',
  '/admin/reviews': 'Reviews',
  '/admin/testimonials': 'Testimonials',
  '/admin/services': 'Services',
  '/admin/catalogs': 'Catalogs',
  '/admin/banners': 'Banners',
  '/admin/carousel': 'Carousel',
  '/admin/locations': 'Locations',
  '/admin/users': 'Users',
  '/admin/analytics': 'Analytics',
  '/admin/chat': 'Chat',
};

export function getPageTitle(path: string): string {
  const basePath = path.split('?')[0];
  if (PAGE_TITLES[basePath]) return PAGE_TITLES[basePath];
  if (basePath.startsWith('/products/')) return 'Product Details';
  if (basePath.startsWith('/orders/')) return 'Order Details';
  return 'Page';
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

const TABS_KEY = 'sp-granites-tabs';
const ACTIVE_KEY = 'sp-granites-active-tab';

export function TabProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentFullPath = location.pathname + location.search;

  const [tabs, setTabs] = useState<Tab[]>(() => {
    try {
      const stored = localStorage.getItem(TABS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return [{ id: generateId(), path: '/', title: 'Home' }];
  });

  const [activeTabId, setActiveTabId] = useState<string | null>(() => {
    try {
      const storedActiveId = localStorage.getItem(ACTIVE_KEY);
      const storedTabs = localStorage.getItem(TABS_KEY);
      if (storedActiveId && storedTabs) {
        const parsed = JSON.parse(storedTabs) as Tab[];
        if (parsed.find(t => t.id === storedActiveId)) return storedActiveId;
      }
    } catch {}
    return null;
  });

  useEffect(() => {
    localStorage.setItem(TABS_KEY, JSON.stringify(tabs));
  }, [tabs]);

  useEffect(() => {
    if (activeTabId) localStorage.setItem(ACTIVE_KEY, activeTabId);
  }, [activeTabId]);

  useEffect(() => {
    const matchingTab = tabs.find(t => t.path === currentFullPath);
    if (matchingTab) {
      if (activeTabId !== matchingTab.id) {
        setActiveTabId(matchingTab.id);
      }
      return;
    }

    const basePathMatch = tabs.find(t => t.path.split('?')[0] === location.pathname);
    if (basePathMatch) {
      setActiveTabId(basePathMatch.id);
      setTabs(prev => prev.map(t =>
        t.id === basePathMatch.id ? { ...t, path: currentFullPath } : t
      ));
      return;
    }

    if (activeTabId) {
      setTabs(prev => prev.map(t =>
        t.id === activeTabId
          ? { ...t, path: currentFullPath, title: getPageTitle(currentFullPath) }
          : t
      ));
    } else {
      const newTab: Tab = { id: generateId(), path: currentFullPath, title: getPageTitle(currentFullPath) };
      setTabs(prev => [...prev, newTab]);
      setActiveTabId(newTab.id);
    }
  }, [currentFullPath]);

  const addTab = useCallback((path: string, title: string) => {
    const existing = tabs.find(t => t.path === path);
    if (existing) {
      setActiveTabId(existing.id);
      navigate(path);
      return;
    }
    const newTab: Tab = { id: generateId(), path, title: title || getPageTitle(path) };
    setTabs(prev => [...prev, newTab]);
    setActiveTabId(newTab.id);
    navigate(path);
  }, [tabs, navigate]);

  const removeTab = useCallback((id: string) => {
    setTabs(prev => {
      if (prev.length <= 1) return prev;
      const idx = prev.findIndex(t => t.id === id);
      const newTabs = prev.filter(t => t.id !== id);

      if (activeTabId === id) {
        const nextTab = newTabs[Math.min(idx, newTabs.length - 1)];
        setActiveTabId(nextTab.id);
        navigate(nextTab.path);
      }

      return newTabs;
    });
  }, [activeTabId, navigate]);

  const switchTab = useCallback((id: string) => {
    const tab = tabs.find(t => t.id === id);
    if (tab) {
      setActiveTabId(id);
      navigate(tab.path);
    }
  }, [tabs, navigate]);

  const updateActiveTabTitle = useCallback((title: string) => {
    if (!activeTabId) return;
    setTabs(prev => prev.map(t => t.id === activeTabId ? { ...t, title } : t));
  }, [activeTabId]);

  return (
    <TabContext.Provider value={{ tabs, activeTabId, addTab, removeTab, switchTab, updateActiveTabTitle }}>
      {children}
    </TabContext.Provider>
  );
}

export function useTabs() {
  const ctx = useContext(TabContext);
  if (!ctx) throw new Error('useTabs must be used within TabProvider');
  return ctx;
}
