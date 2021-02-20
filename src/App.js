import React, { useState } from 'react';
import EditButton  from "./components/EditButton";


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      editable: null,
      items: []
    }
    // this.handleItemEdit = this.handleItemEdit.bind(this);
  }


  componentDidMount() {

    console.log(" componentDidMount calling   ");

  }

  updateMessage(event) {
    this.setState({
      message: event.target.value
    });
  }

  handleClick() {
    var items = this.state.items;

    items.push(this.state.message);

    this.setState({
      items: items,
      message: ""
    });
  }


  handleItemChanged (event , i){

    var items = this.state.items;
    items[i]  = event.target.value;

    this.setState({
      items: items,
 
    });
  }

  handleItemDeleted(i){
    var items = this.state.items; 
    items.splice(i, 1); 
    
    this.setState({
      items: items,
      editable : null,
      
    });
  }

  handleItemEdit(i)  {    

    this.setState({
      editable: i
    });
  }



  handleItemEditReSet(i) { 
    this.setState({
      editable: null
    });
  }



  renderRows() {
    var context = this;

    return  this.state.items.map(function(o, index) {
      console.log(o , index);
 
              return (
                <tr key={"item-" + index}>
                  <td>
                  { index == context.state.editable ? 
                  <input
                  class="form-control form-control-sm"
                  type="text"
                  placeholder={`Please Enter value`}
                  value={o}                
                  onChange={ e => context.handleItemChanged(e, index)}
                />
                : 
                <input
                      type="text"
                      value={o}
                      class="form-control form-control-sm"
                      placeholder={``}
                      disabled
                      onChange={ e =>  context.handleItemChanged(context, index)}
                    />
                
                
                }
                 
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-danger m-1"
                      onClick={() => context.handleItemDeleted(index)}
                    >
                      <i class="fas fa-trash"></i> Delete
                    </button>
                  </td>
                  <td>
                  
                    {
                     index == context.state.editable ? 

                      <EditButton 
                        addClass="btn btn-sm btn-info m-1"
                        onClick={ (index) =>  context.handleItemEditReSet(index)}
                        index = {index}
                        text = 'Readonly'   
                        icon="fas fa-lock"                 
                      />

                      : 
 
                      <EditButton 
                        addClass="btn btn-sm btn-outline-success m-1"
                        onClick={(index) => context.handleItemEdit(index)}
                        index = {index}
                        text = 'Editable'  
                        icon="fas fa-edit"                    
                      />

                    }
                    
                  </td>

                </tr>
              );
            });
  }

  render() {
   
    if(this.state.items.length == 0){
      return (
        <div>
          <h1 className="bg-secondary text-center text-white">Please Add New Item</h1>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => this.handleClick(this)}
          > <i class="fas fa-plus"> Add Item</i>
          
        </button>
        </div>
      );
    }

    return (
      <div>
        <table className="">
          <thead>
            <tr>
              <th>
                Item
              </th>
              <th>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {this.renderRows()}
          </tbody>
        </table>
        <hr/>
       
        <button
          className="btn btn-sm btn-primary"
          onClick={() => this.handleClick(this)}
        >
         <i class="fas fa-plus"> Add Item</i>
          
        </button>
      </div>
    );
  }
}