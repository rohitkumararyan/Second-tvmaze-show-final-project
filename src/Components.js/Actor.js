
import './shows.css'

import React,{ useCallback, useEffect, useState } from 'react'

const Actor = () => {
    const [actor, setActor] = useState("");

    const [data, setData] = useState([]);
  
    const [data1, setData1] = useState([]);
  
    useEffect(() => {
      async function fetchdata() {
        const response = await fetch(
          `https://api.tvmaze.com/search/people?q=${actor}`
        );
  
        const res_data = await response.json();
  
        // console.log(res_data);
  
        setData(res_data);
      }
  
      fetchdata();
    }, [actor]);
  
    const getFilms = () => {
      let res = data.filter(
        (item) => item.person.name.toLowerCase() === actor.toLowerCase()
      );
  
      return res && res.length > 0 && res[0].person.id !== undefined
        ? res[0].person.id
        : 1;
    };
  
    useEffect(() => {
      async function fetchdata() {
        let result = getFilms() >= 1 ? getFilms() : "No result found!";
        // console.log(result);
        // console.log(getFilms());
  
        const response = await fetch(
          `https://api.tvmaze.com/people/${result}/castcredits?embed=show`
        );
  
        const res_data1 = await response.json();
        console.log(res_data1);
  
        if (actor.length > 0) setData1(res_data1);
      }
  
      fetchdata();
    }, [actor]);
  
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
  
    const actorsName = (event) => {
      setActor(event.target.value);
    };
  
    const handleInput = useCallback(debounce(actorsName), [])
  
    return (
      <div className="shows">
  
        <div className="input-box-details"> {actor === '' ? 'Enter Show Name by Actor Below' : ''}</div>
        <div className="search-box">
          <input className="input" onChange={handleInput} placeholder="eg: Akon.." />
        </div>
        <div className="Shows">
          {data1.length > 0 &&
            data1.map((item) => {
              const regex = /(<([^>]+)>)/ig;
              return (
                <main className="main">
                  <div className="show" onClick={() => window.open(`${item._embedded.show.url !== null ? item._embedded.show.url : ''}`, "_blank")}>
                    <img className="image" onHover={item._embedded.show.summary}
                      src={
                        item._embedded.show.image.medium !== null
                          ? item._embedded.show.image.medium
                          : ""
                      }
                      alt-text="No image available"
                    />
                    <div className="details">
                      <h3 className="name">{item._embedded.show.name}({item._embedded.show.language})</h3>
                      <span className="rating">⭐
                        {item._embedded.show.rating.average !== null
                          ? item._embedded.show.rating.average
                          : "0.0"}
                      </span>
                    </div>
                    <div className="summary">
                      <h3 >Summary:- </h3>
                      {item._embedded.show.summary.replace(regex, '')}
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

export default Actor
