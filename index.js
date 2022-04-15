
const movie = document.getElementById("movie")
const searchbtn = document.getElementById("searchBtn")
const watchListbtn = document.getElementById("watchlist_btn")

function render(bool){
    if (!bool)
    {
        movie.innerHTML=`<i class="fa fa-film fa-5x notAvailabe" style="margin-top: 350px;"></i><span class="notAvailabe">Start Exploring<span>`
    }
    else
    {
        movie.innerHTML=``
    }
}

render(false)




searchbtn.addEventListener("click",function(e) {
        e.preventDefault()
        let title = document.getElementById("searchInput");
//      `http://www.omdbapi.com/?t=${title}&apikey=71a26026`
//      http://www.omdbapi.com/?t=Blade+Runner&apikey=71a26026"
        fetch(`https://www.omdbapi.com/?s=${title.value}&apikey=71a26026`)
            .then(res => res.json())
            .then(data => {
                if(data.Response=="True")
                {
                    render(true);
                    data.Search.map(film => {
                        fetch(`https://www.omdbapi.com/?apikey=90314c2c&i=${film.imdbID}`)
                        .then(res => res.json())
                        .then(data => {

                    movie.innerHTML+=`<div class="row slot" style="margin-top:100px">
                                    <div class="col-sm-4"><img src="${data.Poster}" class="poster" /></div>
                                    <div class="col-sm-8 movie_content">
                                        <div class="top_part">
                                            <span class="title_slot">${data.Title}</span>
                                            <span class="rating_start_slot">⭐</span>                                            
                                            <span class="rating_slot">${data.imdbRating}</span>
                                        </div>
                                    
                                        <div class="middle_part" style="margin-top:15px">
                                        <span class="runtime_slot">${data.Runtime}</span>
                                        <span class="genre_slot">${data.Genre}</span>                                            
                                        <span onclick="saveItem('${film.imdbID}')" id="watchlist_btn" class="watchlist_btn" style="cursor:pointer" ><i class="bi bi-plus-circle-fill" style="margin-right:10px;color:white;font-size:16px" ></i>Watchlist</span>
                                        </div>

                                        <div class="bottom_part" style="margin-top:15px">
                                            ${data.Plot}
                                        </div>                                        
                                    </div>
                                    <div>

                                    <br>`
                        })
                    })
                }
                else{
                    movie.innerHTML=`<span class="notAvailabe"  style="margin-top: 350px;">Unable to find what you're looking</span> <span class="notAvailabe">for. Please try another search</span>`
                }
            })
            .catch(err => {
                movie.innerHTML=`<span class="notAvailabe"  style="margin-top: 350px;">Unable to find what you're looking for. Please try another search</span>`
            })

})

function saveItem(filmID)
{
    let existingList = sessionStorage.getItem("movieIDList")
    let currentList = []
    if(existingList != null)
    {
        // alert(JSON.parse(existingList).indexOf(filmID))
        // alert(JSON.parse(existingList))
        if(JSON.parse(existingList).indexOf(filmID)==-1)
        {

            currentList = JSON.parse(existingList)
            currentList.push(filmID)
//            alert(currentList)
            sessionStorage.setItem('movieIDList',JSON.stringify(currentList))
        }
    }
    else
    {
        existingList = []
        existingList.push(filmID);
        sessionStorage.setItem('movieIDList',JSON.stringify(existingList))
    }

//     let itemAdded = sessionStorage.setItem("lastname", "Smith");
//     let existingList = JSON.parse(localStorage.getItem("listOfMovies"))
// //    alert("HI")
//     alert(existingList)
//     if(!existingList.find(element => element ==filmID))
//     {
//         existingList.push(filmID);
//         localStorage.setItem("listOfMovies",JSON.stringify(existingList))
//         alert("HI2")
//     }
}





// drawCardBtn.addEventListener("click", () => {
//     fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
//         .then(res => res.json())
//         .then(data => {
//             remainingText.textContent = `Remaining cards: ${data.remaining}`
//             cardsContainer.children[0].innerHTML = `
//                 <img src=${data.cards[0].image} class="card" />
//             `
//             cardsContainer.children[1].innerHTML = `
//                 <img src=${data.cards[1].image} class="card" />
//             `
//             const winnerText = determineCardWinner(data.cards[0], data.cards[1])
//             header.textContent = winnerText
            
//             if (data.remaining === 0) {
//                 drawCardBtn.disabled = true
//                 if (computerScore > myScore) {
//                     // display "The computer won the game!"
//                     header.textContent = "The computer won the game!"
//                 } else if (myScore > computerScore) {
//                     // display "You won the game!"
//                     header.textContent = "You won the game!"
//                 } else {
//                     // display "It's a tie game!"
//                     header.textContent = "It's a tie game!"
//                 }
//             }
//         })
// })

// function determineCardWinner(card1, card2) {
//     const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
//     "10", "JACK", "QUEEN", "KING", "ACE"]
//     const card1ValueIndex = valueOptions.indexOf(card1.value)
//     const card2ValueIndex = valueOptions.indexOf(card2.value)
    
//     if (card1ValueIndex > card2ValueIndex) {
//         computerScore++
//         computerScoreEl.textContent = `Computer score: ${computerScore}`
//         return "Computer wins!"
//     } else if (card1ValueIndex < card2ValueIndex) {
//         myScore++
//         myScoreEl.textContent = `My score: ${myScore}`
//         return "You win!"
//     } else {
//         return "War!"
//     }
// }

