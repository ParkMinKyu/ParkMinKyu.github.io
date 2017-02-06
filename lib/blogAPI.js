function searchTags(tagName){
  location.href="/tagsearch?tagName="+encodeURI(tagName);
}

function searchCategory(categoryName){
  location.href="/category?categoryName="+encodeURI(categoryName);
}
