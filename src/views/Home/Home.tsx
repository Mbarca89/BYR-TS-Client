import style from './Home.module.css'
import MainCarousel from '../../components/Carousel/MainCarousel'
import inversiones from '../../img/inversiones.webp'
import tasaciones from '../../img/tasaciones.webp'
import servicios from '../../img/servicios.webp'
import loadingGif from '../../img/loading.gif'
import { useEffect, useState } from 'react'
import LastCarousel from '../../components/LastCarousel/LastCarousel'
import AOS from 'aos'
import 'aos/dist/aos.css'

const Home = () => { 

    const [loading, setLoading] = useState<boolean>(true)

    useEffect(()=> {
        setTimeout(() => setLoading(false),900)
        AOS.init({ duration: 500 })
        return () => {
            setLoading(true)
        }
    },[])

    return (
        <div className={style.home}>
            {loading && <div  className={style.loading}>
                <img src={loadingGif} alt=''></img>
            </div>}
            <div className={style.title}>
                <h1>Propiedades destadacas.</h1>
            </div>
            <div className={style.carousel}>
                <MainCarousel></MainCarousel>
            </div>
            <div className={style.title2}>
                <h1>Últimas publicaciones.</h1>
            </div>
            <div className={style.lastCarousel}>
                <LastCarousel></LastCarousel>
            </div>
            <div className={style.title2}>
                <h1>Empresa</h1>
            </div>
            <div className={style.inversiones} data-aos='fade-left' data-aos-offset='250'>
                <article>
                    <img className={style.inversionesImg} src={inversiones} alt="inversiones" />
                    <h2>Inversiones</h2>
                    <p>En nuestra empresa, entendemos la importancia de las inversiones inteligentes. Sabemos que la compra de una propiedad puede ser una decisión financiera crucial, por lo que estamos aquí para brindarte el mejor asesoramiento. Nuestro equipo de agentes inmobiliarios altamente capacitados te guiará en cada paso del proceso de inversión. Ya sea que estés buscando una propiedad para obtener ingresos pasivos a través del alquiler o deseas encontrar oportunidades de reventa, estamos comprometidos en ayudarte a encontrar las mejores opciones de inversión en el mercado inmobiliario actual.
                    </p>
                </article>
            </div>
            <div className={style.tasaciones} data-aos='fade-right' data-aos-offset='250'>
                <article>
                    <img className={style.tasacionesImg} src={tasaciones} alt="tasaciones" />
                    <h2>Tasaciones</h2>
                    <p>Las tasaciones precisas son fundamentales cuando se trata de vender o comprar una propiedad. En nuestra empresa, nuestros agentes evaluarán minuciosamente cada propiedad para determinar su valor justo en el mercado. Utilizamos una combinación de metodologías probadas y datos actualizados para garantizar que obtengas una tasación precisa y confiable. Ya sea que estés interesado en vender tu propiedad o necesites conocer su valor para tomar decisiones financieras importantes, nuestros tasadores profesionales están aquí para brindarte un servicio confiable y transparente.
                    </p>
                </article>
            </div>
            <div className={style.servicios} data-aos='fade-left' data-aos-offset='250'>
                <article>
                    <img className={style.serviciosImg} src={servicios} alt="inversiones" />
                    <h2>Servicios</h2>
                    <p>En nuestra empresa, nos enorgullece ofrecer una amplia gama de servicios para satisfacer todas tus necesidades inmobiliarias. Ya sea que estés buscando comprar, vender o alquilar una propiedad, nuestro equipo de agentes inmobiliarios altamente calificados está listo para ayudarte. Además, ofrecemos servicios de asesoramiento financiero, asistencia en trámites legales y de documentación, y una sólida red de contactos en la industria inmobiliaria. Nuestra misión es proporcionar un servicio integral y personalizado para hacer que tu experiencia inmobiliaria sea lo más eficiente y exitosa posible.
                    </p>
                </article>
            </div>
        </div>
    )
}

export default Home
