import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
import Task from "./Task";
import { useParams } from "react-router-dom";
import { createList, getList } from "../features/user/teamSlice";

function DragAndDrop() {
  const dispatch = useDispatch();
  const { lists } = useSelector((state) => state.team);
  const { id } = useParams();
  const [list, updateList] = useState(lists);
  const [modal, setModal] = useState(false);
  useEffect(() => {
    updateList(lists);
  }, [lists]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // const {
    //   title: { value: title },
    // } = event.target;
    // const idTeam = id;
    // dispatch(createList({ title, idTeam }));
    // dispatch(getList());
    setTimeout(() => {
      setModal(false);
    }, 1000);
  };

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(list);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateList(items);
  }

  return (
    <>
      <div className="w-fit flex flex-row z-20">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="list" type="COLUMN" direction="horizontal">
            {(provided) => (
              <ul
                className=" flex "
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
                          className="bg-slate-200 bg-opacity-95 mx-3  mt-12 w-64 rounded-sm border-2 border-slate-300 shadow-md"
                        >
                          <header className="flex w-full">
                            <h3 className="bg-slate-200 text-start text-lg ml-2 font-semibold mb-1 mt-3 w-1/2 ">
                              {title}
                            </h3>
                            <button className="text-emerald-800 font-medium hover:font-bold ml-12 mt-3 text-end w-1/2">
                              Add Task..
                            </button>
                          </header>

                          <div>
                            {tasks.map((task) => {
                              return [
                                <div
                                  className="h-fit flex flex-col pb-4 justify-center"
                                  key={task._id}
                                >
                                  <Task title={title} tasks={tasks} />
                                </div>,
                              ];
                            })}
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

        <section className="mt-12 z-20">
          <button
            onClick={() => setModal(true)}
            className="w-64 font-semibold text-md bg-slate-900 opacity-90 hover:opacity-100 hover:bg-slate-200 ml-4 h-10 items-center text-zinc-100 hover:text-zinc-700 border-2 border-slate-400 rounded-sm text-left pl-3 flex"
          >
            Add List{" "}
            <span className="ml-36">
              <FaPlus />
            </span>
          </button>
        </section>
      </div>
      {modal && (
        <div className="bg-zinc-800 bg-opacity-50 w-screen h-screen absolute flex top-0 left-0 ">
          <form
            onSubmit={handleSubmit}
            className="bg-slate-100 relative w-1/4 h-fit mx-auto mt-24 px-4 border-2 border-slate-300 flex flex-col rounded-sm shadow-md"
          >
            <h3 className="w-full text-emerald-800 font-semibold text-xl text-center mt-3">
              Crate New List
            </h3>
            <label
              htmlFor="title "
              className="w-full capitalize font-medium mt-4 mb-2"
            >
              insert title for new list
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full pl-2 h-8 border-2 outline-none border-slate-200 focus:border-emerald-700 rounded-sm"
              placeholder="..."
         
            />
            <div className="w-full text-center">
              <button className="bg-emerald-600 my-4 px-2 text-slate-100 font-semibold rounded-sm">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default DragAndDrop;
