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
  descrption: string;
}

const availableItems: Item[] = [
  { name: "Rover", cost: 10, rate: 0.1, descrption:"(cost 10 rocks) increase by 0.1 rocks/sec" },
  { name: "Mine", cost: 100, rate: 2, descrption:"(cost 100 rocks) increase by 2 rocks/sec" },
  { name: "Colony", cost: 1000, rate: 50, descrption:"(cost 1000 rocks) increase by 50 rocks/sec" },
  { name: "Driller", cost: 50, rate: 0, descrption: "(cost 50 rocks) increases rocks per click by 1" },
  { name: "Negotiator", cost: 150, rate: 0, descrption: "(cost 150 rocks) decreases price of everything by 1, max negotiator is 6"},
];

const numUpgrades = 5;
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
const counter = document.createElement("div");
const rateCounter = document.createElement("div");

const upgradeButtons = Array.from({ length: numUpgrades }, () =>
  document.createElement("button"),
);
ClickButton.textContent = "🌝"; //smily moon emoji
ClickButton.style.fontSize = "40px";
app.append(ClickButton);
app.append("\n");
counter.textContent = `${RockCount} Moon Rocks`;
app.append(counter);
rateCounter.textContent = `${RockPerSecRate} Moon Rocks/sec`;
app.append(rateCounter);
upgradeButtons.forEach((button, i) => {
  button.innerHTML = `Upgrade ${availableItems[i].name}, ${availableItems[i].descrption}`;
  button.style.width = "310px";
  
  button.addEventListener("click", () => {
    if(i == 3){
      IncRocksPerClick(button);
    }else if(i == 4){
      IncNegotiator(button);
    }else{
      upgradeButtonFunc(i, button);
      console.log(`Upgrade ${availableItems[i].name} clicked`);
    }
  });
  app.appendChild(button);
});

ClickButton.addEventListener("click", () => {
  AddToCount(RocksPerClick);
});

function IncRocksPerClick(button:HTMLButtonElement)
{
  if (RockCount >= 50 * Math.pow(costGrowthRate, NumOfUpgrades[3])) {
    AddToCount(-50 * Math.pow(costGrowthRate, NumOfUpgrades[3]));
    NumOfUpgrades[3]++;
    RocksPerClick++;
    button.textContent = `Purchase ${availableItems[3].name} (${availableItems[3].cost * Math.pow(costGrowthRate, NumOfUpgrades[3])} rocks)`;
    updateUpgradeCounterTxt();
  }
}

function IncNegotiator(button:HTMLButtonElement){
  if (RockCount >= 150 * Math.pow(costGrowthRate, NumOfUpgrades[4]) &&
    NumOfUpgrades[4] <= 6) {
    AddToCount(-150 * Math.pow(costGrowthRate, NumOfUpgrades[4]));
    NumOfUpgrades[4]++;
    button.textContent = `Purchase ${availableItems[3].name} (${availableItems[3].cost * Math.pow(costGrowthRate, NumOfUpgrades[3])} rocks)`;
    updateUpgradeCounterTxt();
  }
}

function updateUpgradeCounterTxt() {
  upgradeCounter.textContent = `${availableItems[0].name}: ${NumOfUpgrades[0]}, ${availableItems[1].name}: ${NumOfUpgrades[1]}, ${availableItems[2].name}: ${NumOfUpgrades[2]}, ${availableItems[3].name}: ${NumOfUpgrades[3]}, ${availableItems[4].name}: ${NumOfUpgrades[4]}`;
}

function upgradeButtonFunc(type: number, button: HTMLButtonElement) {
  const calculate =
    (availableItems[type].cost * Math.pow(costGrowthRate, NumOfUpgrades[type])) - NumOfUpgrades[4];
  console.log(calculate);
  if (RockCount >= calculate) {
    RockPerSecRate += availableItems[type].rate;
    NumOfUpgrades[type]++;
    AddToCount(-calculate);
    button.textContent = `Purchase ${availableItems[type].name} (${(availableItems[type].cost * Math.pow(costGrowthRate, NumOfUpgrades[type])) - NumOfUpgrades[4]} rocks)`;
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
