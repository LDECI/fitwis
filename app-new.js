// API 配置
const API_BASE_URL = 'http://localhost:5000';

function getValue(id) {
  return document.getElementById(id).value.trim();
}

function setResult(id, content, isMarkdown = false) {
  const el = document.getElementById(id);
  el.innerHTML = '';
  el.classList.remove('muted');

  if (isMarkdown) {
    el.innerHTML = formatMarkdown(content);
  } else {
    el.appendChild(document.createTextNode(content));
  }
}

// 简单的 Markdown 格式化
function formatMarkdown(text) {
  return text
    .replace(/### (.*)/g, '<h3 style="color: #bbf7d0; margin: 12px 0 8px 0;">$1</h3>')
    .replace(/## (.*)/g, '<h2 style="color: #bbf7d0; margin: 16px 0 10px 0; font-size: 1.1rem;">$1</h2>')
    .replace(/# (.*)/g, '<h1 style="color: #bbf7d0; margin: 20px 0 12px 0; font-size: 1.2rem;">$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong style="color: #86efac;">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^- (.*)/gm, '<li style="margin: 6px 0; margin-left: 20px;">$1</li>')
    .replace(/\n/g, '<br>');
}

// 保存用户信息到 localStorage
function saveUserInfo(values) {
  try {
    localStorage.setItem('fitnessUserInfo', JSON.stringify(values));
  } catch (e) {
    console.log('无法保存用户信息');
  }
}

// 从 localStorage 读取用户信息
function loadUserInfo() {
  try {
    const saved = localStorage.getItem('fitnessUserInfo');
    if (saved) {
      const values = JSON.parse(saved);
      // 填充表单
      Object.keys(values).forEach(key => {
        const el = document.getElementById(key);
        if (el) el.value = values[key];
      });
    }
  } catch (e) {
    console.log('无法读取用户信息');
  }
}

// 调用后端 API 生成训练方案
async function generatePlanFromAPI(values) {
  const planBasic = document.getElementById('plan-basic');
  const planWeekly = document.getElementById('plan-weekly');

  // 显示加载状态
  planBasic.innerHTML = '<div style="color: #86efac;">🤖 AI 正在生成个性化方案，请稍候...</div>';
  planWeekly.innerHTML = '<div style="color: #86efac;">🤖 AI 正在生成训练计划，请稍候...</div>';
  planBasic.classList.remove('muted');
  planWeekly.classList.remove('muted');

  try {
    const response = await fetch(`${API_BASE_URL}/api/generate-plan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userInfo: values
      })
    });

    const data = await response.json();

    if (data.success) {
      // 解析 AI 返回的内容
      const content = data.plan;

      // 分割内容到两个区域
      const parts = content.split(/## 2\.|## 3\./);

      if (parts.length >= 2) {
        // 第一部分：个性化训练建议
        const basicContent = parts[0].replace(/## 1\./, '').trim();
        setResult('plan-basic', basicContent, true);

        // 第二部分：一周训练安排 + 营养建议
        const weeklyContent = parts[1].trim() + (parts[2] ? '\n\n## 3.' + parts[2] : '');
        setResult('plan-weekly', weeklyContent, true);
      } else {
        // 如果解析失败，全部显示在第一个区域
        setResult('plan-basic', content, true);
        setResult('plan-weekly', '详细计划已包含在上述建议中。', false);
      }
    } else {
      throw new Error(data.error || '生成失败');
    }
  } catch (error) {
    console.error('API Error:', error);
    // API 失败时回退到本地生成
    fallbackToLocalGeneration(values);
  }
}

// 本地生成方案（API 失败时的备用方案）
function fallbackToLocalGeneration(values) {
  const basic = buildBasicPlan(values);
  const weekly = buildWeeklyPlan(values);

  setResult('plan-basic', basic);
  setResult('plan-weekly', weekly);
}

function buildBasicPlan({ age, gender, experience, daysPerWeek, goal, place, notes }) {
  const pieces = [];

  pieces.push(`基于你提供的信息，我们为你生成了一份基础训练建议：`);

  if (age) {
    pieces.push(`- 年龄：${age} 岁`);
  }

  if (gender) {
    const map = { male: '男', female: '女', other: '其他/未指定' };
    pieces.push(`- 性别：${map[gender] || '未指定'}`);
  }

  if (experience) {
    const map = {
      beginner: '新手（0-6 个月）',
      intermediate: '进阶（6-24 个月）',
      advanced: '高阶（2 年以上）',
    };
    pieces.push(`- 训练经验：${map[experience]}`);
  }

  if (daysPerWeek) {
    pieces.push(`- 每周可训练天数：${daysPerWeek} 天`);
  }

  if (place) {
    const map = { gym: '以健身房为主', home: '家庭/户外为主', mixed: '健身房 + 家庭结合' };
    pieces.push(`- 训练场景：${map[place]}`);
  }

  pieces.push('');

  let duration = '45-60 分钟';
  if (+daysPerWeek <= 3) duration = '50-70 分钟';
  if (+daysPerWeek >= 5) duration = '35-55 分钟';

  pieces.push(`【总体建议】`);

  switch (goal) {
    case 'fat-loss':
      pieces.push(
        `以有氧 + 力量结合为主，控制总热量摄入，保证蛋白质充足。每次训练时长建议 ${duration}，其中 20-30 分钟有氧，其余时间进行力量训练（大肌群优先）。`
      );
      break;
    case 'muscle-gain':
      pieces.push(
        `以力量训练为核心，确保略高于维持水平的热量和足量蛋白。每次训练时长建议 ${duration}，优先安排深蹲、硬拉、卧推、划船、推举等复合动作，适当加入孤立动作塑形。`
      );
      break;
    case 'shape':
      pieces.push(
        `以力量训练雕刻线条 + 适度有氧维持体脂为主。每次训练时长建议 ${duration}，在保证基础力量的前提下，可增加中等强度间歇训练（HIIT）和核心训练。`
      );
      break;
    case 'health':
      pieces.push(
        `以全身性力量训练 + 低中强度有氧为主，目标是改善代谢指标与体态。每次训练时长建议 ${duration}，适当加入灵活性与拉伸内容。`
      );
      break;
    default:
      pieces.push(
        `建议保持每周规律训练，结合基础力量练习（深蹲、俯卧撑、划船等）和适度有氧，根据身体反馈逐步调整训练量与强度。`
      );
  }

  if (notes) {
    pieces.push('');
    pieces.push(`【个性化备注】你补充的信息会用于后续进一步精细化方案（示例中不做自动解析）：`);
    pieces.push(notes);
  }

  return pieces.join('\n');
}

function buildWeeklyPlan({ daysPerWeek, goal, experience }) {
  const days = +daysPerWeek || 3;

  const templates = {
    strengthFocus: [
      '第 1 天：上肢力量（推为主：胸、肩前束、肱三头）+ 10-15 分钟中等强度有氧',
      '第 2 天：下肢力量（股四头肌、臀部、腘绳肌为主）+ 核心训练',
      '第 3 天：上肢力量（拉为主：背、后束肩、肱二头）+ 10 分钟拉伸',
      '第 4 天：全身综合训练（以复合动作为主）+ 20 分钟有氧',
      '第 5 天：低强度活动恢复（散步、拉伸、瑜伽等）',
    ],
    fatLoss: [
      '第 1 天：上半身力量 + 20 分钟中等强度有氧',
      '第 2 天：下半身力量 + 10 分钟核心训练',
      '第 3 天：间歇性有氧（如跑步机、划船机 20-25 分钟）',
      '第 4 天：全身循环训练（轻重量、多次数）',
      '第 5 天：户外快走或骑行 40 分钟 + 全身拉伸',
    ],
    health: [
      '第 1 天：全身力量训练（机器+自由重量结合）',
      '第 2 天：30-40 分钟低中强度有氧（心率偏舒适）',
      '第 3 天：核心与姿势矫正训练 + 拉伸',
      '第 4 天：轻负荷全身力量 + 20 分钟有氧',
      '第 5 天：步行/爬楼等日常活动增强',
    ],
  };

  let basePlan;
  if (goal === 'fat-loss') basePlan = templates.fatLoss;
  else if (goal === 'health') basePlan = templates.health;
  else basePlan = templates.strengthFocus;

  const selected = basePlan.slice(0, Math.min(days, basePlan.length));

  const header = [];
  header.push(`以下是一份根据你每周可训练 ${days} 天生成的示例计划（可按需调整顺序与内容）：`);
  header.push('');
  header.push(...selected);

  if (experience === 'beginner') {
    header.push('');
    header.push('新手建议：每个动作先从 2-3 组 × 10-15 次开始，重量以保证动作标准为前提逐步增加。');
  } else if (experience === 'advanced') {
    header.push('');
    header.push('高阶训练者：可根据需要采用周期化训练、强度分配（如推拉腿或上下半身）及不同训练方法（如递减组、超级组）提升刺激。');
  }

  return header.join('\n');
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('plan-form');

  // 页面加载时恢复用户信息
  loadUserInfo();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const values = {
      age: getValue('age'),
      gender: getValue('gender'),
      experience: getValue('experience'),
      daysPerWeek: getValue('daysPerWeek'),
      goal: getValue('goal'),
      place: getValue('place'),
      notes: getValue('notes'),
    };

    // 保存用户信息
    saveUserInfo(values);

    // 调用 API 生成方案
    await generatePlanFromAPI(values);
  });
});
