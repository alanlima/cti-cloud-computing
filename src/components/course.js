import React from 'react';
import CourseUnit from './course-unit';
import { useOvermind } from '../overmind';
import { Menu, Icon, Message, Tab, Segment } from 'semantic-ui-react';
import DownloadCourseModal from './download-course-modal';
import UploadCourseModal from './upload-course-modal';
import UnitsTaggedGroup from './units-tagged-group';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const getListStyle = (isDraggingOver, overflow) => ({
    background: isDraggingOver ? 'lightblue' : 'grey',
    padding: 8,
    border: '5px solid pink',
    width: 250,
    maxHeight: '50vh',
    overflow,
});

const CourseUnits = ({units, onTagsUpdated}) => {

    return (
            <Droppable 
                droppableId="droppable"
            >
                {(droppableProvided, droppableSnapshot) => {
                    return (<div ref={droppableProvided.innerRef}>
                        {units.map((u, index) => (<Draggable
                                key={u.code} 
                                draggableId={u.code}
                                index={index}>
                                {(draggableProvided, draggableSnapshot) => (
                                    <div ref={draggableProvided.innerRef}
                                        {...draggableProvided.draggableProps}
                                        {...draggableProvided.dragHandleProps}>
                                        <CourseUnit
                                            onTagsUpdated={onTagsUpdated(u)}
                                            tags={u.tags}
                                            name={u.name} 
                                            code={u.code} 
                                            elements={u.elements} />
                                    </div>
                                )}
                        </Draggable>))}
                        {droppableProvided.placeholder}
                    </div>)
                }}
            </Droppable>
    )
};

const Course = () => {

    const { state, actions } = useOvermind();

    const { name, code, units } = state.course || {};

    const handleTagsUpdated = React.useCallback((unit, tags) => {
        actions.updateTag({ unit, tags });
    }, [ actions ]);

    const handUpdate = React.useCallback((unit) => (tags) => actions.updateTag({ unit, tags }), []);

    const handleDragEnd = React.useCallback((result) => {
        if(!result.destination) {
            return;
        }

        console.log('onDragEnd', { result });

        actions.reorderCourse({
            sourceIndex: result.source.index,
            destinationIndex: result.destination.index
        });
    }, [ actions ]);

    if(!state.course) 
    {
        return (<Message color='yellow'><Icon name='warning'></Icon>No course uploaded...</Message>);
    }

    const panes = [
        { 
            menuItem: { key: 'course-units', icon: 'list', content: 'Units' },
            render: () => (<Tab.Pane>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <CourseUnits units={units} onTagsUpdated={handUpdate} />
                </DragDropContext>
            </Tab.Pane>)
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