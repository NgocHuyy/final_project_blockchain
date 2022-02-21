import {useState} from 'react';
import React from "react";

export default function ListItem(props){
    const [step, setStep] = useState(props.item.step);

    function convertStep(step){
        let str = '';
        switch (step){
            case '1': 
                str = 'Paid';
                break;
            case '2': 
                str = 'Delivered'
                break;
            default:
                str = 'Create';
                break;
        }
        return str;
    }
    function checkStep(){
        if(convertStep(step) === "Create") return true;
        return false;
    }
    return (
        
        <>
       
        
            <div className="card">
              <div className="card-header">
                  <img src={props.item.urlImage} alt="rover" />
              </div>
              <div className="card-body">
                  <h4 className="product-name">{props.item.identifier}</h4>
                  <p className="product-price">{props.item.price} ETH</p>
                  <div className="product__address">
                    <p className="product-address--content">Address Product:</p>
                    <p className="product-address">{props.item.addressItem}</p>
                    <p className="product-address--content">Address Creater</p>
                    <p className="product-address">{props.item.ownerAddress}</p>
                  </div>

                  
                  {/* <p className="product-price">{convertStep(step)}</p> */}
                  {checkStep() ? <div className="btn-action">
                      <button
                          onClick={()=> props.handCLickPaid(props.item)}
                          className="item-paid--btn"
                      >
                        Buy
                      </button>
                  </div> : ''}
              </div>
            </div>
        </>

    )
}