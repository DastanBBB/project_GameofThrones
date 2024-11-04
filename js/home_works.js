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


// -------MOVE BLOCK------
const  childBlock = document.querySelector('.child_block');
const  parentBlock = document.querySelector('.parent_block');

let  positon = 0;
const  speed = 2;

function moveBlock() {
    if (positon <= parentBlock.clientWidth - childBlock.clientWidth) {
        childBlock.style.left = `${positon}px`;
        positon += speed;
        requestAnimationFrame(moveBlock);
    }
}
moveBlock();

