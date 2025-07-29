let videos = [
  "gift1.mp4",
  "gift2.mp4",
  "gift3.mp4"
];
let current = 0;

document.getElementById("cake").onclick = function () {
  document.getElementById("popup").style.display = "block";
  document.getElementById("bday-audio").play();
  document.querySelector(".gifts").style.display = "block";
};

function playVideo(i) {
  const player = document.getElementById("gift-video");
  player.src = videos[i - 1];
  document.getElementById("video-player").style.display = "block";
  player.onended = () => {
    current++;
    if (current === 3) {
      setTimeout(() => location.reload(), 3000); // Reset page
    }
  };
}
