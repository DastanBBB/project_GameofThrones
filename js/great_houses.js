window.onload = async function() {
    const housesList = document.getElementById('houses-list');

    async function fetchHouseData() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=4');
            const data = await response.json();
            renderCards(data);
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    }

    // Функция для рендеринга карточек
    function renderCards(data) {
        data.forEach(post => {

            const card = document.createElement('div');
            card.classList.add('house-card');
            card.innerHTML = `
                <div class="house-image">
                    <img src="https://i.pinimg.com/originals/97/50/31/9750311ffe086f06ab1a2c80ec32a16d.png" alt="House Image">
                </div>
                <h3>${post.title}</h3>
                <p>${post.body}</p>
            `;

            housesList.appendChild(card);
        });
    }

    fetchHouseData();
};
