// script.js
const cloud     = document.getElementById('cloud');
const cloudTxt  = document.getElementById('cloud-text');
const overlay   = document.getElementById('overlay');
const monkey    = document.getElementById('monkey');
const cake      = document.getElementById('cake');
const gifts     = Array.from(document.querySelectorAll('.gift'));
const bgMusic   = document.getElementById('bg-music');
const fwMusic   = document.getElementById('firework-music');

let stage = 0;

// Helper to switch monkey GIF
function setMonkey(src) {
  monkey.src = `assets/${src}`;
}

// Kick off everything
cloud.addEventListener('click', async () => {
  if (stage !== 0) return;
  stage = 1;
  bgMusic.play();
  // fade overlay + idle → pre‑cake
  overlay.style.opacity = '0';
  setMonkey('monkey candle blowing.gif');
  cloudTxt.textContent = 'Cut the Cake';
  
  // show cake
  setTimeout(() => {
    cake.style.opacity = '1';
  }, 200); 

  // Next: cake click
  cake.addEventListener('click', cakeCut, { once: true });
});

function cakeCut() {
  stage = 2;
  // scale up & vanish
  cake.style.transform = 'translateX(-50%) scale(5)';
  cake.style.opacity   = '0';
  setMonkey('happy birthday monkey.gif');
  cloudTxt.textContent = 'Happy Birthday Bandar';
  bgMusic.pause();
  fwMusic.play();
  // firecracker effect via quick CSS flashes
  overlay.style.background = 'rgba(255, 200, 0, 0.6)';
  
  setTimeout(() => {
    // back to normal
    fwMusic.pause();
    bgMusic.play();
    setMonkey('oh its your birthday monkey.gif');
    overlay.style.background = 'rgba(255,255,255,0.4)';
    cloudTxt.textContent = 'Open the gifts one by one';
    showGifts();
  }, 10000);
}

function showGifts() {
  document.getElementById('gifts-container').style.opacity = '1';
  gifts.forEach((g,i) => {
    g.addEventListener('click', () => openGift(g, i), { once: true });
  });
}

function openGift(giftEl, idx) {
  let names = ['pizza.jpeg','iphone.jpeg','clideo_editor_9ec816ebdeae407fab2813a60c3f1251.mp4'];
  giftEl.src      = `assets/${names[idx]}`;
  giftEl.classList.add('opened');
  setMonkey('monkey candle blowing.gif'); // you can swap custom per-step too
  let left = gifts.filter(g=>!g.classList.contains('opened')).length;
  if (left) {
    cloudTxt.textContent = `Yay! ${left} to go!`;
  } else {
    finalThanks();
  }
}

function finalThanks() {
  setMonkey('thanks for watching monkey.gif');
  cloudTxt.textContent = 'Thank you, see you next year!';
  setTimeout(resetAll, 1500);
}

function resetAll() {
  // reset visuals
  overlay.style.opacity = '1';
  cake.style.transform = 'translateX(-50%) scale(1)';
  cake.style.opacity   = '0';
  document.getElementById('gifts-container').style.opacity = '0';
  gifts.forEach(g=> {
    g.src = 'assets/real gift.gif';
    g.classList.remove('opened');
  });
  setMonkey('oh its your birthday monkey.gif');
  cloudTxt.textContent = 'Tap to Start';
  bgMusic.currentTime = 0;
  fwMusic.currentTime = 0;
  bgMusic.play();
  stage = 0;
}
