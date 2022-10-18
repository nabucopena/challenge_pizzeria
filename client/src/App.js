import axios from 'axios';
import useSWR from 'swr';
import React, { useState } from 'react';
import './App.css';

const fetcher = url => axios.get(url).then(res => res.data)

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

function OrderSummary(props){
  return (
    <div>
      <h1> Order details </h1>
      <ul>
        {props.items.map((it) => <li key={it.id}> {it.name} </li>)}
      </ul>
      <button onClick={props.handleClick}> Confirm order </button>
    </div>
  )
}

function Ordering(props){
  const [orderItems, setOrderItems] = useState([])
  const { data, error } = useSWR('http://localhost:3000/api/pizzas', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const addItem = (it)=>{setOrderItems([...orderItems, it])}
  const saveOrder = (items) => {
    axios.post('http://localhost:3000/api/orders', {
      order: {order_items_attributes: items.map((item) => JSON.stringify({pizza_id: item.id}))}
    }).then(
      response => props.confirmed(response.data.id)
    )
  }

  return (
    <div>
      <PizzasList pizzas = {data} handleClick = {addItem} />
      <OrderSummary items = {orderItems} handleClick = {() => {saveOrder(orderItems)}} />
    </div>
  )
}

function Confirmed(props){
  const { data, error } = useSWR(`http://localhost:3000/api/orders/${props.order_id}`, fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return <p> Your order is confirmed. Order summary: {data.join(", ")} </p>
}

function App() {
  const [page, setPage] = useState("ordering");
  const [order, setOrder] = useState();
  const confirmed = (order_id) => {
    setPage("confirmed")
    setOrder(order_id)
  }
  const component = page === "ordering" ? <Ordering confirmed = {confirmed}/> : <Confirmed order_id={order} />;
  return component
}

export default App;
