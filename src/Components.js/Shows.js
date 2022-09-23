import './shows.css'

import React, { useCallback, useEffect, useState }  from 'react'

const Shows = () => {
    const [show, setShow] = useState("");
    const [data, setData] = useState([]);
    // const searchvalue = true;
  
    useEffect(() => {
      async function fetchdata() {
        const response = await fetch(
          `https://api.tvmaze.com/search/shows?q=${show}`
        );
        const res_data = await response.json();
        console.log(res_data);
        setData(res_data);
      }
      fetchdata();
    }, [show]);
  
    const debounce = (func) => {
      let timer;
      return function (...args) {
        const context = this;
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
          timer = null;
          func.apply(context, args);
        }, 1000);
      }
    }
  
    const showsName = (event) => {
      setShow(event.target.value);
    };
  
    const optimised = useCallback(debounce(showsName), []);
    
    return (
      <div className="shows">
        <div className="input-box-details"> {show === '' ? 'Enter Show Name Below' : ''}</div>
        <div className="search-box">
          <input className="input" onChange={optimised} placeholder="eg: friends" />
        </div>
        <div className="Shows">
        {data.length > 0 &&
          data.map((item) => {
             const regex = /(<([^>]+)>)/ig;
             
            return (
              <main className="main">
                <div className="show" onClick={() => window.open(`${item.show.url !== null ? item.show.url : ''}`, "_blank")} key={item.show.id}>
                  <img className="image"
                    src={item.show.image !== null ? item.show.image.medium : ""}
                    alt-text={item.show.name}
                  />
                  <div className="details">
                    <h3 className="show-name">{item.show.name}({item.show.language})</h3>
                    <span className="rating">⭐
                      {item.show.rating.average !== null ? item.show.rating.average : "0.0"}</span>
                  </div>
                  <div className="summary">
                    <h3>Summary</h3>
                    {item.show.summary !== null ? item.show.summary.replace(regex,''): ''}
                  </div>
                </div>
              </main>
            );
          })
        }
        </div>
      </div>
    );
}

export default Shows
