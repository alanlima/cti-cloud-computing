import React from 'react';
import PropTypes from 'prop-types';
import CourseElement from './course-element';
import CourseTags from './course-tags';
import { Accordion, Icon, Label } from 'semantic-ui-react';

const CourseUnit = ({ 
    name, 
    code, 
    elements,
    tags,
    onTagsUpdated
}) =>
{
    const handleTagsUpdated = React.useCallback((tags) => onTagsUpdated(tags), [ onTagsUpdated ]);

    const [ isActive , setActive ] = React.useState(false);

    const toggleActive = React.useCallback(() => {
        setActive(a => !a);
    }, [ setActive ]);

    return (
        <Accordion active={isActive.toString()} fluid styled>
            <Accordion.Title onClick={toggleActive}>
                <Icon name="dropdown" />
                {`${code} - ${name}`}
                {tags ? tags.map(tag => <Label key={tag}>{tag}</Label>) : null}
            </Accordion.Title>
            <Accordion.Content active={isActive}>
                <CourseTags selectedTags={tags} onTagsUpdated={handleTagsUpdated} />
                {elements && elements.map(e => <CourseElement key={e.id} name={e.name} criterias={e.criterias} />)}
            </Accordion.Content>
        </Accordion>
    )
};

CourseUnit.propTypes = {
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired
};

export default CourseUnit;