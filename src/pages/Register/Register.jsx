import React, { Component } from 'react';
import { IonContent, IonButton, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonLabel, IonItemDivider } from '@ionic/react';
import Logo from '../img/Logo.png'
import ParticlesBg from 'particles-bg'
import './Register.css'
import axios from 'axios';



class Register extends Component {

    constructor(props) {
        super(props)
        this.state = {
            register: {
                email: "",
                firstName: "",
                lastName: "",
                password: "",
                gender: "M"
            },
            isSumbit: false,
            isSuccessRegister: false,
            registerErrorMesage: null
        }

        this.onRegisterEmailChange = this.onRegisterEmailChange.bind(this)
        this.onRegisterPasswordChange = this.onRegisterPasswordChange.bind(this)
        this.onRegisterLastNameChange = this.onRegisterLastNameChange.bind(this)
        this.onRegisterFirstNameChange = this.onRegisterFirstNameChange.bind(this)
        this.onRegisterGenderChange = this.onRegisterGenderChange.bind(this)

    }

    onRegisterPasswordChange = (e) => {
        let register = this.state
        register.password = e.target.value
        this.setState({ register })
    }

    onRegisterEmailChange = (e) => {
        let register = this.state
        register.email = e.target.value
        this.setState({ register })
    }

    onRegisterFirstNameChange = (e) => {
        let register = this.state
        register.firstName = e.target.value
        this.setState({ register })
    }

    onRegisterLastNameChange = (e) => {
        let register = this.state
        register.lastName = e.target.value
        this.setState({ register })
    }

    onRegisterGenderChange = (e) => {
        let register = this.state
        register.gender = !e.target.value || e.target.value != "" ? e.target.value : "M"
        this.setState({ register })
    }

    register = () => {
        const register = this.state

        const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g

        let passwordEmpty = false
        let emailEmpty = false
        let emailError = false
        let firstNameEmpty = false
        let lastNameEmpty = false

        if (!register.password || !register.email || !regex.test(register.email) || !register.firstName || !register.lastName) {
            if (!register.firstName || register.firstName === "")
                firstNameEmpty = true

            if (!register.lastName || register.lastName === "")
                lastNameEmpty = true

            if (!register.password || register.password === "")
                passwordEmpty = true

            if (!register.email || register.email === "")
                emailEmpty = true
            else if (!regex.test(register.email))
                emailError = true
            this.setState({ passwordEmpty, emailEmpty, emailError, firstNameEmpty, lastNameEmpty })

            return
        }

        this.setState({ isSumbit: true  , isSuccessRegister:false , registerErrorMesage:null})

        let request = {
            email : register.email,
            password : register.password,
            firstName : register.firstName,
            lastName : register.lastName,
            gender : register.gender

        }
        axios.post("https://api-dot-smile-heroes-21-api-v1.uc.r.appspot.com/user/register", request)
            .then(res => {
                this.setState({ isSuccessRegister: true, registerErrorMesage: null, isSumbit: false })
            }).catch(error =>
                this.setState({ isSuccessRegister: false, registerErrorMesage: error.response.data.messege, isSumbit: false })
            )

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
                                    {this.state.isSuccessRegister ? <div class="alert alert-success" role="alert">
                                         تم التسجيل بنجاح ، الرجاء تسجيل الدخول
                                        </div> : null}

                                    {this.state.registerErrorMesage ? <div class="alert alert-danger" role="alert">
                                        {this.state.registerErrorMesage}
                                    </div> : null}


                                    <div class="mb-3">
                                        <label className="label">الاسم الأول</label>
                                        <input type="text" onChange={this.onRegisterFirstNameChange} class="form-control" id="exampleFormControlInput1" placeholder='الاسم الأول' required />

                                        {this.state.firstNameEmpty ? <span className="error">الرجاء إدخال الاسم الأول</span> : null}


                                    </div>
                                    <div class="mb-3">
                                        <label className="label">الاسم الأخير</label>
                                        <input type="text" onChange={this.onRegisterLastNameChange} class="form-control" id="exampleFormControlInput1" placeholder='الاسم الأخير' required />

                                        {this.state.lastNameEmpty ? <span className="error">الرجاء إدخال الاسم الأخير</span> : null}


                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleFormControlInput1" className="label">البريد الإلكتروني</label>
                                        <input type="email" onChange={this.onRegisterEmailChange} class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" required />

                                        {this.state.emailError ? <span className="error">الرجاء إدخال بريد إلكتروني صحيح</span> : null}
                                        {this.state.emailEmpty ? <span className="error">الرجاء إدخال البريد إلكتروني</span> : null}

                                    </div>
                                    <div class="mb-3">
                                        <label className="label">كلمة المرور</label>
                                        <input type="password" onChange={this.onRegisterPasswordChange} class="form-control" id="exampleFormControlInput1" placeholder='كلمة المرور' required />

                                        {this.state.passwordEmpty ? <span className="error">الرجاء إدخال كلمة المرور</span> : null}

                                    </div>
                                    <select class="form-control form-control-lg" onChange={this.onRegisterGenderChange} onChange={this.onRegisterGenderChange} placeholder="ذكر / انثى" >
                                        <option value='M'>ذكر</option>
                                        <option value='F'>أنثى</option>
                                    </select>

                                    <br />

                                    <IonButton expand="block" disabled={this.state.isSubmit} onClick={this.register} type='submit' >تسجيل</IonButton>
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


export default Register