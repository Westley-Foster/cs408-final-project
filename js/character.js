/* Javascript file that holds onto the player's choice of character class. Includes the character's stats. */
document.addEventListener("DOMContentLoaded", function() {
    // Retrieves player class options from index.html and displays them in the console.log for debug purposes
    const classChoiceButtons = document.querySelectorAll(".class-choice");
    console.log(classChoiceButtons);

    classChoiceButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const chosenClass = btn.dataset.playerClass;
            const stats = generateStats(chosenClass);
            const player = {
                class: chosenClass,
                stats: stats
            };
            localStorage.setItem("player", JSON.stringify(player));
            alert(`You chose ${chosenClass}`);
        });
    });

    // Function to generate stats based on class
    function generateStats(chosenClass) {
        // I've chosen to give each class 40 stat points in total to keep it even
        switch(chosenClass) {
            case "Knight": {
                const stats = {strength: 15, constitution: 15, agility: 8, magic: 2};
                stats.evasion = 5;
                return stats;
            } 

            case "Mage": {
                const stats = {strength: 8, constitution: 7, agility: 10, magic: 15};
                stats.evasion = 10;
                return stats;
            }

            case "Thief": {
                const stats = {strength: 10, constitution: 10, agility: 15, magic:5}
                stats.evasion = 1.25 * stats.agility;
                return stats;
            }
            
            default: return {};
        }
    }

    // Example of retrieving data on another page
    const player = JSON.parse(localStorage.getItem("player"));
    if (player) {
        console.log(player.class, player.stats);
    }
});