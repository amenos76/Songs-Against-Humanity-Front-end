const $card1Title = document.querySelector('#song-title-1')
const $card2Title = document.querySelector('#song-title-2')
const $card3Title = document.querySelector('#song-title-3')
const $card4Title = document.querySelector('#song-title-4')
const $card5Title = document.querySelector('#song-title-5')
// const $cardContainer = document.querySelector('.card-container')
const $card1 = document.querySelector('#card-1')
const $card2 = document.querySelector('#card-2')
const $card3 = document.querySelector('#card-3')
const $card4 = document.querySelector('#card-4')
const $card5 = document.querySelector('#card-5')


const myID = config.MY_ID
const secretkey = config.SECRET_KEY


const APIController = (function() {
    
    const clientId = myID;
    const clientSecret = secretkey;

    // private methods
    const _getToken = async () => {

        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded', 
                'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });

        const data = await result.json();
        return data.access_token;
    }
    
    const _getGenres = async (token) => {

        const result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        // console.log(data.categories.items);
        return data.categories.items;
    }

    const _getPlaylistByGenre = async (token, genreId) => {

        const limit = 10;
        
        const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        return data.playlists.items;
    }

    const _getTracks = async (token, tracksEndPoint) => {

        const limit = 10;

        const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        return data.items;
    }

    const _getTrack = async (token, trackEndPoint) => {

        const result = await fetch(`${trackEndPoint}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        return data;
    }

    return {
        getToken() {
            return _getToken();
        },
        getGenres(token) {
            return _getGenres(token);
        },
        getPlaylistByGenre(token, genreId) {
            return _getPlaylistByGenre(token, genreId);
        },
        getTracks(token, tracksEndPoint) {
            return _getTracks(token, tracksEndPoint);
        },
        getTrack(token, trackEndPoint) {
            return _getTrack(token, trackEndPoint);
        }
    }
})();


// UI Module
const UIController = (function() {

    //object to hold references to html selectors
    const DOMElements = {
        selectGenre: '#select_genre',
        selectPlaylist: '#select_playlist',
        buttonSubmit: '#btn_submit',
        divSongDetail: '#song-detail',
        hfToken: '#hidden_token',
        divSonglist: '.song-list',
        divCardstack: '.cardstack'
    }

    //public methods
    return {

        //method to get input fields
        inputField() {
            return {
                genre: document.querySelector(DOMElements.selectGenre),
                playlist: document.querySelector(DOMElements.selectPlaylist),
                tracks: document.querySelector(DOMElements.divSonglist),
                // cardTracks: document.querySelector(DOMElements.divSonglist),
                submit: document.querySelector(DOMElements.buttonSubmit),
                songDetail: document.querySelector(DOMElements.divSongDetail),
                cardstack: document.querySelector(DOMElements.divCardstack)
            }
        },

        // need methods to create select list option
        createGenre(text, value) {
            const html = `<option value="${value}">${text}</option>`;
            document.querySelector(DOMElements.selectGenre).insertAdjacentHTML('beforeend', html);
        }, 

        createPlaylist(text, value) {
            const html = `<option value="${value}">${text}</option>`;
            document.querySelector(DOMElements.selectPlaylist).insertAdjacentHTML('beforeend', html);
        },

        // need method to create a track list group item 
        createTrack(id, name) {
            const html = `<a href="#" class="list-group-item list-group-item-action list-group-item-light" id="${id}">${name}</a>`;
            document.querySelector(DOMElements.divSonglist).insertAdjacentHTML('beforeend', html);

            // const html = `<a href="#" class="list-group-item list-group-item-action list-group-item-light" id="${id}">${name}</a>`;
            // document.querySelector(DOMElements.divCardstack).insertAdjacentHTML('beforeend', html);
            
        },

        // need method to create the song detail
        createTrackDetail(img, title, artist, trackURI) {

            const detailDiv = document.querySelector('.song-card-container');
            detailDiv.innerHTML = '';

            const html = 
            `
            <div class='song-card'>
                    <div id="album-art-container">
                        <img src='${img}'>
                    </div>
                    <ul class='song-info text menu'>
                        <li id='song-title'>${title}</li>
                        <li id='song-artist'>${artist}</li>
                    </ul>
                    <iframe id='spotify-player'
                        src="https://open.spotify.com/embed/track/${trackURI}" 
                        width="300" 
                        height="80" 
                        frameborder="0" 
                        allowtransparency="true" 
                        allow="encrypted-media">
                    </iframe>
                </div>
            `
            
            
            detailDiv.insertAdjacentHTML('beforeend', html)
        },

        resetTrackDetail() {
            this.inputField().songDetail.innerHTML = '';
        },

        resetTracks() {
            this.inputField().tracks.innerHTML = '';
            this.resetTrackDetail();
        },

        resetPlaylist() {
            this.inputField().playlist.innerHTML = '';
            this.resetTracks();
        },
        
        storeToken(value) {
            document.querySelector(DOMElements.hfToken).value = value;
        },

        getStoredToken() {
            return {
                token: document.querySelector(DOMElements.hfToken).value
            }
        }
    }

})();

const APPController = (function(UICtrl, APICtrl) {

    // get input field object ref
    const DOMInputs = UICtrl.inputField();

    // get genres on page load
    const loadGenres = async () => {
        //get the token
        const token = await APICtrl.getToken();           
        //store the token onto the page
        UICtrl.storeToken(token);
        //get the genres
        const genres = await APICtrl.getGenres(token);
        //populate our genres select element
        genres.forEach(element => UICtrl.createGenre(element.name, element.id));
    }

    // create genre change event listener
    DOMInputs.genre.addEventListener('change', async () => {
        //reset the playlist
        UICtrl.resetPlaylist();
        //get the token that's stored on the page
        const token = UICtrl.getStoredToken().token;        
        // get the genre select field
        const genreSelect = UICtrl.inputField().genre;       
        // get the genre id associated with the selected genre
        const genreId = genreSelect.options[genreSelect.selectedIndex].value;             
        // ge the playlist based on a genre
        const playlist = await APICtrl.getPlaylistByGenre(token, genreId);       
        // create a playlist list item for every playlist returned
        playlist.forEach(p => UICtrl.createPlaylist(p.name, p.tracks.href));
    });
     

    // create submit button click event listener
    DOMInputs.submit.addEventListener('click', async (e) => {
        // prevent page reset
        e.preventDefault();
        // clear tracks
        UICtrl.resetTracks();
        //get the token
        const token = UICtrl.getStoredToken().token;        
        // get the playlist field
        const playlistSelect = UICtrl.inputField().playlist;
        // get track endpoint based on the selected playlist
        const tracksEndPoint = playlistSelect.options[playlistSelect.selectedIndex].value;
        // get the list of tracks
        const tracks = await APICtrl.getTracks(token, tracksEndPoint);

        const whiteCardsExist = document.getElementsByClassName("stackcard")

        if (whiteCardsExist.length > 0) {
            removeCards()
        }
        
        songCardTitles(tracks)
        // create a track list item
        tracks.forEach(el => UICtrl.createTrack(el.track.href, el.track.name))
        
    });

    // create song selection click event listener

    document.addEventListener('click', async (e) => {
        
        const whiteCards = e.target
        if(whiteCards.classList.contains('song-list')){
            e.preventDefault();
            UICtrl.resetTrackDetail();
            // get the token
            const token = UICtrl.getStoredToken().token;
            // get the track endpoint
            const trackEndpoint = e.target.id;
            // console.log(trackEndpoint)
            //get the track object
            const track = await APICtrl.getTrack(token, trackEndpoint);
            // load the track details
            const trackURI = ((track.id).split("/")).toString()
            // console.log(trackURI)
            UICtrl.createTrackDetail(track.album.images[1].url, track.name, track.artists[0].name, trackURI);
        }
        
    })

    return {
        init() {
            console.log('App is starting');
            loadGenres();
        }
    }

})(UIController, APIController);

let counter = 1


function songCardTitles(songsArray){
    songsArray.slice(0, 5).forEach(createWhiteCards)
    counter = 1
};



function createWhiteCards(songObject){
    const $newWhiteCard = document.createElement('div')
    $newWhiteCard.classList.add('light')
    $newWhiteCard.classList.add('stackcard')
    $newWhiteCard.id = `card-${counter}`

    const $ul = document.createElement('ul')
    $ul.classList.add('text')
    $ul.classList.add('menu')

    const $li = document.createElement('li')
    $li.id = songObject.track.href
    $li.classList.add('song-list')
    $li.textContent = songObject.track.name

    counter++
    $ul.append($li)
    $newWhiteCard.append($ul)
   
    $cardstack.appendChild($newWhiteCard)
}

function removeCards(){
    const $card1 = document.getElementById('card-1')
    const $card2 = document.getElementById('card-2')
    const $card3 = document.getElementById('card-3')
    const $card4 = document.getElementById('card-4')
    const $card5 = document.getElementById('card-5')

    const $selectedCard = document.querySelector('#selected-card-display')
    $selectedCard.classList.toggle('hidden')

    $card1.parentNode.removeChild($card1)
    $card2.parentNode.removeChild($card2)
    $card3.parentNode.removeChild($card3)
    $card4.parentNode.removeChild($card4)
    $card5.parentNode.removeChild($card5)
}

// will need to call a method to load the genres on page load
APPController.init();

