import { Redirect, Route, RouteComponentProps } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { settings, people, scan } from "ionicons/icons";
import { Scan } from "./pages/Scan";
import Tab3 from "./pages/Tab3";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { StudentProfile } from "./pages/students/StudentProfile";
import { ReactNode } from "react";
import { StudentsListPage } from "./pages/students/StudentsList";

setupIonicReact();

interface TabRoute {
  tab: string;
  path?: string;
  component: React.FC<RouteComponentProps>;
}
interface MobileTab extends TabRoute {
  icon: string;
  label: string;
}

const studentNestedRoutes = [
  {
    tab: "students",
    path: "/:studentId",
    component: StudentProfile,
  },
];

const tabs: MobileTab[] = [
  {
    tab: "students",
    component: StudentsListPage,
    icon: people,
    label: "Students",
  },
  {
    tab: "scan",
    component: Scan,
    icon: scan,
    label: "Scan",
  },
  {
    tab: "settings",
    component: Tab3,
    icon: settings,
    label: "Settings",
  },
];

const toTabRoute = ({ tab, path = "", component }: TabRoute): ReactNode => (
  <Route
    key={path !== "" ? path : tab}
    path={`/:tab(${tab})${path}`}
    component={component}
    exact
  />
);

const toTabButton = ({ icon, label, tab, path = "" }: MobileTab) => (
  <IonTabButton key={path !== "" ? path : tab} tab={tab} href={`/${tab}`}>
    <IonIcon icon={icon} />
    <IonLabel>{label}</IonLabel>
  </IonTabButton>
);

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            {tabs.map(toTabRoute)}
            {studentNestedRoutes.map(toTabRoute)}
            <Redirect to="/students" />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">{tabs.map(toTabButton)}</IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
