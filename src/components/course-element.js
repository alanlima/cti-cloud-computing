import React from 'react';
import PropTypes from 'prop-types';

const CourseElement = ({name, criterias}) => {
    return (
        <div>
            <h3>{name}</h3>
            <ul>
                {criterias && criterias.map(c => <li key={c.id}>{c.name}</li>)}
            </ul>
        </div>
    );
};

CourseElement.propTypes = {
    name: PropTypes.string.isRequired,
    criterias: PropTypes.array.isRequired
}

export default CourseElement;
