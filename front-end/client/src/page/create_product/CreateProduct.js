import React, { Component } from "react";
import ItemManagerContract from "../../contracts/ItemManager.json";
import ItemContract from "../../contracts/Item.json";
import getWeb3 from "../../getWeb3";
import axios from "axios";
import './create.css'

class CreateProduct extends Component {
  state = { 
    cost: 0 , 
    itemName: "", 
    url : "http://localhost:5000",
    imageSelect: ""
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

      this.item = new this.web3.eth.Contract(
        ItemContract.abi,
        ItemContract.networks[this.networkId] && ItemContract.networks[this.networkId].address,
      );
      console.log(this.itemManager);
      
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  postProductCall = async (
    nameProuct,
    price,
    addressCreator,
    addressItem,
    url,
    indexProduct
  ) => {
    try {
        const res = await axios.post(`http://localhost:5000/api/products/postProduct`, {
            nameProuct: nameProuct,
            price: price,
            addressCreator: addressCreator,
            addressItem: addressItem,
            urlImage: url,
            indexProduct: indexProduct
        });
      } catch (err) {
       console.log(err);
    }
};

  handleInputChange = (event)=>{
    const target = event.target;
    const  value = target.type === "checkbox"? target.checked : target.value;
    const name = target.name;
    
    this.setState({ 
      [name]: value,
    });

  }

  handleSubmit = async ()=>{
    try{

      if(this.state.cost <= 0 || !this.state.itemName || !this.state.imageSelect){
        alert("Khong duoc de trong data (cost > 0)");
        this.setState({
          cost : 0,
          itemName : "",
          imageSelect: ""
        })
          return;
        }

      const {cost, itemName} = this.state;
      let urlImage = "";
      const price = this.web3.utils.toWei(`${cost}`, 'ether');
      let result =  await this.itemManager.methods.createItem(itemName, price, this.accounts[0])
        .send({from: this.accounts[0]});

        const itemIndex = result.events.SupplyChainStep.returnValues._itemIndex;
        const step = result.events.SupplyChainStep.returnValues._step;
        const address = result.events.SupplyChainStep.returnValues._itemAddress;
      
        const formData = new FormData();
        formData.append("file", this.state.imageSelect);
        formData.append("upload_preset", "mdtcalcz");

        const uploadImage = await axios.post("https://api.cloudinary.com/v1_1/dk4dkhkyn/image/upload", formData)
          .then((res)=>{
          console.log("urlImage",res.data.url)
            urlImage = res.data.url;
          }).catch((err)=>{console.log("Co loi trong post img")})

      if(result){
        this.postProductCall(
          itemName, 
          price, 
          this.accounts[0],
          address,
          urlImage,
          itemIndex
          );
      }
      alert("Send " + cost + " Wei to "+ result.events.SupplyChainStep.returnValues._itemAddress);

    }catch(err){
      alert(err.message)
    }
  }

  handleInputFile(value){
    this.setState({
      imageSelect: value
    })
  }


  render() {
    return (
      <div >
        <div id="create">
          <h2>ADD PRODUCT</h2>

          <div id="container">
            
            <div id="itemName" className=" form-create">
              <label htmlFor="itemName">Name Product</label><input type="text" name="itemName" value={this.state.itemName} onChange={this.handleInputChange}/>
            </div>
            <div id="cost" className="form-create">
              <label htmlFor="cost">Price</label><input type="number" name="cost" value={this.state.cost} onChange={this.handleInputChange}/>
            </div>
            <input className="upimg" type="file" name="file" onChange={(e)=> {
              this.handleInputFile(e.target.files[0])
            }}/><br/>
            <button className="botton" type="button" onClick={this.handleSubmit}>Create new Item</button>
          </div>
        </div>
      </div>
    );
  }
}


export default CreateProduct;
