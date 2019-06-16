import React from 'react';
import PropTypes from 'prop-types';
import CourseElement from './course-element';
import CourseTags from './course-tags';
import { Accordion, Icon } from 'semantic-ui-react';

const CourseUnit = ({ 
    name, 
    code, 
    elements,
    tags,
    onTagsUpdated
}) =>
{
    const handleTagsUpdated = React.useCallback((tags) => onTagsUpdated(tags), [ ]);

    const [ isActive , setActive ] = React.useState(false);

    const toggleActive = React.useCallback(() => {
        console.log('toggle called..');
        setActive(a => !a);
    }, [ setActive ]);

    return (
        <Accordion active={isActive} fluid styled>
            <Accordion.Title onClick={toggleActive}>
                <Icon name="dropdown" />
                {`${code} - ${name}`}
            </Accordion.Title>
            <Accordion.Content active={isActive}>
                <CourseTags selectedTags={tags} onTagsUpdated={handleTagsUpdated} />
                {elements && elements.map(e => <CourseElement key={e.id} name={e.name} criterias={e.criterias} />)}
            </Accordion.Content>
        </Accordion>

        // <div className="course-unit">
        //     <h3>{code}</h3>
        //     <h2>{name}</h2>
        //     <CourseTags selectedTags={tags} onTagsUpdated={handleTagsUpdated} />
        //     {elements && elements.map(e => <CourseElement key={e.id} name={e.name} criterias={e.criterias} />)}
        // </div>
    )
};

CourseUnit.propTypes = {
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired
};

export default CourseUnit;