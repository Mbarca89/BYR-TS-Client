import style from './Properties.module.css'
import Property from '../../components/Property/Property'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useFilter } from '../../hooks/useFilter'
import Pagination from './Pagination';
import { PropertyDetailType } from '../../types'
import { MouseEvent, ChangeEvent } from 'react'
import { notifyError } from '../../components/Toaster/Toaster'

const SERVER_URL = process.env.REACT_APP_SERVER_URL

interface Filters {
    type: string,
    category: string,
    location: string
}

const Properties = () => {

    const queryFilters = new URLSearchParams(window.location.search)

    const [loaded, setLoaded] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [data, setData] = useState<PropertyDetailType[]>([{
        id: '',
        name: '',
        description: '',
        type: '',
        category: '',
        price: 0,
        currency: '',
        location: '',
        size: 0,
        constructed: 0,
        bedrooms: 0,
        bathrooms: 0,
        kitchen: 0,
        garage: 0,
        others: [],
        services: [],
        amenities: [],
        featured: true,
        images: []
    }])
    const [currentPage, setCurrentPage] = useState(1)
    const cardsPerPage = 6
    const lastCardIndex = currentPage * cardsPerPage
    const firstCardIndex = lastCardIndex - cardsPerPage
    const [showData, setShowData] = useState<PropertyDetailType[]>([{
        id: '',
        name: '',
        description: '',
        type: '',
        category: '',
        price: 0,
        currency: '',
        location: '',
        size: 0,
        constructed: 0,
        bedrooms: 0,
        bathrooms: 0,
        kitchen: 0,
        garage: 0,
        others: [],
        services: [],
        amenities: [],
        featured: true,
        images: []
    }])
    const [showType, setShowType] = useState<boolean>(false)
    const [showCategory, setShowCategory] = useState<boolean>(false)
    const [showLocation, setShowLocation] = useState<boolean>(false)
    const [filters, setFilters] = useState<Filters>({
        type: '',
        category: '',
        location: ''
    })
    const { applyFilter } = useFilter()

    useEffect(() => {
        const getProperties = async () => {
            try {
                const { data } = await axios(`${SERVER_URL}/api/properties`)
                setData(data)
                setShowData(data)
            } catch (error: any) {
                notifyError(error.response.data)
            }
        }
        getProperties()
        if (queryFilters.size) {
            const type: string = queryFilters.get('type') || ''
            const category: string = queryFilters.get('category') || ''
            const location: string = queryFilters.get('location') || ''
            console.log(type,category,location)
            let filters: Filters = {
                type: type !== 'Seleccionar' ? type : '',
                category: category || '',
                location: location !== 'Seleccionar' ? location : ''
            }
            setFilters(filters)
        }
        filterHandler()
        setTimeout(() => setLoading(false), 900)
        return () => {
            setLoading(true)
        }
    }, [])

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

    const resetType = () => {
        setFilters({
            ...filters,
            type: ''
        })
    }

    const showCategoryHandler = (event: MouseEvent<HTMLButtonElement>) => {
        const target = event.target as HTMLButtonElement
        if (target.name !== 'category') {
            setFilters({
                ...filters,
                category: target.name
            })
        }
        setShowCategory(!showCategory)
    }

    const resetCategory = () => {
        setFilters({
            ...filters,
            category: ''
        })
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

    const resetLocation = () => {
        setFilters({
            ...filters,
            location: ''
        })
    }

    const filterHandler = () => {
        const result = applyFilter(data, filters.type, filters.category, filters.location)
        setShowData(result)
    }

    useEffect(() => {
        filterHandler()
    }, [filters, loading])

    const nextPage = () => {
        if (!showData[0]) return null
        if (currentPage < Math.ceil(showData.length / cardsPerPage)) setCurrentPage(currentPage + 1)
    }

    const prevPage = () => {
        if (!showData[0]) return null
        if (currentPage !== 1) setCurrentPage(currentPage - 1)
    }

    const firstPage = () => {
        if (!showData[0]) return null
        setCurrentPage(1)
    }

    const lastPage = () => {
        if (!showData[0]) return null
        setCurrentPage(Math.ceil(showData.length / cardsPerPage))
    }

    return (
        <div className={style.properties} style={loading ? { overflow: 'hidden' } : undefined}>
            {loading && <div className={style.loading}>
                <img src='/images/loading.gif' alt=''></img>
            </div>}
            <div className={style.banner} />
            <div className={style.bar}>
                <div className={style.buttonContainer}>
                    <div className={style.buttonDiv} >
                        <button name='category' onClick={showCategoryHandler}>Operación</button>
                    </div>
                    <div className={style.buttonDiv}>
                        <button name='type' onClick={showTypeHandler}>Tipo</button>
                    </div>
                    <div className={style.buttonDiv}>
                        <button name='location' onClick={showLocationHandler}>Ubicación</button>
                    </div>
                </div>
                <div className={style.filterContainer}>
                    <div className={style.category} style={showCategory ? { height: '20vh' } : { height: 0 }}>
                        <div className={style.categorySelector}>
                            <button onClick={showCategoryHandler} name='Venta'>Venta</button>
                        </div>
                        <div className={style.categorySelector}>
                            <button onClick={showCategoryHandler} name='Alquiler'>Alquiler</button>
                        </div>
                        <div className={style.categorySelector}>
                            <button onClick={showCategoryHandler} name='Alquiler temporario'>Alquiler temporario</button>
                        </div>
                        <div className={style.categorySelector}>
                            <button onClick={showCategoryHandler} name='Permuta'>Permuta</button>
                        </div>
                    </div>
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
                    <div className={style.location} style={showLocation ? { height: '35vh' } : { height: 0 }}>
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
                        <div className={style.locationSelector}>
                            <button onClick={showLocationHandler} name='La Punta'>La Punta</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.filterReset}>
                <div className={style.resetContainer}>
                    {filters.category && <button name='reset' onClick={resetCategory}>{`${filters.category} x`}</button>}
                </div>
                <div className={style.resetContainer}>
                    {filters.type && <button name='reset' onClick={resetType}>{`${filters.type} x`}</button>}
                </div>
                <div className={style.resetContainer}>
                    {filters.location && <button name='reset' onClick={resetLocation}>{`${filters.location} x`}</button>}
                </div>
            </div>

            <div className={style.propertiesCards}>
                {showData[0] && showData.slice(firstCardIndex, lastCardIndex).map((property, index) => (
                    <div key={index} className={style.propertyContainer}>
                        <Property
                            id={property.id}
                            name={property.name}
                            location={property.location}
                            price={property.price}
                            currency={property.currency}
                            bedrooms={property.bedrooms}
                            bathrooms={property.bathrooms}
                            images={property.images}
                            type={property.type}
                            size={property.size}
                            category={property.category}
                        />
                    </div>
                ))}
            </div>

            <div className={style.paginationContainer}>
                <Pagination totalCards={showData.length} currentPage={currentPage} nextPage={nextPage} prevPage={prevPage} firstPage={firstPage} lastPage={lastPage}></Pagination>
            </div>
        </div >
    )
}

export default Properties