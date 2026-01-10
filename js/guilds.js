async function loadData() {
    const [guilds, quests] = await Promise.all([
        fetch('./js/json/guilds.json').then(r => r.json()),
        fetch('./js/json/quests.json').then(r => r.json())
    ]);

    return { guilds, quests };
}

loadData().then(({ guilds, quests }) => {
    const app = document.getElementById('app');

    Object.keys(quests).forEach(guildKey => {
        const guild = guilds[guildKey];
        if (!guild) return;

        const guildBlock = document.createElement('div');
        guildBlock.classList.add('item');
        guildBlock.classList.add('card');
        guildBlock.classList.add('center');
        guildBlock.innerHTML = `
    <h1>${guild.name} <span class="guild_short">${guild.short}</span></h1>
    <p>${guild.description}</p>
  `;

        const questList = document.createElement('div');

        quests[guildKey].forEach(q => {
            const quest = document.createElement('div');
            quest.classList.add('item');
            quest.classList.add('card');
            quest.classList.add('center');
            const type = q.reload > -1 ? `Многоразовый (перезарядка ${q.reload} месяца(-ев))` : 'Одноразовый';
            quest.innerHTML = `
      <h2>${q.name}</h2>
      <p><strong>Код:</strong> ${q.code}</p>
      <p><strong>Локация:</strong> ${q.zone}</p>
      <p><strong>Тип:</strong> ${type}</p>
      <p><strong>Длительность:</strong> ${q.length}</p>
      <p><strong>Описание:</strong> ${q.description}</p>
      <p><strong>Проверки:</strong> <span class="quest_check">${q.checks}</span></p>
      <p><strong>Групповые проверки:</strong><span class="quest_check">${q.group_checks}</span></p>
      <p><strong>Групповая награда:</strong> ${q.group_reward}</p>
      <p><strong>Награда:</strong> ${q.money_reward} золота <span class="quest_rate">+${q.bonus_reward_per_rate_percent}%</span>, ${q.xp_reward} опыта <span class="quest_rate">за ${q.reward_rate}</span>.</p>
      <p><strong>Предметы:</strong> ${q.items_reward}</p>
      <p><strong>Штраф:</strong> <span class="quest_fine">${q.fine}</span></p>
    `;
            questList.appendChild(quest);
        });

        guildBlock.appendChild(questList);
        app.appendChild(guildBlock);
    });
});

