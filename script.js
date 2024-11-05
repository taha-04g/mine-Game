
//Taha Kadi

let {round, random} = Math;
let tuiles = [];
let xHauteur = 15;
let xLargeur = 25;
let nombreDeCristaux = round((xHauteur * xLargeur) * 10 / 100); // Nombres de cristaux affiches dans la grille (10%)

// La position intiale du heros
let positionX = round((xHauteur / 2) - 1);
let positionY = round((xLargeur / 2) - 1);

let _nombresdeCristaux = 0; // Nombres de cristaux
let _nombresDePioches  = 40; // Nombre de pioches
let poucentageDePioche = 100; // le pourcentage des pioches (100%)
let pourcentageParPioche = poucentageDePioche / _nombresDePioches; // Pourentage pour chaque pioche

// DOM Variables
let d_grille          = document.querySelector(".grille");
let d_tuile           = (x, y) => document.querySelector(`.tuile.h${x}.l${y}`);
let d_cristalScoreFinal = document.getElementById('cristalScoreFinal');
let d_gameOver        = document.getElementById('gameOver');
let d_progressBar     = document.querySelector('.progress__bar');
let d_piocheNum       = document.getElementById("piocheCounteur");
let d_cristalNum      = document.getElementById("cristalCounteur");

// Initialiser le jeu
function setup() {
    // Generer le roches 90%
    for (let hauteur = 0; hauteur < xHauteur; hauteur++) {
        let data = [];

        for (let largeur = 0; largeur < xLargeur; largeur++) {

            data.push('r');

            d_grille.innerHTML += `

            <div class="tuile h${hauteur} l${largeur}">
                <img src="img/tile_roche.png" alt="" claas="wall">
            </div>

            `;
        }

        tuiles.push(data);
    }

    // Generer les cristaux 10%
    let cristal = 0;
    while (cristal <= nombreDeCristaux) {
        let randomX = (round(random() * (xHauteur - 1)));
        let randomY = (round(random() * (xLargeur - 1)));

        if(randomX == positionX && randomY == positionY)
        {
            continue;
        }

        d_tuile(randomX, randomY).innerHTML += '<img src="img/tile_cristal.png" class="imgcrystal">';

        tuiles[randomX][randomY] = 'c'; // c = cristal

        cristal++;
    }

    tuiles[positionX][positionY] = 'p'; // p = player
    d_tuile(positionX, positionY).innerHTML += '<img src="img/hero.png" class="hero">';
}

// Fin du jeu
function gameOver()
{
    d_cristalScoreFinal.innerHTML = _nombresdeCristaux;
    d_gameOver.classList.remove('none');
    return false;
}

// Fonction generale pour le mouvement du l'heros
function move(x, y, newX, newY)
{

    switch (tuiles[newX][newY])
    {
        case 'r':  // r = roche
            _nombresDePioches--;
            poucentageDePioche -= pourcentageParPioche;
            d_progressBar.style.width = poucentageDePioche + '%';
        break;

        case 'c':
            _nombresDePioches--;
            _nombresdeCristaux++;
            poucentageDePioche -= pourcentageParPioche;
            d_progressBar.style.width = poucentageDePioche + '%';
        break;
    }

    // Mettre a jour les numeros du pioche et dur cristal en HTML
    d_piocheNum.innerHTML = `${_nombresDePioches} / 40`;
    d_cristalNum.innerHTML = `${_nombresdeCristaux}`;

    if(_nombresDePioches <= 0)
    {
        gameOver();
    }

    tuiles[x][y]       = 'v'; // v = vide
    tuiles[newX][newY] = 'p';

    positionX = newX;
    positionY = newY;

    d_tuile(x, y).innerHTML = '<img src="img/tile_vide.png" class="vide">';
    d_tuile(newX, newY).innerHTML = '<img src="img/hero.png" class="hero">';

    return tuiles;
}

// Allez en haut
function up()
{
    if(positionX <= 0)
    {
        return false;
    }

    return move(positionX, positionY, positionX - 1, positionY);
}

// Allez en bas
function down()
{
    if(positionX >= xHauteur - 1)
    {
        return false;
    }

    return move(positionX, positionY, positionX + 1, positionY);
}

// Allez en gauche
function left()
{
    if(positionY <= 0)
    {
        return false;
    }

    return move(positionX, positionY, positionX, positionY - 1);
}

// Allez en droite
function right()
{
    if(positionY >= xLargeur - 1)
    {
        return false;
    }

    return move(positionX, positionY, positionX, positionY + 1);
}

// Reninitialiser le jeu
function restore()
{
    tuiles = [];
    xHauteur = 15;
    xLargeur = 25;
    nombreDeCristaux = round((xHauteur * xLargeur) * 10 / 100); // Nombres de cristaux affiches dans la grille (10%)

    // La position intiale du heros
    positionX = round((xHauteur / 2) - 1);
    positionY = round((xLargeur / 2) - 1);

    _nombresdeCristaux = 0; // Nombres de cristaux
    _nombresDePioches  = 40; // Nombre de pioches
    poucentageDePioche = 100; // le pourcentage des pioches (100%)
    pourcentageParPioche = poucentageDePioche / _nombresDePioches; // Pourentage pour chaque pioche

    d_grille.innerHTML = '';
    d_progressBar.style.width = poucentageDePioche + '%';

    // Mettre a jour les numeros du pioche et dur cristal en HTML
    d_piocheNum.innerHTML = `${_nombresDePioches} / 40`;
    d_cristalNum.innerHTML = `${_nombresdeCristaux}`;

    d_gameOver.classList.add('none');

    setup();
}

// Les buttons (haut, bas, gauche, droite)
document.getElementById("top").addEventListener('click', function() {
    return up();
});
document.getElementById("bottom").addEventListener('click', function() {
    return down();
});
document.getElementById("left").addEventListener('click', function() {
    return left();
});
document.getElementById("right").addEventListener('click', function() {
    return right();
});
document.getElementById('quit').addEventListener('click', function() {
    return gameOver();
})

// Nouveou jeu
document.getElementById('newGame').addEventListener('click', function () {
    return restore();
})

// Applez la fonction pour initialiser le jeu
setup();
