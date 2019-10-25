import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const Title = ({text}) => {
    return (
        <h1>{text}</h1>
    )
}


const Button = ({handleClick, text}) => {
    return (
        <button onClick={handleClick}>
            {text}
        </button>
    )
}


const Stats = ({text, value}) => {
    return (
        <p>{text} {value}</p>
    )
}


const Statistics = ({good, neutral, bad}) => {
    
    const total = () => good+neutral+bad

    const average = (good, neutral, bad) => {
        const sum = 1*good + 0*neutral -1*bad

        return sum/total()
    }

    const percentage = (value) => 100*value/total() + "%"

    return (
        <div>
            <Stats text="good" value={good}/>
            <Stats text="neutral" value={neutral}/>
            <Stats text="bad" value={bad}/>
            <Stats text="all" value={total()}/>
            <Stats text="avg" value={average(good, neutral, bad)}/>
            <Stats text="positive" value={percentage(good)}/>
        </div>
    )
}


const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return ( 
        <div>
            <Title text="give feedback"/>

            <Button handleClick={() => setGood(good + 1)} text="good"/>
            <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"/>
            <Button handleClick={() => setBad(bad + 1)} text="bad"/>

            <Title text="statistics"/>

            <Statistics good={good} neutral={neutral} bad={bad}/>            
        </div>
    )
}

ReactDOM.render(<App />, 
    document.getElementById('root')
  )