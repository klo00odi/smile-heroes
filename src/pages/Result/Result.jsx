import React, { Component } from 'react';
import { IonContent, IonButton, IonPage, IonSlides, IonSlide } from '@ionic/react';
import Logo from '../img/Logo.png'
import ParticlesBg from 'particles-bg'
import axios from 'axios';
import boyLogo from '../img/boy.png'
import girlLogo from '../img/girl.png'
import './Result.css'

class Result extends Component {

    constructor(props) {
        super(props)

        this.state = {
            day: '',
            week: '',
            month: '',
            total: ''
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
        }

        axios.post("https://api-dot-smile-heroes-21-api-v1.uc.r.appspot.com/secure/user/result",
            {
                email: localStorage.getItem("email"),
            }, {
            headers: headers
        }
        ).then(response => {
            let day = response.data.day
            let week = response.data.week
            let month = response.data.month
            let total = response.data.total
            this.setState({ day, week, month, total })
        })


    }

    render() {

        const slideOpts = {
            initialSlide: 0,
            speed: 400,
            allowSlidePrev:true,
            allowSlideNext:true
        };

        return (
            <IonPage>
                <IonContent fullscreen>
                    <ParticlesBg type="circle" color='random' bg={true} />
                    <div class='contentDisplay' style={{ opacity: 0.85 }}>
                        <ion-card>
                            <img style={{ width: '55%', margin: '0% 25%' }} src={Logo} />
                            <hr />
                            <ion-card-header>
                                <ion-card-subtitle>
                                    <IonSlides pager={true} options={slideOpts}>
                                        <IonSlide>
                                            <div className="result">
                                                <h2> عدد مرات التفريش لهذا الكلي</h2>
                                                <br />
                                                <h1 style={{ color: '#4db6ac' }}>{this.state.total}</h1>
                                            </div>

                                        </IonSlide>
                                        <IonSlide>
                                            <div className="result">
                                                <h2> عدد مرات التفريش لهذا الشهر</h2>
                                                <br />
                                                <h1 style={{ color: "#ff9e4b" }}>{this.state.month}</h1>
                                            </div>

                                        </IonSlide>
                                        <IonSlide>
                                            <div className="result">
                                                <h2> عدد مرات التفريش لهذا الأسبوع</h2>
                                                <br />
                                                <h1 style={{ color: "#105ea9" }}>{this.state.week}</h1>
                                            </div>

                                        </IonSlide>
                                        <IonSlide>
                                            <div className="result">
                                                <h2> عدد مرات التفريش لهذا اليوم</h2>
                                                <br />
                                                <h1 style={{ color: "#e26a6a"  }}>{this.state.day}</h1>
                                            </div>
                                        </IonSlide>
                                    </IonSlides>
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

export default Result;
