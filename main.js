function getAllEvents(){
  fetch("http://mihaelamesteacan.com/wordpress/wp-json/wp/v2/events?_embed&categories=6")
  .then(res=>res.json())
  .then(showEvents);
}

function getEventbyCategory(categoryId){
 fetch("http://mihaelamesteacan.com/wordpress/wp-json/wp/v2/events?_embed&categories="+categoryId)
  .then(res=>res.json())
  .then(showEvents);
}

function getSingleEvent(eventId){
 fetch("http://mihaelamesteacan.com/wordpress/wp-json/wp/v2/events/"+eventId+"/?_embed")
  .then(res=>res.json())
  .then(showSingleEvent);
}

    
function getMenu(){
 fetch("http://mihaelamesteacan.com/wordpress/wp-json/wp/v2/categories?per_page=100")
    .then(res=>res.json())
    .then(showMenu);
}

function showMenu(categories){    
        let list = document.querySelector("#linkTemplate").content;
    categories.forEach(function(category){
        console.log(category.parent);
        if (category.parent == 6) {
         let clone = list.cloneNode(true);
        let parent = document.querySelector('.category-menu');
        clone.querySelector('a').textContent = category.name;
        clone.querySelector('a').setAttribute('href','index.html?categoryid='+category.id);
        parent.appendChild(clone);   
        }
    });
}

function showSingleEvent(data){
    console.log(data.title.rendered);
    document.querySelector('#single h1').textContent=data.title.rendered;
    
    document.querySelector('#single img').setAttribute('src',data._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url);
    document.querySelector('.content').innerHTML=data.content.rendered;
    document.querySelector('.price span').textContent=data.acf.price;
    document.querySelector('.Genre span').textContent=data.acf.enre;
    document.querySelector('.time span').textContent=data.acf.Time;
    document.querySelector('.doorsopen span').textContent=data.acf.doors_open;
    document.querySelector('.location span').textContent=data.acf.location;
}
 function showEvents(data){
     
     let list = document.querySelector('#list');
     let template = document.querySelector('#eventTemplate').content;
     
  data.forEach(function(theEvent){
    console.log(theEvent)
    let clone = template.cloneNode(true);
    let title = clone.querySelector("h1");
    let genre= clone.querySelector(".Genre span");
    let time= clone.querySelector(".time span");
    let doorsopen = clone.querySelector(".doorsopen span");
    let location = clone.querySelector(".location span");
    let excerpt = clone.querySelector(".excerpt");
    let price = clone.querySelector(".price span");
    let img = clone.querySelector("img");
    let link = clone.querySelector("a.read-more");

    title.textContent = theEvent.title.rendered;
excerpt.innerHTML=theEvent.excerpt.rendered.slice(theEvent.excerpt.rendered.indexOf('<'),theEvent.excerpt.rendered.lastIndexOf('<a'));theEvent.excerpt.rendered;
    price.textContent = theEvent.acf.price;
    genre.textContent = theEvent.acf.Genre;
    console.log (theEvent.acf.time);
    time.textContent = theEvent.acf.Time;
    location.textContent = theEvent.acf.location;
    doorsopen.textContent = theEvent.acf.doors_open;
    img.setAttribute("src", theEvent._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail.source_url);
      
    link.setAttribute("href", "events.html?id="+theEvent.id);
    list.appendChild(clone);
  });
}

let searchParams = new URLSearchParams(window.location.search);
let id = searchParams.get("id");
let categoryid = searchParams.get("categoryid");
//console.log(id)


getMenu();
if(id){
    getSingleEvent(id);
}
else if(categoryid){
    getEventbyCategory(categoryid);
}
else {
    getAllEvents();
}
