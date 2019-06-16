import React, { useCallback, useState, useEffect } from 'react';
import Select from 'react-select/creatable';
import { useOvermind } from '../overmind';

import { WithContext as ReactTags } from 'react-tag-input';

import useWhyDidYouUpdate from '../hooks/useWhyDidYouUpdate';

const KeyCodes = {
    comma: 188,
    enter: 13,
  };
  
const delimiters = [KeyCodes.comma, KeyCodes.enter];

const initialState = {
    tags: [],
    suggestions: []
}

const parseSelectedTagsOrNull = (tags) => (tags && tags.map(text => ({id: text, text }))) || [];

const CourseTags = (props) => {
    useWhyDidYouUpdate('[course-tags]', props);
    const { onTagsUpdated } = props;
    const [ tags, setTags ] = useState(parseSelectedTagsOrNull(props.selectedTags));

    useEffect(() => {
        console.log('useEffect', {
            tags, seTags: props.selectedTags
        })
        setTags(parseSelectedTagsOrNull(props.selectedTags))
    }, [ setTags, props.selectedTags ] )

    console.log('course-tags', { tags, props });

    const notifyTagsUpdated = useCallback((tags) => {
        console.log('should notify with', { onTagsUpdated, tags });
        onTagsUpdated && onTagsUpdated(tags)
    }, [ onTagsUpdated] );

    const handleDelete = useCallback(index => {
        console.log('handle delete before', tags);
        const newTags = tags.filter((tag, i) => i !== index);
        console.log('handle delete after', newTags);
        notifyTagsUpdated(newTags);
    }, [ tags, notifyTagsUpdated ]);

    const handleAddition = useCallback(tag => {
        const newTags = [...tags.filter(t => t.id !== tag.id), tag]
        notifyTagsUpdated(newTags);
    }, [ tags, notifyTagsUpdated ]);

    return (
        <div>
            <ReactTags 
                classNames={{
                    tag: 'ui label',
                    tagInput: 'ui input'
                }}
                tags={tags}
                allowDragDrop={false}
                delimiters={delimiters}
                handleDelete={handleDelete}
                handleAddition={handleAddition} />
        </div>
    );
}

export const OvermindedCourseTags = ({ unit }) => {
    const { state, actions } = useOvermind();

    const stateUnit = state.course.units.filter(u => u.code === unit.code);

    const handleTagSelected = useCallback((tags) => {
        console.log('handle called...');
        actions.updateTag({ unit, tags })
    }, [ actions, unit ]);

    console.log('overminded', {
        state
    })

    return <CourseTags
                tags={state.tags}
                selectedTags={stateUnit.tags ? [...stateUnit.tags] : []}
                onTagsUpdated={handleTagSelected}
            />
}

export default CourseTags;