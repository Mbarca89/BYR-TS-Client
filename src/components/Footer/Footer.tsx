import style from './Footer.module.css'
import { useEffect, useState } from 'react'

const Footer = () => {

    const [mobile, setMobile] = useState(false)

    useEffect(() => {
        window.innerWidth < 576 && setMobile(true)
    }, [])

    if (mobile) return (
        <div className={style.footer}>

        </div>

    )

    return (
        <div className={style.footer}>

        </div>
    )
}

export default Footer

