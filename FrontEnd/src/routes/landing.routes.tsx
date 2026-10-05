import type { RouteObject } from "react-router-dom";
import { LandingLayout } from "../components/templates/LandingTemplate";
import { LandingPage } from "../pages/LandingPage";

export const landingRoutes: RouteObject[] = [
 {
  path:"/",
  element:<LandingLayout/>,
  children:[
    {
      index:true,
      element:<LandingPage/>
    }
  ]
 }

];
