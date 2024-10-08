import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "A game"; //step 7: small change
document.title = gameName;

let count: number = 0;
let trackFrame = 0;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.textContent = "🫨";
app.append(button);

const upgradeButton = document.createElement("button");
upgradeButton.textContent = "upgrade";
app.append(upgradeButton);

const counter = document.createElement("div");
counter.textContent = `${count} slaps`;
app.append(counter);

button.addEventListener("click", () => {
  AddToCount();
});

/*
const autoClick = setInterval(() => {
  AddToCount();
}, 600);*/

requestAnimationFrame(animate);
const startFrame = performance.now();
console.log("start: " + startFrame);

function animate() {
  trackFrame++;
  console.log("track: " + trackFrame);
  requestAnimationFrame(animate);
  if (trackFrame - Math.floor(startFrame) == 0) {
    trackFrame = 0;
    AddToCount();
  }
}

function AddToCount() {
  count += 1;
  counter.textContent = `${count} slaps`;
}

//console.log(autoClick);
