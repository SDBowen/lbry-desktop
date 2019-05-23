import classNames from 'classnames';
import React, { useEffect, useState, useRef } from 'react';
import { Form, FormField } from 'component/common/form';
import { Tags, Tag } from 'component/tags/view.jsx';
// import { useGesture } from 'react-use-gesture';
import { animated, useTransition, useSprings, interpolate } from 'react-spring';
import clamp from 'lodash-es/clamp';
import swap from 'util/swap-array';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Button from 'component/button';

const unfollowedTagsAnimation = {
  from: {
    opacity: 0,
  },
  enter: { opacity: 1, maxWidth: 200 },
  leave: { opacity: 0, maxWidth: 0 },
};

// const fn = (order, down, originalIndex, curIndex, y) => index =>
//   down && index === originalIndex
//     ? { y: curIndex * 100 + y, scale: 1.1, zIndex: '1', shadow: 15, immediate: n => n === 'y' || n === 'zIndex' }
//     : { y: order.indexOf(index) * 100, scale: 1, zIndex: '0', shadow: 1, immediate: false };

// const followedTagsAnimation = {
//   from: {
//     opacity: 0,
//     maxHeight: 0,
//     transform: `translate3d(0, -40px, 0)`,
//   },
//   enter: { opacity: 1, maxWidth: 200, maxHeight: 50, transform: `translate3d(0, 0, 0)` },
//   leave: { opacity: 0, maxWidth: 0, maxHeight: 0 },
//   trail: 100,
// };

type Props = {
  onSelect: string => void,
  selected: Array<string>,
  selectableTags: Array<string>,
};

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (snapshot, draggableStyle) =>
  console.log('sn', snapshot) || {
    // some basic styles to make the items look a bit nicer
    // boxShadow: shadow.interpolate(s => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`),
    // styles we need to apply on draggables
    ...draggableStyle,
  };

const getListStyle = isDraggingOver => ({
  display: 'flex',
  overflow: 'auto',
});

export default function TagSelect(props: Props) {
  const { unfollowedTags, followedTags, doToggleTagFollow, doAddTag, doDeleteTag, doReplaceTags } = props;
  const onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(followedTags, result.source.index, result.destination.index);

    doReplaceTags(items.map(({ name }) => name));
  };

  const [newTag, setNewTag] = useState('');

  const suggestedTags = unfollowedTags
    .filter(({ name }) => (newTag ? name.toLowerCase().includes(newTag.toLowerCase()) : true))
    .slice(0, 5);

  // // Animation for tag entrance and leave
  const suggestedTransitions = useTransition(suggestedTags, tag => tag.name, unfollowedTagsAnimation);
  // // const followedTransitions = useTransition(followedTags, tag => tag.name, followedTagsAnimation);

  function onChange(e) {
    setNewTag(e.target.value);
  }

  function handleSubmit() {
    setNewTag('');

    if (!unfollowedTags.includes(newTag)) {
      doAddTag(newTag);
    }

    if (!followedTags.includes(newTag)) {
      doToggleTagFollow(newTag);
    }
  }

  return (
    <div className="card--section">
      <h2 className="card__title card__title--flex-between">
        {__('Make This Your Own')}
        <Button button="inverse" label={__('Close')} />
      </h2>
      <p className="card__subtitle">{__('You are already following a couple tags, try searching for a new one.')}</p>

      <div className="card__content">
        {' '}
        <div className="tags--selected">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable" direction="horizontal">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} {...provided.droppableProps}>
                  {followedTags.map((item, index) => (
                    <Draggable key={item.name} draggableId={item.name} index={index}>
                      {(provided, snapshot) => (
                        <div
                          className={classNames('tag', 'tag--selected')}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={provided.draggableProps.style}
                        >
                          {item.name}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <Form onSubmit={handleSubmit}>
          <FormField
            label={__('Tags')}
            onChange={onChange}
            placeholder="Search for more tags"
            type="text"
            value={newTag}
          />
        </Form>
        <div className="tags">
          {suggestedTransitions.map(({ item, key, props }) => (
            <animated.div style={props} key={key}>
              <Tag name={item.name} onClick={() => doToggleTagFollow(item.name)} />
            </animated.div>
          ))}
          {!suggestedTransitions.length && <p className="empty tags__empty-message">No suggested tags</p>}
        </div>
      </div>
    </div>
  );
}
