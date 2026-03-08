function getValue(id) {
  return document.getElementById(id).value.trim();
}

function setResult(id, content) {
  const el = document.getElementById(id);
  el.textContent = '';
  el.classList.remove('muted');
  el.appendChild(document.createTextNode(content));
}

// 健身知识库数据
const fitnessKnowledgeBase = {
  力量训练动作: {
    深蹲: {
      目标肌群: '股四头肌、腘绳肌、臀大肌、核心肌群',
      动作要领: [
        '双脚与肩同宽或略宽，脚尖略微外展',
        '挺胸收腹，保持腰背挺直',
        '缓慢下蹲，臀部向后坐，像坐椅子一样',
        '蹲至大腿与地面平行或略低',
        '膝盖与脚尖方向一致，不要内扣',
        '发力站起，保持核心收紧'
      ],
      常见错误: ['膝盖内扣', '弯腰驼背', '膝盖超过脚尖过多', '下蹲深度不够'],
      训练建议: { 初学者: '3组×10-15次', 进阶: '4组×8-12次', 高阶: '4组×6-8次' },
      变式: ['哑铃深蹲', '保加利亚蹲', '深蹲跳']
    },
    硬拉: {
      目标肌群: '背部肌群、腘绳肌、臀大肌、核心肌群',
      动作要领: [
        '双脚与髋同宽，杠铃贴近小腿',
        '俯身屈膝，双手正握杠铃',
        '挺胸收腹，保持腰背挺直',
        '发力拉起杠铃，全程紧贴腿部',
        '站直后臀部收紧，不要过度后仰',
        '缓慢下放，控制动作节奏'
      ],
      常见错误: ['弯腰塌背', '杠铃远离身体', '用腰部发力而不是腿部', '站直后过度后仰'],
      训练建议: { 初学者: '3组×6-8次', 进阶: '4组×5-6次', 高阶: '5组×3-5次' },
      变式: ['罗马尼亚硬拉', '相扑硬拉', '单腿硬拉']
    },
    卧推: {
      目标肌群: '胸大肌、肱三头肌、三角肌前束',
      动作要领: [
        '仰卧在卧推凳上，双脚踩实地面',
        '双手握距略宽于肩，手腕保持中立',
        '缓慢下放杠铃至乳头位置',
        '控制下落速度，不要砸胸',
        '发力推起，保持肘部微屈',
        '全程保持肩胛骨收紧'
      ],
      常见错误: ['杠铃下落位置过高或过低', '手腕过度弯曲', '肘部过度外展', '腰部拱起过高'],
      训练建议: { 初学者: '3组×8-10次', 进阶: '4组×6-8次', 高阶: '4组×4-6次' },
      变式: ['上斜卧推', '下斜卧推', '哑铃卧推', '窄距卧推']
    },
    划船: {
      目标肌群: '背阔肌、斜方肌、菱形肌、肱二头肌',
      动作要领: [
        '双脚与肩同宽，膝盖微屈',
        '俯身约45度，保持腰背挺直',
        '双手握杠铃或哑铃，手臂自然下垂',
        '发力拉起至腹部位置',
        '肩胛骨后缩，感受背部收缩',
        '缓慢下放，控制动作节奏'
      ],
      常见错误: ['弯腰驼背', '用手臂发力而不是背部', '耸肩', '身体晃动借力'],
      训练建议: { 初学者: '3组×10-12次', 进阶: '4组×8-10次', 高阶: '4组×6-8次' },
      变式: ['单臂哑铃划船', '坐姿划船', 'T杠划船']
    },
    推举: {
      目标肌群: '三角肌、肱三头肌、斜方肌',
      动作要领: [
        '双脚与肩同宽，核心收紧',
        '双手握杠铃或哑铃于肩部',
        '发力向上推起，手臂伸直',
        '保持核心稳定，不要过度后仰',
        '缓慢下放至起始位置',
        '全程保持控制'
      ],
      常见错误: ['过度后仰', '耸肩', '手臂没有完全伸直', '核心松弛'],
      训练建议: { 初学者: '3组×8-10次', 进阶: '4组×6-8次', 高阶: '4组×5-6次' },
      变式: ['哑铃推举', '阿诺德推举', '侧平举']
    },
    俯卧撑: {
      目标肌群: '胸大肌、肱三头肌、三角肌前束、核心肌群',
      动作要领: [
        '双手略宽于肩，手指自然张开',
        '身体呈一条直线，核心收紧',
        '缓慢下降至胸部接近地面',
        '保持身体稳定，不要塌腰',
        '发力推起至起始位置',
        '全程保持呼吸节奏'
      ],
      常见错误: ['塌腰或撅臀', '手肘过度外展', '下降深度不够', '身体晃动'],
      训练建议: { 初学者: '3组×8-15次', 进阶: '4组×12-20次', 高阶: '4组×15-25次' },
      变式: ['上斜俯卧撑', '下斜俯卧撑', '钻石俯卧撑', '宽距俯卧撑']
    },
    引体向上: {
      目标肌群: '背阔肌、肱二头肌、斜方肌、核心肌群',
      动作要领: [
        '双手正握或反握，握距略宽于肩',
        '身体自然下垂，核心收紧',
        '发力拉起至下巴过杠',
        '肩胛骨下沉后缩',
        '缓慢下放至手臂伸直',
        '避免身体晃动借力'
      ],
      常见错误: ['身体晃动借力', '没有完全伸直手臂', '耸肩', '用腰部借力'],
      训练建议: { 初学者: '3组×3-5次（可用辅助）', 进阶: '4组×6-10次', 高阶: '4组×8-12次' },
      变式: ['反握引体向上', '宽距引体向上', '窄距引体向上']
    }
  },
  核心训练: {
    平板支撑: {
      目标肌群: '腹横肌、腹斜肌、背部肌群、核心肌群',
      动作要领: [
        '俯卧姿势，双手撑地与肩同宽',
        '双脚并拢，脚尖撑地',
        '身体呈一条直线，从头部到脚跟',
        '核心收紧，臀部不要翘起或下沉',
        '保持自然呼吸，不要憋气',
        '保持姿势直到核心肌肉感到疲劳'
      ],
      常见错误: ['塌腰', '臀部翘起', '头部下沉', '憋气'],
      训练建议: { 初学者: '3组×20-30秒', 进阶: '3组×45-60秒', 高阶: '3组×60-90秒' },
      变式: ['侧平板支撑', '平板支撑转体', '动态平板支撑']
    },
    卷腹: {
      目标肌群: '腹直肌',
      动作要领: [
        '仰卧，双脚平放地面，膝盖弯曲',
        '双手轻放于耳侧或胸前',
        '用腹部发力抬起上半身',
        '肩胛骨离地即可，不要完全坐起',
        '缓慢下放至起始位置',
        '不要用颈部发力'
      ],
      常见错误: ['用颈部发力', '完全坐起', '动作过快', '腰部离地'],
      训练建议: { 初学者: '3组×15-20次', 进阶: '3组×20-25次', 高阶: '3组×25-30次' },
      变式: ['反向卷腹', '自行车卷腹', '交叉卷腹']
    },
    俄罗斯转体: {
      目标肌群: '腹斜肌、腹部旋转肌群、背部肌群',
      动作要领: [
        '坐姿，双脚抬起，膝盖微屈',
        '上半身稍后仰，保持核心收紧',
        '双手握拳或持重物于胸前',
        '缓慢向左侧转体，停留1秒',
        '再转向右侧，保持控制',
        '用核心发力，不要用手臂摆动'
      ],
      常见错误: ['用惯性扭动', '双脚落地', '动作过快', '用手臂发力'],
      训练建议: { 初学者: '3组×15-20次', 进阶: '3组×20-30次', 高阶: '3组×30-40次' },
      变式: ['负重俄罗斯转体', '抬腿俄罗斯转体']
    }
  },
  有氧运动: {
    开合跳: {
      目标肌群: '全身肌群，主要心肺功能',
      动作要领: ['双脚并拢站立，双手自然下垂', '跳起时双脚分开，双手上举击掌', '再次跳起回到起始位置', '保持节奏连贯', '落地时膝盖微屈缓冲'],
      训练建议: '每次30-60秒，休息15-30秒，重复3-5组',
      适用场景: '热身、HIIT训练、有氧运动'
    },
    高抬腿: {
      目标肌群: '腿部肌群、核心肌群',
      动作要领: ['双脚并拢站立，双手自然下垂', '快速交替抬腿，膝盖尽量靠近胸口', '脚尖踮起，保持上半身挺直', '核心收紧，保持节奏连贯', '落地时轻踩地面，避免伤膝'],
      训练建议: '每次40秒，休息20秒，重复2-4组',
      适用场景: 'HIIT训练、燃脂训练'
    },
    波比跳: {
      目标肌群: '全身肌群',
      动作要领: ['站立姿势，双脚与肩同宽', '下蹲双手撑地，双脚后跳呈俯卧撑姿势', '完成一个俯卧撑（可选）', '双脚跳回至手部位置', '发力向上跳起，双手上举', '落地缓冲，准备下一次动作'],
      训练建议: '每次30-45秒，休息15-30秒，重复3-4组',
      适用场景: 'HIIT训练、全身燃脂'
    }
  }
};

function getExperienceLevel(experience) {
  const map = { beginner: '初学者', intermediate: '进阶', advanced: '高阶' };
  return map[experience] || '初学者';
}

function getTrainingAdvice(actionName, experience) {
  const level = getExperienceLevel(experience);
  const action = fitnessKnowledgeBase.力量训练动作[actionName] || fitnessKnowledgeBase.核心训练[actionName];
  if (action && action.训练建议) {
    return action.训练建议[level] || action.训练建议['初学者'];
  }
  return '3组×10-12次';
}

function formatActionDetails(actionName, experience) {
  const action = fitnessKnowledgeBase.力量训练动作[actionName] || fitnessKnowledgeBase.核心训练[actionName];
  if (!action) return '';

  const level = getExperienceLevel(experience);
  const advice = action.训练建议[level] || action.训练建议['初学者'];

  let details = `\n【${actionName}】\n`;
  details += `目标肌群：${action.目标肌群}\n`;
  details += `训练安排：${advice}\n`;
  details += `动作要领：\n`;
  action.动作要领.forEach((step, index) => {
    details += `  ${index + 1}. ${step}\n`;
  });
  details += `常见错误：${action.常见错误.join('、')}\n`;
  if (action.变式 && action.变式.length > 0) {
    details += `可选变式：${action.变式.join('、')}\n`;
  }
  return details;
}

function buildBasicPlan({ age, gender, experience, daysPerWeek, goal, place, notes }) {
  const pieces = [];
  const level = getExperienceLevel(experience);

  pieces.push(`基于你提供的信息，我们为你生成了一份详细的个性化训练建议：\n`);

  if (age) {
    pieces.push(`📊 基本信息`);
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

  // 根据目标推荐具体动作
  pieces.push(`🎯 针对「${getGoalText(goal)}」的专项建议\n`);

  let duration = '45-60 分钟';
  if (+daysPerWeek <= 3) duration = '50-70 分钟';
  if (+daysPerWeek >= 5) duration = '35-55 分钟';

  switch (goal) {
    case 'fat-loss':
      pieces.push(`【训练策略】`);
      pieces.push(`以有氧 + 力量结合为主，控制总热量摄入，保证蛋白质充足。`);
      pieces.push(`每次训练时长建议 ${duration}，其中 20-30 分钟有氧，其余时间进行力量训练。\n`);
      pieces.push(`【推荐力量动作】（${level}水平）`);
      pieces.push(formatActionDetails('深蹲', experience));
      pieces.push(formatActionDetails('俯卧撑', experience));
      pieces.push(formatActionDetails('划船', experience));
      pieces.push(`\n【推荐有氧动作】`);
      pieces.push(`开合跳：每次30-60秒，休息15-30秒，重复3-5组`);
      pieces.push(`高抬腿：每次40秒，休息20秒，重复2-4组`);
      pieces.push(`波比跳：每次30-45秒，休息15-30秒，重复3-4组`);
      break;

    case 'muscle-gain':
      pieces.push(`【训练策略】`);
      pieces.push(`以力量训练为核心，确保略高于维持水平的热量和足量蛋白。`);
      pieces.push(`每次训练时长建议 ${duration}，优先安排复合动作，适当加入孤立动作。\n`);
      pieces.push(`【推荐复合动作】（${level}水平）`);
      pieces.push(formatActionDetails('深蹲', experience));
      pieces.push(formatActionDetails('硬拉', experience));
      pieces.push(formatActionDetails('卧推', experience));
      pieces.push(formatActionDetails('划船', experience));
      pieces.push(formatActionDetails('推举', experience));
      break;

    case 'shape':
      pieces.push(`【训练策略】`);
      pieces.push(`以力量训练雕刻线条 + 适度有氧维持体脂为主。`);
      pieces.push(`每次训练时长建议 ${duration}，在保证基础力量的前提下，增加核心训练。\n`);
      pieces.push(`【推荐力量动作】（${level}水平）`);
      pieces.push(formatActionDetails('深蹲', experience));
      pieces.push(formatActionDetails('俯卧撑', experience));
      pieces.push(formatActionDetails('划船', experience));
      pieces.push(`\n【推荐核心动作】`);
      pieces.push(formatActionDetails('平板支撑', experience));
      pieces.push(formatActionDetails('卷腹', experience));
      pieces.push(formatActionDetails('俄罗斯转体', experience));
      break;

    case 'health':
      pieces.push(`【训练策略】`);
      pieces.push(`以全身性力量训练 + 低中强度有氧为主，目标是改善代谢指标与体态。`);
      pieces.push(`每次训练时长建议 ${duration}，适当加入灵活性与拉伸内容。\n`);
      pieces.push(`【推荐基础动作】（${level}水平）`);
      pieces.push(formatActionDetails('深蹲', experience));
      pieces.push(formatActionDetails('俯卧撑', experience));
      pieces.push(formatActionDetails('平板支撑', experience));
      break;

    default:
      pieces.push(`【训练策略】`);
      pieces.push(`建议保持每周规律训练，结合基础力量练习和适度有氧。`);
      pieces.push(`每次训练时长建议 ${duration}，根据身体反馈逐步调整训练量与强度。\n`);
      pieces.push(`【推荐基础动作】（${level}水平）`);
      pieces.push(formatActionDetails('深蹲', experience));
      pieces.push(formatActionDetails('俯卧撑', experience));
  }

  // 根据训练场景提供建议
  pieces.push(`\n🏠 训练场景适配建议`);
  if (place === 'home') {
    pieces.push(`居家训练推荐：`);
    pieces.push(`- 自重训练：深蹲、俯卧撑、平板支撑、卷腹`);
    pieces.push(`- 小器械：哑铃推举、哑铃划船、哑铃深蹲`);
    pieces.push(`- 有氧：开合跳、高抬腿、波比跳`);
  } else if (place === 'gym') {
    pieces.push(`健身房训练推荐：`);
    pieces.push(`- 自由重量：杠铃深蹲、硬拉、卧推、推举`);
    pieces.push(`- 器械训练：坐姿划船、腿举、蝴蝶机`);
    pieces.push(`- 有氧器械：跑步机、椭圆机、划船机`);
  } else {
    pieces.push(`混合训练推荐：`);
    pieces.push(`- 健身房日：杠铃深蹲、硬拉、卧推、推举`);
    pieces.push(`- 居家日：俯卧撑、平板支撑、卷腹、开合跳`);
  }

  // 根据年龄提供建议
  if (age) {
    const ageNum = parseInt(age);
    pieces.push(`\n👤 年龄适配建议（${age}岁）`);
    if (ageNum < 25) {
      pieces.push(`- 恢复能力较强，可以适当增加训练强度`);
      pieces.push(`- 注重动作标准性，为长期训练打好基础`);
    } else if (ageNum < 40) {
      pieces.push(`- 平衡力量训练和有氧训练`);
      pieces.push(`- 注意关节保护，充分热身和拉伸`);
    } else if (ageNum < 55) {
      pieces.push(`- 注重关节保护，避免过大重量`);
      pieces.push(`- 增加核心训练和平衡训练`);
      pieces.push(`- 训练后充分拉伸，促进恢复`);
    } else {
      pieces.push(`- 以轻重量、多次数为主`);
      pieces.push(`- 注重平衡性和柔韧性训练`);
      pieces.push(`- 训练强度循序渐进，避免受伤`);
    }
  }

  if (notes) {
    pieces.push(`\n📝 个性化备注`);
    pieces.push(notes);
  }

  return pieces.join('\n');
}

function getGoalText(goal) {
  const map = {
    'fat-loss': '减脂',
    'muscle-gain': '增肌',
    'shape': '塑形',
    'health': '综合健康'
  };
  return map[goal] || '综合训练';
}

function buildWeeklyPlan({ daysPerWeek, goal, experience, place }) {
  const days = +daysPerWeek || 3;
  const level = getExperienceLevel(experience);

  const pieces = [];
  pieces.push(`📅 一周训练安排示例（每周${days}天，${getGoalText(goal)}目标）\n`);

  // 根据天数和目标生成详细计划
  const plans = generateDetailedWeeklyPlan(days, goal, experience, place);

  plans.forEach((day, index) => {
    pieces.push(`【第 ${index + 1} 天】${day.title}`);
    pieces.push(`训练时长：${day.duration}`);
    pieces.push(`训练内容：`);
    day.exercises.forEach(exercise => {
      pieces.push(`  • ${exercise}`);
    });
    pieces.push(`训练要点：${day.tips}\n`);
  });

  // 根据经验水平提供建议
  pieces.push(`💡 ${level}训练者建议`);
  if (experience === 'beginner') {
    pieces.push(`- 每个动作先从2-3组开始，逐步增加到3-4组`);
    pieces.push(`- 重量以保证动作标准为前提，宁可轻一点也要做标准`);
    pieces.push(`- 组间休息60-90秒，给肌肉充分恢复时间`);
    pieces.push(`- 如果感觉太累，可以减少组数或次数，不要勉强`);
  } else if (experience === 'intermediate') {
    pieces.push(`- 可以尝试超级组（两个动作连续做，中间不休息）`);
    pieces.push(`- 适当增加重量，每组最后2-3次应该感到吃力`);
    pieces.push(`- 组间休息45-60秒，保持训练强度`);
    pieces.push(`- 每周可以尝试1-2次高强度训练`);
  } else {
    pieces.push(`- 可以采用周期化训练，每4-6周调整一次训练计划`);
    pieces.push(`- 尝试不同的训练技术：递减组、强迫次数、离心控制等`);
    pieces.push(`- 组间休息30-60秒，根据训练目标调整`);
    pieces.push(`- 定期测试极限重量，调整训练强度`);
  }

  return pieces.join('\n');
}

function generateDetailedWeeklyPlan(days, goal, experience, place) {
  const level = getExperienceLevel(experience);
  const isHome = place === 'home';

  // 根据目标选择动作
  let exercises = [];
  if (goal === 'muscle-gain') {
    exercises = isHome ?
      ['俯卧撑 4组×12-15次', '深蹲 4组×15-20次', '臀桥 3组×15次', '平板支撑 3组×45秒'] :
      ['杠铃卧推 4组×8-10次', '杠铃深蹲 4组×8-10次', '硬拉 3组×6-8次', '推举 3组×8-10次'];
  } else if (goal === 'fat-loss') {
    exercises = [
      '热身：开合跳 3分钟',
      '力量动作：深蹲 3组×15次',
      '力量动作：俯卧撑 3组×12次',
      'HIIT：波比跳 30秒×4组',
      'HIIT：高抬腿 40秒×4组',
      '有氧：快走或慢跑 20分钟'
    ];
  } else {
    exercises = isHome ?
      ['深蹲 3组×15次', '俯卧撑 3组×12次', '平板支撑 3组×30秒', '卷腹 3组×20次'] :
      ['器械推胸 3组×12次', '器械划船 3组×12次', '腿举 3组×15次', '平板支撑 3组×45秒'];
  }

  const plans = [];

  if (days === 2) {
    plans.push({
      title: '全身力量训练',
      duration: '50-60分钟',
      exercises: goal === 'fat-loss' ?
        ['热身：开合跳 3分钟', '深蹲 3组×15次', '俯卧撑 3组×12次', '平板支撑 3组×30秒', '有氧：快走20分钟'] :
        ['深蹲 3组×12次', '俯卧撑 3组×10次', '臀桥 3组×15次', '平板支撑 3组×30秒', '卷腹 3组×15次'],
      tips: '全身训练，每个动作都要做到位，感受目标肌群发力'
    });
    plans.push({
      title: '上肢+核心训练',
      duration: '45-55分钟',
      exercises: goal === 'fat-loss' ?
        ['热身：高抬腿 2分钟', '俯卧撑 4组×12次', '平板支撑 3组×45秒', '卷腹 3组×20次', '有氧：开合跳5组'] :
        ['俯卧撑 4组×10次', '哑铃划船 3组×12次', '推举 3组×10次', '平板支撑 3组×45秒', '俄罗斯转体 3组×20次'],
      tips: '注重上肢力量，核心训练保持躯干稳定'
    });
  } else if (days === 3) {
    plans.push({
      title: '下肢+核心训练',
      duration: '50-60分钟',
      exercises: ['深蹲 4组×12次', '臀桥 3组×15次', '弓步蹲 3组×10次/侧', '平板支撑 3组×45秒', '卷腹 3组×20次'],
      tips: '下肢是力量基础，深蹲时注意膝盖与脚尖方向一致'
    });
    plans.push({
      title: '上肢推力训练',
      duration: '45-55分钟',
      exercises: ['俯卧撑 4组×12次', '推举 3组×10次', '三头肌臂屈伸 3组×12次', '平板支撑 3组×45秒'],
      tips: '推类动作注重胸肩发力，保持核心收紧'
    });
    plans.push({
      title: '上肢拉力+有氧',
      duration: '50-60分钟',
      exercises: ['引体向上/划船 4组×8-10次', '二头肌弯举 3组×12次', '面拉 3组×15次', '开合跳 5组×45秒', '高抬腿 4组×40秒'],
      tips: '拉类动作注重背部收缩，有氧保持心率在燃脂区间'
    });
  } else if (days >= 4) {
    plans.push({
      title: '胸部+三头肌',
      duration: '50-60分钟',
      exercises: ['卧推/俯卧撑 4组×10次', '上斜卧推 3组×10次', '三头肌臂屈伸 3组×12次', '绳索下压 3组×15次'],
      tips: '胸部训练注重全程控制，下放时感受胸肌拉伸'
    });
    plans.push({
      title: '背部+二头肌',
      duration: '50-60分钟',
      exercises: ['引体向上/划船 4组×8-10次', '硬拉 3组×6-8次', '二头肌弯举 3组×12次', '锤式弯举 3组×12次'],
      tips: '背部训练注重肩胛骨后缩，硬拉保持腰背挺直'
    });
    plans.push({
      title: '腿部+核心',
      duration: '55-65分钟',
      exercises: ['深蹲 4组×10次', '腿举/弓步蹲 3组×12次', '腿弯举 3组×15次', '平板支撑 3组×60秒', '俄罗斯转体 3组×20次'],
      tips: '腿部训练强度较大，注意动作标准，避免膝盖内扣'
    });
    plans.push({
      title: '肩部+有氧',
      duration: '45-55分钟',
      exercises: ['推举 4组×10次', '侧平举 3组×12次', '后束飞鸟 3组×15次', '跑步机/椭圆机 30分钟'],
      tips: '肩部训练注意控制，避免耸肩，有氧保持中等强度'
    });
  }

  return plans.slice(0, days);
}

function buildAIPlan({ goal, place }) {
  const parts = [];

  parts.push('🤖 AI 智能健身助手功能介绍\n');
  parts.push('作为你的专属健身顾问，我可以为你提供以下智能化服务：\n');

  parts.push('1️⃣ 动作指导与纠正');
  if (place === 'home') {
    parts.push('针对居家训练环境，我可以详细指导你完成标准动作：');
    parts.push('• 深蹲：从站姿到下蹲深度，每个细节都有说明');
    parts.push('• 俯卧撑：手的位置、身体角度、下降深度');
    parts.push('• 平板支撑：身体一条直线，核心收紧的要点');
    parts.push('• 卷腹：避免颈部发力，专注腹部收缩');
  } else if (place === 'gym') {
    parts.push('针对健身房训练，我可以指导你使用各种器械：');
    parts.push('• 自由重量：杠铃深蹲、硬拉、卧推的标准动作');
    parts.push('• 固定器械：调整座椅高度、选择合适重量');
    parts.push('• 有氧器械：跑步机、椭圆机、划船机的使用技巧');
  } else {
    parts.push('针对混合训练场景，我可以灵活调整指导方案：');
    parts.push('• 健身房日：重点指导复合动作和器械使用');
    parts.push('• 居家日：指导自重训练和小器械训练');
    parts.push('• 动作替代：当某个动作无法完成时，提供替代方案');
  }

  parts.push('\n2️⃣ 训练计划定制');
  parts.push('根据你的目标和水平，我可以为你定制：');
  parts.push('• 新手入门计划：从基础动作开始，循序渐进');
  parts.push('• 增肌训练计划：分化训练，重点刺激目标肌群');
  parts.push('• 减脂训练计划：力量+有氧结合，高效燃脂');
  parts.push('• 塑形训练计划：雕刻线条，改善体态');

  parts.push('\n3️⃣ 实时问答支持');
  parts.push('训练过程中有任何问题，都可以随时问我：');
  parts.push('• 动作细节："深蹲时膝盖能不能超过脚尖？"');
  parts.push('• 训练安排："今天练胸还是练背？"');
  parts.push('• 饮食建议："练后吃什么比较好？"');
  parts.push('• 恢复指导："肌肉酸痛还能继续练吗？"');

  if (goal === 'fat-loss') {
    parts.push('\n4️⃣ 减脂专项指导');
    parts.push('针对你的减脂目标，我特别关注：');
    parts.push('• 饮食热量控制：创造适度热量缺口');
    parts.push('• 训练强度把控：保证燃脂效果，避免过度训练');
    parts.push('• 进度跟踪：定期评估体脂变化和训练效果');
  } else if (goal === 'muscle-gain') {
    parts.push('\n4️⃣ 增肌专项指导');
    parts.push('针对你的增肌目标，我特别关注：');
    parts.push('• 渐进超负荷：定期增加重量或次数');
    parts.push('• 营养补充：蛋白质和碳水化合物的摄入时机');
    parts.push('• 恢复管理：保证充足睡眠和肌肉恢复时间');
  }

  parts.push('\n💬 现在就开始你的健身之旅吧！');
  parts.push('有任何问题，随时向我提问，我会根据你的具体情况给出专业建议。');

  return parts.join('\n');
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('plan-form');

  form.addEventListener('submit', (e) => {
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

    // 保存用户信息到localStorage
    localStorage.setItem('fitnessUserInfo', JSON.stringify(values));

    const basic = buildBasicPlan(values);
    const weekly = buildWeeklyPlan(values);
    const aiPlan = buildAIPlan(values);

    setResult('plan-basic', basic);
    setResult('plan-weekly', weekly);
    setResult('plan-ai', aiPlan);
  });
});
