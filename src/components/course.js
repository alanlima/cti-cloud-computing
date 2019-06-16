import React from 'react';
import CourseUnit from './course-unit';
import { useOvermind } from '../overmind';
import { Menu, Icon } from 'semantic-ui-react';
import DownloadCourseModal from './download-course-modal';
import UploadCourseModal from './upload-course-modal';

const Course = ({name, code, units}) => {

    const { state, actions } = useOvermind();

    const handleTagsUpdated = React.useCallback((unit, tags) => {
        actions.updateTag({ unit, tags });
    }, [ actions ]);

    const handUpdate = React.useCallback((unit) => (tags) => actions.updateTag({ unit, tags }), [ ]);

    return (
        <div>
            <Menu>
                <h2 style={{padding: '5px 20px'}}>{code} - {name}</h2>
                <Menu.Menu position='right'>
                    <UploadCourseModal modalTrigger={<Menu.Item>
                        <Icon name='upload'></Icon>
                        Upload JSON
                    </Menu.Item>} />
                    
                    <DownloadCourseModal
                        modalTrigger={(
                            <Menu.Item>
                                <Icon name="download"></Icon>
                                Download JSON
                            </Menu.Item>
                        )}
                    />
                </Menu.Menu>
            </Menu>

            {units.map(u => <CourseUnit
                onTagsUpdated={handUpdate(u)}
                tags={u.tags}
                name={u.name} 
                code={u.code} 
                key={u.code} 
                elements={u.elements} />)}
        </div>
    );
}

export default Course;