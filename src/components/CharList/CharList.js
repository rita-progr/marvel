import {useState,useRef,useEffect } from "react";

import useMarvelServices from "../../services/MarvelServices";
import Spinner from "../spinner/Spinner";
import "./charList.scss";

const CharList = (props) => {
  const [charList,setCharList] = useState([])
  const [offset,setOffset] = useState(210)
  const [newItemLoading,setNewItemLoading] = useState(false)
  const [charEnded,setCharEnded] = useState(false)

  const {error,loading,getAllCharacters}= useMarvelServices();

  useEffect(()=>{
    onRequest(offset,true)
  },[])

   const onRequest = (offset,initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
      getAllCharacters(offset)
      .then(onCharListLoaded)
  };

  const onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }
    setCharList(charList => [...charList, ...newCharList]);
    setNewItemLoading(false);
    setOffset(offset=>offset+9)
    setCharEnded(ended)
  };

 const itemRefs = useRef([]);

 const onFocusItem = (id) => {
  itemRefs.current.forEach(el=>el.classList.remove('char__item_selected'));
  itemRefs.current[id].classList.add('char__item_selected');
  itemRefs.current[id].focus();
 }
  function renderItems(arr) {
    const items = arr.map((item, i) => {
      let imgStyle = { objectFit: "cover" };
      if (
        item.thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ) {
        imgStyle = { objectFit: "unset" };
      }

      return (
        <li
          className="char__item"
          tabIndex={0}
          key={item.id}
          ref = {(el)=>itemRefs.current[i]=el}
          onClick={() => {
            props.onCharSelected(item.id);
            onFocusItem(i);
          }}
          onKeyPress = {(e)=>{
           if(e.key === ' ' || e.key === 'Enter'){
            props.onCharSelected(item.id);
            onFocusItem(i);
           } 
          }}
        >
          <img src={item.thumbnail} alt={item.name} style={imgStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });

    return <ul className="char__grid">{items}</ul>;
  }
    const items = renderItems(charList);

    const spinner = loading ? <Spinner /> : null;
    const content = !loading ? items : null;

    return (
      <div className="char__list">
        {spinner}
        {content}
        <button
          className="button button__main button__long"
          disabled={newItemLoading}
          onClick={() => onRequest(offset)}
          style={{ display: charEnded ? "none" : "block" }}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }


export default CharList;
