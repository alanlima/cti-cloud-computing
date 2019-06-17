import React from 'react';
import CourseUnit from './course-unit';
import { useOvermind } from '../overmind';
import { Menu, Icon, Message, Tab, Segment } from 'semantic-ui-react';
import DownloadCourseModal from './download-course-modal';
import UploadCourseModal from './upload-course-modal';
import UnitsTaggedGroup from './units-tagged-group';

const Course = () => {

    const { state, actions } = useOvermind();

    const { name, code, units } = state.course || {};

    const handleTagsUpdated = React.useCallback((unit, tags) => {
        actions.updateTag({ unit, tags });
    }, [ actions ]);

    const handUpdate = React.useCallback((unit) => (tags) => actions.updateTag({ unit, tags }), []);

    if(!state.course) 
    {
        return (<Message color='yellow'><Icon name='warning'></Icon>No course uploaded...</Message>);
    }

    const panes = [
        { 
            menuItem: { key: 'course-units', icon: 'list', content: 'Units' },
            render: () => (<Tab.Pane>{units.map(u => <CourseUnit
                onTagsUpdated={handUpdate(u)}
                tags={u.tags}
                name={u.name} 
                code={u.code} 
                key={u.code} 
                elements={u.elements} />)}</Tab.Pane>)
        },
        {
            menuItem: { key: 'course-group', icon: 'sitemap', content: 'Units Grouped by Tag'},
            render: () => <Tab.Pane><UnitsTaggedGroup /></Tab.Pane>
        }
    ]

    return (
        <div>
            <Menu>
                <h2 style={{padding: '5px 20px'}}>{code} - {name}</h2>
                <Menu.Menu position='right'>
                    <UploadCourseModal modalTrigger={<Menu.Item color='violet' active={true}>
                        <Icon name='upload'></Icon>
                        <strong>Upload JSON</strong>
                    </Menu.Item>} />
                    
                    <DownloadCourseModal
                        modalTrigger={(
                            <Menu.Item color='green' active={true}>
                                <Icon name="download"></Icon>
                                <strong>Download JSON</strong>
                            </Menu.Item>
                        )}
                    />
                </Menu.Menu>
            </Menu>

            <Tab panes={panes} />
        </div>
    );
}

export default Course;