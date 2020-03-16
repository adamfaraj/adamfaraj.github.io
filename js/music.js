(function() {
  const api = "https://deezerdevs-deezer.p.rapidapi.com/search?q=";
  const musicInput = document.getElementById('music-search');
  const musicSearchBtn = document.getElementById('music-search__button');
  const musicList = document.getElementsByClassName('music-list')[0];

  
  function onMusicSearch() {
    let music = musicInput.value.replace(/ /g, '+');
    musicList.innerHTML = "";

    fetch(`${api}${music}`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
      "x-rapidapi-key": "8bc0bba91cmsh1ab178c1687b8afp15f514jsn5b9aa1df4cc7"
    }
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        res.data.forEach(music => {
          let li = document.createElement('li');
          let audio = document.createElement('audio');
          let span = document.createElement('span');
          span.innerHTML = music.title;
          audio.setAttribute('controls', '');
          audio.setAttribute('src', music.preview);
          li.append(span);
          li.append(audio);
          musicList.append(li);
          musicList.scrollIntoView({behavior: "smooth"})
        });
      })
      .catch(err => {
        console.log(err);
    })
  };

  function onEnterMusicSearch(e) {
    if (e.which === 13) {
      onMusicSearch();
    }
  }

  musicSearchBtn.addEventListener('click', onMusicSearch);
  musicInput.addEventListener('keydown', onEnterMusicSearch);
})();
