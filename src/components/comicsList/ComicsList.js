import './comicsList.scss';
import Spinner from "../spinner/Spinner";
import useMarvelServices from '../../services/MarvelServices';
import {useState,useEffect,useRef } from 'react';


const ComicsList = (props) => {
const {loading,error,getAllComics,clearError} = useMarvelServices();
const [comicsList,setComicsList] = useState([]);
const [offset,setOffset] = useState(210);
const [charEnded,setCharEnded] = useState(false);
const [newItemLoading,setNewItemLoading] = useState(false)
useEffect(()=>{
onRequest(offset,true)
},[])
const onRequest = (offset,initial) => {
    initial?setNewItemLoading(false) : setNewItemLoading(true);
    getAllComics(offset)
    .then(onComicsListLoaded)
}
const onComicsListLoaded = (newComicsList) => {
    let ended = false;
    if(newComicsList.length<9){
        ended = true;
    }
    setComicsList([...comicsList,...newComicsList]);
    setNewItemLoading(false);
    setOffset(offset=>offset+8);
    setCharEnded(ended);
};
const itemsRef = useRef([]);

const onFocusItem = (id) => {
    itemsRef.current.forEach(el=>el.classList.remove('char__item_selected'));
    itemsRef.current[id].classList.add('char__item_selected');
    itemsRef.current[id].focus();
}
function renderItems(arr){
    const items = arr.map((item,i)=>{
        let imgStyle = { objectFit: "cover" };
        if (
          item.thumbnail ===
          "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
        )
        {
            imgStyle = { objectFit: "unset" }; 
        }
        return (
            <li className="comics__item"
            tabIndex={0}
            key = {item.id}
            ref = {(el)=>itemsRef.current[i]=el}
            onClick = {()=>{
                props.onComicSelected(item.id);
                onFocusItem(i);
            }}
            onKeyPress = {(e)=>{
                if(e.key === ' ' || e.key === 'Enter'){
                 props.onComicSelected(item.id);
                 onFocusItem(i);
                } 
               }}
               >
                    <a href="#">
                        <img src={item.thumbnail} alt={item.title} style={imgStyle} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </a>
                </li>
        )
    })
    return  <ul className="comics__grid">{items}</ul>
}
const items = renderItems(comicsList);

const spinner = loading ? <Spinner /> : null;
    return (
        <div className="comics__list">
           {items}
            {spinner}
            <button className="button button__main button__long"
              disabled={newItemLoading}
              onClick={() => onRequest(offset)}
              style={{ display: charEnded ? "none" : "block" }}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;