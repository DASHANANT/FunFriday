// player-profile.js

// Array to store player profiles
let playerProfiles = [];

// Function to add a player profile
function addPlayerProfile() {
    const playerName = document.getElementById("playerName").value;
    const playerPhotoInput = document.getElementById("playerPhoto");

    // Check if a player name is provided
    if (!playerName.trim()) {
        alert("Please enter a player name.");
        return;
    }

    // Create a player object
    const player = {
        name: playerName,
        photo: playerPhotoInput.files[0], // Get the uploaded file (photo)
    };

    // Add the player object to the playerProfiles array
    playerProfiles.push(player);

    // Clear the input fields
    document.getElementById("playerName").value = "";
    playerPhotoInput.value = "";

    // Display the player profiles
    displayPlayerProfiles();
}

// Function to display player profiles
function displayPlayerProfiles() {
    const playersList = document.getElementById("playersList");
    playersList.innerHTML = ""; // Clear the previous list

    playerProfiles.forEach((player, index) => {
        const playerItem = document.createElement("div");
        playerItem.classList.add("player-item", "text-center", "m-3");

        const playerImage = document.createElement("div");
        playerImage.classList.add("player-image");

        // Check if a photo is available, otherwise display initials
        if (player.photo) {
            const image = document.createElement("img");
            image.src = URL.createObjectURL(player.photo);
            image.classList.add("rounded-circle"); // Add Bootstrap class for circular images
            image.style.width = "60px"; // Set the image size to 100px
            image.style.height = "60px";
            playerImage.appendChild(image);
        } else {
            // Generate an image of initials locally
            const initials = getInitials(player.name);
            const initialsCanvas = document.createElement("canvas");
            initialsCanvas.width = 60; // Set the canvas size
            initialsCanvas.height = 60;
            const ctx = initialsCanvas.getContext("2d");
            ctx.fillStyle = "#A9A9A9"; // Set background color
            ctx.fillRect(0, 0, initialsCanvas.width, initialsCanvas.height);
            ctx.font = "30px San Francisco"; // Set font size and style
            ctx.fillStyle = "#000000"; // Set text color
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(initials, initialsCanvas.width / 2, initialsCanvas.height / 2);

            const initialsImage = document.createElement("img");
            initialsImage.src = initialsCanvas.toDataURL("image/png");
            initialsImage.classList.add("rounded-circle"); // Add Bootstrap class for circular images
            playerImage.appendChild(initialsImage);
        }

        const playerName = document.createElement("div");
        playerName.classList.add("player-name");
        playerName.textContent = player.name;

        playerItem.appendChild(playerImage);
        playerItem.appendChild(playerName);

        playersList.appendChild(playerItem);
    });
}

// Function to get initials from a name
function getInitials(name) {
    const parts = name.split(" ");
    return parts.map(part => part.charAt(0)).join("").toUpperCase();
}


let teams = [];
function createTeams() {
    if (playerProfiles.length === 0) {
        alert('First, please add members.');
        return;
    }

    if (playerProfiles.length < 4) {
        alert('Please add at least 4 members.');
        return;
    }

    const numTeams = prompt('How many teams do you want to create?');
    if (numTeams === null || numTeams === '') {
        alert('Failed to create');
        return;
    }

    const numPlayersPerTeam = Math.ceil(playerProfiles.length / numTeams);
    let remainingPlayers = playerProfiles; // Remove the wrapping array
    teams = []; // Clear the existing teams array

    for (let i = 0; i < numTeams; i++) {
        const teamMembers = remainingPlayers.splice(0, numPlayersPerTeam);
        const teamName = generateRandomteamName();
        teams.push({ name: teamName, members: teamMembers });
    }

    // Hide the player profiles section and display the created teams
    document.getElementById('createTeamssection').style.display = 'none';    ;
    // Call a function to display the created teams
    displayTeamsList(teams);
    showGameSuggestions();
}

function displayTeamsList(teams) {
    const teamsListSection = document.getElementById('teamsListSection');
    const teamsList = document.getElementById('teamsList');

    // Clear any existing content in the teams list
    teamsList.innerHTML = '';

    // Display each created team similar to the icon-box format
    teams.forEach((team, index) => {
        const teamItem = document.createElement('div');
        teamItem.classList.add('col-lg-3', 'col-md-6');

        const iconBox = document.createElement('div');
        iconBox.classList.add('icon-box');
        iconBox.setAttribute('data-aos', 'zoom-in');
        iconBox.setAttribute('data-aos-delay', '100');

        const icon = document.createElement('div');
        icon.classList.add('icon', 'bg-primary');
        const iconImage = document.createElement('i');
        iconImage.classList.add('bi', 'bi-people', 'text-light'); // You can change 'bi-people' to the appropriate icon class
        icon.appendChild(iconImage);

        const title = document.createElement('h4');
        title.classList.add('title');
        title.textContent = `Team ${index + 1}: ${team.name}`;

        const description = document.createElement('p');
        description.classList.add('description');
        description.textContent = 'Members: ';
        team.members.forEach((member, memberIndex) => {
            if (memberIndex > 0) {
                description.textContent += ', ';
            }
            description.textContent += member.name;
        });

        iconBox.appendChild(icon);
        iconBox.appendChild(title);
        iconBox.appendChild(description);
        teamItem.appendChild(iconBox);
        teamsList.appendChild(teamItem);
    });

    // Display the teams list section
    teamsListSection.style.display = 'block';
}

function generateRandomteamName() {
    const adjectives = [
        'Awesome', 'Crazy', 'Fantastic', 'Incredible', 'Legendary',
        'Spectacular', 'Mystical', 'Epic', 'Daring', 'Enigmatic',
        'Fearless', 'Wondrous', 'Supreme', 'Magical', 'Vibrant',
        'Masterful', 'Majestic', 'Brilliant', 'Sensational', 'Surreal'
    ];

    const nouns = [
        'Dragons', 'Honey Badgers', 'Ninjas', 'Penguins', 'Samurais',
        'Wizards', 'Phoenixes', 'Centurions', 'Titans', 'Unicorns',
        'Vikings', 'Musketeers', 'Sorcerers', 'Gladiators', 'Pirates',
        'Warriors', 'Conquerors', 'Explorers', 'Adventurers', 'Guardians'
    ];

    const adjectiveIndex = Math.floor(Math.random() * adjectives.length);
    const nounIndex = Math.floor(Math.random() * nouns.length);
    return `${adjectives[adjectiveIndex]} ${nouns[nounIndex]}`;
}

function showGameSuggestions() {
    const gamesSection = document.querySelector('.services bg-light');
    gamesSection.style.display = 'block';
}
