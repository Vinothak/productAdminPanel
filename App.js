import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


export default class App extends React.Component {
  constructor(){
    super();
    this.state={
  
        name:'',
        description:'',
        price:'',
        showMessage:false,
        products:[],
        toggle:true,
        updatedname:'',
        updateddes:'',
        updatedprice:'',
        currId:null
    }
    
    this.proref= React.createRef();
    this.desref= React.createRef();
    this.priref= React.createRef();
    this.updatenameref=React.createRef();
    this.updatedesref=React.createRef();
    this.updatepriceref=React.createRef();
  }

  componentDidMount=()=>{
    var url='http://localhost:3001/users/product'
    axios.get(url)
    .then(res=>{
      if(res!=null){
        var tempObj=res.data;

        this.setState({
          products:tempObj
        })
  
      }
    }).catch(err=>console.log('error is',err))
  }

  //register product
  sendData=()=>{
     if(this.proref.current.value=="" || this.desref.current.value=="" || 
      this.priref.current.value==""){
       alert(` Product,description and price should not be empty`);
      }
       else if(Number.isInteger(this.priref.current.value-'0')==false){
          alert(`price should be a number ${this.priref.current.value}`);
       }
     else{
      var url='http://localhost:3001/users/product'
      axios.post(url,{
        name:`${this.proref.current.value}`,
        description:`${this.desref.current.value}`,
        price:`${this.priref.current.value}`,
      })
      .then(res=>{
        if(res!=null){
  
          var obj={
            name:this.proref.current.value,
            description:this.desref.current.value,
            price:this.priref.current.value,
          };
          var arr=[...this.state.products];
           arr.push(obj);
          this.setState({
            showMessage:true,
            products:arr,
            name:'',
            description:'',
            price:''

          })
        }
      }).catch(err=>console.log('error is',err))

     }
   
  }


    deleteItem=(id)=>{
     const filteredItems= this.state.products.filter(item =>
       item._id!==id);

       var url=`http://localhost:3001/users/product/${id}`
    axios.delete(url)
    .then(res=>{
      if(res!=null){
        // console.log('the data is ',res);
      }
    }).catch(err=>console.log('error is',err))


    this.setState({
      products:filteredItems
    })

    }

    //Update product
    updateItem=()=>{
      var id=this.state.currId
      var tempdata=this.state.products
      for(let i=0;i<tempdata.length;i++){
          if(id==tempdata[i]._id){
            tempdata[i].name=this.updatenameref.current.value
            tempdata[i].description=this.updatedesref.current.value
            tempdata[i].price=this.updatepriceref.current.value
          }
      }
        var url=`http://localhost:3001/users/product/${id}`
     axios.patch(url,{name:`${this.updatenameref.current.value}`,
                  description:`${this.updatedesref.current.value}`,
                  price:`${this.updatepriceref.current.value}`
    })
     .then(res=>{
       if(res!=null){
         // console.log('the data is ',res);
       }
     }).catch(err=>console.log('error is',err))
 
 
     this.setState({
       products:tempdata,
       updatedname:'',
       updatedprice:'',
       updateddes:'',
       toggle:true
     })
 
     }

     Updatefirst=(id)=>{
      const tempdata=this.state.products
      for(let i=0;i<tempdata.length;i++){
          if(id==tempdata[i]._id){
            var tempname=tempdata[i].name
            var tempdes=tempdata[i].description
            var tempprice=tempdata[i].price
          }
      }

      this.setState({
         updatedname:tempname,
         updatedprice:tempprice,
         updateddes:tempdes,
         toggle:false,
         currId:id
      })
     }

       
  changeValuename=(e)=>{
    this.setState({
      updatedname:e.target.value
    })
  }
  changeValuedes=(e)=>{
        this.setState({
          updateddes:e.target.value
        })
      }
      changeValueprice=(e)=>{
            this.setState({
              updatedprice:e.target.value
            })
          }
          valueChange1=(e)=>{
            this.setState({
                name:e.target.value
            })
          }
          valueChange2=(e)=>{
            this.setState({
              description:e.target.value
            })
          }
          valueChange3=(e)=>{
            this.setState({
              price:e.target.value
            })
          }

render(){

   var cls=(this.state.toggle===true)?'pro-update-hidden':'pro-update-visible';  
   var val1=this.state.updatedname
   var val2=this.state.updateddes
   var val3=this.state.updatedprice
   var val4=this.state.name
   var val5=this.state.description
   var val6=this.state.price

  return (
    

    <div className="App">
       <h1>Admin Panel</h1>
    
        <div>
        <div className='product'>
        {this.state.products.map(item=>{
          return <p key={item._id}>{item.name}<span style={{marginLeft:'10px'}}><button onClick={()=> this.Updatefirst(item._id)}>Update</button></span> <span style={{marginLeft:'10px'}}><button onClick={()=>this.deleteItem(item._id)}>delete</button></span></p>
        })}
        </div>
        
       
       <div className="pro-register">
         <p>Register Product</p><br></br>
      <input type='text' value={val4} onChange={this.valueChange1} placeholder="name" ref={this.proref}></input><br></br>
      <input type='text' value={val5} onChange={this.valueChange2} placeholder="description" ref={this.desref}></input><br></br>
      <input type='text' value={val6} onChange={this.valueChange3} placeholder="price" ref={this.priref}></input><br></br>
        <button style={{marginTop:'10px'}} onClick = {this.sendData}>Send Data</button>

       </div></div>

<div className={cls}>
         <p>Update Product</p><br></br>
      <input type='text' value={val1} onChange={this.changeValuename} placeholder="name" ref={this.updatenameref}></input><br></br>
      <input type='text' value={val2} onChange={this.changeValuedes} placeholder="description" ref={this.updatedesref} ></input><br></br>
      <input type='text' value={val3} onChange={this.changeValueprice} placeholder="price" ref={this.updatepriceref} ></input><br></br>
        <button style={{marginTop:'10px'}} onClick = {this.updateItem}>Update Data</button>
        </div>
        </div>
        

  );
  }
  
  }
