import style from './Footer.module.css'
import logo from '../../img/logo.webp'

const Footer = () => {

    return (
        <div className={style.footer}>
            <div className={style.disclaimer}>
                <div className={style.logo}>
                    <img src={logo} alt="B&R" />
                </div>
                <div className={style.text}>
                    <p>© B&R Desarrollos Inmobiliarios. Todos los derechos reservados.</p>
                    <a href="https://www.argentina.gob.ar/justicia/derechofacil/leysimple/alquileres">Ley simple: Alquileres</a>
                </div>
            </div>
        </div>
    )
}

export default Footer

