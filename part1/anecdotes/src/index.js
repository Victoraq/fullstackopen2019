import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({handleClick, text}) => {
    return (
        <button onClick={handleClick}>
            {text}
        </button>
    )
}

const Part = ({text}) => {
    return (
        <p>{text}</p>
    )
}

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const zeroArray = Array(anecdotes.length).fill(0) // array filled with zeros with length of the anecdotes array
    const [votes, setVotes] = useState(zeroArray) // state to store the votes

    const sortAnecdote = () => {
        setSelected(Math.floor((Math.random() * anecdotes.length)))
    }

    const handleVote = (pos) => () => {
        // as we can't change directly the votes state
        // we make a copy of the values changing the desired position 
        const newVotes = { ...votes }
        newVotes[pos] += 1
        
        // modifying the votes states with the changed copy
        setVotes(newVotes)
    }

    return (
        <div>
            <Part text={props.anecdotes[selected]}/>
            <Part text={"has "+votes[selected]+" votes"}/>
            <Button handleClick={handleVote(selected)} text={"vote"}/>
            <Button handleClick={sortAnecdote} text={"next anecdote"}/>
        </div>
    )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)