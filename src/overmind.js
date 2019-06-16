import { createOvermind } from 'overmind';
import { createHook } from 'overmind-react';
import CoursePayload from './course-unit.json';
import { unnormalizeCourseJson } from './utils';

const state = {
    ui: {
        isLoadingCourse: false,
        isLoadingJson: false,
        showSaveJsonModal: false
    },
    course: CoursePayload,
    outputJson: null,
    tags: [],
    courseTags: state => state.course && state.course.units.reduce((prev, current) => { 
        const unitName = current.name;
        return {
            ...prev,
            [current.tag]: {
                ...prev[current.tag],
                unitName
            }
        };
    }, {})
}

const actions = {
    updateTag: ({ state }, { tags, unit }) => {
        const tagValues = tags.map(t => t.id);

        state.tags = [...tagValues];
        
        state.course.units = state.course.units.map(u => {
            if(u.code !== unit.code) {
                return u;
            } else {
                return { ...u, tags: [...state.tags]}
            }
        })
    },
    displaySaveModal: ({state}) => {
        state.ui.showSaveJsonModal = true;
        state.ui.isLoadingJson = true;
        setTimeout(() => {
            state.outputJson = unnormalizeCourseJson(state.course);
            state.ui.isLoadingJson = false;
        }, 1000);
    }
}

const effects = {

}

export const overmind = createOvermind({
    state,
    actions,
    effects
});

export const useOvermind = createHook();