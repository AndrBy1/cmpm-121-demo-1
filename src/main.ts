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
  count += 1;
  counter.textContent = `${count} slaps`;
});

const counter = document.createElement("div");
counter.textContent = `${count} slaps`;
app.append(counter);
