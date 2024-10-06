import { Component } from "react";

import MarvelServices from "../../services/MarvelServices";
import Spinner from "../spinner/Spinner";
import "./charList.scss";

class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    offset: 210, // Start with 0 or any other initial offset
    newItemLoading: false,
    charEnded: false,
  };
  marvelServices = new MarvelServices();

  componentDidMount() {
    this.onRequest();
  }
  onRequest = (offset) => {
    this.onCharListLoading();
    this.marvelServices
      .getAllCharacters(offset)
      .then(this.onCharListLoaded)
      .catch(this.onError);
  };

  onCharListLoading = () => {
    this.setState({
      newItemLoading: true,
    });
  };
  onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }
    this.setState(({ charList, offset }) => ({
      charList: [...charList, ...newCharList],
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
      charEnded: ended,
    }));
  };

 itemRefs = [];
 setRef = (ref) => {
  this.itemRefs.push(ref);
 }
 onFocusItem = (id) => {
  this.itemRefs.forEach(el=>el.classList.remove('char__item_selected'));
  this.itemRefs[id].classList.add('char__item_selected');
  this.itemRefs[id].focus();
 }
  renderItems(arr) {
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
          ref = {this.setRef}
          onClick={() => {
            this.props.onCharSelected(item.id);
            this.onFocusItem(i);
          }}
          onKeyPress = {(e)=>{
           if(e.key === ' ' || e.key === 'Enter'){
            this.props.onCharSelected(item.id);
            this.onFocusItem(i);
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

  render() {
    const { charList, loading, newItemLoading, charEnded } = this.state;

    const items = this.renderItems(charList);

    const spinner = loading ? <Spinner /> : null;
    const content = !loading ? items : null;

    return (
      <div className="char__list">
        {spinner}
        {content}
        <button
          className="button button__main button__long"
          disabled={newItemLoading}
          onClick={() => this.onRequest(this.state.offset)}
          style={{ display: charEnded ? "none" : "block" }}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
