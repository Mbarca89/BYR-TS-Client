import style from './Footer.module.css'
import logo from '../../img/logo.webp'
import {CiLocationOn} from 'react-icons/ci'

const Footer = () => {

    return (
        <div className={style.footer}>
            <div className={style.disclaimer}>
                <div className={style.logo}>
                    <img src={logo} alt="B&R" />
                </div>
                <div className={style.text}>
                    <p>© B&R Desarrollos Inmobiliarios. Todos los derechos reservados.</p>
                    <p>Aviso: Toda la información y medidas provistas son aproximadas y deberán ratificarse con la documentación pertinente y no compromete contractualmente a nuestra empresa. Los precios y costos expresados refieren a la última información recabada y deberán confirmarse. Fotografías no vinculantes ni contractuales.</p>
                    <a href="https://goo.gl/maps/mcJEQ939gzahioMy8" target="_blank" rel="noopener noreferrer"> {<CiLocationOn/>}Las Heras 468, San Luis, Argentina</a>
                </div>
            </div>
        </div>
    )
}

export default Footer

