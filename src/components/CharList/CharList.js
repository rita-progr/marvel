import {useState,useRef,useEffect, useMemo } from "react";
import { CSSTransition,TransitionGroup } from 'react-transition-group';
import UseMarvelServices from "../../services/MarvelServices";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import "./charList.scss";
const setContent = (process,Component,newItemLoading) => {
  switch (process){
    case 'waiting':
      return  <Spinner />;
    case 'loading':
      return newItemLoading ?<Component/> : <Spinner /> ;
    case 'confirmed':
      return <Component />;
    case 'error':
      return <ErrorMessage/>;
    default: 
      throw new Error('Unexpected process state')
    
  }
}
const CharList = (props) => {
  const [charList,setCharList] = useState([])
  const [offset,setOffset] = useState(210)
  const [newItemLoading,setNewItemLoading] = useState(false)
  const [charEnded,setCharEnded] = useState(false)
  const {getAllCharacters,process,setProcess}= UseMarvelServices();

  useEffect(()=>{
    onRequest(offset,true)
  },[])

   const onRequest = (offset,initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
      getAllCharacters(offset)
      .then(onCharListLoaded)
      .then(()=>setProcess('confirmed'))
  };

  const onCharListLoaded = async(newCharList) => {
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
  itemRefs.current.forEach(el=>el?.classList.remove('char__item_selected'));
  itemRefs.current[id].classList.add('char__item_selected');
  itemRefs.current[id].focus();
 }
  function renderItems(arr) {
    const items = arr.map((item, i) => {
      let imgStyle = { 'objectFit': "cover" };
      if (
        item.thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ) {
        imgStyle = { objectFit: "unset" };
      }

      return (
        <CSSTransition
          key={item.id}
          timeout={500}
          classNames="char__item"
        >
      <li
          className="char__item"
          tabIndex={0}
          key={item.id}
          ref = {el=>itemRefs.current[i]=el}
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
        </CSSTransition>
        
      );
    });

    return <ul className="char__grid">
      <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
    </ul>;
   
  }
  const elements = useMemo(()=>{
    return setContent(process,()=>renderItems(charList),newItemLoading);
  },[process])
    return (
      <div className="char__list">
        {elements}
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
