import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import {useState,useEffect} from 'react';
import useMarvelServices from '../../services/MarvelServices';
import setContent from '../../utils/setContent';

const RandomChar = () => {
const [char,setChar] = useState(null);
const {loading,error,getCharacter,process,setProcess} = useMarvelServices();
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
    .then(()=>setProcess('confirmed'))
 } 
        return (
            <div className="randomchar">
                 {setContent(process,View,char)}
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
    

const View = ({data}) => {
    const {name,description,thumbnail,homepage,wiki} = data
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