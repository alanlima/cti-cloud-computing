import React from 'react';
import CourseUnit from './course-unit';
import { useOvermind } from '../overmind';

const Course = ({name, code, units}) => {

    const { state, actions } = useOvermind();

    const handleTagsUpdated = React.useCallback((unit, tags) => {
        actions.updateTag({ unit, tags });
    }, [ actions ]);

    const handUpdate = React.useCallback((unit) => (tags) => actions.updateTag({ unit, tags }), [ ]);

    return (
        <div>
            <h1>{code} - {name}</h1>
            {units.map(u => <CourseUnit
                onTagsUpdated={handUpdate(u)}
                tags={u.tags}
                name={u.name} 
                code={u.code} 
                key={u.code} 
                elements={u.elements} />)}
        </div>
    );
}

export default Course;