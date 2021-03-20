import React from 'react';
import Button from '../utils/button'

export default class buttonContainer extends React.Component{
    render(){
        return(
          <div>
              <Button
                  btnClass = {'facebook-btn'}
                  btnName ={'REGÍSTRATE CON FACEBOOK'}/>
          </div>
        );
    }
}
