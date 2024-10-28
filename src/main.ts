import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Moon Miner";
document.title = gameName;

let count: number = 0;
let ratenum = 0;
let perClick = 1;
const costGrowthRate = 1.15;
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
  { name: "Driller", cost: 50, rate: 0 },
  { name: "Negotiator", cost: 150, rate: 0 },
];

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
const button = document.createElement("button");
const upgradeAButton = document.createElement("button");
const upgradeBButton = document.createElement("button");
const upgradeCButton = document.createElement("button");
const upgradeDButton = document.createElement("button");
const upgradeEButton = document.createElement("button");
const counter = document.createElement("div");
const rateCounter = document.createElement("div");
const drillDesc = document.createElement("div");
const negotiDesc = document.createElement("div");
const upgradeCounter = document.createElement("div");

button.textContent = "🌝"; //smily moon emoji
app.append(button);
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
counter.textContent = `${count} Moon Rocks`;
app.append(counter);
rateCounter.textContent = `${ratenum} Moon Rocks/sec`;
app.append(rateCounter);

drillDesc.textContent = `drills increases rocks per click by 1`;
negotiDesc.textContent = `negotiator decreases price of everything by 10%, max negotiator is 6`;

app.append(upgradeCounter);

button.addEventListener("click", () => {
  AddToCount(perClick);
});

upgradeDButton.addEventListener("click", () => {
  app.append(drillDesc);
  if (count >= 50 * Math.pow(costGrowthRate, upgradenum[3])) {
    AddToCount(-50 * Math.pow(costGrowthRate, upgradenum[3]));
    upgradenum[3]++;
    perClick++;
    upgradeCounter.textContent = `${availableItems[0].name}: ${upgradenum[0]}, ${availableItems[1].name}: ${upgradenum[1]}, ${availableItems[2].name}: ${upgradenum[2]}, ${availableItems[3].name}: ${upgradenum[3]}, ${availableItems[4].name}: ${upgradenum[4]}`;
  }
});

upgradeEButton.addEventListener("click", () => {
  app.append(negotiDesc);
  if (
    count >= 150 * Math.pow(costGrowthRate, upgradenum[4]) &&
    upgradenum[4] <= 6
  ) {
    AddToCount(-150 * Math.pow(costGrowthRate, upgradenum[4]));
    upgradenum[4]++;
    upgradeCounter.textContent = `${availableItems[0].name}: ${upgradenum[0]}, ${availableItems[1].name}: ${upgradenum[1]}, ${availableItems[2].name}: ${upgradenum[2]}, ${availableItems[3].name}: ${upgradenum[3]}, ${availableItems[4].name}: ${upgradenum[4]}`;
  }
});

upgradeAButton.addEventListener("click", () => {
  //upgradeLvl = 1;
  const calculate =
    availableItems[0].cost * Math.pow(costGrowthRate, upgradenum[0]);
  console.log(calculate - calculate * (0.1 * upgradenum[4]));
  if (count >= calculate - calculate * (0.1 * upgradenum[4])) {
    ratenum += availableItems[0].rate;
    upgradenum[0]++;
    AddToCount(-(calculate - calculate * (0.1 * upgradenum[4])));
    upgradeAButton.textContent = `Purchase ${availableItems[0].name} (${calculate - calculate * (0.1 * upgradenum[4])} rocks)`;
    upgrade();
  }
});

upgradeBButton.addEventListener("click", () => {
  //upgradeLvl = 2;
  const calculate =
    availableItems[1].cost * Math.pow(costGrowthRate, upgradenum[1]);
  console.log(calculate - calculate * (0.1 * upgradenum[4]));
  if (count >= calculate - calculate * (0.1 * upgradenum[4])) {
    ratenum += availableItems[1].rate;
    upgradenum[1]++;
    AddToCount(-(calculate - calculate * (0.1 * upgradenum[4])));
    upgradeBButton.textContent = `Purchase ${availableItems[1].name} (${calculate - calculate * (0.1 * upgradenum[4])} rocks)`;
    upgrade();
  }
});

upgradeCButton.addEventListener("click", () => {
  //upgradeLvl = 3;
  const calculate =
    availableItems[2].cost * Math.pow(costGrowthRate, upgradenum[2]);
  console.log(calculate - calculate * (0.1 * upgradenum[4]));
  if (count >= calculate - calculate * (0.1 * upgradenum[4])) {
    ratenum += availableItems[2].rate;
    upgradenum[2]++;
    AddToCount(-(calculate - calculate * (0.1 * upgradenum[4])));
    upgradeCButton.textContent = `Purchase ${availableItems[2].name} (${calculate - calculate * (0.1 * upgradenum[4])} rocks)`;
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
