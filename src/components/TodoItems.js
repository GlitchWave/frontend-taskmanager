import React from 'react';

function TodoItems(props) {
        function del(key) {
                props.delete(key);
        }

        function complete(key, e) {
                props.complete(key, e);
        }

        let entries = props.entries;
        let listOfDom = entries.map((item) => {
                let cl;
                item.completed == true ? cl =  'item completed' : cl = 'item';
                return (<div className={ cl }>
                         <span onClick={(e) => complete(item.key, e)}>&#10003;</span>
                         <div key={item.key}>{item.task}</div>
                         <span onClick={() => del(item.key)}>&#10006;</span>
                        </div>)
        });
        return(
                <div className="listOfItems">
                        {listOfDom}
                </div>
        )
}

export default TodoItems;