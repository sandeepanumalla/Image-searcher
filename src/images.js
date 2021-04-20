import React, { useEffect, useState } from 'react'
import { Input, Space,Card } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './images.css'
import 'materialize-css';
import { Button, Row, Col } from 'react-materialize';

const Images = () => {

    const { Search } = Input;
    const onSearch = value => console.log(value);
    const [search,setSearch] = useState()
    const [results,setResults] = useState();
    const [random,setRandom] = useState();
    const [searchCalled,setSearchCalled] =useState(false);
    const [page,setPage] = useState(1); 
    const onChangeHandler =(e)=>{
        const {name,value} = e.target;
       setSearch(value);
    }
    const fetchTheImages = ()=>{
        setSearchCalled(true)
        if(search === '' || search === undefined){
            setRandom(true);
        }else{
            setRandom(false);
        }
           
        
        fetch(`https://api.unsplash.com/search/collections?page=${page}&query=${search}`,{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                ContentType: 'application/json',
                Authorization: 'Client-ID XdLOHUEy8Kj4TTLfkyIFLjgEFXz20yzM_mqY93fIF4k'
            }
        }).then(response =>response.json())
        .then(data =>{console.log(data)
            setResults(data);
        })
    }
   const loadMore =()=>{
       setPage(prevPage =>prevPage + 1);
       fetchTheImages()
       
   }

   /* useEffect(()=>{
    fetch(`https://api.unsplash.com/photos?page=${page}`,{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                ContentType: 'application/json',
                Authorization: 'Client-ID XdLOHUEy8Kj4TTLfkyIFLjgEFXz20yzM_mqY93fIF4k'
            }
        }).then(response =>response.json())
        .then(data =>{console.log(data)
            setRandom(data);
        })
   },[]) */
   useEffect(()=>{

       if(page > 1  ){
           
        fetchTheImages();
       }
       else{
           console.log('no wayy')
       }
       
   },[page])
   
   console.log(page)

    return (
        <div>
        <Space direction="vertical">
        
        <Search className="search" onChange={e=>onChangeHandler(e)} name="search" placeholder="Search any images" onSearch={fetchTheImages} enterButton />
        </Space>
        {   
            random || search =="" || search== undefined || search == null? 
            <h2>Random Images</h2>:
            <h2>{search}</h2>    
        }
            <div className="wrapper">
            
          
             
               {   results === undefined || results === null || results.total_pages ==0 ?null:
                   results.results.slice(0,8).map((result)=>{

                       if(result.cover_photo.urls.small !== null || result.cover_photo.urls.small !== undefined){
                        return  <div key={result.id} style={{background:`url(${result.cover_photo.urls.small})`,backgroundSize:'cover',backgroundRepeat:'no-repeat'}} className="box"></div>
                       }
                       else{
                           <h2>Thats it</h2>
                       }
                       
                   }) 
               } 
           
            </div>{
                results === undefined || results === null || results.total_pages ==0?null:
                <Button className="btn" style={{marginTop:'1rem'}} onClick={()=>loadMore()}>Load More</Button> 
            }
           
        </div>
    )
}

export default Images
/* 

<div className="box">Box1</div>
              <div  className="box">Box2</div>
              <div  className="box">Box3</div>
              <div  className="box">Box4</div>
              <div  className="box">Box4</div>
              <div  className="box">Box4</div>
*/