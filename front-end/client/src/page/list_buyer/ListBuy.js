import React, { Component } from "react";
import ItemManagerContract from "../../contracts/ItemManager.json";

import getWeb3 from "../../getWeb3";


class ListBuy extends Component {
  state = { 
    listItems:  [],
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      this.networkId = await this.web3.eth.net.getId();

      this.itemManager = new this.web3.eth.Contract(
        ItemManagerContract.abi,
        ItemManagerContract.networks[this.networkId] && ItemManagerContract.networks[this.networkId].address,
      );
      
      this.getList();
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  getList = async () => {
    let indexBuyer = await this.itemManager.methods.getBuyerIndex().call();

    console.log(indexBuyer);
    let newlist = []
    for(let i = 0; i < indexBuyer; i++) {
      let buyerObject = await this.itemManager.methods.buyItems(i).call();


      const newB = new Buyer(
          i, 
          buyerObject._identifier, 
          buyerObject._itemAddress, 
          buyerObject._buyerAddress, 
        );
      
      newlist.push(newB);
    }
    
    this.setState({ 
      listItems: newlist,
    });
  }

  listenToPaymentEvent = () =>{
    let self = this;
    this.itemManager.events.SupplyChainStep().on("data", async function(evt){
      // console.log(evt);
      let itemObject = await self.itemManager.methods.items(evt.returnValues._itemIndex).call();
      alert("Item " + itemObject._identifier + "was paid, deliver it now");
    })
  }



  render() {
    return (
      <div id = "list">
          <h1>Danh sách Paid</h1>
          <table id = "table">
            <thead>
             <tr>
              <th>#</th>
              <th>Name</th>
              <th>address Buyer</th>
              <th>address Item</th>
              <th></th>
             </tr>
            </thead>
            <tbody>
                {this.state.listItems.map(item =>  (
                  <tr key = {item.index}>
                    <td>{item.index}</td>
                    <td>{item._identifier}</td>
                    <td>{item._buyerAddress}</td>
                    <td>{item._itemAddress}</td>
                 </tr>
                ))}
            </tbody>
          </table>
        </div>
    );
  }
}


function Buyer(index, _identifier, _itemAddress, _buyerAddress){
  this.index = index;
  this._identifier = _identifier;
  this._itemAddress = _itemAddress;
  this._buyerAddress = _buyerAddress;
}

export default ListBuy;
