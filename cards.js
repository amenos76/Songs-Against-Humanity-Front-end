const $cardstack = document.querySelector('.cardstack')
const $selectedCard = document.querySelector('#selected-card')
// const $selectedCardText = document.querySelector('#selected-card-text')
const $card1 = document.querySelector('#card-1')
const $card2 = document.querySelector('#card-2')

$cardstack.addEventListener('click', showCard)

function showCard(event){
    
    const $clickedCard = event.target.parentElement.parentElement
    const songName = event.target.innerText

    if ($clickedCard === document.getElementById('card-1')) {
        // $selectedCard.classList.toggle('hidden')
        hiddenCardCheck()
        // $card1.classList.toggle('hidden')
        selectedCardInfo(songName)
    } 
    if ($clickedCard === document.getElementById('card-2')) {
        // $selectedCard.classList.toggle('hidden')
        hiddenCardCheck()
        // $card2.classList.toggle('hidden')
        selectedCardInfo(songName)
    } 
    if ($clickedCard === document.getElementById('card-3')) {
        // $selectedCard.classList.toggle('hidden')
        hiddenCardCheck()
        // $card2.classList.toggle('hidden')
        selectedCardInfo(songName)
    } 
    if ($clickedCard === document.getElementById('card-4')) {
        // $selectedCard.classList.toggle('hidden')
        hiddenCardCheck()
        // $card2.classList.toggle('hidden')
        selectedCardInfo(songName)
    } 
    if ($clickedCard === document.getElementById('card-5')) {
        // $selectedCard.classList.toggle('hidden')
        hiddenCardCheck()
        // $card2.classList.toggle('hidden')
        selectedCardInfo(songName)
    } 
}

function selectedCardInfo(songName){
    $selectedCard.innerHTML = '';
    $selectedCard.classList.add('light')
    $selectedCard.classList.add('card')

    const $pTag = document.createElement('p')
    $pTag.innerText = songName
    $pTag.classList.add('text')
    $pTag.id = 'selected-card'

    const $submitCardButton = document.createElement('button')
    $submitCardButton.className = 'button';
    $submitCardButton.textContent = 'Submit Card Choice'

    $selectedCard.append($pTag, $submitCardButton);
}

function hiddenCardCheck(){
    if ($selectedCard.classList.contains('hidden')) {
        $selectedCard.classList.toggle('hidden')
    }
}