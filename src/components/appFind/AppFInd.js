import './appFind.scss';
import {useState} from 'react';
import { ErrorMessage, Field, Formik,Form} from 'formik';
import { Link } from 'react-router-dom';
import UseMarvelServices from '../../services/MarvelServices';
import * as Yup from "yup";
const AppFind = () => {
const [char, setChar] = useState(null);
const {error,loading,getName,clearError}= UseMarvelServices();


  const onCharListLoaded = (char) => {
    setChar(char)
  }
  const updateChar = (name) => {
    clearError();
      getName(name)
      .then(onCharListLoaded)
  };
  const results = !char ? null : char.length>0 ?
            <div className = "char__search-wrapper">
            <div className="char__search-success">There is! Visit {char[0].name} page?</div>
            <Link to={`/characters/${char[0].id}`} className="button button__secondary">
                            <div className="inner">To page</div>
                        </Link>
            </div> : <div className="char__search-error">
                        The character was not found. Check the name and try again
                    </div>;
return (
    <div className="char__search-form">
    <Formik 
    initialValues={{
        name:""
    }}
    validationSchema={Yup.object({
        name: Yup.string()
        .required('Обязательное поле')
    })}
    onSubmit = { ({name}) => {
        updateChar(name);
    }}>
        <Form >
            <label className='char__search-label' htmlFor="name">Or find a character by name:</label>
            <div className="char__search-wrapper">
            <Field 
            id = "name"
            name ="name"
            type = "name" />
           
            <button 
                type='submit' 
                className="button button__main"
                disabled = {loading}>
               
                <div className="inner">find</div>
            </button>
            </div>
            <ErrorMessage className="char__search-error" name="charName" component="div" /> 
        </Form>
    </Formik>
    {results}
    </div>
)
}
export default AppFind;