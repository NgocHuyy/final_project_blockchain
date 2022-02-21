import Item from './Item';
import React, { Component, useState, useEffect } from "react";
import './itemStyle.css';

export default function ListItem(props){
    return (
      <>
        <p className = "list-item__title">Current Product List</p>              
          <div id="list" className="container">
            {props.listItems.map(item =>  (
              <Item 
                handCLickPaid = {props.handCLickPaid} 
                item = {item} 
                key={item.index}
                handCLickDelivered = {props.handCLickDelivered}
              />
             ))}
          </div>
      </>
        
    )
}