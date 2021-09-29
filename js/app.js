const submitBtn = document.getElementById('submit-btn');

submitBtn.addEventListener('click', async()=> {
    const searchInput = document.getElementById('search-input').value;
    const url = `https://api.lyrics.ovh/suggest/${searchInput}`;
    document.getElementById("div-container").innerHTML = '';
    document.getElementById('lyrics').innerHTML = '';
    if (searchInput) {
        const res = await fetch(url);
        const data = await res.json();
        displaySongs(data.data, searchInput);
        
        document.getElementById('error-container').innerHTML = '';
    }

    //manual load data
    // if (searchInput) {
    //     fetch(url)
    //     .then(res => res.json())
    //     .then(data => displaySongs(data.data, searchInput))      
    //     document.getElementById('error-container').innerHTML = '';
    // }
    else{
        const errorDiv = document.getElementById('error-container');
        errorDiv.innerHTML = `<h3>You have entered empty search</h3>`
    }
    
})

const displaySongs = (song, searchInput) => {
    const singleResult = document.getElementById("div-container");
    singleResult.className = 'search-result col-md-8 mx-auto py-4';
    song.forEach(info => {
        console.log(info)
        const title = info.title;
        const artistName = info.artist.name;
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
                <div class="col-md-9" id="info">
                         <h3 class="lyrics-name">${title}</h3>
                        <p class="author lead">Album by <span>${artistName}</span></p>
                        <audio controls>
                            <source src="${info.preview}">
                        </audio>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button class="btn btn-success" onclick="getLyrics('${artistName}', '${title}')">Get Lyrics</button>
                    </div>
        `;
        singleResult.appendChild(songDiv);
    });
    document.getElementById('search-input').value = '';

}

const getLyrics = async (artist, title) => {
    document.getElementById('lyrics').style.display = 'block';
    const artistName = artist;
    console.log({ artistName });
    const songTitle = title;
    const url = `https://api.lyrics.ovh/v1/${artistName}/${songTitle}`;
    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(data)
    //         displayLyrics(data.lyrics);

    //     })
    const res = await fetch(url);
    const data = await res.json();
    displayLyrics(data.lyrics);

}

const displayLyrics = lyrics => {
    const songLyric = document.getElementById('lyrics');
    songLyric.innerText = lyrics;
}