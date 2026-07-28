import Dashboard from "@/components/Dashboard";
import Loading from "@/components/Loading";
import Login from "@/components/Login";
import Main from "@/components/Main";
import { useAuth } from "@/Context/AuthContext";

export const metadata = {
  title: "Next - Dashboard",
  description: "",
};

export default function dashboardpage(){
   
    return(
    <Main>
      <Dashboard></Dashboard>
    </Main>
    );
}