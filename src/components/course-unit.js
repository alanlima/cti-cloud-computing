import React from 'react';
import PropTypes from 'prop-types';
import CourseElement from './course-element';
import CourseTags from './course-tags';

const CourseUnit = ({ 
    name, 
    code, 
    elements,
    tags,
    onTagsUpdated
}) =>
{

    const handleTagsUpdated = React.useCallback((tags) => onTagsUpdated(tags), [ ]);

    return (
        <div className="course-unit">
            <h3>{code}</h3>
            <h2>{name}</h2>
            <CourseTags selectedTags={tags} onTagsUpdated={handleTagsUpdated} />
            {elements && elements.map(e => <CourseElement key={e.id} name={e.name} criterias={e.criterias} />)}
        </div>
    )
};

CourseUnit.propTypes = {
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired
};

export default CourseUnit;