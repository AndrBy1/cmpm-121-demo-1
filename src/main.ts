import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "A game";
document.title = gameName;

let count: number = 0;
let upgradeLvl: number;
let ratenum = 0;
const upgradenum: number[] = [0, 0, 0];

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.textContent = "🫨"; //shake emoji
app.append(button);

const upgradeAButton = document.createElement("button");
upgradeAButton.textContent = "upgrade A";
app.append(upgradeAButton);

const upgradeBButton = document.createElement("button");
upgradeBButton.textContent = "upgrade B";
app.append(upgradeBButton);

const upgradeCButton = document.createElement("button");
upgradeCButton.textContent = "upgrade C";
app.append(upgradeCButton);

const counter = document.createElement("div");
counter.textContent = `${count} shakes`;
app.append(counter);

const rateCounter = document.createElement("div");
rateCounter.textContent = `${ratenum} shakes/sec`;
app.append(rateCounter);

const upgradeCounter = document.createElement("div");
app.append(upgradeCounter);

button.addEventListener("click", () => {
  AddToCount(1);
});

upgradeAButton.addEventListener("click", () => {
  upgradeLvl = 1;
  upgradenum[0]++;
  if (count >= 10) {
    AddToCount(-10);
    upgrade();
  }
});

upgradeBButton.addEventListener("click", () => {
  upgradeLvl = 2;
  upgradenum[1]++;
  if (count >= 100) {
    AddToCount(-100);
    upgrade();
  }
});

upgradeCButton.addEventListener("click", () => {
  upgradeLvl = 3;
  upgradenum[2]++;
  if (count >= 1000) {
    AddToCount(-1000);
    upgrade();
  }
});

function upgrade() {
  requestAnimationFrame(animate);
  rateCounter.textContent = `${ratenum} shakes/sec`;
  upgradeCounter.textContent = `A: ${upgradenum[0]}, B: ${upgradenum[1]}, C: ${upgradenum[2]}`;
}

function animate() {
  console.log("ratenum" + ratenum);
  if (upgradeLvl == 1) {
    ratenum += 0.1;
  } else if (upgradeLvl == 2) {
    ratenum += 2;
  } else if (upgradeLvl == 3) {
    ratenum += 50;
  }
  const frame = performance.now();
  console.log(frame);
  requestAnimationFrame(animate);
  if (Math.floor(frame) % 1000 <= 6) {
    AddToCount(ratenum);
  }
  upgradeLvl = 0;
}

function AddToCount(inc: number) {
  count += inc;
  counter.textContent = `${count} shakes`;
}

//console.log(autoClick);
