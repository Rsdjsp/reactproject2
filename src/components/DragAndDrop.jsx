import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";

function DragAndDrop() {
  const { lists } = useSelector((state) => state.team);
  const [list, updateList] = useState(lists);
  useEffect(() => {
    updateList(lists);
  }, [lists]);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(list);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateList(items);
  }

  return (
    <div className="w-fit border-2">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="list" type="COLUMN" direction="horizontal">
          {(provided) => (
            <ul
              className=" flex flex-"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {list.map(({ _id, title, tasks }, index) => {
                return (
                  <Draggable key={_id} draggableId={_id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-emerald-600 border-2 w-64"
                      >
                        <h3>{title}</h3>
                        <div>
                          {tasks.map((task) => (
                            <p key={task._id}>{task.title}</p>
                          ))}
                        </div>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default DragAndDrop;
