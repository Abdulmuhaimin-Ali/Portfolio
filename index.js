document.addEventListener("DOMContentLoaded", function () {
  terminalOutput = document.getElementById("terminalOutput");
  terminalInput = document.getElementById("terminalInput");

  const projects = [
    { name: "project1", description: "Description of project 1" },
    { name: "project2", description: "Description of project 2" },
    { name: "project3", description: "Description of project 3" },
  ];

  currentDirectory = "/";
  commandHistory = [];

  function addToOutput(output) {
    terminalOutput.innerHTML += `<div>${output}</div>`;
  }

  function displayPrompt() {
    return `AbdulmuhaiminAli's@portfolio:${currentDirectory}$ `;
  }

  function updatePrompt() {
    document.querySelector(".terminal-prompt").textContent = displayPrompt();
  }

  function processInput(command) {
    commandHistory.push(command);
    args = command.split(" ");
    cmd = args[0].toLowerCase();

    switch (cmd) {
      case "ls":
        if (currentDirectory === "/") {
          addToOutput(projects.map((p) => p.name).join(" "));
        } else {
          addToOutput("No files in this directory");
        }
        break;
      case "cd":
        if (args[1] === "..") {
          if (currentDirectory !== "/") {
            currentDirectory = "/";
            addToOutput(`Current directory changed to ${currentDirectory}`);
          } else {
            addToOutput("Already in root directory");
          }
        } else if (projects.some((p) => p.name === args[1])) {
          currentDirectory = `/${args[1]}`;
          addToOutput(`Current directory change to ${currentDirectory}`);
        } else {
          addToOutput("Directory not found");
        }
        break;
      case "pwd":
        addToOutput(currentDirectory);
        break;
      case "whoami":
        addToOutput(
          "You're an awesome visitor exploring Abdulmuhaimin Ali's portfolio! Thanks for stopping by."
        );
        break;
      case "ipconfig":
        async function getIpConfig() {
          addToOutput("fetching ip address...");
          try {
            const response = await fetch("https://ipapi.co/json/");
            const data = await response.json();
            addToOutput(`IP address: ${data.query}`);
            addToOutput(`Location: ${data.city}, ${data.region}`);
            addToOutput(`Country: ${data.country}`);
            addToOutput(`ISP: ${data.isp}`);
          } catch (error) {
            addToOutput("Error fetching IP address.");
          }
        }
        getIpConfig();
        break;
      case "rm":
        if (args[1]) {
          if (projects.some((p) => p.name === args[1])) {
            addToOutput(`Deleting ${args[1]}...`);
            addToOutput(
              `Nice try! I won't let you delete my files that easily. 😄`
            );
          } else {
            addToOutput(`File not found: ${args[1]}`);
          }
          break;
        } else {
          addToOutput(
            "Please enter a file name to delete. For example: rm file.txt"
          );
          break;
        }
        addOutput(`Nice try! I won't let you delete my files that easily. 😄`);
        break;
      case "skills":
        addToOutput("Languages: C++, Java, JavaScript, Python, HTML, CSS");
        addToOutput("Frameworks: React, Node.js, Express, Flask");
        addToOutput("Tools: Git, Docker, VS Code, Postman");
        break;
      case "weather":
        if (!args[1]) {
          addToOutput("Please enter a city name. For example: weather Toronto");
          break;
        }

        const city = args[1];
        addToOutput(`Fetching weather data for ${city}...`);

        (async () => {
          try {
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2bbcfc21c3aae2fbb1e08b45f9924237
              `
            );
            const data = await response.json();

            if (data.weather) {
              addToOutput(
                `Temperature: ${(data.main.temp - 273.15).toFixed(2)}°C`
              );
              addToOutput(
                `Feels like: ${(data.main.feels_like - 273.15).toFixed(2)}°C`
              );
              addToOutput(`Sky: ${data.weather[0].description}`);
            } else {
              addToOutput(`Failed to fetch weather data for ${city}`);
            }
          } catch (error) {
            addToOutput(`Error fetching weather data.`);
          }
        })();

        break;

      case "crypto":
        if (args[1] === undefined) {
          addToOutput(
            "Please enter a cryptocurrency. For example: crypto bitcoin"
          );
          break;
        } else {
          const coinId = args[1].toLowerCase();
          const urlCoinGecko = `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`;

          addToOutput(`Fetching data for ${coinId}...`);

          const fetchCryptoPrice = async () => {
            try {
              const response = await fetch(urlCoinGecko);
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              const data = await response.json();
              if (data && data[coinId] && data[coinId].usd) {
                const price = data[coinId].usd;
                addToOutput(`The price of ${coinId} is $${price.toFixed(2)}`);
              } else {
                addToOutput(`Could not find price data for ${coinId}`);
              }
            } catch (error) {
              addToOutput(`Error fetching cryptocurrency: ${error.message}`);
              console.error("Full error:", error);
            }
          };
          fetchCryptoPrice();
        }
        break;

        break;
      case "clear":
        clear();
        return;
      case "help":
        addToOutput(
          "Try help, ls, pwd, whoami, ipconfig, rm, skills, weather, crypto'coin-name' or clear"
        );
        break;
      default:
        addToOutput(`Command not found: ${command}`);
    }
    updatePrompt();
  }

  let historyIndex = -1;
  document
    .getElementById("terminalInput")
    .addEventListener("keydown", function (e) {
      const inputField = e.target;
      if (e.key === "Enter") {
        const command = inputField.value.trim();
        addToOutput(displayPrompt() + command);
        processInput(command);
        inputField.value = "";
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (historyIndex > 0) {
          historyIndex--;
          terminalInput.value = commandHistory[historyIndex];
        }
      } else {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            terminalInput.value = commandHistory[historyIndex];
          } else {
            terminalInput.value = "";
          }
        }
      }
    });

  updatePrompt();

  addToOutput(
    "Welcome to Abdulmuhaimin Ali's portfolio! Type 'help' for available commands."
  );
});

function clear() {
  const outputDiv = document.getElementById("terminalOutput");
  outputDiv.innerHTML = "";
}

document.addEventListener("DOMContentLoaded", function () {
  // Read More functionality for About section
  const readMoreBtn = document.querySelector(".read-more-btn");
  const aboutDetails = document.querySelector(".about-details");

  if (readMoreBtn && aboutDetails) {
    readMoreBtn.addEventListener("click", function () {
      aboutDetails.classList.toggle("hidden");
      readMoreBtn.textContent = aboutDetails.classList.contains("hidden")
        ? "Read More"
        : "Read Less";
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
  addToOutput(
    'Welcome to Abdulmuhaimin Ali\'s portfolio! Type "help" for available commands.'
  );
});

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".sticky-header");
  const scrollThreshold = 50; // Adjust this value to determine when the effect should trigger

  function handleScroll() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleScroll);
});
