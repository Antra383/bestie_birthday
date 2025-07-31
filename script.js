const cloud = document.getElementById("cloud");
const monkey = document.getElementById("monkey");
const cake = document.getElementById("cake");
const music1 = document.getElementById("music1");
const music2 = document.getElementById("music2");
const fireworks = document.getElementById("fireworks");
const gifts = document.getElementById("gifts");
const popup = document.getElementById("popup");

let scene = 0;

cloud.addEventListener("click", handleScene);

function handleScene() {
  if (scene === 0) {
    music1.play();
    cloud.innerText = "Oh it's your birthday!";
    setTimeout(() => {
      cake.classList.remove("hidden");
      cloud.innerText = "Cut the cake 🎂";
      monkey.src = "monkey candle blowing.gif";
      cake.addEventListener("click", cutCake);
    }, 2000);
    scene++;
  }
}

function cutCake() {
  cake.style.transform = "scale(3)";
  setTimeout(() => {
    cake.classList.add("hidden");
    fireworks.classList.remove("hidden");
    monkey.src = "happy birthday monkey.gif";
    cloud.innerText = "Happy Birthday Anand 🎉";
    music1.pause();
    music2.play();
    setTimeout(showGifts, 10000);
  }, 1500);
}

function showGifts() {
  fireworks.classList.add("hidden");
  music2.pause();
  music1.play();
  gifts.classList.remove("hidden");
  monkey.src = "thanks for watching monkey.gif";
  cloud.innerText = "Open the gifts one by one 🎁";

  document.querySelectorAll(".gift").forEach((gift, i) => {
    gift.addEventListener("click", () => {
      openGift(gift, i);
    });
  });
}

function openGift(gift, index) {
  const type = gift.dataset.type;
  const src = gift.dataset.src;

  popup.classList.remove("hidden");

  if (type === "image") {
    popup.innerHTML = `<img src="${src}" style="width: 100%; border-radius: 8px;" />`;
  } else if (type === "video") {
    popup.innerHTML = `<video autoplay muted playsinline style="width: 100%; border-radius: 8px;">
                         <source src="${src}" type="video/mp4" />
                       </video>`;
  }

  setTimeout(() => {
    popup.classList.add("hidden");
    if (index === 2) {
      cloud.innerText = "Thank you 💌 See you next year!";
    }
  }, 3000);
}
