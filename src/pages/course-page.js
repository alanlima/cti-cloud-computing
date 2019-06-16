import React from 'react';
import Course from '../components/course';
import {useOvermind} from '../overmind';
import { Dimmer, Loader, Message, Icon } from 'semantic-ui-react';

const Page = ({}) => {
    const { state, actions } = useOvermind();

    return (
        <div>
            <Dimmer active={state.ui.isLoadingCourse}>
                <Loader />
            </Dimmer>
            {
                state.course ? <Course {...state.course} /> : <Message color='yellow'><Icon name='warning'></Icon>No course uploaded...</Message>
            }
            
        </div>
    );
};

export default Page;