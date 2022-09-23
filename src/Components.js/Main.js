
import React,{useState} from 'react'
import Actor from './Actor';
import Shows from './Shows';
import Footer from './Footer'


const Main = () => {
    const [select, setSelect] = useState(null);

    const updateRatio = (e) => {
      console.log(select);
      if (select === null) {
        setSelect(true);
      } else if (select === true) {
        setSelect(false);
      } else {
        setSelect(true);
      }
    };
    return (
        <>
      <div className='main-2'>
        
        <div className="App">
          <div className='header'>
            <div className='header-details'>
              
              <p className='header-item-2' >Tvmaze</p><br />
              <p className='choice' style={{ color: "#fff" }}>Search your favourite shows</p>
              <div className='radio-input'>
                  Actors <input type="radio" value={select} checked={select === true} onChange={updateRatio} />
  
                  Shows <input type="radio" value={select} checked={select === false} onChange={updateRatio} />
  
              </div>
               <div className='shows-display'>{select === true ? <Actor /> : " "}
               {select === false ? <Shows /> : " "}
               <div className='footer2'>
                <Footer/>
               </div>
               </div>
               
        
            </div>
            </div>
          </div>
          
        
      </div>
     
      
      </>
    );
}

export default Main
