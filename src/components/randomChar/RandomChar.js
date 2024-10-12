import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import {useState,useEffect} from 'react';
import useMarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';

const RandomChar = (props) => {
const [char,setChar] = useState(null);
const {loading,error,getCharacter} = useMarvelServices();
  useEffect(()=>{
    updateModal();
    const timerId = setInterval(updateModal,60000);
    return ()=>{
        clearInterval(timerId);
    }
  },[])
    const onCharLoaded = (char) => {
        setChar(char);
    }

 const updateModal = () => {
    const id = Math.floor(Math.random()*(1011400-1011000)+1011000);
    getCharacter(id)
    .then(onCharLoaded)
 }
 const spinner=  loading ? <Spinner/> : null;
 const content = !(loading||error||!char) ? <View char={char}/>:null;
 
        return (
            <div className="randomchar">
                 {spinner}
                 {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button onClick={updateModal} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
    

const View = ({char}) => {
    const {name,description,thumbnail,homepage,wiki} = char
    return (
                <div className="randomchar__block">
                    <img src={thumbnail} alt="Random character" className="randomchar__img"/>
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">
                            {description?(description.length > 150?description.slice(0,150) + '...' :description): 'Нет базы данных для данного персонажа' }
                        </p>
                        <div className="randomchar__btns">
                            <a href={homepage}  className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
    )
}

export default RandomChar;