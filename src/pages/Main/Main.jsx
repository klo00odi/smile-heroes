import React, { Component } from 'react';
import { IonContent, IonButton, IonPage, IonAlert } from '@ionic/react';
import Logo from '../img/Logo.png'
import ParticlesBg from 'particles-bg'
import axios from 'axios';
import boyLogo from '../img/boy.png'
import girlLogo from '../img/girl.png'
import './Main.css'

class Main extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoggin: localStorage.getItem("token") !== null,
            user: {
                gender: localStorage.getItem("gender"),
                firstName: localStorage.getItem("firstName"),
                lastName: localStorage.getItem("lastName"),
                email: localStorage.getItem("email")
            },
            isBrush: false,
            today: "",
            count: 0,
            words: [
                "أحسنت يا بطل ،، وداعا للتسوس",
                "أسنانك الآن نظيفة ولامعة",
                "تم حماية أسنانك من التسوس",
                "أسنانك الآن أقوى",
                "أهلاً بعودتك بطلنا ",
                "لقد حافظت على اسنانك بكل سهوله!",
                "بوركت أيها الدكتور الصغير",
                "تبدو إبتسامتك أنيقه !",
                "فاجئ طبيب أسنانك بالتغيير !",
                "رائحة فمك الان منعشه!",
                "أحســـنت لأنك قمت بالحفاظ على اسنانك ..",
            ],
            showModal: false
        }

        //    this.changeDisplayModal = this.changeDisplayModal.bind(this);
        this.getUserDetails = this.getUserDetails.bind(this)
        this.isBrush = this.isBrush.bind(this)

    }

    componentDidMount() {
        this.getUserDetails()
        this.isBrush()
    }

    getUserDetails = () => {

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
        }

        axios.get("https://api-dot-smile-heroes-21-api-v1.uc.r.appspot.com/secure/user/today", {
            headers: headers
        }).then(res => this.setState({ today: res.data }))

        axios.post("https://api-dot-smile-heroes-21-api-v1.uc.r.appspot.com/secure/user/result",
            {
                email: this.state.user.email,
            }, {
            headers: headers
        }
        ).then(response => {
            this.setState({ count: response.data.day })
        })
    }

    isBrush = () => {

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
        }

        axios.post("https://api-dot-smile-heroes-21-api-v1.uc.r.appspot.com/secure/user/isBrush",
            {
                email: this.state.user.email,
            }, {
            headers: headers
        }
        ).then(response => {
            this.getUserDetails()
            this.setState({ isBrush: response.data })
        })
    }

    brush = () => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
        }

        axios.post("https://api-dot-smile-heroes-21-api-v1.uc.r.appspot.com/secure/user/brush",
            {
                email: this.state.user.email,
            }, {
            headers: headers
        }).then(res => {
            this.setState({ showModal: true })
            this.isBrush()
        })

    }


    render() {

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
                                    <img src={this.state.user.gender == "M" ? boyLogo : girlLogo} className="imgLogo" />
                                    <h6><b>مرحبا ، {this.state.user.firstName + " " + this.state.user.lastName}</b></h6>
                                    <hr />
                                    <h5><b>هل فرشت أسنانك لهذا اليوم {this.state.today} ؟ </b> </h5>
                                    <br />
                                    <IonButton shape="round" disabled={this.state.isBrush} expand="full" onClick={this.brush}><h4>نــعــم</h4></IonButton>
                                    <br />
                                    <p style={{ fontSize: '1.8em', fontWeight: '200' }}>تم التفريش <b>{this.state.count}</b> مرة / مرات لهذا اليوم</p>

                                </ion-card-subtitle>
                                <ion-card-title>
                                </ion-card-title>
                            </ion-card-header>

                            <IonAlert
                                isOpen={this.state.showModal}
                                onDidDismiss={() => this.setState({ showModal: !this.state.showModal })}
                                cssClass='my-custom-class'
                                header={this.state.words[Math.floor(Math.random() * 10)]}
                                subHeader={''}
                                message={''}
                                buttons={['حسنا']}
                            />

                        </ion-card>
                    </div>
                </IonContent>

            </IonPage>
        )

    }
}

export default Main;
