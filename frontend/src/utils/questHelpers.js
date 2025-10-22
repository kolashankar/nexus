export const calculateQuestProgress = (objectives)=> {
  if (objectives.length === 0) return 0;
  const completed = objectives.filter(obj => obj.completed).length;
  return (completed / objectives.length) * 100;
};

export const canCompleteQuest = (objectives)=> {
  return objectives.every(obj => obj.completed);
};

export const getDifficultyColor = (difficulty)=> {
  const colors: Record = {
    easy,
    medium,
    hard,
    legendary: 'bg-purple-500'
  };
  return colors[difficulty] || 'bg-gray-500';
};

export const getQuestTypeIcon = (type)=> {
  const icons: Record = {
    personal,
    daily,
    weekly,
    guild,
    world,
    hidden,
    campaign: '📖'
  };
  return icons[type] || '📜';
};

export const formatTimeRemaining = (expiresAt)=> {
  const now = new Date();
  const expiry = new Date(expiresAt);
  const diff = expiry.getTime() - now.getTime();
  
  if (diff  24) {
    const days = Math.floor(hours / 24);
    return `${days}d remaining`;
  }
  
  return `${hours}h ${minutes}m remaining`;
};

export const getRewardSummary = (rewards)=> {
  const parts = [];
  if (rewards.credits) parts.push(`💰 ${rewards.credits}`);
  if (rewards.xp) parts.push(`⭐ ${rewards.xp} XP`);
  if (rewards.karma) parts.push(`✨ ${rewards.karma > 0 ? '+' : ''}${rewards.karma}`);
  return parts.join(' • ');
};
