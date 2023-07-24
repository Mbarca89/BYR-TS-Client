import style from './About.module.css'
const banner = require('../../img/banner.webp')
const about = require('../../img/about.webp')
const renzoybruno = require('../../img/renzoybruno.webp')
const bruno = require('../../img/bruno.webp')
const renzo = require('../../img/renzo.webp')

const About = () => {

    return (
        <div className={style.about}>
            <img className={style.banner} src={banner} alt="" />
            <div className={style.aboutUs}>
                <div className={style.line}></div>
                <div className={style.company}>
                    <article>
                        <img src={about} alt="" />
                        <h1>Quienes Somos</h1>
                        <p>Somos una empresa joven, con el objetivo de satisfacer las necesidades de nuestros clientes, en cada operación inmobiliaria.
                            Estudiamos cada caso para satisfacer cualquier necesidad; alquileres, tasaciones y ventas de viviendas, locales comerciales, campos, galpones, buscaremos lo que más se adapte a las necesidades y posibilidades en cada caso, aportando nuestro conocimiento para cumplir su sueño.</p>
                    </article>
                </div>
                <div className={style.line}></div>
                <div className={style.us}>
                    <div className={style.bruno}>
                        <img src={bruno} alt="" />
                        <div className={style.brunoContainer}>
                            <h1>Bruno Proto</h1>
                            <h5>Agente Inmobiliario.</h5>
                            <h5>Martillero Público.</h5>
                            <h5>Matrícula N° 808.</h5>
                        </div>
                    </div>
                    <div className={style.uslLine}></div>
                    <div className={style.renzo}>
                        <div className={style.renzoContainer}>
                            <h1>Renzo Proto</h1>
                            <h5>Administrativo Inmobiliario.</h5>
                            <h5>Lic. En Administración de Empresas.</h5>
                        </div>
                        <img src={renzo} alt="" />
                    </div>
                </div>
                <div className={style.line}></div>
                <div className={style.mision}>
                    <article>
                        <img src={renzoybruno} alt="" />
                        <h1>Misión</h1>
                        <p>Ofrecer Servicios de excelencia inmobiliaria a nuestros clientes, logrando construir relaciones a largo plazo, adaptando nuestros servicios a las exigencias y necesidades de los mismos y adecuándonos al dinamismo del mercado, con el objetivo de brindar el mejor servicio.</p>
                        <h1>Visión</h1>
                        <p>Situar a ByR Desarrollos inmobiliarios como una empresa líder en el mercado de bienes raíces, siendo referencia de profesionalismo y compromiso. </p>
                        <h1>Valores</h1>
                        <p>Pasión.
                            Compromiso.
                            Profesionalismo.
                            Excelencia.</p>
                    </article>
                </div>
                <div className={style.line}></div>
            </div>

        </div>
    )
}

export default About