import React, {useState}from 'react';


export const userInput = () =>{

       return(
           <div className={'position-relative mt-2'}>
                  <input className={'input'}
                         type={'email'}
                         name={'user_input'}
                         onChange={handleInputChange}
                  />
                  <label className={'label'}>{this.props.description}</label>
           </div>
       );
}
