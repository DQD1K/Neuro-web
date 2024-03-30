import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Project</h1>
      <div className='main_page'>
        <div className='file-import'>Переместите ваш файл</div>
        <div className='nav'>
          <ul>
            <p>Выберите функцию активации</p>
            <li>
              SIGM(x)
            </li>
            <li>
              TANH(x)
            </li>
            <li>
              RELU(x)
            </li>

          </ul>
        </div>
        <div className='nav'>
          <ul>
            <p>Выберете скорость итерации</p>
            <li>
              0.5x
            </li>
            <li>
              1x
            </li>
            <li>
              5x
            </li>
            <li>
              10x
            </li>
            <li>
              100x
            </li>
          </ul>
          </div>

       <div className='learning-speed'>
        <p>Введите скорость обучения</p>
        <input></input>
        <button typeof='submit'>submit</button>
        </div> 

      <div className='start-stop'>
        <button>Провести одну итерацию</button>
        <button>Рандомизировать весы</button>
        <button>Работает ли</button>
      </div>

      <div className='neurons'>
        <p>Колличество слоев</p>
        <button>+</button>
        <button>-</button>

        <p>Колличество нейронов в слоях</p>
        <button>+</button>
        <button>-</button>

        <div className='display'>display with neurons</div>
      </div>
    
      <div className='console'>
        консоль
      </div>

      </div>

    </div>
  );
}

export default App;
