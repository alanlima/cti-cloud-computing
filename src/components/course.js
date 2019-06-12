import React from 'react';
import CourseUnit from './course-unit';

const Course = ({name, code, units}) => {
    return (
        <div>
            <h1>{code} - {name}</h1>
            {units.map(u => <CourseUnit name={u.name} code={u.code} key={u.id} elements={u.elements} />)}
        </div>
    );
}

export default Course;