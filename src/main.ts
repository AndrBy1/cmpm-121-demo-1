import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "A game";
document.title = gameName;

let count: number = 0;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.textContent = "🫨"; //shake emoji
app.append(button);

const upgradeAButton = document.createElement("button");
upgradeAButton.textContent = "upgrade";
app.append(upgradeAButton);

const upgradeBButton = document.createElement("button");
upgradeBButton.textContent = "upgrade";
app.append(upgradeBButton);

const upgradeCButton = document.createElement("button");
upgradeCButton.textContent = "upgrade";
app.append(upgradeCButton);

const counter = document.createElement("div");
counter.textContent = `${count} shakes`;
app.append(counter);

button.addEventListener("click", () => {
  AddToCount(1);
});

upgradeAButton.addEventListener("click", () => {
  if (count >= 10) {
    AddToCount(-10);
    upgrade();
  }
});

/*
const autoClick = setInterval(() => {
  AddToCount();
}, 600);*/

function upgrade() {
  requestAnimationFrame(animate);
}

function animate() {
  const frame = performance.now();
  console.log(frame);
  requestAnimationFrame(animate);
  if (Math.floor(frame) % 1000 <= 6) {
    AddToCount(1);
  }
}

function AddToCount(inc: number) {
  count += inc;
  counter.textContent = `${count} shakes`;
}

//console.log(autoClick);
