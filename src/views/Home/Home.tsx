import style from './Home.module.css'
import MainCarousel from '../../components/Carousel/MainCarousel'
import inversiones from '../../img/inversiones.webp'
import tasaciones from '../../img/tasaciones.webp'
import servicios from '../../img/servicios.webp'
import loadingGif from '../../img/loading.gif'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LastCarousel from '../../components/LastCarousel/LastCarousel'
import { MouseEvent, ChangeEvent } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

interface Filters {
    type: string,
    category: string,
    location: string
}

const Home = () => {

    const navigate = useNavigate()

    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setTimeout(() => setLoading(false), 900)
        AOS.init({ duration: 500 })
        return () => {
            setLoading(true)
        }
    }, [])

    const [showType, setShowType] = useState<boolean>(false)
    const [showLocation, setShowLocation] = useState<boolean>(false)
    const [filters, setFilters] = useState<Filters>({
        type: 'Seleccionar',
        category: 'Venta',
        location: 'Seleccionar'
    })

    const categoryHandler = (event: MouseEvent<HTMLButtonElement>) => {
        const target = event.target as HTMLButtonElement
        setFilters({
            ...filters,
            category: target.name
        })
    }

    const showTypeHandler = (event: MouseEvent<HTMLButtonElement>) => {
        const target = event.target as HTMLButtonElement
        if (target.name !== 'type') {
            setFilters({
                ...filters,
                type: target.name
            })
        }
        setShowType(!showType)
    }

    const showLocationHandler = (event: MouseEvent<HTMLButtonElement>) => {
        const target = event.target as HTMLButtonElement
        if (target.name !== 'location') {
            setFilters({
                ...filters,
                location: target.name
            })
        }
        setShowLocation(!showLocation)
    }

    const closeLocation = () => {
        console.log('anda')
        setShowLocation(false);
    }

    return (
        <div className={style.home}>
            {loading && <div className={style.loading}>
                <img src={loadingGif} alt=''></img>
            </div>}
            <div className={style.title}>
                <h1>Propiedades destadacas.</h1>
            </div>
            <div className={style.carousel}>
                <MainCarousel></MainCarousel>
            </div>
            <div className={style.title}>
                <h1>Encontrá tu propiedad.</h1>
            </div>
            <div className={style.search}>
                <div className={style.typeFilter}>
                    <h5>Tipo de operación</h5>
                    <div className={style.typeContainer}>
                        <button name='Venta' className={filters.category === 'Venta' ? style.typeButtonActive : style.typeButton} onClick={categoryHandler}>Venta</button>
                        <button name='Alquiler' className={filters.category === 'Alquiler' ? style.typeButtonActive : style.typeButton} onClick={categoryHandler}>Alquiler</button>
                    </div>
                </div>
                <div className={style.filters}>
                    <div className={style.filtersHeaders}>
                        <h5>Tipo de propiedad</h5>
                        <h5>Ubicación</h5>
                    </div>
                    <div className={style.filterContainer}>
                        <button name='type' onClick={showTypeHandler} className={showType ? style.filterButtonActive : style.filterButton}>{filters.type}</button>
                        <button name='location' onClick={showLocationHandler} className={showLocation ? style.filterButtonActive : style.filterButton}>{filters.location}</button>
                    </div>
                    <div className={style.selectors}>
                        <div className={style.type} style={showType ? { height: '45vh' } : { height: 0 }}>
                            <div className={style.selector}>
                                <button name='Casa' onClick={showTypeHandler}>Casa</button>
                            </div>
                            <div className={style.selector}>
                                <button onClick={showTypeHandler} name='Departamento'>Departamento</button>
                            </div>
                            <div className={style.selector}>
                                <button onClick={showTypeHandler} name='Terreno'>Terreno</button>
                            </div>
                            <div className={style.selector}>
                                <button onClick={showTypeHandler} name='Cabaña'>Cabaña</button>
                            </div>
                            <div className={style.selector}>
                                <button onClick={showTypeHandler} name='Campo'>Campo</button>
                            </div>
                            <div className={style.selector}>
                                <button onClick={showTypeHandler} name='Cochera'>Cochera</button>
                            </div>
                            <div className={style.selector}>
                                <button onClick={showTypeHandler} name='Complejo'>Complejo</button>
                            </div>
                            <div className={style.selector}>
                                <button onClick={showTypeHandler} name='Deposito'>Deposito</button>
                            </div>
                            <div className={style.selector}>
                                <button onClick={showTypeHandler} name='Duplex'>Duplex</button>
                            </div>
                            <div className={style.selector}>
                                <button onClick={showTypeHandler} name='Fondo de comercio'>Fondo de comercio</button>
                            </div>
                            <div className={style.selector}>
                                <button onClick={showTypeHandler} name='Galpon'>Galpon</button>
                            </div>
                            <div className={style.selector}>
                                <button onClick={showTypeHandler} name='Hotel'>Hotel</button>
                            </div>
                            <div className={style.selector}>
                                <button onClick={showTypeHandler} name='Local'>Local</button>
                            </div>
                            <div className={style.selector}>
                                <button onClick={showTypeHandler} name='Loteo'>Loteo</button>
                            </div>
                            <div className={style.selector}>
                                <button onClick={showTypeHandler} name='Monoambiente'>Monoambiente</button>
                            </div>
                            <div className={style.selector}>
                                <button onClick={showTypeHandler} name='Oficina'>Oficina</button>
                            </div>
                        </div>
                        <div className={style.location} style={showLocation ? { height: '35vh' } : { height: 0 }} onBlur={closeLocation}>
                            <div className={style.locationSelector}>
                                <button onClick={showLocationHandler} name='San Luis'>San Luis</button>
                            </div>
                            <div className={style.locationSelector}>
                                <button onClick={showLocationHandler} name='Juana Koslay'>Juana Koslay</button>
                            </div>
                            <div className={style.locationSelector}>
                                <button onClick={showLocationHandler} name='Potrero de los Funes'>Potrero de los Funes</button>
                            </div>
                            <div className={style.locationSelector}>
                                <button onClick={showLocationHandler} name='El Volcan'>El Volcan</button>
                            </div>
                            <div className={style.locationSelector}>
                                <button onClick={showLocationHandler} name='Estancia Grande'>Estancia Grande</button>
                            </div>
                            <div className={style.locationSelector}>
                                <button onClick={showLocationHandler} name='El Trapiche'>El Trapiche</button>
                            </div>
                            <div className={style.locationSelector}>
                                <button onClick={showLocationHandler} name='La Florida'>La Florida</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.buttonContainer}>
                    <button onClick={() => navigate(`/propiedades?category=${filters.category}&type=${filters.type}&location=${filters.location}`)}>Buscar</button>
                </div>
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
