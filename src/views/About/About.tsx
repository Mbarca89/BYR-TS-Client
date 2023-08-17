import { useEffect, useState } from 'react'
import style from './About.module.css'
import loadingGif from '../../img/loading.gif'
const banner = require('../../img/banner.webp')
const about = require('../../img/about.webp')
const renzoybruno = require('../../img/renzoybruno.webp')
const bruno = require('../../img/bruno.webp')
const renzo = require('../../img/renzo.webp')

const About = () => {

    const [loading, setLoading] = useState<boolean>(true)

    useEffect(()=> {
        setTimeout(() => setLoading(false),900)
        return () => {
            setLoading(true)
        }
    },[])

    return (
        <div className={style.about}>
            {loading && <div  className={style.loading}>
                <img src={loadingGif} alt=''></img>
            </div>}
            <div className={style.banner} style={{backgroundImage: `url(${banner})`}}/>
            <div className={style.aboutUs}>
                <div className={style.line}></div>
                <div className={style.company}>
                    <article>
                        <img src={about} alt="" />
                        <h1>Quienes Somos</h1>
                        <p>Somos una empresa familiar, abocados a brindar un servicio inmobiliario de calidad, donde buscamos comprender las necesidades de nuestros clientes.</p>
                    </article>
                </div>
                <div className={style.line}></div>
                <div className={style.us}>
                    <div className={style.bruno}>
                        <img src={bruno} alt="" />
                        <div className={style.brunoContainer}>
                            <h2>Bruno Proto</h2>
                            <h5>Agente Inmobiliario.</h5>
                            <h5>Martillero Público.</h5>
                            <h5>Matrícula N° 808.</h5>
                        </div>
                    </div>
                    <div className={style.usLine}></div>
                    <div className={style.renzo}>
                        <div className={style.renzoContainer}>
                            <h2>Renzo Proto</h2>
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
                        <h3>Misión</h3>
                        <p>Ofrecer Servicios de excelencia inmobiliaria a nuestros clientes, logrando construir relaciones a largo plazo, adaptando nuestros servicios a las exigencias y necesidades de los mismos y adecuándonos al dinamismo del mercado, con el objetivo de brindar el mejor servicio.</p>
                        <h3>Visión</h3>
                        <p>Situar a ByR Desarrollos inmobiliarios como una empresa líder en el mercado de bienes raíces, siendo referencia de profesionalismo y compromiso. </p>
                        <h3>Valores</h3>
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