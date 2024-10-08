import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "A game"; //step 7: small change
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.textContent = 🫀;
app.append(button);
