const baseURL = "http://localhost:3000"
const blackCardsURL =  `${baseURL}/black_cards`

const $cardstack = document.querySelector('.cardstack')
const $selectedCard = document.querySelector('#selected-card-display')
const $blackCardButton = document.querySelector('#black-card-button')
const $blackCardText = document.querySelector('#black-card-text')
const $allCards = document.querySelector('.card')

$blackCardButton.addEventListener('click', fetchBlackCards)

function fetchBlackCards(event){
    fetch(blackCardsURL)
        .then(response => response.json())
        .then(blackCards => randomBlackCard(blackCards))
}

function randomBlackCard(blackCardsArray){
    const randomCardObject = blackCardsArray[Math.floor(Math.random() * blackCardsArray.length)];
    $blackCardText.innerText = randomCardObject.text
}

$cardstack.addEventListener('click', showCard)

function showCard(event){
    
    const $clickedCard = event.target.parentElement.parentElement
    const songName = event.target.innerText
    const $card1 = document.querySelector('#card-1')
    const $card2 = document.querySelector('#card-2')
    const $card3 = document.querySelector('#card-3')
    const $card4 = document.querySelector('#card-4')
    const $card5 = document.querySelector('#card-5')

    if ($clickedCard === $card1) {
        hiddenCardCheck()
        $clickedCard.classList.toggle('hidden')
        removeHiddenClass($clickedCard)
        selectedCardInfo(songName)
    } 
    if ($clickedCard === $card2) {
        hiddenCardCheck()
        $clickedCard.classList.toggle('hidden')
        removeHiddenClass($clickedCard)
        selectedCardInfo(songName)
    } 
    if ($clickedCard === $card3) {
        hiddenCardCheck()
        $clickedCard.classList.toggle('hidden')
        removeHiddenClass($clickedCard)
        selectedCardInfo(songName)
    } 
    if ($clickedCard === $card4) {
        hiddenCardCheck()
        $clickedCard.classList.toggle('hidden')
        removeHiddenClass($clickedCard)
        selectedCardInfo(songName)
    } 
    if ($clickedCard === $card5) {
        hiddenCardCheck()
        $clickedCard.classList.toggle('hidden')
        removeHiddenClass($clickedCard)
        selectedCardInfo(songName)
    } 
}

function selectedCardInfo(songName){
    $selectedCard.innerHTML = '';
    $selectedCard.classList.add('light')
    $selectedCard.classList.add('card')

    const $textContainer = document.createElement('div')
    $textContainer.id = 'selected-card-text-container'

    const $pTag = document.createElement('p')
    $pTag.innerText = songName
    $pTag.classList.add('text')
    $pTag.id = 'selected-card'

    $textContainer.append($pTag)

    const $submitCardButton = document.createElement('button')
    $submitCardButton.className = 'button';
    $submitCardButton.textContent = 'Submit Card Choice'

    $selectedCard.append($textContainer, $submitCardButton);
}

function hiddenCardCheck(){
    if ($selectedCard.classList.contains('hidden')) {
        $selectedCard.classList.toggle('hidden')
    }
}

function removeHiddenClass(clickedCard){

    const $card1 = document.querySelector('#card-1')
    const $card2 = document.querySelector('#card-2')
    const $card3 = document.querySelector('#card-3')
    const $card4 = document.querySelector('#card-4')
    const $card5 = document.querySelector('#card-5')

    if(clickedCard === $card1) {
        if ($card2.classList.contains('hidden')) {
            $card2.classList.toggle('hidden')
        }
        if ($card3.classList.contains('hidden')) {
            $card3.classList.toggle('hidden')
        }
        if ($card4.classList.contains('hidden')) {
            $card4.classList.toggle('hidden')
        }
        if ($card5.classList.contains('hidden')) {
            $card5.classList.toggle('hidden')
        }
    }
    if(clickedCard === $card2) {
        if ($card1.classList.contains('hidden')) {
            $card1.classList.toggle('hidden')
        }
        if ($card3.classList.contains('hidden')) {
            $card3.classList.toggle('hidden')
        }
        if ($card4.classList.contains('hidden')) {
            $card4.classList.toggle('hidden')
        }
        if ($card5.classList.contains('hidden')) {
            $card5.classList.toggle('hidden')
        }
    }
    if(clickedCard === $card3) {
        if ($card1.classList.contains('hidden')) {
            $card1.classList.toggle('hidden')
        }
        if ($card2.classList.contains('hidden')) {
            $card2.classList.toggle('hidden')
        }
        if ($card4.classList.contains('hidden')) {
            $card4.classList.toggle('hidden')
        }
        if ($card5.classList.contains('hidden')) {
            $card5.classList.toggle('hidden')
        }
    }
    if(clickedCard === $card4) {
        if ($card1.classList.contains('hidden')) {
            $card1.classList.toggle('hidden')
        }
        if ($card2.classList.contains('hidden')) {
            $card2.classList.toggle('hidden')
        }
        if ($card3.classList.contains('hidden')) {
            $card3.classList.toggle('hidden')
        }
        if ($card5.classList.contains('hidden')) {
            $card5.classList.toggle('hidden')
        }
    }
    if(clickedCard === $card5) {
        if ($card1.classList.contains('hidden')) {
            $card1.classList.toggle('hidden')
        }
        if ($card2.classList.contains('hidden')) {
            $card2.classList.toggle('hidden')
        }
        if ($card3.classList.contains('hidden')) {
            $card3.classList.toggle('hidden')
        }
        if ($card4.classList.contains('hidden')) {
            $card4.classList.toggle('hidden')
        }
    }
}