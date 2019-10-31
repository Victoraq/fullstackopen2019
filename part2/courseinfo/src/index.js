import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
    return (
        <div>
            <h1>{props.course}</h1>
        </div>
    )
}


const Part = (props) => {
    return (
        <div>
            <p>
                {props.part} {props.exercises}
            </p>
        </div>
    )
}


const Content = ({parts}) => {

    const render_parts = () => 
        parts.map(p => <Part key={p.id} part={p.name} exercises={p.exercises}/>)

    return (
        <div>
            {render_parts()}
        </div>
    )
}


const Total = ({parts}) => {
    const sum = (acc, part) => acc + part.exercises

    const sum_value = parts.reduce(sum, 0)

    return (
        <p><b>total of {sum_value} exercises</b></p>
    )

}


const Course = ({course}) => {
    return (
        <div>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )
} 


const App = () => {
    const course = {
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }
  
    return (
      <div>
        <Course course={course} />
      </div>
    )
  }

ReactDOM.render(<App />, document.getElementById('root'))