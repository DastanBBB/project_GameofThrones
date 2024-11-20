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
    }, 3000);
};
switchTabAutomatically();



// -----CONVERTER-------
const usdInput = document.querySelector('#usd')
const somInput = document.querySelector('#som')
const eurInput = document.querySelector('#eur')

const converter = (element, targetElements) => {
    element.oninput = () => {
        const request = new XMLHttpRequest()
    request.open('GET', '../data/converter.json')
    request.setRequestHeader('Content-type', 'application/json')
    request.send()

    request.onload = () => {
        const data = JSON.parse(request.response)

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
            })
        }
    }
}

converter(somInput, [usdInput, eurInput])
converter(usdInput, [somInput, eurInput])
converter(eurInput, [somInput, usdInput])


//     const request = new XMLHttpRequest()
//     request.open('GET', '../data/converter.json')
//     request.setRequestHeader('Content-type', 'application/json')
//     request.send()
//
//     request.onload = () => {
//         const data = JSON.parse(request.response)
//
//     }
// }
// somInput.oninput = () => {
//     const request = new XMLHttpRequest()
//     request.open('GET', '../data/converter.json')
//     request.setRequestHeader('Content-type', 'application/json')
//     request.send()
//
//     request.onload = () => {
//         const data = JSON.parse(request.response)
//         usdInput.value = (somInput.value / data.usd).toFixed(2)
//     }
// }
//
// usdInput.oninput = () => {
//     const request = new XMLHttpRequest()
//     request.open('GET', '../data/converter.json')
//     request.setRequestHeader('Content-type', 'application/json')
//     request.send()
//
//     request.onload = () => {
//         const data = JSON.parse(request.response)
//         somInput.value = (usdInput.value * data.usd).toFixed(2)
//     }
// }
// DRY - dont repeat yourself
// KISS - keep it super simple, stupid


// ----CARD SWITCHER-----
const nextButton = document.querySelector('#btn-next')
const prevButton = document.querySelector('#btn-prev')
const cardBlock = document.querySelector('.card')
const max_index = 200;
let cardIndex = 1;

// применяю принцип DRY and KISS

const loadCard = (index) => {
    fetch(` https://jsonplaceholder.typicode.com/todos/${cardIndex}`)
        .then((response) => response.json())
        .then((data) => {
            cardBlock.innerHTML = `
                <p>${data.title}</p>
                <p>${data.completed}</p>
                <span>${data.id}</span>
            `
        })
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


// ------fetch-запрос на 'https://jsonplaceholder.typicode.com/posts'------
fetch(`https://jsonplaceholder.typicode.com/posts`)
    .then((response) => response.json())
    .then((data) => {
        console.log('Posts', data);
    })