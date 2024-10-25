import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Moon Miner";
document.title = gameName;

let count: number = 0;
let ratenum = 0;
let perClick = 1;
const upgradenum: number[] = [0, 0, 0, 0, 0];

interface Item {
  name: string;
  cost: number;
  rate: number;
}

const availableItems: Item[] = [
  { name: "Rover", cost: 10, rate: 0.1 },
  { name: "Mine", cost: 100, rate: 2 },
  { name: "Colony", cost: 1000, rate: 50 },
];

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.textContent = "🌝"; //smily moon emoji
app.append(button);

const upgradeAButton = document.createElement("button");
upgradeAButton.textContent = `Purchase ${availableItems[0].name} (${availableItems[0].cost} rocks)`;
app.append(upgradeAButton);

const upgradeBButton = document.createElement("button");
upgradeBButton.textContent = `Purchase ${availableItems[1].name} (${availableItems[1].cost} rocks)`;
app.append(upgradeBButton);

const upgradeCButton = document.createElement("button");
upgradeCButton.textContent = `Purchase ${availableItems[2].name} (${availableItems[2].cost} rocks)`;
app.append(upgradeCButton);

const upgradeDButton = document.createElement("button");
upgradeDButton.textContent = `Purchase driller (50 rocks)`;
app.append(upgradeDButton);

const upgradeEButton = document.createElement("button");
upgradeEButton.textContent = `Purchase negotiator (150 rocks)`;
app.append(upgradeEButton);

const counter = document.createElement("div");
counter.textContent = `${count} Moon Rocks`;
app.append(counter);

const rateCounter = document.createElement("div");
rateCounter.textContent = `${ratenum} Moon Rocks/sec`;
app.append(rateCounter);

const drillDesc = document.createElement("div");
drillDesc.textContent = `drills increases rocks per click by 1`;

const negotiDesc = document.createElement("div");
negotiDesc.textContent = `negotiator decreases price of everything by 10%, max negotiator is 6`;

const upgradeCounter = document.createElement("div");
app.append(upgradeCounter);

button.addEventListener("click", () => {
  AddToCount(perClick);
});

upgradeDButton.addEventListener("click", () => {
  app.append(drillDesc);
  if (count >= 50 * Math.pow(1.15, upgradenum[3])) {
    AddToCount(-50 * Math.pow(1.15, upgradenum[3]));
    upgradenum[3]++;
    perClick++;
    upgradeCounter.textContent = `${availableItems[0].name}: ${upgradenum[0]}, ${availableItems[1].name}: ${upgradenum[1]}, ${availableItems[2].name}: ${upgradenum[2]}, driller: ${upgradenum[3]}, negotiator: ${upgradenum[4]}`;
  }
});

upgradeEButton.addEventListener("click", () => {
  app.append(negotiDesc);
  if (count >= 150 * Math.pow(1.15, upgradenum[4]) && upgradenum[4] <= 6) {
    AddToCount(-150 * Math.pow(1.15, upgradenum[4]));
    upgradenum[4]++;
    upgradeCounter.textContent = `${availableItems[0].name}: ${upgradenum[0]}, ${availableItems[1].name}: ${upgradenum[1]}, ${availableItems[2].name}: ${upgradenum[2]}, driller: ${upgradenum[3]}, negotiator: ${upgradenum[4]}`;
  }
});

upgradeAButton.addEventListener("click", () => {
  //upgradeLvl = 1;
  const calculate = availableItems[0].cost * Math.pow(1.15, upgradenum[0]);
  console.log(calculate - calculate * (0.1 * upgradenum[4]));
  if (count >= calculate - calculate * (0.1 * upgradenum[4])) {
    ratenum += availableItems[0].rate;
    upgradenum[0]++;
    AddToCount(-(calculate - calculate * (0.1 * upgradenum[4])));
    upgrade();
  }
});

upgradeBButton.addEventListener("click", () => {
  //upgradeLvl = 2;
  const calculate = availableItems[1].cost * Math.pow(1.15, upgradenum[1]);
  console.log(calculate - calculate * (0.1 * upgradenum[4]));
  if (count >= calculate - calculate * (0.1 * upgradenum[4])) {
    ratenum += availableItems[1].rate;
    upgradenum[1]++;
    AddToCount(-(calculate - calculate * (0.1 * upgradenum[4])));
    upgrade();
  }
});

upgradeCButton.addEventListener("click", () => {
  //upgradeLvl = 3;
  const calculate = availableItems[2].cost * Math.pow(1.15, upgradenum[2]);
  console.log(calculate - calculate * (0.1 * upgradenum[4]));
  if (count >= calculate - calculate * (0.1 * upgradenum[4])) {
    ratenum += availableItems[2].rate;
    upgradenum[2]++;
    AddToCount(-(calculate - calculate * (0.1 * upgradenum[4])));
    upgrade();
  }
});

function upgrade() {
  rateCounter.textContent = `${ratenum} Moon Rocks/sec`;
  upgradeCounter.textContent = `${availableItems[0].name}: ${upgradenum[0]}, ${availableItems[1].name}: ${upgradenum[1]}, ${availableItems[2].name}: ${upgradenum[2]}, driller: ${upgradenum[3]}, negotiator: ${upgradenum[4]}`;
}

let lastTime = performance.now();

function animate(currentTime: number) {
  const dTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  AddToCount(dTime * ratenum);

  requestAnimationFrame(animate);
}

function AddToCount(inc: number) {
  count += inc;
  counter.textContent = `${count} Moon Rocks`;
}

console.log(availableItems);

requestAnimationFrame(animate);
