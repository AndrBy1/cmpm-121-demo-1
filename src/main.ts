import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "A game"; //step 7: small change
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.textContent = "🫨";
app.append(button);

let count: number = 0;
button.addEventListener("click", () => {
  count = AddToCount(count);
});

const counter = document.createElement("div");
counter.textContent = `${count} slaps`;
app.append(counter);

const autoClick = setInterval(() => {
  count = AddToCount(count);
}, 600);

function AddToCount(num: number) {
  num += 1;
  counter.textContent = `${count} slaps`;
  return num;
}

console.log(autoClick);
