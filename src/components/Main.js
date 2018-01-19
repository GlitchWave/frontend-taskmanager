require('normalize.css/normalize.css');
require('styles/App.css');

import TodoItems from './TodoItems';
import React from 'react';
import  axios  from 'axios';
import generateKey from '../shared/keyGenerator';

class AppComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    }

    this.addNewTask = this.addNewTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.completeTask = this.completeTask.bind(this);
  }
  render() {
    return (
      <div className="mainHolder">
        <div>
          <form onSubmit={ this.addNewTask }>
            <input type="text"
                    ref={(a) => this._inputElement = a}
                    placeholder="Type name of task"/>
            <button type="submit">Add task</button>
          </form>
        </div>
        <TodoItems entries={ this.state.items }
                   delete={ this.deleteTask }
                   complete={ this.completeTask }/>
      </div>
    );
  }

  componentDidMount() {
    axios.get('http://localhost:8080/api')
         .then(response => {
           return response.data;
         })
         .then(data => {
           let newState = data;
           let keys = generateKey(newState.length);
           newState.forEach((item , index) => {
             item.key = keys[index];
           });
           this.setState({items: newState});
         })
         .catch(error => console.error(error));
  }

  addNewTask(e) {
    e.preventDefault();
    let requestBody = {
      task: this._inputElement.value,
      completed: false
    };

    axios.post('http://localhost:8080/api', requestBody)
         .catch(err => console.error(err));

    setTimeout(() => {
      axios.get('http://localhost:8080/api')
         .then(response => {
           return response.data
         })
         .then(data => {
           let newTask = data[data.length-1];
               newTask.key = generateKey(1)[0];
           this.setState({items: [...this.state.items, newTask]});
         })
         .catch(err => console.error(err));
    }, 500);

    this._inputElement.value = '';
  }

  deleteTask(key) {
    let targetTask;
    this.state.items.forEach((item) => {
      if(key == item.key) {
        targetTask = item;
      }
    });

    delete targetTask.key;
    
    axios.delete('http://localhost:8080/api', { data: targetTask })
         .then(response => console.log(response))
         .catch(err => console.error(err));


  }

  completeTask(key, e) {
    let body = {};
    let newListOfTasks = this.state.items.filter((item) => {
      if(item.key == key) {
        body = {
          task: item.task,
          completed: item.completed
        };
        item.completed = true;
      }
      return item;
    });

    e.target.parentElement.classList.toggle('completed');

    this.setState({items: newListOfTasks});


    axios.post('http://localhost:8080/api', body)
          .catch(err => console.error(err));
  }

}

AppComponent.defaultProps = {
};

export default AppComponent;
