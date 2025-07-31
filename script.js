function showGifts() {
  fireworks.classList.add("hidden");
  music2.pause();
  music1.play();

  setTimeout(() => {
    gifts.classList.remove("hidden");
    monkey.src = "thanks for watching monkey.gif";
    cloud.innerText = "Open the gifts one by one 🎁";

    document.querySelectorAll(".gift").forEach((gift, i) => {
      gift.addEventListener("click", () => {
        openGift(gift, i);
      });
    });
  }, 1000); // 1s delay after fireworks vanish
}
