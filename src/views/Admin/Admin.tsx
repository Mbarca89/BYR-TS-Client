import style from './Admin.module.css'
import { useState, useEffect } from 'react'
import Uploader from '../../components/Uploader/Uploader'
import List from '../../components/List/List'
import { ChangeEvent, MouseEvent } from 'react'
import { notifyError, notifySuccess } from '../../components/Toaster/Toaster'
import { log } from 'console'
const logo = require('../../img/logo.webp')
const ADMIN_USER = process.env.REACT_APP_ADMIN_USER
const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD

const Admin = () => {

    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user) setLogged(true)
    }, [])

    const [logged, setLogged] = useState<boolean>(false)
    const [remember, setRemember] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState<string>('home')
    const [loginData, setLoginData] = useState({
        user: '',
        password: ''
    })
    const [loginError, setLoginError] = useState('')

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value
        })
        setLoginError('')
    }

    const loginHandler = (event: MouseEvent<HTMLButtonElement>) => {
        const target = event.target as HTMLButtonElement
        if (loginData.user === ADMIN_USER && loginData.password === ADMIN_PASSWORD) {
            setLogged(true)
            if (remember) localStorage.setItem('user', 'ByR')
        } else notifyError('Usuario o contraseña incorrecta')
        if (target.name === 'logout') {
            setLogged(false)
            setLoginData({
                user: '',
                password: ''
            })
            localStorage.removeItem('user')
        }
    }

    const navigate = (event: MouseEvent<HTMLButtonElement>) => {
        const target = event.target as HTMLButtonElement
        setCurrentPage(target.name)
    }

    const rememberHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) setRemember(true)
        else setRemember(false)
    }

    return (!logged ?
        <div className={style.admin}>
            <h1>Admin Login</h1>
            <div className={style.adminLogin}>
                <input type="text" name='user' placeholder='Usuario' value={loginData.user} onChange={changeHandler} />
                <input type="password" name="password" placeholder='Contraseña' value={loginData.password} onChange={changeHandler} />
                <div>
                    <input type="checkbox" name="remember" id="" onChange={rememberHandler} />
                    <label htmlFor="remember">Recordarme</label>
                </div>
                <button onClick={loginHandler}>Entrar</button>
                {loginError && <h1>{loginError}</h1>}
            </div>
        </div>
        :
        <div className={style.controlPanel}>
            <div className={style.nav}>
                <div className={style.logoContainer}>
                    <img src={logo} alt="" />
                </div>
                <div className={style.buttonContainer}>
                    <button name='home' onClick={navigate}>Inicio</button>
                    <button name='uploader' onClick={navigate}>Cargar Propiedad</button>
                    <button name='list' onClick={navigate}>Ver Propiedades</button>
                    <button name='logout' onClick={loginHandler}>Salir</button>
                </div>
            </div>
            {currentPage === 'home' && <div className={style.home}><h1>Panel de administrador</h1><img src={logo} alt="" /></div>}
            {currentPage === 'uploader' && <Uploader />}
            {currentPage === 'list' && <List />}
        </div>
    )
}

export default Admin