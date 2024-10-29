import './comicsList.scss';
import Spinner from "../spinner/Spinner";
import useMarvelServices from '../../services/MarvelServices';
import ErrorMessage from '../errorMessage/ErrorMessage';
import {useState,useEffect,useRef } from 'react';
import { Link } from 'react-router-dom';

const setContent = (process,Component,newItemLoading) => {
    switch (process){
      case 'waiting':
        return  <Spinner />;
        break;
      case 'loading':
        return newItemLoading ?<Component/> : <Spinner /> ;
        break;
      case 'confirmed':
        return <Component />;
        break;
      case 'error':
        return <ErrorMessage/>;
        break;
      default: 
        throw new Error('Unexpected process state')
      
    }
  }
const ComicsList = () => {
const {loading,getAllComics,process,setProcess} = useMarvelServices();
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
    .then(()=>setProcess('confirmed'))
}
const onComicsListLoaded = (newComicsList) => {
    let ended = false;
    if(newComicsList.length<8){
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
                onFocusItem(i);
            }}
            onKeyPress = {(e)=>{
                if(e.key === ' ' || e.key === 'Enter'){
                 onFocusItem(i);
                } 
               }}
               >
                    <Link to ={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} style={imgStyle} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
        )
    })
    return  <ul className="comics__grid">{items}</ul>
}


    return (
        <div className="comics__list">
           {setContent(process,()=>renderItems(comicsList),newItemLoading)}
            <button className="button button__main button__long"
              disabled={newItemLoading}
              onClick={() => onRequest(offset)}
              style={{'display' : charEnded ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;