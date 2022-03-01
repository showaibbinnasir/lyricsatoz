
const searchbtn = document.getElementById('search-btn');
searchbtn.addEventListener('click', ()=>{
    document.getElementById('lyrics-section').style.display = "block";
    document.getElementById("lyrics").innerHTML = "";
    document.getElementById('search_result').innerHTML =" ";
    lyrics();
    
})

function lyrics(){
    const song = document.getElementById('search-box').value;
    if(song == ""){
        alert("please enter song name!")
    }
    else{
        fetch(`https://api.lyrics.ovh/suggest/${song}`)
        .then(res => res.json())
        .then(data => {
            fetchdata = data;
            for(let i=0; i<data.data.length; i++){
                const title = data.data[i].title;
                const artist = data.data[i].artist.name;

                document.getElementById('search_result').innerHTML += `<div>
                                                                        <h1> ${title} </h1>
                                                                        <h5> ${artist} </h5>
                                                                        <a href="#lyrics"> <button style="background-image: linear-gradient(75deg, #ffad01, #fb7800); color: white; border-radius: 10px" onClick="getLyrics(${i})">See lyrics</button> </a>
                </div>`;
                if(i==7){
                    break;
                }
            }
            
            
            
        })
        .catch(res => {
            alert("lyrics not found");
        })
    }
    
}


function getLyrics(index){
    document.getElementById("lyrics").innerHTML = "";
    document.getElementById('search_result').innerHTML = "";
    const title = fetchdata.data[index].title;
    const artist = fetchdata.data[index].artist.name;
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(res => res.json())
    .then(data => {
        const lyrics = data.lyrics;
        if(lyrics == undefined){
            alert("lyrics not found");
        }
        document.getElementById("lyrics").innerHTML = `<h1> ${title} </h1>
        <h5> ${artist} </h5>
        <pre>${lyrics}</pre>`;
    })
    .catch(res => {
        document.getElementById("lyrics").innerHTML = `<p> lyrics not found </p>`
    })
}
