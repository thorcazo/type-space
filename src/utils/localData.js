// src/utils/localData.js

// Static data for words
const wordsData = [
    { word: "HTML", color: "#E34F26", difficulty: "easy" },
    { word: "CSS", color: "#1572B6", difficulty: "easy" },
    { word: "JS", color: "#F7DF1E", difficulty: "easy" },
    { word: "REACT", color: "#61DAFB", difficulty: "easy" },
    { word: "VUE", color: "#4FC08D", difficulty: "easy" },
    { word: "NODE", color: "#339933", difficulty: "easy" },
    { word: "JAVA", color: "#007396", difficulty: "easy" },
    { word: "PHP", color: "#777BB4", difficulty: "easy" },
    { word: "RUBY", color: "#CC342D", difficulty: "easy" },
    { word: "SWIFT", color: "#FA7343", difficulty: "easy" },
    { word: "GIT", color: "#F05032", difficulty: "easy" },
    { word: "DOCKER", color: "#2496ED", difficulty: "easy" },
    { word: "LINUX", color: "#FCC624", difficulty: "easy" },
    { word: "MYSQL", color: "#4479A1", difficulty: "easy" },
    { word: "MONGO", color: "#47A248", difficulty: "easy" },
    { word: "REDIS", color: "#DC382D", difficulty: "easy" },
    { word: "AWS", color: "#FF9900", difficulty: "easy" },
    { word: "AZURE", color: "#0078D4", difficulty: "easy" },
    { word: "GCP", color: "#4285F4", difficulty: "easy" },
    { word: "SASS", color: "#CC6699", difficulty: "easy" },
    // Normal difficulty
    { word: "TYPESCRIPT", color: "#3178C6", difficulty: "normal" },
    { word: "ANGULAR", color: "#DD0031", difficulty: "normal" },
    { word: "PYTHON", color: "#3776AB", difficulty: "normal" },
    { word: "KOTLIN", color: "#7F52FF", difficulty: "normal" },
    { word: "FLUTTER", color: "#02569B", difficulty: "normal" },
    { word: "LARAVEL", color: "#FF2D20", difficulty: "normal" },
    { word: "DJANGO", color: "#092E20", difficulty: "normal" },
    { word: "SPRING", color: "#6DB33F", difficulty: "normal" },
    { word: "GRAPHQL", color: "#E10098", difficulty: "normal" },
    { word: "WEBPACK", color: "#8DD6F9", difficulty: "normal" },
    { word: "JENKINS", color: "#D24939", difficulty: "normal" },
    { word: "KUBERNETES", color: "#326CE5", difficulty: "normal" },
    { word: "TERRAFORM", color: "#623CE4", difficulty: "normal" },
    { word: "ANSIBLE", color: "#EE0000", difficulty: "normal" },
    { word: "POSTGRES", color: "#336791", difficulty: "normal" },
];

// Static data for enemies
const enemiesData = [
    { type: "Enemy1", health: 50, speed: 40, points: 10, difficulty: "low" },
    { type: "Enemy2", health: 60, speed: 45, points: 15, difficulty: "low" },
    { type: "Enemy3", health: 70, speed: 50, points: 20, difficulty: "low" },
    { type: "Enemy4", health: 80, speed: 55, points: 25, difficulty: "low" },
    { type: "Enemy5", health: 90, speed: 60, points: 30, difficulty: "low" },
    { type: "Enemy6", health: 100, speed: 65, points: 35, difficulty: "medium" },
    { type: "Enemy7", health: 110, speed: 70, points: 40, difficulty: "medium" },
    { type: "Enemy8", health: 120, speed: 75, points: 45, difficulty: "medium" },
    { type: "Enemy9", health: 130, speed: 80, points: 50, difficulty: "medium" },
    { type: "Enemy10", health: 140, speed: 85, points: 55, difficulty: "medium" },
    { type: "Enemy11", health: 150, speed: 90, points: 60, difficulty: "medium" },
    { type: "Enemy12", health: 160, speed: 95, points: 65, difficulty: "medium" },
];

// Key for localStorage
const STORAGE_KEY = "type_space_scores";

// Helper to get scores from localStorage
const getLocalScores = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
};

// Helper to save scores to localStorage
const saveLocalScores = (scores) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
};

// --- Exported Functions ---

export const getWordsEnemies = async () => {
    // Simulate async to match original interface
    return new Promise((resolve) => {
        resolve(wordsData);
    });
};

export const getDataEnemies = async () => {
    return new Promise((resolve) => {
        resolve(enemiesData);
    });
};

export const addScore = async (playerName, numShipsDestr, errorKeyText, totalScoreText) => {
    return new Promise((resolve) => {
        const scores = getLocalScores();
        const newScore = {
            playerName: playerName,
            shipsDestroyed: numShipsDestr,
            errorKey: errorKeyText,
            totalScore: parseInt(totalScoreText),
            date: new Date().toISOString(),
        };

        // Check if player exists
        const existingIndex = scores.findIndex((s) => s.playerName === playerName);

        if (existingIndex !== -1) {
            // Update if new score is higher
            if (newScore.totalScore > scores[existingIndex].totalScore) {
                scores[existingIndex] = newScore;
                console.log("Puntuación local actualizada");
            } else {
                console.log("Puntuación local no superada");
            }
        } else {
            // Add new player
            scores.push(newScore);
            console.log("Nuevo jugador local añadido");
        }

        saveLocalScores(scores);
        resolve();
    });
};

export const getScores = async () => {
    return new Promise((resolve) => {
        resolve(getLocalScores());
    });
};

export const getTopPlayers = async () => {
    return new Promise((resolve) => {
        const scores = getLocalScores();
        const topPlayers = scores.sort((a, b) => b.totalScore - a.totalScore);
        resolve(topPlayers.slice(0, 10));
    });
};

// These were in the original file, keeping them for compatibility but they might not be used or needed for local
export const addDataEnemies = async () => { console.warn("addDataEnemies not implemented for local storage"); };
export const addWordsEnemies = async () => { console.warn("addWordsEnemies not implemented for local storage"); };
