const cloud    = document.getElementById('cloud');
const cloudTxt = document.getElementById('cloud-text');
const overlay  = document.getElementById('overlay');
const monkey   = document.getElementById('monkey');
const cake     = document.getElementById('cake');
const gifts    = [
  document.getElementById('gift-1'),
  document.getElementById('gift-2'),
  document.getElementById('gift-3')
];
const bgMusic  = document.getElementById('bg-music');
const fwMusic  = document.getElementById('fw-music');
let stage = 0;

// Always encode URI when switching files
function setMonkey(filename) {
  monkey.src = encodeURI(`assets/${filename}`);
}

cloud.addEventListener('click', () => {
  if (stage) return;
  stage = 1;
  bgMusic.play();
  overlay.style.opacity = '0';
  setMonkey('monkey candle blowing.gif');
  cloudTxt.textContent = 'Cut the Cake';
  setTimeout(() => cake.style.opacity = '1', 200);
  cake.addEventListener('click', cutCake, { once: true });
});

function cutCake() {
  stage = 2;
  cake.style.transform = 'translateX(-50%) scale(5)';
  cake.style.opacity   = '0';
  setMonkey('happy birthday monkey.gif');
  cloudTxt.textContent = 'Happy birthday Bandar';
  bgMusic.pause(); fwMusic.play();
  overlay.style.background = 'rgba(255,200,0,0.6)';

  setTimeout(() => {
    fwMusic.pause(); bgMusic.play();
    overlay.style.background = 'rgba(255,255,255,0.4)';
    setMonkey('oh its your birthday monkey.gif');
    cloudTxt.textContent = 'Open the gifts one by one';
    showGifts();
  }, 10000);
}

function showGifts() {
  document.getElementById('gifts-container').style.opacity = '1';
  gifts.forEach((g, i) => {
    g.addEventListener('click', () => openGift(g, i), { once: true });
  });
}

function openGift(el, idx) {
  const files = [
    'pizza.jpeg',
    'iphone.jpeg',
    'clideo_editor_9ec816ebdeae407fab2813a60c3f1251.mp4'
  ];

  if (idx === 2) {
    el.play();
  } else {
    el.src = encodeURI(`assets/${files[idx]}`);
  }

  el.classList.add('opened');
  setMonkey('thanks for watching monkey.gif');

  const remaining = gifts.filter(g => !g.classList.contains('opened')).length;
  if (remaining) {
    cloudTxt.textContent = `Yay! ${remaining} to go!`;
  } else {
    finalize();
  }
}

function finalize() {
  cloudTxt.textContent = 'Thank you, see you next year';
  setTimeout(resetAll, 1500);
}

function resetAll() {
  overlay.style.opacity = '1';
  cake.style.transform = 'translateX(-50%) scale(1)';
  cake.style.opacity   = '0';
  document.getElementById('gifts-container').style.opacity = '0';
  gifts.forEach((g, i) => {
    if (i === 2) { g.pause(); g.currentTime = 0; }
    else        { g.src = encodeURI('assets/real gift.gif'); }
    g.classList.remove('opened');
  });
  setMonkey('oh its your birthday monkey.gif');
  cloudTxt.textContent = 'Tap to Start';
  bgMusic.currentTime = 0; fwMusic.currentTime = 0;
  bgMusic.play();
  stage = 0;
}

