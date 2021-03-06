import React from 'react';
import { StyleSheet, Text, View, FlatList, AsyncStorage } from 'react-native';
import Header from './components/Header';
import InputBar from './components/InputBar';
import TodoItem from './components/TodoItem';

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      todoInput: '',
      todos: [],
    }
  }

  async componentDidMount() {
    let start = JSON.parse(await AsyncStorage.getItem('todos'));
    if (start.length === 0 || start === null) start = this.state.todos;
    try {
      this.setState({todos: start});
    } catch (error) {
      alert(error);
    }
  } 

  async addNewTodo () {
    let todos = this.state.todos;

    todos.push({
       id: todos.length + 1,
       title: this.state.todoInput,
       done: false
    });

    this.setState({
      todoInput: '',
      todos
    });

    try {
      await AsyncStorage.setItem('todos', JSON.stringify(todos));
    } catch(error) {
      alert(error);
    }
  }

  async toggleDone (item) {
    let todos = this.state.todos;

    todos = todos.map((todo) => {
      if (todo.id === item.id){
        todo.done = !todo.done;
      }
      return todo;
    });

    await this.setState({todos});
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(this.state.todos));
    } catch(error) {
      alert(error);
    }
  }

  async removeTodo (item) {
    let todos = this.state.todos;

    todos = todos.filter((todo) => todo.id !== item.id);

   await this.setState({todos});
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(this.state.todos));
    } catch(error) {
      alert(error);
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={ { height: 20 } }></View>

        <Header title="Lista de Tarefas"
        subtitle="Clique na tarefa para marcá-la como concluida."/>

        <InputBar
          textChange={todoInput => this.setState({ todoInput })}
          addNewTodo={ () => this.addNewTodo() }
          todoInput={this.state.todoInput}
          />

        <FlatList
          data={this.state.todos}
          extraData={this.state}
          keyExtractor={ (item, index) => index.toString() }
          renderItem={ ({item, index}) => {
            return (
              <TodoItem
               todoItem={item}
               toggleDone={() => this.toggleDone(item)}
               removeTodo={() => this.removeTodo(item)}
               />
            );
          }}
        />

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
