import React, { useReducer, useState } from "react";

const todoreducer = (state, action) => {
  console.log(action.payload);

  switch (action.type) {
    case "add":
      return [...state, { text: action.payload, complete: false, edit: false }];

    case "delete":
      return state.filter((_, i) => i !== action.payload);

    case "toggle":
      return state.map((todo, i) =>
        i === action.payload
          ? { ...todo, complete: !todo.complete, edit: false }
          : todo
      );

    case "edit":
      return state.map((todo, i) =>
        i === action.payload ? { ...todo, edit: true } : todo
      );

    case "save":
      return state.map((todo, i) =>
        i === action.payload.index
          ? { ...todo, text: action.payload.text, edit: false }
          : todo
      );

    default:
      return state;
  }
};

const Todo = () => {
  const [todos, dispatch] = useReducer(todoreducer, []);
  const [input, setInput] = useState("");
  const [editText, setEditText] = useState("");

  const handleAdd = () => {
    if (input.trim() === "") return;
    dispatch({ type: "add", payload: input });
    setInput("");
  };

  return (
    <div>
      <div className="flex items-center justify-center">
      <input
        type="text"
        name=""
        id=""
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="bg-white rounded-md text-center h-8 m-4 text-black font-bold "
      />
      <button
        onClick={handleAdd}
        className="bg-violet-700 w-14 h-8 rounded-md text-white"
      >
        Add
      </button>

      </div>

      <ul>
        {todos.map((todo, index) => (
          <>
            <li
              key={index}
              className="flex  h-20 bg-white shadow-2xl w-[90%] justify-between items-center  rounded-md ml-6 mt-4"
            >
              {todo.edit ? (
                <input
                  className="h-7 border rounded-md  text-center shadow-2xl font-bold w-40"
                  type="text"
                  name=""
                  id=""
                  defaultValue={todo.text}
                  onChange={(e) => setEditText(e.target.value)}
                />
              ) : (
                <div
                  className=" w-40  text-center rounded-md h-7 shadow-2xl font-bold "
                  style={{
                    textDecoration: todo.complete ? "line-through" : "none",
                  }}
                >
                  {todo.text}
                </div>
              )}

              <div className="flex items-center justify-around gap-6">
                <input
                  className="w-5"
                  type="checkbox"
                  checked={todo.complete}
                  name=""
                  id=""
                  onChange={() => dispatch({ type: "toggle", payload: index })}
                />

                <button
                  onClick={() => dispatch({ type: "delete", payload: index })}
                  className="bg-red-500  w-15 h-8 rounded-md text-black font-bold shadow-2xl"
                >
                  Delete
                </button>

                {todo.edit ? (
                  <button
                    className="bg-violet-800 h-9 w-15 text-white rounded-md font-bold shadow-2xl"
                    onClick={() =>
                      dispatch({
                        type: "save",
                        payload: { index, text: editText },
                      })
                    }
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => dispatch({ type: "edit", payload: index })}
                    className="bg-green-600 w-14 h-9  rounded-md text-white font-bold shadow-2xl"
                  >
                    Edit
                  </button>
                )}
              </div>
            </li>
          </>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
