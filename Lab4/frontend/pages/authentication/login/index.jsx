import Header from "../../../component/layout/header"
import LoginForm from "./loginForm"

const LoginPage = () => {
    return(
        <>
        <div style={{display: 'flex'}}>
            <div>
                <Header/>
            </div>
            <div style={{ justifyContent: 'center',alignItems: 'center', minHeight: '100vh', minWidth: '100%', display: 'flex'}}>
                <LoginForm/>
            </div>
        </div>
        </>
    )
}

export default LoginPage