import logo from '.public/logo.png';
import './App.css';
import { Form, Input, Button} from "antd"
import FormItem from 'antd/es/form/FormItem';

 App = () => {
  <div class="App">
  return (
      <div className="App-main"/>
          <header className="Cat-header"/>
              <img src={logo} className="Cat-logo" alt="logo"> </img>
              <a
                  className="App-link"
                  href="https://podcat.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
              /></a>
              [ /** Ant Design Form component*/ ]
              <Form>
                  <Form.Item label="username" name="username"/>
                  <Input placeholder="username"></Input>
                  <Form.Item/>

                  <Form.Item label="password" name="password"/>
                    <Input placeholder="password"></Input>
                  </Form.Item>

                  <Form.Item/>
                    <Button block type='primary' htmlType='submit'>Log In!</Button>
                  </Form.Item>
              </Form>
              )
          </header >
      </div>
  
</div>


export default App;
