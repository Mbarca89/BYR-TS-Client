import style from './Detail.module.css'
import axios from 'axios'
import { useParams, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ReactLoading from 'react-loading'
import { PropertyDetailType } from '../../types'
import handleError from '../../utils/HandleErrors'

const webUrl = process.env.REACT_APP_URL
const SERVER_URL = process.env.REACT_APP_SERVER_URL

const Detail = () => {

    const location = useLocation()
    const { id } = useParams()
    const [propertyData, setPropertyData] = useState<PropertyDetailType>({
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
        images: [],
        imageOrder: []
    })
    const [imageIndex, setImageIndex] = useState<number>(0)
    const [showGallery, setShowGallery] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [imageLoading, setImageLoading] = useState<boolean>(true)
    const [mobile, setMobile] = useState<boolean>(false)

    useEffect(() => {
        const getProperty = async () => {
            try {
                const { data } = await axios(`${SERVER_URL}/api/properties/getById?propertyId=${id}`)
                setPropertyData(data)
            } catch (error) {
                handleError(error)
            }
        }
        getProperty()
        window.innerWidth < 576 && setMobile(true)
        setTimeout(() => setLoading(false), 900)
        return () => {
            setLoading(true)
        }
    }, [])

    const next = () => {
        setImageLoading(true)
        if (imageIndex < (propertyData.images.length - 1)) setImageIndex(imageIndex + 1)
        if (imageIndex === propertyData.images.length - 1) setImageIndex(0)
    }

    const previous = () => {
        setImageLoading(true)
        if (imageIndex > 0) setImageIndex(imageIndex - 1)
        if (imageIndex === 0) setImageIndex(propertyData.images.length - 1)
    }

    const galleryHandler = () => {
        setShowGallery(true)
    }

    const closeGallery = () => {
        setShowGallery(false)
    }

    const handleImageLoading = () => {
        setImageLoading(false)
    }

    return (
        <div className={style.detail}>
            {loading && <div className={style.loading}>
                <img src='/images/loading.gif' alt=''></img>
            </div>}
            {showGallery &&
                <div className={style.gallery}>
                    <div className={style.galleryLeft} onClick={previous}> 〈 </div>
                    <div className={style.galleryRight} onClick={next}> 〉 </div>
                    <h1 onClick={closeGallery}>X</h1>
                    {imageLoading && <div className={style.galleryOverlay}><ReactLoading type='spinningBubbles' color='#ffffff' height={'5%'} width={'5%'} /></div>}
                    <img className={style.galleryPhoto} onLoad={handleImageLoading} src={propertyData.images[propertyData.imageOrder[imageIndex]].url} alt="" onClick={galleryHandler} />
                </div>
            }
            <div className={style.basicInfo}>
                {propertyData.images.length > 0 ? <div className={style.photos}>
                    <div className={style.left} onClick={previous}> 〈 </div>
                    <div className={style.right} onClick={next}> 〉 </div>
                    {propertyData.category === 'Venta' && <img className={style.categoryImg} src='/images/Venta.webp' alt="" />}
                    {propertyData.category === 'Alquiler' && <img className={style.categoryImg} src='/images/Alquiler.webp' alt="" />}
                    {imageLoading && <div className={style.photoOverlay}><ReactLoading type='spinningBubbles' color='#ffffff' height={'5%'} width={'5%'} /></div>}
                    <img onLoad={handleImageLoading} onClick={!mobile ? galleryHandler : undefined} className={style.photo} src={propertyData.images[propertyData.imageOrder[imageIndex]].url} alt="" />
                </div>:
                <div className={style.photos}>
                    <img onLoad={handleImageLoading} className={style.photo} src='/images/noImage.webp'alt="" />
                    </div>}
                <div className={style.info}>
                    <div className={style.name}>
                        <h2>{propertyData.name}</h2>
                    </div>
                    <hr />
                    <div className={style.location}>
                        <h3>{propertyData.location}</h3>
                    </div>
                    <hr />
                    <div className={style.infoContainer}>
                        <div className={style.infoLogo}>
                            <h4>{propertyData.size}</h4>
                            <img src='/images/size.webp' alt="" />
                            <div className={style.infoLogoLoader}></div>
                        </div>
                        <div className={style.infoLogo}>
                            <h4>{propertyData.bedrooms}</h4>
                            <img src='/images/bedroom.webp' alt="" />
                        </div>
                        <div className={style.infoLogo}>
                            <h4>{propertyData.bathrooms}</h4>
                            <img src='/images/bathroom.webp' alt="" />
                        </div>
                        <div className={style.infoLogo}>
                            <h4>{propertyData.kitchen}</h4>
                            <img src='/images/kitchen.webp' alt="" />
                        </div>
                        <div className={style.infoLogo}>
                            <h4>{propertyData.garage}</h4>
                            <img src='/images/garage.webp' alt="" />
                        </div>
                    </div>
                    <hr />
                    <div className={style.otherInfoContainer}>
                        <div className={style.price}>
                            {propertyData.currency === '$' && <img src='/images/pesosGris.webp' alt="" />}
                            {propertyData.currency === 'US$' && <img src='/images/dolaresGris.webp' alt="" />}
                            <h4>{propertyData.price === 0 ? <p>&nbsp;Consultar</p> : propertyData.price}</h4>
                        </div>
                        <a href={`https://api.whatsapp.com/send?phone=5492664570187&text=Hola,%20me%20interesa%20saber%20mas%20sobre%20esta%20propiedad:%20${webUrl}${location.pathname}`} target="_blank" rel="noopener noreferrer">
                            <img className={style.whatsappLogo} src='/images/whatsapp.webp' alt="" />
                        </a>
                    </div>
                </div>
            </div>
            <div className={style.line}></div>
            <div className={style.description}>
                <div dangerouslySetInnerHTML={{ __html: propertyData.description }}></div>
            </div>
            <div className={style.line}></div>
            <div className={style.otherInfo}>
                {propertyData.others.length ? <div className={style.otherInfoDiv}>
                    <h4>Otros ambientes:</h4>
                    <div className={style.others}>
                        {propertyData.others.map(item => {
                            return (<div key={item} className={style.listItem}>
                                <img src='/images/check.webp' alt="" />
                                <h5>{item}</h5>
                            </div>)
                        })}
                    </div>
                </div> : null}
                {propertyData.amenities.length ? <div className={style.otherInfoDiv}>
                    <h4>Comodidades:</h4>
                    <div className={style.amenities}>
                        {propertyData.amenities.map(item => {
                            return (<div key={item} className={style.listItem}>
                                <img src='/images/check.webp' alt="" />
                                <h5>{item}</h5>
                            </div>)
                        })}
                    </div>
                </div> : null}
                {propertyData.services.length ? <div className={style.otherInfoDiv}>
                    <h4>Servicios:</h4>
                    <div className={style.services}>
                        {propertyData.services.map(item => {
                            return (<div key={item} className={style.listItem}>
                                <img src='/images/check.webp' alt="" />
                                <h5>{item}</h5>
                            </div>)
                        })}
                    </div>
                </div> : null}
            </div>
        </div>)
}

export default Detail