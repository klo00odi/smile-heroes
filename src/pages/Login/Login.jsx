import React, { Component } from 'react';
import { IonContent, IonButton, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonLabel, IonItemDivider } from '@ionic/react';
import Logo from '../img/Logo.png'
import ParticlesBg from 'particles-bg'
import './Login.css'
import axios from 'axios';


class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            passwordEmpty: false,
            emailEmpty: false,
            emailError: false,
            isSubmit: false,
            invalidLogin: false,
        }

        this.onLoginEmailChange = this.onLoginEmailChange.bind(this)
        this.onLoginPasswordChange = this.onLoginPasswordChange.bind(this)
        this.login = this.login.bind(this)
    }

    onLoginEmailChange = (e) => {
        this.setState({ email: e.target.value })
    }

    onLoginPasswordChange = (e) => {
        this.setState({ password: e.target.value })
    }

    login = () => {
        const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g

        let passwordEmpty = false
        let emailEmpty = false
        let emailError = false

        if (!this.state.password || !this.state.email || !regex.test(this.state.email)) {
            if (!this.state.password || this.state.password === "")
                passwordEmpty = true

            if (!this.state.email || this.state.email === "")
                emailEmpty = true
            else if (!regex.test(this.state.email))
                emailError = true
            this.setState({ passwordEmpty, emailEmpty, emailError })

            return
        }

        this.setState({ isSubmit: true, invalidLogin: false })

        axios.post("https://api-dot-smile-heroes-21-api-v1.uc.r.appspot.com/user/login",
            {
                email: this.state.email,
                password: this.state.password
            }).then(res => {
                localStorage.setItem("token", "Bearer " + res.data)

                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token")
                }

                axios.post("https://api-dot-smile-heroes-21-api-v1.uc.r.appspot.com/secure/user/me",
                    {
                        email: this.state.email,
                    }, {
                    headers: headers
                }
                ).then(response => {
                    localStorage.setItem("email", response.data.email)
                    localStorage.setItem("firstName", response.data.firstName)
                    localStorage.setItem("lastName", response.data.lastName)
                    localStorage.setItem("gender", response.data.gender)
                    localStorage.setItem("created", response.data.date)
                    
                    window.location.reload();
                    //this.setState({ isLogged: localStorage.getItem("token"), user: response.data })
                })
            }).catch(error =>
                this.setState({ invalidLogin: true, isSubmit: false })
            )
        this.setState({ passwordEmpty, emailEmpty, emailError })
    }

    render() {

        return (
            <IonPage>
                <IonContent fullscreen>
                    <ParticlesBg type="circle" color='random' bg={true} />
                    <div class='contentDisplay' style={{ opacity: 0.85 }}>
                        <ion-card>
                            <img style={{ width: '55%', margin: '0% 25%' }} src={Logo} />
                            <hr/>
                            <ion-card-header>
                                <ion-card-subtitle>

                                    {this.state.invalidLogin ?
                                        <div class="alert alert-danger" role="alert">
                                            البريد الإلكتروني / كلمة المرور غير صحيحة
                                    </div> : null}

                                    <div class="mb-3">
                                        <label for="exampleFormControlInput1" className="label">البريد الإلكتروني</label>
                                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" onChange={this.onLoginEmailChange} required />

                                        {this.state.emailError ? <span className="error">الرجاء إدخال بريد إلكتروني صحيح</span> : null}
                                        {this.state.emailEmpty ? <span className="error">الرجاء إدخال البريد إلكتروني</span> : null}

                                    </div>
                                    <div class="mb-3">
                                        <label className="label">كلمة المرور</label>
                                        <input type="password" class="form-control" id="exampleFormControlInput1" onChange={this.onLoginPasswordChange} placeholder='كلمة المرور' required />
                                        {this.state.passwordEmpty ? <span className="error">الرجاء إدخال كلمة المرور</span> : null}

                                    </div>

                                    <IonButton expand="block" disabled={this.state.isSubmit} type='submit' onClick={this.login}>تسجيل الدخول</IonButton>
                                </ion-card-subtitle>
                                <ion-card-title>

                                </ion-card-title>
                            </ion-card-header>
                        </ion-card>
                    </div>
                </IonContent>

            </IonPage>
        )
    }
}


export default Login