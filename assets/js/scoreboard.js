
let teamNames = [];

function addTeamName() {
    const teamName = prompt("Enter a team name:");

    if (teamName !== null && teamName.trim() !== "") {
        addOneTeam(teamName);
        teamNames.push(teamName);
    }
}

function updateScoreCardTable() {
    const scoreCardTable = document.getElementById("gameRounds");

    while (scoreCardTable.rows.length > 1) {
        scoreCardTable.deleteRow(1);
    }

    const headerRow = scoreCardTable.rows[0];
    for (const name of teamNames) {
        const headerCell = document.createElement("th");
        headerCell.textContent = name;
        headerRow.appendChild(headerCell);
    }
}

function addOneTeam(teamName) {
    const table = document.getElementById("scoreCard");
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${teamName}</td>
        <td>0</td>
    `;
    table.appendChild(newRow);
}

function showPopup() {
    if (teamNames.length < 2) {
        alert("Please add at least two team names before proceeding.");
        return;
    }
    const popup = document.getElementById("popup");
    popup.style.display = "block";
}

function addRounds() {
    if (teamNames.length < 2) {
        alert("Please add at least two team names before proceeding.");
        return;
    }
    document.getElementById("popup").style.display = "block";
}


function addTeamRows() {
    const numberOfRoundsInput = document.getElementById("teamsInput");
    const numberOfRounds = parseInt(numberOfRoundsInput.value);

    if (isNaN(numberOfRounds) || numberOfRounds <= 0) {
        alert("Please enter a valid positive number of rounds.");
        return;
    }

    updateScoreCardTable();
    const gameRoundsTable = document.getElementById("gameRounds");
    const numberOfTeams = teamNames.length;

    document.getElementById("startButtonContainer").style.display = "none"; // Hide the "Add Rounds" button

    for (let i = 1; i <= numberOfRounds; i++) {
        const newRow = gameRoundsTable.insertRow();
        const roundCell = newRow.insertCell(0);
        roundCell.textContent = "Round " + i;

        for (let j = 0; j < numberOfTeams; j++) {
            const resultCell = newRow.insertCell(j + 1);
            const userInput = getUserInput(numberOfTeams, j + 1);
            resultCell.appendChild(userInput);
        }
    }

    document.getElementById("popup").style.display = "none";
    document.getElementById("doneButtonContainer").style.display = "none"; // Hide the "Done" button
}

function getUserInput(numberOfTeams, teamIndex) {
    if (numberOfTeams === 2) {
        const options = ["win", "lose"];
        const inputContainer = document.createElement("div");
        
        for (const option of options) {
            const label = document.createElement("label");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.name = `result_${teamIndex}`;
            checkbox.value = option;
            
            // Add event listener to the checkbox
            checkbox.addEventListener("change", function () {
                if (this.checked) {
                    const otherCheckbox = inputContainer.querySelector(`input[name="result_${teamIndex}"][value="${option === "win" ? "lose" : "win"}"]`);
                    otherCheckbox.checked = false; // Uncheck the other checkbox
                    checkbox.disabled = true; // Disable this checkbox
                    otherCheckbox.disabled = true; // Disable the other checkbox
                    
                    // Recalculate and update points in scoreboard
                    updatePoints();
                }
            });
            
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(option));
            inputContainer.appendChild(label);
        }
        
        return inputContainer;
    } else {
        const positionInput = document.createElement("input");
        positionInput.type = "text";
        positionInput.placeholder = `Position for Team ${teamIndex}`;
        return positionInput;
    }
}

function updatePoints() {
    const scoreTable = document.getElementById("scoreCard");
    const rows = scoreTable.getElementsByTagName("tr");
    
    for (let i = 1; i < rows.length; i++) {
        const teamNameCell = rows[i].getElementsByTagName("td")[0];
        const pointsCell = rows[i].getElementsByTagName("td")[1];
        const teamName = teamNameCell.textContent;
        
        let points = 0;
        const roundTable = document.getElementById("gameRounds");
        const roundRows = roundTable.getElementsByTagName("tr");
        
        for (let j = 1; j < roundRows.length; j++) {
            const roundCells = roundRows[j].getElementsByTagName("td");
            const resultCell = roundCells[i];
            
            if (resultCell.querySelector("input[type='checkbox'][value='win']").checked) {
                points += 5;
            }
        }
        
        pointsCell.textContent = points;
    }
}