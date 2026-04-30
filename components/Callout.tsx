import React from 'react';

type CalloutType = 'info' | 'warning' | 'tip' | 'danger';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const config: Record<CalloutType, { icon: string; classes: string; defaultTitle: string }> = {
  info: {
    icon: 'ℹ️',
    classes: 'border-blue-500/40 bg-blue-500/10 text-blue-900 dark:text-blue-200',
    defaultTitle: 'Info',
  },
  warning: {
    icon: '⚠️',
    classes: 'border-yellow-500/40 bg-yellow-500/10 text-yellow-900 dark:text-yellow-200',
    defaultTitle: 'Warning',
  },
  tip: {
    icon: '💡',
    classes: 'border-green-500/40 bg-green-500/10 text-green-900 dark:text-green-200',
    defaultTitle: 'Tip',
  },
  danger: {
    icon: '🚨',
    classes: 'border-red-500/40 bg-red-500/10 text-red-900 dark:text-red-200',
    defaultTitle: 'Danger',
  },
};

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const { icon, classes, defaultTitle } = config[type];

  return (
    <div className={`my-4 flex gap-3 rounded-lg border px-4 py-3 ${classes}`}>
      <span className="mt-0.5 shrink-0 text-base leading-5">{icon}</span>
      <div className="min-w-0 flex-1 text-sm leading-relaxed">
        <span className="font-semibold">{title ?? defaultTitle}: </span>
        {children}
      </div>
    </div>
  );
}