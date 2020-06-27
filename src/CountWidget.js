import React, { Component }  from 'react';

class CountWidget extends Component{
  
    render(){
        
        return(
          <div>
            <h1>count 2{this.props.index}</h1>
            <img src={ `https://robohash.org/${this.props.index}` } alt="Nature" style={{maxWidth:'60%', height:'auto'}}></img>
            
            </div>
        )
    }
}

export default CountWidget