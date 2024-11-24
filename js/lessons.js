// PHONE CHECKER
const phoneInput = document.querySelector('#phone_input');
const phoneButton = document.querySelector('#phone_button');
const phoneResult = document.querySelector('#phone_result');

const  regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = 'OK'
        phoneResult.style.color = 'green'
    } else {
        phoneResult.innerHTML = 'NOT OK'
        phoneResult.style.color = 'red'
    }
}


// TAB SLIDER
const tabContentBlocks = document.querySelectorAll('.tab_content_block');
const tabs = document.querySelectorAll('.tab_content_item');
const  tabsParent = document.querySelector('.tab_content_items');
const hideTabContent = () => {
    tabContentBlocks.forEach(block => {
        block.style.display = 'none'
    })
    tabs.forEach((tab) => {
        tab.classList.remove('tab_content_item_active')
    })
}

const showTabContent = (id = 0) => {
    tabContentBlocks[id].style.display = 'block'
    tabs[id].classList.add('tab_content_item_active')
}

hideTabContent()
showTabContent()

tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabs.forEach((tab, tabIndex) => {
            if (event.target === tab) {
                hideTabContent()
                showTabContent(tabIndex)
            }
        });
    }
};

let currentTab = 0;
const switchTabAutomatically = () => {
    setInterval(() => {
        currentTab = (currentTab + 1) % tabs.length;
        hideTabContent()
        showTabContent(currentTab);
    }, 5000);
};
switchTabAutomatically();



// -----CONVERTER-------
const usdInput = document.querySelector('#usd')
const somInput = document.querySelector('#som')
const eurInput = document.querySelector('#eur')

const converter = (element, targetElements) => {
    element.oninput = async () => {
        try {
            const response = await fetch('../data/converter.json');
            const data = await response.json();

            targetElements.forEach(target => {
                if (element.id === 'som') {
                    if (target.id === 'usd') target.value = (element.value / data.usd).toFixed(2)
                    if (target.id === 'eur') target.value = (element.value / data.eur).toFixed(2)
                }
                if (element.id === 'usd') {
                    if (target.id === 'som') target.value = (element.value * data.usd).toFixed(2)
                    if (target.id === 'eur') target.value = ((element.value * data.usd) / data.eur).toFixed(2)
                }
                if (element.id === 'eur') {
                    if (target.id === 'som') target.value = (element.value * data.eur).toFixed(2)
                    if (target.id === 'usd') target.value = ((element.value * data.eur) / data.usd).toFixed(2)
                }
                if (element.value === '') {
                    target.value = ''
                }
            });
        } catch (error) {
            console.error('Ошибка при загрузке данных')
        }
    }
};

converter(somInput, [usdInput, eurInput])
converter(usdInput, [somInput, eurInput])
converter(eurInput, [somInput, usdInput])



// ------CARD SWITCHER------
const nextButton = document.querySelector('#btn-next')
const prevButton = document.querySelector('#btn-prev')
const cardBlock = document.querySelector('.card')
const max_index = 200;
let cardIndex = 1;

// применяю принцип DRY and KISS

const loadCard =  async (index) => {
    try {
        const response = await fetch(` https://jsonplaceholder.typicode.com/todos/${cardIndex}`)
        const data = await response.json()
        cardBlock.innerHTML = `
        <p>${data.title}</p>
        <p>${data.completed}</p>
         <span>${data.id}</span>
    `
    } catch (e) {
        console.log(e)
    }
}

nextButton.onclick = () => {
    cardIndex = cardIndex === max_index ? 1: cardIndex + 1; // с последней на первую карточку
    loadCard(cardIndex);
}

prevButton.onclick = () => {
    cardIndex = cardIndex === 1 ? max_index: cardIndex - 1; // с первой на последную карточку
    loadCard(cardIndex);
}

loadCard(cardIndex);



// ------async-await запрос на 'https://jsonplaceholder.typicode.com/posts'------

const url = 'https://jsonplaceholder.typicode.com/posts'
const fetchPosts = async () => {
    try {
        const response = await  fetch(`${url}`);
        const data = await response.json();
        console.log('Posts', data);
    } catch (error) {
        console.error('Error posts:', error);
    }
};
fetchPosts();



// -----Weather------
// query params - параметры запроса

const searchButton= document.querySelector('#search')
const searchInput = document.querySelector('.cityName')
const city = document.querySelector('.city')
const temp = document.querySelector('.temp')

const APP_ID = 'e417df62e04d3b1b111abeab19cea714'
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather'

searchButton.onclick =  async () => {
    try {
        const response = await  fetch(`${BASE_URL}?appid=${APP_ID}&q=${searchInput.value}&units=metric`)
        const data = await response.json()
        city.innerHTML = data.name || 'City is not find'
        temp.innerHTML = `
         <span>${data.main?.temp ? Math.round(data.main?.temp) + '&deg;C' : 'Not correct name'}</span>
         <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="">
    `
    } catch (e) {
        console.log(e)
    }
}







// optional chaining - опциональная цепочка
// ?.
// const address = {
//     id: 123,
//     street: {
//         name: "Ibraimova",
//         number: 103
//     }
// }



