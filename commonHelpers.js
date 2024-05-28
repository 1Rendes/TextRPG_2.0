(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))L(n);new MutationObserver(n=>{for(const u of n)if(u.type==="childList")for(const q of u.addedNodes)q.tagName==="LINK"&&q.rel==="modulepreload"&&L(q)}).observe(document,{childList:!0,subtree:!0});function G(n){const u={};return n.integrity&&(u.integrity=n.integrity),n.referrerPolicy&&(u.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?u.credentials="include":n.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function L(n){if(n.ep)return;n.ep=!0;const u=G(n);fetch(n.href,u)}})();let b=0,s=100,r=50,T=0,c,g,x=["Палка"];const v=document.querySelector("#button1"),S=document.querySelector("#button2"),H=document.querySelector("#button3"),t=document.querySelector("#text"),$=document.querySelector("#xpText"),M=document.querySelector("#healthText"),y=document.querySelector("#goldText"),O=document.querySelector("#monsterStats"),B=document.querySelector("#monsterName"),N=document.querySelector("#monsterHealth"),p=document.querySelector("#history"),w=[{name:"Палка",power:5},{name:"Кинжал",power:30},{name:"Дубина",power:50},{name:"Меч",power:100}],m=[{name:"Слизь",level:2,health:15},{name:"Клыкастый монстр",level:8,health:60},{name:"Дракон",level:20,health:300}],a=[{name:"Городская площадь","button text":["Посетить лавку","Отправиться в пещеру","Схватка с Драконом"],"button functions":[W,C,F],text:'Вы на городской площади и видите вывеску "Лавка". Вдали среди холмов виден вход в пещеру.'},{name:"Лавка","button text":["Купить 10 здоровья(10 золотых)","Купить оружие(30 золотых)","Вернуться на площадь"],"button functions":[I,K,P],text:"Вы находитесь в лавке."},{name:"Пещера","button text":["Сразиться со слизью","Сразиться с клыкастым монстром","Вернуться на городскую площадь"],"button functions":[j,z,d],text:"Вы вошли в пещеру. Вы видите некоторых монстров. Они вас не заметили..."},{name:"Битва","button text":["Атака","Увернуться","Сбежать"],"button functions":[J,U,d],text:"Вы сражаетесь с монстром.",color:"yellow"},{name:"Смерть монстра","button text":["Выйти из пещеры","Выйти из пещеры","Осмотреться"],"button functions":[d,d,D],text:'Монстр кричит "Ааххрг!" и умирает. Вы Получили опыт и немного золота.',color:"lime"},{name:"Проигрыш","button text":["ПОВТОР?","ПОВТОР?","ПОВТОР?"],"button functions":[h,h,h],text:"Вы умерли. &#x2620;",color:"red"},{name:"Победа","button text":["ПОВТОР?","ПОВТОР?","ПОВТОР?"],"button functions":[h,h,h],text:"Вы одолели Дракона! ВЫ ПОБЕДИЛИ! &#x1F389;",color:"lime"},{name:"Пасхалка","button text":["2","8","Выйти из пещеры."],"button functions":[_,ee,d],text:"Вы нашли секретный ход и пробрались в него. Здесь стоит сундук но он закрыт. Нужно отгадать число и вы сможете открыть его и забрать золото. На сундуке стоит ловушка, будьте аккуратны."},{name:"Секретный ход в пещере","button text":["Зажечь факел и продвигаться дальше","Выйти из пещеры","Выйти из пещеры"],"button functions":[Z,d,d],text:"Из этого хода несёт затхлым воздухом..."}];v.onclick=W;S.onclick=C;H.onclick=F;function l(e,o){p.innerHTML+=`<span class='game-message' style='color:${o}'>${e}</span>`,p.scrollTop=p.scrollHeight}function i(e,o){p.innerHTML+=`<span class='player-message' style='color:${o}'>${e}</span>`,p.scrollTop=p.scrollHeight}function f(e){O.style.display="none",v.innerText=e["button text"][0],S.innerText=e["button text"][1],H.innerText=e["button text"][2],v.onclick=e["button functions"][0],S.onclick=e["button functions"][1],H.onclick=e["button functions"][2],t.innerHTML=e.text,l(e.text,e.color)}function P(){i("Вы выходите из оружейной лавки..."),f(a[0])}function d(){i("Вы выбираетесь из пещеры на свежий воздух..."),f(a[0])}function W(){i("Вы направляетесь в местную оружейную лавку..."),f(a[1])}function C(){i("Вы направились в пещеру, из которой начинает нести зловонием и слышно странные звуки..."),f(a[2])}function D(){i("В пещере вы обнаружили дополнительное ответвление, но там очень темно..."),f(a[8])}function I(){r>=10?(r-=10,s+=10,y.innerText=r,M.innerText=s,i("Вы потратили <b>10</b> золота на здоровье")):(t.innerText="У Вас нет достаточно золота чтобы купить здоровье",l(t.innerText,"red"))}function K(){if(T<w.length-1)if(r>=30){i("Вы потратили <b>30</b> золота на новое оружие"),r-=30,T++,y.innerText=r;let e=w[T].name;t.innerText="Теперь у Вас "+e+".",x.push(e),t.innerText+=" В Вашем инвентаре есть: "+x,l(t.innerText,"lime")}else t.innerText="У Вас нет достаточно золота чтобы купить оружие.",l(t.innerText,"red");else t.innerText="У Вас уже есть самое мощное оружие!",l(t.innerText,"yellow"),S.innerText="Продать оружие за 15 золотых",S.onclick=V}function V(){if(x.length>1){r+=15,y.innerText=r;let e=x.shift();i(`Вы продали <b>${e}</b> за <b>15</b> золота`),t.innerText="Вы продали "+e+".",t.innerText+=" В Вашем инвентаре есть: "+x,l(t.innerText)}else t.innerText="Не продавайте Ваше единственное оружие!",l(t.innerText,"red")}function j(){c=0,k()}function z(){c=1,k()}function F(){c=2,k()}function k(){f(a[3]),g=m[c].health,O.style.display="block",B.innerText=m[c].name,N.innerText=g,i(`Вы подошли ближе и на вас напал: ${m[c].name}!`)}function J(){t.innerText=""+m[c].name+" Атакует.",t.innerText+=" Вы атаковали монстра используя "+w[T].name+".",s-=Q(m[c].level),i(t.innerText,"yellow"),R()?g-=w[T].power+Math.floor(Math.random()*b)+1:(t.innerText+=" Вы промахнулись.",l(t.innerText,"red")),M.innerText=s,N.innerText=g,s<=0?E():g<=0&&(c===2?Y():X()),Math.random()<=.1&&x.length!==1&&(t.innerText+=" Ваш "+x.pop()+" сломался.",l(t.innerText,"red"),T--)}function Q(e){const o=e*5-Math.floor(Math.random()*b);return o>0?o:0}function R(){return Math.random()>.2||s<20}function U(){i("Вы сделали манёвр, чтобы увернуться."),t.innerText="Вы увернулись от атаки: "+m[c].name,l(t.innerText,"lime")}function X(){r+=Math.floor(m[c].level*6.7),b+=m[c].level,y.innerText=r,$.innerText=b,f(a[4])}function E(){f(a[5])}function Y(){f(a[6])}function h(){b=0,s=100,r=50,T=0,x=["Палка"],y.innerText=r,M.innerText=s,$.innerText=b,P()}function Z(){i("Вы зажгли факел и пройдя немного дальше что-то обнаружили..."),f(a[7])}function _(){A(2)}function ee(){A(8)}function A(e){const o=[];for(;o.length<10;)o.push(Math.floor(Math.random()*11));i(`Вы выбрали ${e} и пытаетесь открывать сундук...`),o.includes(e)?(l("Сундук открылся! Вы нашли 20 золотых!","lime"),r+=20,y.innerText=r):(l("Сработала ловушка и брызнул опасный яд! Вы потеряли 10 здоровья.","red"),s-=10,M.innerText=s,s<=0&&E())}
//# sourceMappingURL=commonHelpers.js.map
