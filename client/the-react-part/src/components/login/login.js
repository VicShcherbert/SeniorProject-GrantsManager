import React from "react";
import Axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import { Title } from "../title/title";
import { Icon, Segment } from "semantic-ui-react";

export const Login = () => {

    const loginFail = (response) => {
        sessionStorage.setItem('failed_login', true);
    }

    const loginSuccess = (response) => {

        Axios.post('http://localhost:3001/google_login', {
                email: response.profileObj.email
        }).then((response) => {
            if(response.status == 200){
                sessionStorage.setItem('greeting', `${response.data.string}`);
                sessionStorage.setItem('id', response.data.id);
                sessionStorage.setItem('failed_login', false);
            }
            else{
                sessionStorage.setItem('failed_login', true);
            }
            window.location.reload(false);
        });
    }

    return (
        <div>
            <Title />
            <Icon name='user circle' size='massive' color='grey' id='user-icon'/>
            {sessionStorage.getItem('failed_login') ? <Segment id='dashboard-segment'>User is not approved</Segment> : <></>}
            <div id='google-login-button'>
                <GoogleLogin
                    id="google-login-button"
                    clientId="1098089936064-9mcqegbqabbppggi7d9hrq56s4u6dulf.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={loginSuccess}
                    onFailure={loginFail}
                    cookiePolicy={'single_host_origin'}
                    icon={false}
                />
            </div>
        </div>
    )
}