import {useState, useEffect} from 'react';

const UseForm = initalState => {
  const [stateForm, setstateForm] = useState({...initalState, e: null});

  useEffect(() => {
    // console.log('form ha cambiado '+stateForm.buscador)
  }, [stateForm]);

  const handleInputChange = e => {
    e.preventDefault();
    setstateForm({
      ...stateForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = e => {
    setstateForm(e);
  };

  return {
    stateForm,
    handleInputChange,
    handleReset,
  };
};

export default UseForm;
