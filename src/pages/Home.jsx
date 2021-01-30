import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonPage
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { personSharp, personAddSharp , homeSharp , clipboardSharp , ribbonSharp , logInSharp , logOutSharp} from 'ionicons/icons';
import Login from './Login/Login'
import Register from './Register/Register'
import Main from './Main/Main'
import Profile from './profile/Profile'
import './Home.css'


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import '../theme/variables.css';
import Result from './Result/Result';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isLoggin : localStorage.getItem("token") !== null    }
  }

  isLogin = () => {
    this.setState({ isLoggin: true })
  }

  logout = ()=>{
    localStorage.removeItem("token")
    window.location.reload();
  }

  render() {

    if (!localStorage.getItem("token")) {
      return (
        <IonApp>
          <IonPage>
            <IonReactRouter>
              <IonTabs>
                <IonRouterOutlet>
                  <Route path="/login" component={Login} exact={true} />
                  <Route path="/register" component={Register} exact={true} />
                  <Route path="/" render={() => <Redirect to="/login" />} exact={true} />
                  <Route render={() => <Redirect to="/login" />} exact={true} />
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                  <IonTabButton tab="login" href="/login">
                    <IonIcon icon={logInSharp} />
                    <IonLabel>تسجيل الدخول</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="register" href="/register">
                    <IonIcon icon={personAddSharp} />
                    <IonLabel>تسجيل</IonLabel>
                  </IonTabButton>
                </IonTabBar>
              </IonTabs>
            </IonReactRouter>
          </IonPage>
        </IonApp >
      )
    }
    else {
      return (
        <IonApp>
          <IonPage>
            <IonReactRouter>
              <IonTabs>
                <IonRouterOutlet>
                  <Route path="/home" component={Main} exact={true} />
                  <Route path="/profile" component={Profile} exact={true} />
                  <Route path="/result" component={Result} exact={true} />
                  <Route path="/logout" render={() =>{ this.logout(); return <Redirect to="/" />} } />
                  <Route path="/" render={() => <Redirect to="/home" />} exact={true} />
                  <Route render={() => <Redirect to="/home" />} exact={true} />
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                  <IonTabButton tab="home" href="/home">
                    <IonIcon icon={homeSharp} />
                    <IonLabel>الرئيسية</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="profile" href="/profile">
                    <IonIcon icon={clipboardSharp} />
                    <IonLabel>الملف الشخصي</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="result" href="/result">
                    <IonIcon icon={ribbonSharp} />
                    <IonLabel>النتائج</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="logout" href="/logout">
                    <IonIcon icon={logOutSharp} />
                    <IonLabel>خروج</IonLabel>
                  </IonTabButton>
                </IonTabBar>
              </IonTabs>
            </IonReactRouter>
          </IonPage>
        </IonApp >
      )
    }

  }
}

export default App;
