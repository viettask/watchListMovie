

const movie = document.getElementById("movie")


function render(bool){
    if (!bool)
    {
        movie.innerHTML=`<span class="notAvailabe" style="font-size:18px;margin-top:350px;">Your watchlist is looking a little empty... </span>
                        <a href="index.html" style="text-decoration:none;display:block;margin-top:10px">
                        <span style="cursor:pointer;color:white;font-size:14px;"><i class="bi bi-plus-circle-fill" style="margin-right:10px;color:white;font-size:16px"></i>                              
                        Let's add some movies!</span>
                        </a>`
    }
    else
    {
        movie.innerHTML=``
    }
}

function renderList()
{
    movie.innerHTML=``
    currentList = JSON.parse(existingList);
    //    alert(currentList)
    if(currentList.length == 0)
    {
        render(false)
    }

    for (let i = 0; i < currentList.length; i++) {
        

        fetch(`https://www.omdbapi.com/?apikey=90314c2c&i=${currentList[i]}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                movie.innerHTML += `<div class="row slot" style="margin-top:100px">
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
                            <span onclick="deleteItem('${currentList[i]}')" id="watchlist_btn" class="watchlist_btn" style="cursor:pointer" ><i class="bi bi-dash-circle-fill" style="margin-right:10px;color:white;font-size:16px" ></i>Watchlist</span>
                            </div>

                            <div class="bottom_part" style="margin-top:15px">
                                ${data.Plot}
                            </div>                                        
                        </div>
                        <div>

                        <br>`
            })
    }
}


let existingList = sessionStorage.getItem("movieIDList")
let currentList = []

renderList()


function deleteItem(filmID)
{
    currentList = JSON.parse(existingList);
    currentList.splice(currentList.indexOf(filmID),1)
    sessionStorage.setItem('movieIDList',JSON.stringify(currentList))
    renderList()
    location.reload();
}



