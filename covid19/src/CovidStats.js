import React, { Component } from 'react'

class CovidStats extends Component {

    //this function will call instance variables
    constructor() {

        //This function will call on base class
        super(); 
        
        //This is an instance variable that is an object date structure called state
        this.state = {

            //There are 2 pieces of object state: an array which will display data and search results
            statistics: [],
            searchResults: ""
        }
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

        console.log(results)
        //This will store the JSON data named "results" in state and replace current value of articles with results of articles
        this.setState({

            statistics: results
            // statistics: results.statistics
        }, () => {

            //This a call back function for state
            console.log(this.state.statistics)
        })

    }

        handleChange = (e) => {

            this.setState({

                searchResults: e.target.value
            })
    }

    render() {

        //This will de-structure the state object into variables in order to elimante long code i.e. this.stat.statistics
        let {statistics, searchResults} = {...this.state};

        //This will filter through the mapped array and if true will create a new array. It will make the search and result letters lowercase to eliminate case sensitivity 
        let filteredList = statistics.filter(statistic => {

            return statistic.state.toLowerCase().includes(searchResults.toLowerCase())
        })

        //This variable is an array that will be created by looping through the filterList via map method and create new arrays of desired keys in order to display unique list items
        let statisticList = filteredList.map((statistic, index) => {

            return <div key={index}>
                        <h2>State: {statistic.state}</h2>
                        <ul>
                            <li>Cases: {statistic.cases}</li>
                            <li>Cases Today: {statistic.todayCases}</li>
                            <li>Deaths: {statistic.deaths}</li>
                            <li>Deaths Today: {statistic.todayDeaths}</li>
                            <li>Active Cases: {statistic.active}</li>
                            <li>Cases per One Million: {statistic.casesPerOneMillion}</li>
                            <li>Deaths per One Million: {statistic.deathsPerOneMillion}</li>
                            <li>Total number of tests: {statistic.tests}</li>
                            <li>Tests per One Million: {statistic.testsPerOneMillion}</li>
                        </ul>
                    </div>
        })

        console.log("rendered component");
        return (
        <>
            {/* This input field will invoke the function. If this.handleChange() was used it would invoke automatically */}
            <input type="text" onChange={this.handleChange}/>
            
            {statisticList}
        </>
        )
    }
}

export default CovidStats
