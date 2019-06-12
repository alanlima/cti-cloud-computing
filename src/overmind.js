import { Overmind } from 'overmind';
import { createHook } from 'overmind-react';
import CoursePayload from './course-unit.json';

const overmind = new Overmind({
    state: {
        ui: {
            isLoadingCourse: false
        },
        course: CoursePayload,
        tags: [{
            label: 'some tag',
            value: 'some-tag'
        }],
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
    },
    actions: {
        createTag: ({ state, effects }, value) => {
            state.tags.push({ label: value, value });
        }
    }
});

export const useOvermind = createHook(overmind);