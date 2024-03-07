import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Pressable,
} from "react-native";
import { deleteTask, init, insertTask, updateTaskCompletion, fetchTasks } from "./database";

const App = () => {
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    init();
    refreshTasks();
  }, []);

  const refreshTasks = () => {
    fetchTasks(setTasks);
  };

  const toggleTaskCompletion = (id, completed) => {
    updateTaskCompletion(id, !completed);
    refreshTasks();
  };

  const removeTask = (id) => {
    deleteTask(id);
    refreshTasks();
  };

  const addTask = () => {
    if (value.trim().length === 0) return;
    insertTask(value, refreshTasks);
    setValue("")
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter new task"
          value={value}
          onChangeText={setValue}
        />
        <Pressable title="Add Task" onPress={addTask} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Pressable
              onPress={() => toggleTaskCompletion(item.id, item.completed)}
            >
              <Text
                style={{
                  textDecorationLine: item.completed ? "line-through" : "none",
                }}
              >
                {item.value}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => removeTask(item.id)}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: "#007bff",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 10,
    paddingLeft: 10,
  },
  listItem: {
    flexDirection: "row",
    paddingHorizontal: 15,
    marginVertical: 8,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  deleteButton: {
    backgroundColor: "#B52C2C",
    padding: 10,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#ffffff",
  },
});

export default App;
