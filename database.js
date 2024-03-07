import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("todo.db");

const init = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY NOT NULL, value  TEXT NOT NULL, completed BOOLEAN NOT NULL)"
    );
  });
  //create table(s)
};

const insertTask = (value, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO tasks (value, completed) VALUES (?, 0);",
      [value],
      () => callback(),
      (_, error) => console.log(error)
    );
  });
};

const fetchTasks = (callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM tasks;",
      undefined,
      (_, { rows: { _array } }) => callback(_array),
      (_, error) => console.log(error)
    );
  });
};

const updateTaskCompletion = (id, completed) => {
  db.transaction((tx) => {
    tx.executeSql("UPDATE tasks SET completed = ? WHERE id = ?", [
      completed ? 1 : 0,
      id,
    ]);
  });
};

const deleteTask = (id) => {
  db.transaction((tx) => {
    tx.executeSql("DELETE FROM tasks WHERE id = ?", [id]);
  });
};

export { init, insertTask, fetchTasks, updateTaskCompletion, deleteTask };
