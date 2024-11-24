// ------GMAIL CHECKER-----

document.querySelector('#gmail_button').addEventListener("click", function () {
    const gmailInput = document.querySelector('#gmail_input').value;
    const  gmailResult = document.querySelector('#gmail_result');

    const regEx = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (regEx.test(gmailInput)) {
        gmailResult.innerHTML = 'Gmail address is correct!';
        gmailResult.style.color = 'green';
    } else {
        gmailResult.innerHTML = 'Invalid Gmail address.';
        gmailResult.style.color = 'red';
    }
});



// -------MOVE BLOCK part2------
const  childBlock = document.querySelector('.child_block');
const  parentBlock = document.querySelector('.parent_block');

let  positonX = 0, positionY = 0;
let direction = 'right';
const  speed = 2;

function moveBlock() {
    if (direction === 'right') {
        if (positonX < parentBlock.clientWidth - childBlock.clientWidth) {
            positonX += speed;
        } else {
            direction = 'down';
        }
    } else if (direction === 'down') {
        if (positionY < parentBlock.clientHeight - childBlock.clientHeight) {
            positionY += speed;
        } else {
            direction = 'left';
        }
    } else if (direction === 'left') {
        if (positonX > 0) {
            positonX -= speed;
        } else {
            direction = 'up';
        }
    } else if (direction === 'up') {
        if (positionY > 0) {
            positionY -= speed;
        } else {
            direction = 'right';
        }
    }
    childBlock.style.left = `${positonX}px`;
    childBlock.style.top = `${positionY}px`;

    requestAnimationFrame(moveBlock);
}

moveBlock();



// --------STOP WATCH--------
const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');
const resetButton = document.querySelector('#reset');
const display = document.querySelector('#seconds');

let counter = 0;
let intervalId = null;

// Запуск счетчика
function startCounter() {
    if (!intervalId) {
        intervalId = setInterval(() => {
            counter += 1;
            display.innerHTML = counter;
        }, 1000);
    }
}
// Остановка счетчика
function stopCounter() {
    clearInterval(intervalId);
    intervalId = null;
}

function resetCounter() {
    stopCounter();
    counter = 0; // Обнуляем
    display.innerHTML = counter;
}

startButton.addEventListener('click', startCounter);
stopButton.addEventListener('click', stopCounter);
resetButton.addEventListener('click', resetCounter);



// -------XMLHttpRequest---->and new async/await request
const fetchKingdomsData = async () => {
    try {
        const response = await fetch('/data/any.json');
        if (!response.ok) {
            throw new   Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json()

        data.kingdoms.forEach(kingdom => {
            console.log(`Королевство: ${kingdom.name}`);
            console.log(`Правитель: ${kingdom.ruler}`);
            console.log(`Столица: ${kingdom.capital}`);
            console.log(`Девиз: ${kingdom.motto}`);
            console.log('----------------------------');
        });
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
    }
};

fetchKingdomsData();



// ---------Request to show cards----------
window.onload = async function () {
    try {
        const response = await fetch('/data/characters.json');
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        const characters = data.characters;

        const charactersList = document.getElementById('characters-list');

        // Динамическое создание карточек для каждого персонажа
        characters.forEach(character => {
            const card = document.createElement('div');
            card.classList.add('character-card');

            card.innerHTML = `
                <div class="character-photo">
                    <img src="${character.person_photo}" alt="${character.name}">
                </div>
                <h4>${character.name}</h4>
                <p><strong>Age:</strong> ${character.age}</p>
                <p><strong>Family:</strong> ${character.family}</p>
                <p><strong>House:</strong> ${character.house}</p>
                <p><strong>Title:</strong> ${character.title}</p>
                <p><strong>Birthplace:</strong> ${character.birthplace}</p>
                <p><strong>Bio:</strong> ${character.bio}</p>
            `;

            charactersList.appendChild(card);
        });
    } catch (error) {
        console.error('Ошибка при загрузке json:', error);
    }
};







