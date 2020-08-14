import React, { Component } from 'react'

class CovidStats extends Component {

    //this function will call instance variables
    constructor() {

        //this function will call on base class
        super(); 
        
        //This is an instance variable that is an object date structure called state
        this.state({

            //There are 2 pieces of object state: an array which will display data and search results
            data: [],
            searchResults: ""
        })
    }

    //This is a lifecylce method that will get called once automatically by React framework in order to get the API data
    //Using async will allow us to use a promise of await when fetching the API data and make the code look synchronous
    componentDidMount = async () => {

        //This variable is an array that includes all the API data
        let url ="https://corona.lmao.ninja/v2/states";

        //This makes a fetch call of variable named "url" with a promise of await making this seem synchronous
        let response = await fetch(url);

        //This will convert the API data to a JSON format
        let results = await response.json();

        //This will store the JSON data named "results" in state and replace current value of articles with results of articles
        this.setState({

            articles: results.articles
        }, () => {

            //This a call back function for state
            console.log(this.state.articles)
        })

    }

  render() {

    //This variable is an array that will be created by looping through the articles via map method and create new arrays of desired keys in order to display unique list items
    let articleList = this.articles.map((articles, index) => {

        return <li key={index}>
            <h2>{articles.state}</h2>
        </li>
    }

    return (
      <>
        
      </>
    )
  }
}

export default CovidStats
