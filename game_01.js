console.log("*****************************************");
console.log("* Bienvenue dans le tictactoe de Kenee !*");
console.log("*****************************************");
console.log("        Amusez vous bien !\n");

const readline = require('readline-sync'); // importe la bibliothèque pour les entrées utilisateur

let board = [['','',''],['','',''],['','','']]; // tableau de jeu vide
let player1Name;
let player2Name;
let player1Symbol;
let player2Symbol;
let player = player1Symbol; // Joueur actuel, commence avec le symbole choisi pour le joueur 1
let winner = null; // variable pour stocker le gagnant
let fullBoard = false; // variable pour vérifier s'il y a égalité
let quit = false; //variable pour vérifier si le joueur souhaite quitter


//Fonction pour demander les informations des joueurs
function getPlayerInfo(){
    player1Name = readline.question("Entrez le nom du joueur 1 : ");
    player2Name = readline.question("Entrez le nom du joueur 2 : ");
    while (player1Name === player2Name) {
        console.log("Les noms des joueurs doivent être différents");
        player2Name = readline.question("Entrez le nom du joueur 2 : ");
    }
    player1Symbol = readline.question("Entrez le symbole du joueur 1 (X ou O) : ");
    while (player1Symbol.toUpperCase() !== 'X' && player1Symbol.toUpperCase() !== 'O') {
        console.log("Le symbole doit être X ou O");
        player1Symbol = readline.question("Entrez le symbole du joueur 1 (X ou O) : ");
    }
    player2Symbol = player1Symbol.toUpperCase() === 'X' ? 'O' : 'X';
    console.log(`${player1Name} jouera avec ${player1Symbol} et ${player2Name} jouera avec ${player2Symbol}`);
}



// Fonction pour afficher le jeu
function displayBoard() {
    for (let i = 0; i < 3; i++) {
        console.log("---+---+---");
        console.log("| " + board[i].join(' | ') + " |");
    }
    console.log("---+---+---");
}


// Fonction pour mettre à jour le jeu
function updateBoard(row, col) {
board[row][col] = player;
player = player === player1Symbol ? player2Symbol : player1Symbol;
}

// Fonction pour vérifier s'il y a un gagnant
function checkWinner() {
// vérifier les lignes
for (let i = 0; i < 3; i++) {
if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== '') {
winner = board[i][0];
return true;
}
}

// vérifier les colonnes
for (let i = 0; i < 3; i++) {
    if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== '') {
        winner = board[0][i];
        return true;
    }
}

// vérifier les diagonales
if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== '') {
    winner = board[0][0];
    return true;
}
if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== '') {
winner = board[0][2];
return true;
}
return false;
}

// Fonction pour vérifier s'il y a égalité
function checkTie() {
for (let i = 0; i < 3; i++) {
for (let j = 0; j < 3; j++) {
if (board[i][j] === '') {
return false;
}
}
}
fullBoard = true;
return true;
}


let player1Score = 0;
let player2Score = 0;
getPlayerInfo();

// boucle principale du jeu
while (true) {
    displayBoard();
    console.log(`Tour de ${player === player1Symbol ? player1Name : player2Name}`);
    console.log("Tapez 'q' pour quitter à tout moment");
    let row = readline.question("Entrez la ligne (0-2) : ");
    if (row === 'q') {
        console.log("Aurevoir!");
        break;
    } else {
        let col = readline.question("Entrez la colonne (0-2) : ");
        row = parseInt(row);
        col = parseInt(col);
        if (row < 0 || row > 2 || col < 0 || col > 2) {
            console.log("Entrée non valide, veuillez entrer une ligne et une colonne entre 0 et 2");
        } else if (board[row][col] !== '') {
            console.log("Case déjà remplie, veuillez choisir une autre case");
        } else {
            updateBoard(row, col);
            if (checkWinner()) {
                console.log(`Le gagnant est ${winner === player1Symbol ? player1Name : player2Name}`);
                displayBoard();
                if(winner === player1Symbol) player1Score++;
                else player2Score++;
                console.log("Score : ");
                console.log(`${player1Name} : ${player1Score}`);
                console.log(`${player2Name} : ${player2Score}`);
                let replay = readline.question("Voulez-vous rejouer? (o/n) : ");
                if(replay === 'o'){
                    board = [['','',''],['','',''],['','','']];
                    player = player1Symbol;
                    winner = null;
                    fullBoard = false;
                    getPlayerInfo();
                }else{
                    break;
                }
            } else if (checkTie()) {
                console.log("Match nul!");
                displayBoard();
                let replay = readline.question("Voulez-vous rejouer?(o/n) : ");
                if(replay === 'o'){
                board = [['','',''],['','',''],['','','']];
                player = player1Symbol;
                winner = null;
                fullBoard = false;
                getPlayerInfo();
                }else{
                break;
                }
                }
                }
                }
                }