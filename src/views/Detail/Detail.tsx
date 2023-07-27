import style from './Detail.module.css'
import axios from 'axios'
import bedroomsIcon from '../../img/bedroom.webp'
import bathroomsIcon from '../../img/bathroom.webp'
import sizeIcon from '../../img/size.webp'
import kitchenIcon from '../../img/kitchen.webp'
import garageIcon from '../../img/garage.webp'
import venta from '../../img/Venta.webp'
import alquiler from '../../img/Alquiler.webp'
import pesos from '../../img/pesosGris.webp'
import dolares from '../../img/dolaresGris.webp'
import check from '../../img/check.webp'
import whatsapp from '../../img/whatsapp.webp'
import { useParams, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ReactLoading from 'react-loading'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { PropertyDetailType } from '../../types'
import loadingGif from '../../img/loading.gif'

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
        images: [{ id: '', url: '' }]
    })
    const [imageIndex, setImageIndex] = useState<number>(0)
    const [showGallery, setShowGallery] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [imageLoading, setImageLoading] = useState<boolean>(true)
    const [mobile, setMobile] = useState<boolean>(false)

    useEffect(() => {
        const getProperty = async () => {
            const { data } = await axios(`${SERVER_URL}/properties/detail/${id}`)
            setPropertyData(data)
        }
        getProperty()
        window.innerWidth < 576 && setMobile(true)
        setTimeout(() => setLoading(false),900)
        return () => {
            setLoading(true)
        }
    }, [])

    const next = () => {
        if (imageIndex < (propertyData.images.length - 1)) setImageIndex(imageIndex + 1)
        if (imageIndex === propertyData.images.length - 1) setImageIndex(0)
    }

    const previous = () => {
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
            {loading && <div  className={style.loading}>
                <img src={loadingGif} alt=''></img>
            </div>}
            {showGallery &&
                <div className={style.gallery}>
                    <div className={style.galleryLeft} onClick={previous}> 〈 </div>
                    <div className={style.galleryRight} onClick={next}> 〉 </div>
                    <h1 onClick={closeGallery}>X</h1>
                    <img className={style.galleryPhoto} src={propertyData.images[imageIndex].url} alt="" onClick={galleryHandler} />
                </div>
            }
            <div className={style.basicInfo}>
                <div className={style.photos}>
                    <div className={style.left} onClick={previous}> 〈 </div>
                    <div className={style.right} onClick={next}> 〉 </div>
                    {propertyData.category === 'Venta' && <img className={style.categoryImg} src={venta} alt="" />}
                    {propertyData.category === 'Alquiler' && <img className={style.categoryImg} src={alquiler} alt="" />}
                    {imageLoading && <div className={style.photoOverlay}></div>}
                    <img onLoad={handleImageLoading} onClick={!mobile ? galleryHandler : undefined} className={style.photo} src={propertyData.images[imageIndex].url} alt="" />
                </div>
                <div className={style.info}>
                    <div className={style.name}>
                        <h2>{propertyData.name || <Skeleton />}</h2>
                    </div>
                    <hr />
                    <div className={style.location}>
                        <h3>{propertyData.location || <Skeleton />}</h3>
                    </div>
                    <hr />
                    <div className={style.infoContainer}>
                        <div className={style.infoLogo}>
                            <h4>{propertyData.size}</h4>
                            <img src={sizeIcon} alt="" />
                            <div className={style.infoLogoLoader}></div>
                        </div>
                        <div className={style.infoLogo}>
                            <h4>{propertyData.bedrooms}</h4>
                            <img src={bedroomsIcon} alt="" />
                        </div>
                        <div className={style.infoLogo}>
                            <h4>{propertyData.bathrooms}</h4>
                            <img src={bathroomsIcon} alt="" />
                        </div>
                        <div className={style.infoLogo}>
                            <h4>{propertyData.kitchen}</h4>
                            <img src={kitchenIcon} alt="" />
                        </div>
                        <div className={style.infoLogo}>
                            <h4>{propertyData.garage}</h4>
                            <img src={garageIcon} alt="" />
                        </div>
                    </div>
                    <hr />
                    <div className={style.otherInfoContainer}>
                        {propertyData.currency === '$' && <img src={pesos} alt="" />}
                        {propertyData.currency === 'US$' && <img src={dolares} alt="" />}
                        <h4>{propertyData.price}</h4>
                        <a className={style.whatsappLogo} href={`https://api.whatsapp.com/send?phone=5492664570187&text=Hola,%20me%20interesa%20saber%20mas%20sobre%20esta%20propiedad:%20${location.pathname}`} target="_blank" rel="noopener noreferrer">
                            <img src={whatsapp} alt="" />
                        </a>
                    </div>
                    <hr />
                    <div className={style.adittionalInfo}>
                        <p>{propertyData.description}</p>
                    </div>
                </div>
            </div>
            <div className={style.line}></div>
            <div className={style.otherInfo}>
                {propertyData.others.length ? <div className={style.otherInfoDiv}>
                    <h4>Otros ambientes:</h4>
                    <div className={style.others}>
                        {propertyData.others.map(item => {
                            return (<div key={item} className={style.listItem}>
                                <img src={check} alt="" />
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
                                <img src={check} alt="" />
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
                                <img src={check} alt="" />
                                <h5>{item}</h5>
                            </div>)
                        })}
                    </div>
                </div> : null}
            </div>
        </div>)
}

export default Detail