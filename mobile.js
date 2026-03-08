document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('mobile-start-btn');
  const summaryEl = document.getElementById('mobile-summary');
  const cards = document.querySelectorAll('.phone-card');
  const cardPlan = document.getElementById('card-plan');
  const cardAi = document.getElementById('card-ai');
  const cardStats = document.getElementById('card-stats');
  const tabs = document.querySelectorAll('.phone-tab');

  if (!summaryEl) return;

  const tabMessages = {
    home: '首页为你汇总了「今日训练、AI 建议与数据状态」，方便一眼看清重点。',
    training: '在训练页，你可以专注于今日训练计划与每一组的完成情况。',
    ai: 'AI 助手可以帮你做动作纠正、饮食建议与训练调整，像一个随身私教。',
    profile: '在「我的」中，你可以查看历史打卡、体重变化和个人偏好设置。',
  };

  const cardMessages = {
    plan: '今日推荐：上肢力量 + 核心 + 20 分钟中等强度有氧，预计 55 分钟，完成后记得做放松拉伸。',
    ai: '打开 AI 动作纠正后，系统会通过摄像头识别你的动作轨迹，并用评分和提示帮助你逐步规范技术。',
    stats: '结合心率、睡眠与训练频率，今天的整体恢复状态良好，可以正常完成推荐训练量。',
  };

  function setSummary(text) {
    summaryEl.textContent = text;
  }

  function setActiveCard(target) {
    cards.forEach((card) => card.classList.remove('phone-card--active'));
    if (target) {
      target.classList.add('phone-card--active');
    }
  }

  // 「开始今日训练」按钮：锁定今日训练计划，并更新进度标签
  if (startBtn && cardPlan) {
    startBtn.addEventListener('click', () => {
      setActiveCard(cardPlan);
      setSummary(cardMessages.plan);

      const tag = cardPlan.querySelector('.phone-tag');
      if (tag) {
        tag.textContent = '进度 · 已开始';
        tag.classList.add('phone-tag--accent');
      }

      cardPlan.style.transform = 'translateY(-2px)';
      setTimeout(() => {
        cardPlan.style.transform = 'translateY(0)';
      }, 160);
    });
  }

  // 点击不同卡片时，让卡片高亮并更新概要文案
  if (cardPlan) {
    cardPlan.addEventListener('click', () => {
      setActiveCard(cardPlan);
      setSummary(cardMessages.plan);
    });
  }

  if (cardAi) {
    cardAi.addEventListener('click', () => {
      setActiveCard(cardAi);
      setSummary(cardMessages.ai);
    });
  }

  if (cardStats) {
    cardStats.addEventListener('click', () => {
      setActiveCard(cardStats);
      setSummary(cardMessages.stats);
    });
  }

  // 底部 Tab：简单切换高亮，同时用一句话解释当前 Tab 的作用
  if (tabs.length) {
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('phone-tab--active'));
        tab.classList.add('phone-tab--active');

        const key = tab.dataset.tab || 'home';
        if (tabMessages[key]) {
          setSummary(tabMessages[key]);
        }
      });
    });
  }

  // 初始概要文案稍微丰富一点
  setSummary('根据你的训练目标与可用时间，已为你生成一组适配强度的「今日训练 + 恢复建议」。');
});

