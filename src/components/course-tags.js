import React, { useCallback, useState } from 'react';
import Select from 'react-select/creatable';
import { useOvermind } from '../overmind';

import { WithContext as ReactTags } from 'react-tag-input';

const KeyCodes = {
    comma: 188,
    enter: 13,
  };
  
const delimiters = [KeyCodes.comma, KeyCodes.enter];

const initialState = {
    tags: [],
    suggestions: []
}

const parseSelectedTagsOrNull = (tags) => tags && tags.map(text => ({id: text, text }))

const CourseTags = ({ selectedTags, onTagsUpdated }) => {
    const [ state, setState ] = useState({
        ...initialState,
        tags: parseSelectedTagsOrNull(selectedTags) || initialState.tags
    });

    const notifyTagsUpdated = useCallback((tags) => {
        onTagsUpdated && onTagsUpdated(tags)
    }, [ onTagsUpdated] );

    const handleDelete = useCallback(index => {
        const newTags = state.tags.filter((tag, i) => i !== index);
        setState({
            ...state,
            tags: newTags
        });
        notifyTagsUpdated(newTags);
    }, [ state, setState, notifyTagsUpdated ]);

    const handleAddition = useCallback(tag => {
        const newTags = [...state.tags, tag]
        setState({
            ...state,
            tags: newTags
        });
        notifyTagsUpdated(newTags);
    }, [ state, setState, notifyTagsUpdated ]);

    return (
        <div>
            <ReactTags 
                tags={state.tags}
                suggestions={state.suggestions}
                delimiters={delimiters}
                handleDelete={handleDelete}
                handleAddition={handleAddition} />
        </div>
    );
}

const CourseTags_old = ({ unit, selectedTags, tags, onTagSelected }) => {
    const [ options, setOptions ] = useState([ ]);

    const [ selectedOptions, setSelectedOptions ] = useState([ ]);

    const handleOnChange = useCallback((newValue, actionMeta) => {
        setSelectedOptions(opt => {
            return newValue;
        });
    }, [setSelectedOptions]);

    const handleOnCreate = useCallback(value => {
        const newValue = { label: value, value};
        setOptions(opt => [...opt, { label: value, value}])
        setSelectedOptions(opt => [...opt, newValue]);
        onTagSelected({
            unit, tag: newValue
        });
    }, [ setOptions, onTagSelected, unit ]);

    return (
        <Select 
            value={selectedTags}
            onCreateOption={handleOnCreate}
            onChange={handleOnChange}
            options={tags} />
    );
}

export const OvermindedCourseTags = ({ unit }) => {
    const { state, actions } = useOvermind();

    const stateUnit = state.course.units.filter(u => u.code === unit.code);

    const handleTagSelected = useCallback(() => {

    });

    return <CourseTags
                tags={state.tags}
                selectedTags={stateUnit.tag ? [stateUnit.tag] : []}
                onTagSelected={handleTagSelected}
            />
}

export default CourseTags;