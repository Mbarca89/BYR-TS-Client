import styles from './LastCarousel.module.css'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useState, useEffect } from "react";
import { PropertyDetailType } from '../../types'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { notifyError } from "../Toaster/Toaster";
const SERVER_URL = process.env.REACT_APP_SERVER_URL

const LastCarousel = () => {

    const navigate = useNavigate()

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
            slidesToSlide: 3, // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1025, min: 576 },
            items: 4,
            slidesToSlide: 3, // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 576, min: 0 },
            items: 2,
            slidesToSlide: 1, // optional, default to 1.
        },
    };

    const [lastProperties, setLastProperties] = useState<PropertyDetailType[]>([{
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
    }])

    useEffect(() => {
        const getLastProperties = async () => {
            try {
                const { data } = await axios(`${SERVER_URL}/properties/last`)
                setLastProperties(data)
            } catch (error: any) {
                notifyError(error.response.data)
            }
        }
        getLastProperties()
    }, [])

    return (
        <div className={styles.container}>
            <Carousel
                responsive={responsive}
                infinite={true}
                className={styles.carousel}
                removeArrowOnDeviceType='mobile'
                autoPlay={true}
                autoPlaySpeed={2000}
                showDots={true}
            >
                {lastProperties.map((property, index) => {
                    return (
                        <div className={styles.propertyContainer} key={index}>
                            <img
                                onClick={() => navigate(`/detail/${property.id}`)}
                                src={property.images[0]?.url}
                                alt={property.name}
                                style={{
                                    borderRadius: "10px",
                                }}
                            />
                            <h3>{property.name}</h3>
                            <hr />
                            <h4>{property.location}</h4>
                            <hr />
                            <button>Ver mas</button>
                        </div>
                    );
                })}
            </Carousel>
        </div>
    )
}

export default LastCarousel