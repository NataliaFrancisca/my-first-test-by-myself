import React, {useEffect, useState} from "react";

function App() {
  
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [city, setCity] = useState();

  const [showMessage, setShowMessage] = useState(false);

  const onSetName = (value) => setName(value);
  const onSetAge = (value) => setAge(value);
  const onSetCity = (value) => setCity(value);

  const submitForm = (e) => {
    e.preventDefault();
    validateInputs();
  }

  const validateInputs = () => {
    const validateName = !name || name.length < 2 ? false : true;
    const validateAge = !age || (age < 0 || age > 200) ? false : true;
    const validateCity = !city || city.length < 2 ? false : true;

    if(validateName && validateAge && validateCity){
      setShowMessage(true);
    }else{
      setShowMessage(false);
    }
  }

  useEffect(() => {
    validateInputs();
  },[name, age, city])
  
  return (
    <div className="App">
      <form onSubmit={submitForm}>
        <legend>Create Account</legend>

          {!showMessage && <p>You need to fill all the inputs</p>}

          <label>Name:
            <input type="text" name="name" placeholder="type your name"
              onChange={(event) => onSetName(event.target.value)}
            />
          </label>

          <label>Age:
            <input type="number" name="age" placeholder="type your age"
              onChange={(event) => onSetAge(event.target.value)}
            />
          </label>

          <label>City:
            <input type="text" name="city" placeholder="type your city"
              onChange={(event) => onSetCity(event.target.value)}
            />
          </label>

          <button type="submit">Create</button>
      </form>

      {showMessage && 
        <article>
          <h2>Olá, <span>{name}</span></h2>
          <p>Você tem <span>{age}</span> anos e mora em <span>{city}</span></p>
        </article>
      }
    </div>
  );
}

export default App;
