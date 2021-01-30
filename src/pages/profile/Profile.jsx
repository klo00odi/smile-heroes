import React, { Component } from 'react';
import { IonContent, IonButton, IonPage, IonAlert } from '@ionic/react';
import Logo from '../img/Logo.png'
import ParticlesBg from 'particles-bg'
import axios from 'axios';
import boyLogo from '../img/boy.png'
import girlLogo from '../img/girl.png'
import './Profile.css'

class Profile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user: {
                gender: localStorage.getItem("gender"),
                firstName: localStorage.getItem("firstName"),
                lastName: localStorage.getItem("lastName"),
                email: localStorage.getItem("email"),
                created: localStorage.getItem("created")
            },
        }


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
                                    <h6> <b>الاسم : </b></h6>
                                    <h5> <b>{this.state.user.firstName + " " + this.state.user.lastName} </b></h5>
                                    <br/>

                                    <h6> <b>البريد الإلكتروني : </b></h6>
                                    <h5> <b> {this.state.user.email}</b> </h5>
                                    <br/>

                                    <h6> <b>تاريخ الانضمام : </b></h6>
                                    <h5> <b> {this.state.user.created} </b> </h5>
                                    
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

export default Profile;
