import React from 'react'


const Header = ({text}) => {
    return (
        <div>
            <h1>{text}</h1>
        </div>
    )
}


const Title = ({text}) => {
    return (
        <h2>{text}</h2>
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


const Course = ({courses}) => {

    const course_info = (course) => {
        return (
            <div key={course.id}>
                <Title text={course.name}/>
                <Content parts={course.parts}/>
                <Total parts={course.parts}/>
            </div>
        )
    }

    const render_courses = () =>
        courses.map(course => course_info(course))

    return (
        <div>
            <Header text={"Web development curriculum"} />
            {render_courses()}
        </div>
    )
} 

export default Course