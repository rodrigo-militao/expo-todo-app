import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
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
  }

  toggleDone (item) {
    let todos = this.state.todos;

    todos = todos.map((todo) => {
      if (todo.id === item.id){
        todo.done = !todo.done;
      }
      return todo;
    });

    this.setState({todos});
  }

  removeTodo (item) {
    let todos = this.state.todos;

    todos = todos.filter((todo) => todo.id !== item.id);

    this.setState({todos});
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
    backgroundColor: '#fff'
  }
});
