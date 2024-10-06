class MarvelServices{
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=161750a6ab8713c7f7bc78e78a773a58';
    _baseOffset = 210;
getResource = async (url) => {
    let res = await fetch(url);
    if(!res.ok){
        throw new Error(`${res.status}`);
    }
    return await res.json();

}
getAllCharacters = async (offset = this._baseOffset) => {
    const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
    return res.data.results.map(this._transformChar);
}

getCharacter = async (id) => {
   const res = await this.getResource(`${this._apiBase}characters/${id}?&${this._apiKey}`);
   return this._transformChar(res.data.results[0]);
}
_transformChar = (char) => {
    return {
        id: char.id,
        name: char.name,
        description:char.description,
        thumbnail:`${char.thumbnail.path}.${char.thumbnail.extension}`,
        homepage:char.urls[0].url,
        wiki:char.urls[1].url,
        comics: char.comics.items
    }
}
}
export default MarvelServices;
