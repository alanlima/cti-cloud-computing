import React from 'react';
import Course from '../components/course';
import {useOvermind} from '../overmind';

const Page = ({}) => {
    const { state, actions } = useOvermind();

    return (
        <div>
            <Course {...state.course} />
        </div>
    );
};

export default Page;