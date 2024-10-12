import "./CharInfo.scss";
import {useState,useEffect} from "react";
import useMarvelServices from "../../services/MarvelServices";
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from "../spinner/Spinner";
import Skeleton from '../skeleton/Skeleton';
import PropTypes from "prop-types";
const CharInfo = (props) => {
  const [char,setChar] = useState(null);
  const {getCharacter,error,loading,clearError} = useMarvelServices();
  useEffect(() => {
    updateChar()
}, [props.charId])

const updateChar =  () => {
    const { charId } = props;
    if (!charId) {
      return;
    }
    clearError();
      getCharacter(charId)
      .then(onCharLoaded);
  }

  const onCharLoaded = (char) =>{
    setChar(char);
  }


    const skeleton = loading || char||error? null : <Skeleton />;
    const errormessage = error?<ErrorMessage/>:null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading ||error|| !char) ? <View char={char} /> : null;
  
    return (
      <div className="char__info">
        {skeleton}
        {content}
        {spinner}
        {errormessage}
      </div>
    );
  }

const View = ({ char }) => {
    const {name,description,thumbnail,homepage,wiki,comics} = char
  return (
    <>
      <div className="char__basics">
          <img src={thumbnail} alt={name} />
          <div>
            <div className="char__info-name">{name}</div>
            <div className="char__btns">
              <a href={homepage} className="button button__main">
                <div className="inner">homepage</div>
              </a>
              <a href={wiki} className="button button__secondary">
                <div className="inner">Wiki</div>
              </a>
            </div>
          </div>
        </div>
        <div className="char__descr">{description}</div>
        <div className="char__comics">Comics:</div>
        <ul className="char__comics-list">
        {comics.length > 0 ? null : 'There is no comics with this character'}
            {comics.map((item,i)=>{
                if(i>9)return;
                return(
                    <li key = {i} className="char__comics-item">
                    {item.name}
                  </li>
                );
            })}
        </ul>
    </>
  );
};
CharInfo.propTypes = {
  charId: PropTypes.number
}
export default CharInfo;

