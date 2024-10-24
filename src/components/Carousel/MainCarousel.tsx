import style from './MainCarousel.module.css'
import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import ReactLoading from 'react-loading'
import { notifyError } from '../Toaster/Toaster'
import { CarouselItemType } from '../../types'
import handleError from '../../utils/HandleErrors'
const SERVER_URL = process.env.REACT_APP_SERVER_URL


const MainCarousel = () => {
    const [isLoaded, setIsloaded] = useState<boolean>(false)
    const [currentImg, setCurrentImg] = useState<number>(0)
    const [slides, setSlides] = useState<CarouselItemType[]>([])
    const timeoutRef: any = useRef(null)
    const delay = 3500

    const resetTimeout = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }

    useEffect(() => {
        const getFeatured = async () => {
            try {
                const res = await axios(`${SERVER_URL}/api/properties/featured`)
                if (res.data)
                    await setSlides(res.data.map((item: any) => {
                        return { image: item.images[0].url, id: item.id, name: item.name, location: item.location }
                    }))
                setIsloaded(true)
            } catch (error: any) {
                handleError(error)
            }
        }
        getFeatured()
    }, [])

    const previous = () => {
        if (currentImg !== 0) setCurrentImg(currentImg - 1)
        else setCurrentImg(slides.length - 1)
    }

    const next = () => {
        if (currentImg !== slides.length - 1) setCurrentImg(currentImg + 1)
        else setCurrentImg(0)
    }

    useEffect(() => {
        resetTimeout()
        timeoutRef.current = setTimeout(next, delay)
        return () => {
            resetTimeout()
        }
    }, [currentImg, slides])

    return (
        isLoaded ?
            <div className={style.container}>
                <NavLink className={style.container} to={`/detail/${slides[currentImg]?.id}`}>
                    <div className={style.slide} style={{ backgroundImage: `url(${slides[currentImg]?.image})` }}></div>
                    <div className={style.slideInfo}>
                        <h2>{slides[currentImg]?.name}</h2>
                        <h2>&nbsp; | &nbsp;</h2>
                        <h2>{slides[currentImg]?.location}</h2>
                    </div>
                </NavLink>
                <div className={style.left} onClick={previous}> 〈 </div>
                <div className={style.right} onClick={next}> 〉 </div>
            </div> : <div className={style.container}><ReactLoading type='spinningBubbles' color='#4a4a4a' height={'5%'} width={'5%'} /></div>
    )
}

export default MainCarousel