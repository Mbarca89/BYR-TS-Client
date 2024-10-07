import style from './Nav.module.css'
import { NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { GrFormClose } from 'react-icons/gr'

const Nav = () => {

    const [mobile, setMobile] = useState<boolean>(false)
    const [desktopMid, setDesktopMid] = useState<boolean>(false)
    const [showNav, setShowNav] = useState<boolean>(false)
    const location = useLocation()

    useEffect(() => {
        window.innerWidth < 576 && setMobile(true)
        if ((window.innerWidth > 500 && window.innerWidth < 1025)) setDesktopMid(true)
    }, [window.innerWidth])

    const showNavHandler = () => {
        setShowNav(!showNav)
    }

    if (mobile) return (
        <div className={`${style.header} ${location.pathname === '/propiedades' && style.headerBanner}`} >
            <div className={style.menu} onClick={showNavHandler}>
                {!showNav ?
                    <GiHamburgerMenu size={35} color={'#4a4a4a'} style={{ marginTop: '3%', marginLeft: '3%', cursor: 'pointer' }} />
                    : <GrFormClose size={35} color={'#4a4a4a'} style={{ marginTop: '3%', marginLeft: '3%', cursor: 'pointer' }} />}
            </div>
            <div className={style.logoContainer}>
                <NavLink to='/'>
                    <img className={style.logo} src='/images/logo.webp' alt='B&R Inmobiliaria' />
                </NavLink>
            </div>
            <div className={style.socialContainer}>
                <a className={style.social} href={`https://www.instagram.com/byrinmobiliaria/`} target="_blank" rel="noopener noreferrer">
                    <img src='/images/instagram.webp' alt='B&R Inmobiliaria'></img>
                </a>
                <a className={style.social} href={`https://www.facebook.com/ByRdesarrollosinmobiliarios`} target="_blank" rel="noopener noreferrer">
                    <img src='/images/facebook.webp' alt='B&R Inmobiliaria'></img>
                </a>
                <a className={style.social} href={`https://api.whatsapp.com/send?phone=5492664570187&text=Hola, Necesito asesoramiento sobre una propiedad`} target="_blank" rel="noopener noreferrer">
                    <img src='/images/whatsapp.webp' alt='B&R Inmobiliaria'></img>
                </a>
            </div>
            <div className={showNav ? style.nav : style.noNav}>
                <div className={style.line}></div>
                <div className={style.buttonContainer} onClick={showNavHandler}>
                    <NavLink to='/' className={location.pathname === '/' ? style.buttonActive : style.button}>Inicio</NavLink>
                    <NavLink to='/propiedades' className={location.pathname === '/propiedades' ? style.buttonActive : style.button}>Propiedades</NavLink>
                    <NavLink to='/tasaciones' className={location.pathname === '/tasaciones' ? style.buttonActive : style.button}>Tasaciones</NavLink>
                    <NavLink to='/empresa' className={location.pathname === '/empresa' ? style.buttonActive : style.button}>Empresa</NavLink>
                </div>
                <div className={style.line} />
            </div>
        </div>
    )

    return (
        <div className={style.header} style={location.pathname === '/propiedades' ? { backgroundColor: 'transparent', height: '20vh' } : undefined}>
            <div className={style.menu} onClick={showNavHandler}>
                {!showNav ?
                    <GiHamburgerMenu size={35} color={'#4a4a4a'} style={{ marginTop: '3%', marginLeft: '3%', cursor: 'pointer' }} />
                    : <GrFormClose size={35} color={'#4a4a4a'} style={{ marginTop: '3%', marginLeft: '3%', cursor: 'pointer' }} />}
            </div>
            <div className={showNav ? style.nav : style.noNav}>
                <div className={style.logoContainer}>
                    <NavLink to='/'>
                        <img className={style.logo} src='/images/logo.webp' alt='B&R Inmobiliaria' />
                    </NavLink>
                </div>
                <div className={style.line}></div>
                <div className={style.buttonContainer} onClick={showNavHandler}>
                    <NavLink to='/' className={location.pathname === '/' ? style.buttonActive : style.button}>Inicio</NavLink>
                    <NavLink to='/propiedades' className={location.pathname === '/propiedades' ? style.buttonActive : style.button}>Propiedades</NavLink>
                    <NavLink to='/tasaciones' className={location.pathname === '/tasaciones' ? style.buttonActive : style.button}>Tasaciones</NavLink>
                    <NavLink to='/empresa' className={location.pathname === '/empresa' ? style.buttonActive : style.button}>¿Quienes somos?</NavLink>
                </div>
                <div className={style.line} />
                <div className={style.socialContainer}>
                    <a className={style.social} href={`https://www.instagram.com/byrinmobiliaria/`} target="_blank" rel="noopener noreferrer">
                        <img src='/images/instagram.webp' alt='B&R Inmobiliaria'></img>
                    </a>
                    <a className={style.social} href={`https://www.facebook.com/ByRdesarrollosinmobiliarios`} target="_blank" rel="noopener noreferrer">
                        <img src='/images/facebook.webp' alt='B&R Inmobiliaria'></img>
                    </a>
                    <a className={style.social} href={`https://api.whatsapp.com/send?phone=5492664570187&text=Hola, Necesito asesoramiento sobre una propiedad`} target="_blank" rel="noopener noreferrer">
                        <img src='/images/whatsapp.webp' alt='B&R Inmobiliaria'></img>
                    </a>
                </div>
                <div className={style.phone}>
                    <img src='/images/phone.webp' alt="" />
                    <a href="tel:+549 266 570187">
                        <p>+549 266 570187</p>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Nav

