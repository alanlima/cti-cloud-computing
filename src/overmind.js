import { createOvermind } from 'overmind';
import { createHook } from 'overmind-react';
import CoursePayload from './course-unit.json';
import { unnormalizeCourseJson, normalizeCourseJson } from './utils';

const state = {
    ui: {
        isLoadingCourse: false,
        isLoadingJson: false,
        showSaveJsonModal: false,
        isProcessingJson: false,
        processJsonError: null
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
    },
    uploadCourse: ({ state, actions }, courseContent) => {
        actions.resetJsonProcessError();
        state.ui.isProcessingJson = true;
        setTimeout(() => {
            try {
                const json = JSON.parse(courseContent);
                state.course = normalizeCourseJson(json);
                state.ui.processJsonResult = 'success';
            } catch (e) {
                state.ui.processJsonResult = 'fail';
                state.ui.processJsonError = e.message;
                console.error(e);
            } finally {
                state.ui.isProcessingJson = false;
            } 
        }, 1000);
    },
    resetJsonProcessError: ({state}) => {
        state.ui.isProcessingJson = false;
        state.ui.processJsonError = null;
        state.ui.processJsonResult = null;
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