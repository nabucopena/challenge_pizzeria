import React, { useState } from 'react';
import './App.css';

function PizzasList(props){
  return (
    <div>
      <ul>
        {props.pizzas.map((pizza) =>
          <li key={pizza.id}>
            {pizza.name} - ${pizza.price} - <button onClick={() => {props.handleClick(pizza)}}> select </button>
            <br/>
            <ul> {pizza.ingredients.map((ingredient) => <li> {ingredient} </li>)} </ul>
          </li>
        )}
      </ul>
    </div>
  )
}

