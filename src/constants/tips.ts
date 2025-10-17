import { ActivityType, Tip } from '@/types';

export const TIPS_DATABASE: Tip[] = [
  // Email Tips
  {
    id: 'email-1',
    title: 'Batch Your Emails',
    description: 'Send multiple topics in one email instead of separate messages to reduce server processing.',
    category: 'emails',
    potentialSaving: 50,
    icon: '📧',
  },
  {
    id: 'email-2',
    title: 'Avoid Unnecessary CCs',
    description: 'Only include recipients who truly need the information to reduce network traffic.',
    category: 'emails',
    potentialSaving: 30,
    icon: '📧',
  },
  {
    id: 'email-3',
    title: 'Use Text Instead of HTML',
    description: 'Plain text emails use significantly less energy than rich HTML formatting.',
    category: 'emails',
    potentialSaving: 25,
    icon: '📧',
  },
  {
    id: 'email-4',
    title: 'Delete Old Emails',
    description: 'Regularly clean your inbox to reduce server storage requirements.',
    category: 'emails',
    potentialSaving: 40,
    icon: '📧',
  },

  // Streaming Tips
  {
    id: 'streaming-1',
    title: 'Lower Video Quality',
    description: 'Streaming in 720p instead of 4K can reduce emissions by up to 90%.',
    category: 'streaming',
    potentialSaving: 200,
    icon: '📺',
  },
  {
    id: 'streaming-2',
    title: 'Download for Offline Viewing',
    description: 'Download content once instead of streaming repeatedly.',
    category: 'streaming',
    potentialSaving: 150,
    icon: '📺',
  },
  {
    id: 'streaming-3',
    title: 'Use Smaller Screens',
    description: 'Watch on your phone or tablet instead of large TV screens when possible.',
    category: 'streaming',
    potentialSaving: 80,
    icon: '📺',
  },
  {
    id: 'streaming-4',
    title: 'Close Background Tabs',
    description: 'Pause or close other streaming services when not actively watching.',
    category: 'streaming',
    potentialSaving: 60,
    icon: '📺',
  },

  // Coding Tips
  {
    id: 'coding-1',
    title: 'Use Local Development',
    description: 'Develop locally instead of using cloud IDEs when possible.',
    category: 'coding',
    potentialSaving: 100,
    icon: '💻',
  },
  {
    id: 'coding-2',
    title: 'Optimize Build Processes',
    description: 'Use incremental builds and caching to reduce compilation time.',
    category: 'coding',
    potentialSaving: 75,
    icon: '💻',
  },
  {
    id: 'coding-3',
    title: 'Close Unused Applications',
    description: 'Quit IDEs, browsers, and dev tools when not actively coding.',
    category: 'coding',
    potentialSaving: 50,
    icon: '💻',
  },
  {
    id: 'coding-4',
    title: 'Use Efficient Languages',
    description: 'Consider energy-efficient programming languages for appropriate tasks.',
    category: 'coding',
    potentialSaving: 90,
    icon: '💻',
  },

  // Video Calls Tips
  {
    id: 'video-1',
    title: 'Turn Off Video When Not Needed',
    description: 'Audio-only calls use 96% less energy than video calls.',
    category: 'video_calls',
    potentialSaving: 400,
    icon: '📹',
  },
  {
    id: 'video-2',
    title: 'Reduce Participant Count',
    description: 'Keep meetings focused with only necessary participants.',
    category: 'video_calls',
    potentialSaving: 200,
    icon: '📹',
  },
  {
    id: 'video-3',
    title: 'Use Phone Calls for Quick Chats',
    description: 'Traditional phone calls for brief conversations use less energy.',
    category: 'video_calls',
    potentialSaving: 300,
    icon: '📹',
  },
  {
    id: 'video-4',
    title: 'Optimize Your Setup',
    description: 'Close unnecessary apps and use ethernet instead of WiFi for stability.',
    category: 'video_calls',
    potentialSaving: 100,
    icon: '📹',
  },

  // Cloud Storage Tips
  {
    id: 'cloud-1',
    title: 'Delete Duplicate Files',
    description: 'Use tools to find and remove duplicate files from your cloud storage.',
    category: 'cloud_storage',
    potentialSaving: 20,
    icon: '☁️',
  },
  {
    id: 'cloud-2',
    title: 'Compress Large Files',
    description: 'Compress images and documents before uploading to cloud storage.',
    category: 'cloud_storage',
    potentialSaving: 30,
    icon: '☁️',
  },
  {
    id: 'cloud-3',
    title: 'Use Local Storage First',
    description: 'Store frequently accessed files locally and sync only when needed.',
    category: 'cloud_storage',
    potentialSaving: 25,
    icon: '☁️',
  },
  {
    id: 'cloud-4',
    title: 'Archive Old Files',
    description: 'Move old files to cheaper, less energy-intensive storage tiers.',
    category: 'cloud_storage',
    potentialSaving: 15,
    icon: '☁️',
  },

  // Gaming Tips
  {
    id: 'gaming-1',
    title: 'Lower Graphics Settings',
    description: 'Reduce graphics quality to decrease GPU power consumption.',
    category: 'gaming',
    potentialSaving: 150,
    icon: '🎮',
  },
  {
    id: 'gaming-2',
    title: 'Take Regular Breaks',
    description: 'Gaming breaks reduce continuous energy consumption.',
    category: 'gaming',
    potentialSaving: 100,
    icon: '🎮',
  },
  {
    id: 'gaming-3',
    title: 'Close Background Applications',
    description: 'Quit unnecessary programs while gaming to reduce system load.',
    category: 'gaming',
    potentialSaving: 80,
    icon: '🎮',
  },
  {
    id: 'gaming-4',
    title: 'Use Game Mode',
    description: 'Enable OS game mode to optimize power consumption.',
    category: 'gaming',
    potentialSaving: 60,
    icon: '🎮',
  },

  // Social Media Tips
  {
    id: 'social-1',
    title: 'Set Time Limits',
    description: 'Use app timers to limit social media browsing time.',
    category: 'social_media',
    potentialSaving: 80,
    icon: '📱',
  },
  {
    id: 'social-2',
    title: 'Disable Auto-Play Videos',
    description: 'Turn off auto-playing videos in social media settings.',
    category: 'social_media',
    potentialSaving: 120,
    icon: '📱',
  },
  {
    id: 'social-3',
    title: 'Use Dark Mode',
    description: 'Dark themes use less energy on OLED screens.',
    category: 'social_media',
    potentialSaving: 40,
    icon: '📱',
  },
  {
    id: 'social-4',
    title: 'Reduce Notification Frequency',
    description: 'Fewer notifications mean less frequent phone wake-ups.',
    category: 'social_media',
    potentialSaving: 30,
    icon: '📱',
  },
];

export const getCategoryTips = (category: ActivityType): Tip[] => {
  return TIPS_DATABASE.filter(tip => tip.category === category);
};

export const getRandomTips = (count: number = 5): Tip[] => {
  const shuffled = [...TIPS_DATABASE].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getTopImpactTips = (count: number = 5): Tip[] => {
  return [...TIPS_DATABASE]
    .sort((a, b) => b.potentialSaving - a.potentialSaving)
    .slice(0, count);
};