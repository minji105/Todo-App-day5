import { useState } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: "123", done: false },
    { id: 1, content: "코딩 공부하기", done: false },
    { id: 2, content: "잠 자기", done: false },
  ]);

  return (
    <>
      <header><h1>Todo</h1></header>
      <TodoList todoList={todoList} setTodoList={setTodoList} />
      <hr />
      <TodoInput todoList={todoList} setTodoList={setTodoList} />
    </>
  );
}

function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button
        onClick={() => {
          const newTodo = { id: Number(new Date()), content: inputValue };
          const newTodoList = [...todoList, newTodo];
          setTodoList(newTodoList);
          setInputValue("");
        }}
      >
        추가하기
      </button>
    </>
  );
}

function TodoList({ todoList, setTodoList }) {
  const sorted = [...todoList].sort((a, b) => a.done - b.done);
  return (
    <ul>
      {sorted.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  );
}

function Todo({ todo, setTodoList }) {
  const [inputValue, setInputValue] = useState(todo.content);
  const [visible, setVisible] = useState(false);

  const handleCheck = () => {
    setTodoList((prev) =>
      prev.map((el) => el.id === todo.id ? { ...el, done: !el.done } : el))
  }

  return (
    <li>
      <input type="checkbox" onChange={handleCheck} checked={todo.done} />
      <div className="todoItem">
        <span className={todo.done ? 'done' : ''}>{todo.content}</span>
        <input
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          className={visible ? 'show modify' : "modify"}
        />
      </div>
      <button
        onClick={() => {
          setTodoList((prev) =>
            prev.map((el) =>
              el.id === todo.id ? { ...el, content: inputValue } : el
            )
          );
          setVisible(prev => !prev)
        }}
      >
        {visible ? '확인' : '수정'}
      </button>
      <button
        onClick={() => {
          setTodoList((prev) => {
            return prev.filter((el) => el.id !== todo.id);
          });
        }}
      >
        삭제
      </button>
    </li>
  );
}

export default App;
