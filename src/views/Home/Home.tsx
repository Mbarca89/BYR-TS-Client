import style from './Home.module.css'
import Carousel from '../../components/Carousel/Carousel'
import inversiones from '../../img/inversiones.jpg'
import tasaciones from '../../img/tasaciones.png'
import servicios from '../../img/servicios.jpg'

const Home = () => {

 

    return (
        <div className={style.home}>
            <div className={style.carousel}>
                <Carousel></Carousel>
            </div>
            <div className={style.inversiones}>
                <article>
                    <img className={style.inversionesImg} src={inversiones} alt="inversiones" />
                    <h2>Inversiones</h2>
                    <p>En nuestra empresa, entendemos la importancia de las inversiones inteligentes. Sabemos que la compra de una propiedad puede ser una decisión financiera crucial, por lo que estamos aquí para brindarte el mejor asesoramiento. Nuestro equipo de agentes inmobiliarios altamente capacitados te guiará en cada paso del proceso de inversión. Ya sea que estés buscando una propiedad para obtener ingresos pasivos a través del alquiler o deseas encontrar oportunidades de reventa, estamos comprometidos en ayudarte a encontrar las mejores opciones de inversión en el mercado inmobiliario actual.
                    </p>
                </article>
            </div>
            <div className={style.tasaciones}>
                <article>
                    <img className={style.tasacionesImg} src={tasaciones} alt="tasaciones" />
                    <h2>Tasaciones</h2>
                    <p>Las tasaciones precisas son fundamentales cuando se trata de vender o comprar una propiedad. En nuestra empresa, nuestros agentes evaluarán minuciosamente cada propiedad para determinar su valor justo en el mercado. Utilizamos una combinación de metodologías probadas y datos actualizados para garantizar que obtengas una tasación precisa y confiable. Ya sea que estés interesado en vender tu propiedad o necesites conocer su valor para tomar decisiones financieras importantes, nuestros tasadores profesionales están aquí para brindarte un servicio confiable y transparente.
                    </p>
                </article>
            </div>
            <div className={style.servicios}>
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
