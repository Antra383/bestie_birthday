// script.js

// DOM elements
const messageCloud = document.getElementById('messageCloud');
const monkeyGif = document.getElementById('monkeyGif');
const cake = document.getElementById('cake');
const gifts = document.querySelector('.gifts');
const giftPopup = document.getElementById('giftPopup');
const giftImage = document.getElementById('giftImage');
const giftVideo = document.getElementById('giftVideo');
const fireworks = document.getElementById('fireworks');
const song1 = document.getElementById('song1');
const song2 = document.getElementById('song2');

const monkeyGifs = [
  'gifs/oh its your birthday monkey.gif',
  'gifs/monkey candle blowing.gif',
  'gifs/happy birthday monkey.gif',
  'gifs/thanks for watching monkey.gif'
];

let stage = 0;

// 🎬 Stage 1: Tap to start
messageCloud.addEventListener('click', () => {
  if (stage !== 0) return;

  stage = 1;
  messageCloud.textContent = "Oh! It's your birthday!";
  monkeyGif.src = monkeyGifs[0];
  song1.play();

  // Show cake after 2 seconds
  setTimeout(() => {
    cake.style.display = 'block';
    messageCloud.textContent = "Cut the cake 🎂";
    monkeyGif.src = monkeyGifs[1];
  }, 2000);
});

// 🎂 Stage 2: Click cake
cake.addEventListener('click', () => {
  if (stage !== 1) return;

  stage = 2;

  // Enlarge cake
  cake.style.transition = 'transform 1.5s ease-in-out';
  cake.style.transform = 'scale(10)';
  setTimeout(() => {
    cake.style.display = 'none';
    cake.style.transform = 'scale(1)';
    
    // Celebration
    showFireworks();
    monkeyGif.src = monkeyGifs[2];
    messageCloud.textContent = "Happy Birthday Anand 🥳";
    song1.pause();
    song2.currentTime = 0;
    song2.play();

    // After 10 seconds, transition to gifts
    setTimeout(() => {
      hideFireworks();
      stage = 3;
      monkeyGif.src = monkeyGifs[3];
      messageCloud.textContent = "Open the gifts one by one 🎁";
      gifts.style.display = 'flex';
      song2.pause();
      song1.play();
    }, 10000);
  }, 1500);
});

// 🎁 Stage 3: Gift Clicks
document.getElementById('gift1').addEventListener('click', () => openGift('video', 'videos/clideo_editor_9ec816ebdeae407fab2813a60c3f1251.mp4', 0));
document.getElementById('gift2').addEventListener('click', () => openGift('image', 'images/pizza.jpeg', 1));
document.getElementById('gift3').addEventListener('click', () => openGift('image', 'images/iphone.jpeg', 2));

function openGift(type, src, monkeyIndex) {
  // Switch monkey
  monkeyGif.src = monkeyGifs[monkeyIndex + 1];

  if (type === 'image') {
    giftVideo.style.display = 'none';
    giftImage.style.display = 'block';
    giftImage.src = src;
  } else {
    giftImage.style.display = 'none';
    giftVideo.style.display = 'block';
    giftVideo.src = src;
    giftVideo.play();
  }

  giftPopup.style.display = 'block';

  // Auto-close after 3 seconds
  setTimeout(() => {
    giftPopup.style.display = 'none';
    giftVideo.pause();
    giftVideo.currentTime = 0;
    messageCloud.textContent = "Thank you, see you next year! 🎉";
  }, 3000);
}

// Fireworks (simple placeholder)
function showFireworks() {
  fireworks.style.display = 'block';
  fireworks.style.background = "radial-gradient(circle, rgba(255,255,255,0.2), transparent)";
}

function hideFireworks() {
  fireworks.style.display = 'none';
}
