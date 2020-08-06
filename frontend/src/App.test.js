import React from 'react';
import {shallow} from 'enzyme'
import App from './App';
import UserContainer from "./containers/userContainer/UserContainer";

describe( '<App />', () => {
  let wrapper;
  it('should load the application', function () {
    wrapper = shallow(<App />);
    expect(wrapper.find(UserContainer)).toHaveLength(1);

  });
})
