let prompts = [];
let previousIndex = -1;

const titles = [
  "Today you should write about...",
  "Maybe try writing about...",
  "How about writing an answer to...",
];

const randomTitle = document.getElementById("title");
const randomPrompt = document.getElementById("prompt-text");
const newPromptButton = document.getElementById("new-prompt-button");

async function loadPrompts() {
  try {
    const response = await fetch("prompts.txt");

    if (!response.ok) {
      throw new Error("Could not load text file");
    }

    const text = await response.text();

    prompts = text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    refreshText();
  } catch (error) {
    console.error(error);
    randomTitle.textContent =
      "Oops, something went wrong. Please try refreshing the page.";
    newPromptButton.disabled = true;
  }
}

function showNewTitle() {
  randomTitle.classList.remove("fade-in");
  randomTitle.textContent = titles[Math.floor(Math.random() * titles.length)];
  void randomTitle.offsetWidth;
  randomTitle.classList.add("fade-in");
}

function showNewPrompt() {
  if (prompts.length === 0) return;

  let randomIndex;

  do {
    randomIndex = Math.floor(Math.random() * prompts.length);
  } while (randomIndex === previousIndex && prompts.length > 1);

  previousIndex = randomIndex;

  randomPrompt.classList.remove("fade-in");
  randomPrompt.textContent = prompts[randomIndex];
  void randomPrompt.offsetWidth;
  randomPrompt.classList.add("fade-in");
}

function refreshText() {
  showNewTitle();
  showNewPrompt();
}

newPromptButton.addEventListener("click", refreshText);

loadPrompts();
