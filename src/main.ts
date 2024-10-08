import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "A game";
document.title = gameName;

let count: number = 0;

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

upgradeButton.addEventListener("click", () => {
  if (count >= 10) {
    count -= 10;
    counter.textContent = `${count} slaps`;
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
    AddToCount();
  }
}

function AddToCount() {
  count += 1;
  counter.textContent = `${count} slaps`;
}

//console.log(autoClick);
