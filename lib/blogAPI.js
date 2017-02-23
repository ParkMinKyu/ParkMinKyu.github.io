if(document.URL.indexOf('https') != 0){
  location.href = document.URL.replace('http','https');
}

function searchTags(tagName){
  location.href="/tagsearch?tagName="+encodeURI(tagName);
}

function searchCategory(categoryName){
  location.href="/category?categoryName="+encodeURI(categoryName);
}
