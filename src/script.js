let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ['Палка'];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');
const text = document.querySelector('#text');
const xpText = document.querySelector('#xpText');
const healthText = document.querySelector('#healthText');
const goldText = document.querySelector('#goldText');
const monsterStats = document.querySelector('#monsterStats');
const monsterName = document.querySelector('#monsterName');
const monsterHealthText = document.querySelector('#monsterHealth');
const history = document.querySelector('#history');
const weapons = [
  { name: 'Палка', power: 5 },
  { name: 'Кинжал', power: 30 },
  { name: 'Дубина', power: 50 },
  { name: 'Меч', power: 100 },
];
const monsters = [
  {
    name: 'Слизь',
    level: 2,
    health: 15,
  },
  {
    name: 'Клыкастый монстр',
    level: 8,
    health: 60,
  },
  {
    name: 'Дракон',
    level: 20,
    health: 300,
  },
];
const locations = [
  {
    name: 'Городская площадь',
    'button text': [
      'Посетить лавку',
      'Отправиться в пещеру',
      'Схватка с Драконом',
    ],
    'button functions': [goStore, goCave, fightDragon],
    text: 'Вы на городской площади и видите вывеску "Лавка". Вдали среди холмов виден вход в пещеру.',
  },
  {
    name: 'Лавка',
    'button text': [
      'Купить 10 здоровья(10 золотых)',
      'Купить оружие(30 золотых)',
      'Вернуться на площадь',
    ],
    'button functions': [buyHealth, buyWeapon, goTown],
    text: 'Вы находитесь в лавке.',
  },
  {
    name: 'Пещера',
    'button text': [
      'Сразиться со слизью',
      'Сразиться с клыкастым монстром',
      'Вернуться на городскую площадь',
    ],
    'button functions': [fightSlime, fightBeast, goTownFromCave],
    text: 'Вы вошли в пещеру. Вы видите некоторых монстров. Они вас не заметили...',
  },
  {
    name: 'Битва',
    'button text': ['Атака', 'Увернуться', 'Сбежать'],
    'button functions': [attack, dodge, goTownFromCave],
    text: 'Вы сражаетесь с монстром.',
    color: 'yellow',
  },
  {
    name: 'Смерть монстра',
    'button text': ['Выйти из пещеры', 'Выйти из пещеры', 'Осмотреться'],
    'button functions': [goTownFromCave, goTownFromCave, goSecret],
    text: 'Монстр кричит "Ааххрг!" и умирает. Вы Получили опыт и немного золота.',
    color: 'lime',
  },
  {
    name: 'Проигрыш',
    'button text': ['ПОВТОР?', 'ПОВТОР?', 'ПОВТОР?'],
    'button functions': [restart, restart, restart],
    text: 'Вы умерли. &#x2620;',
    color: 'red',
  },
  {
    name: 'Победа',
    'button text': ['ПОВТОР?', 'ПОВТОР?', 'ПОВТОР?'],
    'button functions': [restart, restart, restart],
    text: 'Вы одолели Дракона! ВЫ ПОБЕДИЛИ! &#x1F389;',
    color: 'lime',
  },
  {
    name: 'Пасхалка',
    'button text': ['2', '8', 'Выйти из пещеры.'],
    'button functions': [pickTwo, pickEight, goTownFromCave],
    text: 'Вы нашли секретный ход и пробрались в него. Здесь стоит сундук но он закрыт. Нужно отгадать число и вы сможете открыть его и забрать золото. На сундуке стоит ловушка, будьте аккуратны.',
  },
  {
    name: 'Секретный ход в пещере',
    'button text': [
      'Зажечь факел и продвигаться дальше',
      'Выйти из пещеры',
      'Выйти из пещеры',
    ],
    'button functions': [easterEgg, goTownFromCave, goTownFromCave],
    text: 'Из этого хода несёт затхлым воздухом...',
  },
];

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function updateGameChat(text, color) {
  history.innerHTML += `<span class='game-message' style='color:${color}'>${text}</span>`;
  history.scrollTop = history.scrollHeight;
}

function updatePlayerChat(text, color) {
  history.innerHTML += `<span class='player-message' style='color:${color}'>${text}</span>`;
  history.scrollTop = history.scrollHeight;
}

function update(location) {
  monsterStats.style.display = 'none';
  button1.innerText = location['button text'][0];
  button2.innerText = location['button text'][1];
  button3.innerText = location['button text'][2];
  button1.onclick = location['button functions'][0];
  button2.onclick = location['button functions'][1];
  button3.onclick = location['button functions'][2];
  text.innerHTML = location.text;
  updateGameChat(location.text, location.color);
}

function goTown() {
  updatePlayerChat(`Вы выходите из оружейной лавки...`);
  update(locations[0]);
}

function goTownFromCave() {
  updatePlayerChat(`Вы выбираетесь из пещеры на свежий воздух...`);
  update(locations[0]);
}

function goStore() {
  updatePlayerChat(`Вы направляетесь в местную оружейную лавку...`);
  update(locations[1]);
}

function goCave() {
  updatePlayerChat(
    `Вы направились в пещеру, из которой начинает нести зловонием и слышно странные звуки...`
  );
  update(locations[2]);
}

function goSecret() {
  updatePlayerChat(
    `В пещере вы обнаружили дополнительное ответвление, но там очень темно...`
  );
  update(locations[8]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
    updatePlayerChat(`Вы потратили <b>10</b> золота на здоровье`);
  } else {
    text.innerText = 'У Вас нет достаточно золота чтобы купить здоровье';
    updateGameChat(text.innerText, 'red');
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      updatePlayerChat(`Вы потратили <b>30</b> золота на новое оружие`);
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = 'Теперь у Вас ' + newWeapon + '.';
      inventory.push(newWeapon);
      text.innerText += ' В Вашем инвентаре есть: ' + inventory;
      updateGameChat(text.innerText, 'lime');
    } else {
      text.innerText = 'У Вас нет достаточно золота чтобы купить оружие.';
      updateGameChat(text.innerText, 'red');
    }
  } else {
    text.innerText = 'У Вас уже есть самое мощное оружие!';
    updateGameChat(text.innerText, 'yellow');
    button2.innerText = 'Продать оружие за 15 золотых';
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    updatePlayerChat(`Вы продали <b>${currentWeapon}</b> за <b>15</b> золота`);
    text.innerText = 'Вы продали ' + currentWeapon + '.';
    text.innerText += ' В Вашем инвентаре есть: ' + inventory;
    updateGameChat(text.innerText);
  } else {
    text.innerText = 'Не продавайте Ваше единственное оружие!';
    updateGameChat(text.innerText, 'red');
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  updatePlayerChat(
    `Вы подошли ближе и на вас напал: ${monsters[fighting].name}!`
  );
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = 'block';
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
  history.scrollTop = history.scrollHeight;
}

function attack() {
  text.innerText = '' + monsters[fighting].name + ' Атакует.';
  text.innerText +=
    ' Вы атаковали монстра используя ' + weapons[currentWeapon].name + '.';
  health -= getMonsterAttackValue(monsters[fighting].level);
  updatePlayerChat(text.innerText, 'yellow');
  if (isMonsterHit()) {
    monsterHealth -=
      weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  } else {
    text.innerText += ' Вы промахнулись.';
    updateGameChat(text.innerText, 'red');
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= 0.1 && inventory.length !== 1) {
    text.innerText += ' Ваш ' + inventory.pop() + ' сломался.';
    updateGameChat(text.innerText, 'red');
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = level * 5 - Math.floor(Math.random() * xp);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > 0.2 || health < 20;
}

function dodge() {
  updatePlayerChat(`Вы сделали манёвр, чтобы увернуться.`);
  text.innerText = 'Вы увернулись от атаки: ' + monsters[fighting].name;
  updateGameChat(text.innerText, 'lime');
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ['Палка'];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  updatePlayerChat(
    `Вы зажгли факел и пройдя немного дальше что-то обнаружили...`
  );
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  // text.innerText = 'Вы выбрали ' + guess + '. Вот случайные числа:\n';
  updatePlayerChat(`Вы выбрали ${guess} и пытаетесь открывать сундук...`);
  for (let i = 0; i < 10; i++) {
    // text.innerText += numbers[i] + '\n';
  }
  // updateGameChat(text.innerText);
  if (numbers.includes(guess)) {
    // text.innerText +=
    updateGameChat('Сундук открылся! Вы нашли 20 золотых!', 'lime');
    // updateGameChat(text.innerText, 'lime');
    gold += 20;
    goldText.innerText = gold;
  } else {
    // text.innerText +=
    updateGameChat(
      'Сработала ловушка и брызнул опасный яд! Вы потеряли 10 здоровья.',
      'red'
    );
    // updateGameChat(text.innerText, 'red');
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}
