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
  'oh its your birthday monkey.gif',
  'monkey candle blowing.gif',
  'happy birthday monkey.gif',
  'thanks for watching monkey.gif'
];

let stage = 0;
let giftClickCount = 0;

messageCloud.addEventListener('click', () => {
  if (stage !== 0) return;

  stage = 1;
  messageCloud.textContent = "Oh! It's your birthday!";
  monkeyGif.src = monkeyGifs[0];
  song1.play();

  setTimeout(() => {
    cake.style.display = 'block';
    messageCloud.textContent = "Cut the cake 🎂";
    monkeyGif.src = monkeyGifs[1];
  }, 2000);
});

cake.addEventListener('click', () => {
  if (stage !== 1) return;

  stage = 2;
  cake.style.transition = 'transform 1.5s ease-in-out';
  cake.style.transform = 'scale(10)';

  setTimeout(() => {
    cake.style.display = 'none';
    cake.style.transform = 'scale(1)';
    showFireworks();
    monkeyGif.src = monkeyGifs[2];
    messageCloud.textContent = "Happy Birthday Anand 🥳";
    song1.pause();
    song2.currentTime = 0;
    song2.play();

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

document.getElementById('gift1').addEventListener('click', () =>
  openGift('video', 'clideo_editor_9ec816ebdeae407fab2813a60c3f1251.mp4'));
document.getElementById('gift2').addEventListener('click', () =>
  openGift('image', 'pizza.jpeg'));
document.getElementById('gift3').addEventListener('click', () =>
  openGift('image', 'iphone.jpeg'));

function openGift(type, src) {
  giftClickCount++;

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

  setTimeout(() => {
    giftPopup.style.display = 'none';
    giftVideo.pause();
    giftVideo.currentTime = 0;

    if (giftClickCount === 3) {
      messageCloud.textContent = "Thank you, see you next year! 🎉";
      monkeyGif.src = monkeyGifs[3];
    } else {
      messageCloud.textContent = "Thank you, see you next year! 🎉";
    }
  }, 3000);
}

function showFireworks() {
  fireworks.style.display = 'flex';
}

function hideFireworks() {
  fireworks.style.display = 'none';
}
