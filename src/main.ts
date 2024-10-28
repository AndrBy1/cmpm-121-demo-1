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
app.append(ClickButton);
upgradeAButton.textContent = `Purchase ${availableItems[0].name} (${availableItems[0].cost} rocks)`;
app.append(upgradeAButton);
upgradeBButton.textContent = `Purchase ${availableItems[1].name} (${availableItems[1].cost} rocks)`;
app.append(upgradeBButton);
upgradeCButton.textContent = `Purchase ${availableItems[2].name} (${availableItems[2].cost} rocks)`;
app.append(upgradeCButton);
upgradeDButton.textContent = `Purchase ${availableItems[3].name} (50 rocks)`;
app.append(upgradeDButton);
upgradeEButton.textContent = `Purchase ${availableItems[4].name} (150 rocks)`;
app.append(upgradeEButton);
counter.textContent = `${RockCount} Moon Rocks`;
app.append(counter);
rateCounter.textContent = `${RockPerSecRate} Moon Rocks/sec`;
app.append(rateCounter);

ClickButton.addEventListener("click", () => {
  AddToCount(RocksPerClick);
});

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

upgradeAButton.addEventListener("click", () => {
  //upgradeLvl = 1;
  upgradeButtonFunc(0, upgradeAButton);
});

upgradeBButton.addEventListener("click", () => {
  //upgradeLvl = 2;
  upgradeButtonFunc(1, upgradeBButton);
});

upgradeCButton.addEventListener("click", () => {
  //upgradeLvl = 3;
  upgradeButtonFunc(2, upgradeCButton);
});

upgradeDButton.addEventListener("click", () => {
  app.append(drillDesc);
  if (RockCount >= 50 * Math.pow(costGrowthRate, NumOfUpgrades[3])) {
    AddToCount(-50 * Math.pow(costGrowthRate, NumOfUpgrades[3]));
    NumOfUpgrades[3]++;
    RocksPerClick++;
    upgradeCounter.textContent = `${availableItems[0].name}: ${NumOfUpgrades[0]}, ${availableItems[1].name}: ${NumOfUpgrades[1]}, ${availableItems[2].name}: ${NumOfUpgrades[2]}, ${availableItems[3].name}: ${NumOfUpgrades[3]}, ${availableItems[4].name}: ${NumOfUpgrades[4]}`;
  }
});

upgradeEButton.addEventListener("click", () => {
  app.append(negotiDesc);
  if (
    RockCount >= 150 * Math.pow(costGrowthRate, NumOfUpgrades[4]) &&
    NumOfUpgrades[4] <= 6
  ) {
    AddToCount(-150 * Math.pow(costGrowthRate, NumOfUpgrades[4]));
    NumOfUpgrades[4]++;
    upgradeCounter.textContent = `${availableItems[0].name}: ${NumOfUpgrades[0]}, ${availableItems[1].name}: ${NumOfUpgrades[1]}, ${availableItems[2].name}: ${NumOfUpgrades[2]}, ${availableItems[3].name}: ${NumOfUpgrades[3]}, ${availableItems[4].name}: ${NumOfUpgrades[4]}`;
  }
});

function upgrade() {
  rateCounter.textContent = `${RockPerSecRate} Moon Rocks/sec`;
  upgradeCounter.textContent = `${availableItems[0].name}: ${NumOfUpgrades[0]}, ${availableItems[1].name}: ${NumOfUpgrades[1]}, ${availableItems[2].name}: ${NumOfUpgrades[2]}, driller: ${NumOfUpgrades[3]}, negotiator: ${NumOfUpgrades[4]}`;
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
