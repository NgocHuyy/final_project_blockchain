import {useState, useEffect} from 'react';
import React from "react";
import axios from "axios";
import { Link, useParams } from 'react-router-dom';

export default function UserPage({_web3}){
    const { userId } = useParams();
    const [listItems, setListItem] = useState([]);
    const [web3, setWeb3] = useState();

    useEffect(() => {
        if (_web3) {
          setWeb3(_web3);
        }
      },[_web3])
    
      useEffect(() => {
        if(web3){
            console.log(listItems);
            getListItems();
        }
      },[web3]);

      const getListItems = async () => {
        let newlist = []
        console.log("check");
        try {
          await axios.get(`http://localhost:5000/api/products/${userId}`).then(res => {
            const persons = res.data;
            for(let i = 0; i < persons.length; i++){
                const price = web3.utils.toWei(`${persons[i].price}`, 'ether');
                const newItem = {
                  id: persons[i]._id,
                  name: persons[i].nameProuct,
                  addressItem: persons[i].addressItem,
                  price: price,
                  addressCreator: persons[i].addressCreator,
                  urlImage: persons[i].urlImage
                }
                newlist.push(newItem);
            }
          })
        } catch (err) {
          console.log(err)
          console.log("Error loading")
        }
        console.log(newlist)
        setListItem(newlist)
      }
    
    
      


    return (
        <div>
            <h3>Image ID: {userId}</h3>
        </div>
    )
}
