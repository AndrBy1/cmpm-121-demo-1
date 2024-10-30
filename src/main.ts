//code organization inspired by https://jamesnyim.github.io/cmpm-121-demo-1/
import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Moon Miner";
document.title = gameName;

let RockCount: number = 0;
let RockPerSecRate = 0;
let RocksPerClick = 1;
const costGrowthRate = 1.15;
const NumOfUpgrades: number[] = [0, 0, 0, 0, 0]; //[0] is rover, [1] is Mine, [2] is Colony, [4] is Driller, [5] is Negotiator

interface Item {
  name: string;
  cost: number;
  rate: number;
}

const availableItems: Item[] = [
  { name: "Rover", cost: 10, rate: 0.1 },
  { name: "Mine", cost: 100, rate: 2 },
  { name: "Colony", cost: 1000, rate: 50 },
  { name: "Driller", cost: 50, rate: 0 },
  { name: "Negotiator", cost: 150, rate: 0 },
];

const drillDesc = document.createElement("div");
const negotiDesc = document.createElement("div");
const upgradeCounter = document.createElement("div");
drillDesc.textContent = `drills increases rocks per click by 1`;
negotiDesc.textContent = `negotiator decreases price of everything by 10%, max negotiator is 6`;
app.append(upgradeCounter);
const DisplayName = document.createElement("h1");
DisplayName.innerHTML = gameName;
app.append(DisplayName);
const ClickButton = document.createElement("button");
const upgradeAButton = document.createElement("button");
const upgradeBButton = document.createElement("button");
const upgradeCButton = document.createElement("button");
const upgradeDButton = document.createElement("button");
const upgradeEButton = document.createElement("button");
const counter = document.createElement("div");
const rateCounter = document.createElement("div");

ClickButton.textContent = "🌝"; //smily moon emoji
ClickButton.style.fontSize = "40px";
app.append(ClickButton);
app.append("\n");
upgradeAButton.textContent = `Purchase ${availableItems[0].name} (${availableItems[0].cost} rocks)`;
document.body.appendChild(upgradeAButton);
upgradeBButton.textContent = `Purchase ${availableItems[1].name} (${availableItems[1].cost} rocks)`;
document.body.appendChild(upgradeBButton);
upgradeCButton.textContent = `Purchase ${availableItems[2].name} (${availableItems[2].cost} rocks)`;
document.body.appendChild(upgradeCButton);
upgradeDButton.textContent = `Purchase ${availableItems[3].name} (50 rocks),\n drills increases rocks per click by 1`;
upgradeDButton.style.width = "350px";
document.body.appendChild(upgradeDButton);
upgradeEButton.textContent = `Purchase ${availableItems[4].name} (150 rocks),\n negotiator decreases price of everything by 10%, max negotiator is 6`;
upgradeEButton.style.width = "300px";
document.body.appendChild(upgradeEButton);
counter.textContent = `${RockCount} Moon Rocks`;
app.append(counter);
rateCounter.textContent = `${RockPerSecRate} Moon Rocks/sec`;
app.append(rateCounter);

ClickButton.addEventListener("click", () => {
  AddToCount(RocksPerClick);
});

upgradeAButton.addEventListener("click", () => {
  upgradeButtonFunc(0, upgradeAButton);
});

upgradeBButton.addEventListener("click", () => {
  upgradeButtonFunc(1, upgradeBButton);
});

upgradeCButton.addEventListener("click", () => {
  upgradeButtonFunc(2, upgradeCButton);
});

upgradeDButton.addEventListener("click", () => {
  if (RockCount >= 50 * Math.pow(costGrowthRate, NumOfUpgrades[3])) {
    AddToCount(-50 * Math.pow(costGrowthRate, NumOfUpgrades[3]));
    NumOfUpgrades[3]++;
    RocksPerClick++;
    upgradeDButton.textContent =  `Purchase ${availableItems[3].name} (${availableItems[3].cost * Math.pow(costGrowthRate, NumOfUpgrades[3])} rocks)`;
    updateUpgradeCounterTxt();
  }
});

upgradeEButton.addEventListener("click", () => {
  if (
    RockCount >= 150 * Math.pow(costGrowthRate, NumOfUpgrades[4]) &&
    NumOfUpgrades[4] <= 6
  ) {
    AddToCount(-150 * Math.pow(costGrowthRate, NumOfUpgrades[4]));
    NumOfUpgrades[4]++;
    upgradeDButton.textContent =  `Purchase ${availableItems[3].name} (${availableItems[3].cost * Math.pow(costGrowthRate, NumOfUpgrades[3])} rocks)`;
    updateUpgradeCounterTxt();
  }
});

function updateUpgradeCounterTxt() {
  upgradeCounter.textContent = `${availableItems[0].name}: ${NumOfUpgrades[0]}, ${availableItems[1].name}: ${NumOfUpgrades[1]}, ${availableItems[2].name}: ${NumOfUpgrades[2]}, ${availableItems[3].name}: ${NumOfUpgrades[3]}, ${availableItems[4].name}: ${NumOfUpgrades[4]}`;
}

function upgradeButtonFunc(type: number, button: HTMLButtonElement) {
  const calculate =
    availableItems[type].cost * Math.pow(costGrowthRate, NumOfUpgrades[type]);
  console.log(calculate);
  if (RockCount >= calculate) {
    RockPerSecRate += availableItems[type].rate;
    NumOfUpgrades[type]++;
    AddToCount(-calculate);
    button.textContent = `Purchase ${availableItems[type].name} (${availableItems[type].cost * Math.pow(costGrowthRate, NumOfUpgrades[type])} rocks)`;
    upgrade();
  }
}

function upgrade() {
  rateCounter.textContent = `${RockPerSecRate} Moon Rocks/sec`;
  updateUpgradeCounterTxt();
}

let lastTime = performance.now();

function animate(currentTime: number) {
  const dTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  AddToCount(dTime * RockPerSecRate);

  requestAnimationFrame(animate);
}

function AddToCount(inc: number) {
  RockCount += inc;
  counter.textContent = `${RockCount} Moon Rocks`;
}

console.log(availableItems);

requestAnimationFrame(animate);
