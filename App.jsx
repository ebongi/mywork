import React, { useState, useEffect } from 'react'; 
import './App.css';

function App() {
  const [error, setError] = useState('');
  const [userLanguage, setUserLanguage] = useState('');
  const [userColor, setUserColor] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [maxAttempts] = useState(5);
  const [results, setResults] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [displayColors, setDisplayColors] = useState({});

  const languageColors = {
    c: 'red',
    'c#': 'blue',
    'C++': 'purple',
    python: 'yellow',
    ruby: 'orange',
    java: 'teal',
    javasc: 'black',
    html: 'pink',
    pascal: 'white',
    fort: 'aqua',
    php: 'green',
  };

  const colorLanguageMap = Object.entries(languageColors);

  useEffect(() => {
    // Show colors for 4 seconds
    const colors = {};
    colorLanguageMap.forEach(([lang, color]) => {
      colors[lang] = color;
    });
    setDisplayColors(colors);

    const timer = setTimeout(() => {
      setDisplayColors({});
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  function handleAttempt(e) {
    e.preventDefault();

    if (attempts >= maxAttempts) {
      setGameOver(true);
      return;
    }

    const selectedColor = languageColors[userLanguage.toLowerCase()];
    const isCorrect = selectedColor === userColor.toLowerCase();
    setResults((prevResults) => [
      ...prevResults,
      {
        attempt: attempts + 1,
        language: userLanguage,
        color: userColor,
        status: isCorrect ? 'success' : 'fail',
      },
    ]);

    setAttempts(attempts + 1);

    if (attempts + 1 >= maxAttempts) {
      setGameOver(true);
    }

    if (isCorrect) {
      setError('Correct!');
    } else {
      setError('Incorrect, try again.');
    }
  }

  function handleLanguageChange(e) {
    setUserLanguage(e.target.value);
  }

  function handleColorChange(e) {
    setUserColor(e.target.value);
  }

  return (
    <div className="app-container">
      <h1>Programming Color Game</h1>

      {!gameOver ? (
        <form onSubmit={handleAttempt} className="form-container">
          <div className="button-group">
            {colorLanguageMap.map(([lang, color]) => (
              <button
                key={lang}
                style={{ backgroundColor: displayColors[lang] || 'transparent' }}
                className="color-button"
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="input-group">
            <label htmlFor="language">Programming Language</label>
            <select
              id="language"
              className="input"
              value={userLanguage}
              onChange={handleLanguageChange}
            >
              <option value="">Select a programming language</option>
              {colorLanguageMap.map(([lang]) => (
                <option key={lang} value={lang}>
                  {lang.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="color">Color</label>
            <select
              id="color"
              className="input"
              value={userColor}
              onChange={handleColorChange}
            >
              <option value="">Select a color</option>
              {Object.values(languageColors).map((color, index) => (
                <option key={index} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>
          <div className="submit-container">
            <button type="submit">Submit</button>
          </div>
          <div>Attempts remaining: {maxAttempts - attempts}</div>
          {error && <div className="error">{error}</div>}
        </form>
      ) : (
        <div>
          <h2>Game Over</h2>
          <table>
            <thead>
              <tr>
                <th>Attempt</th>
                <th>Programming Language</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result.attempt}>
                  <td>{result.attempt}</td>
                  <td
                    style={{ backgroundColor: languageColors[result.language.toLowerCase()] || 'transparent' }}
                  >
                    {result.language}
                  </td>
                  <td
                    style={{
                      backgroundColor: result.status === 'success' ? 'green' : 'red',
                      color: 'white',
                    }}
                  >
                    {result.status === 'success' ? '✔' : '✘'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
