import style from './Rates.module.css'
import { useState, useEffect } from 'react'
import Validations from './Validations'
import whatsapp from '../../img/whatsapp.webp'
import facebook from '../../img/facebook.webp'
import instagram from '../../img/instagram.webp'
import phone from '../../img/phone.webp'
import { ChangeEvent } from 'react'

export interface Data {
    name: string,
    mail: string,
    phone: string,
    comments: string,
    eventName: string
}

const Rates = () => {

    const [data, setData] = useState<Data>({
        name: '',
        mail: '',
        phone: '',
        comments: '',
        eventName: ''
    })
    const [errors, setErrors] = useState({
        name: '',
        disabled1: true,
        mail: '',
        disabled2: true,
        phone: '',
        disabled3: true,
    })

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
            eventName: event.target.name
        })
        setErrors({
            ...errors,
            [event.target.name]: ''
        })
    }

    const CommentHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
            eventName: event.target.name
        })
    }

    useEffect(() => {

        let val = Validations(data, data.eventName)
        if (val) {
            if (data.eventName === 'name') {
                setErrors({
                    ...errors,
                    name: val.name
                })
            }
            if (data.eventName === 'mail') {
                setErrors({
                    ...errors,
                    mail: val.mail
                })
            }
            if (data.eventName === 'phone') {
                setErrors({
                    ...errors,
                    phone: val.phone
                })
            }
        }
    }, [data])

    return (
        <div className={style.rates}>
            <div className={style.container}>
                <div className={style.infoContainer}>
                    <div className={style.info}>
                        <h1>Tasaciones</h1>
                        <p>¿Queres alquilar o vender tu propiedad? Dejanos un mensaje y nuestros agentes se comunicarán para brindarte el mejor asesoramiento.</p>
                    </div>
                </div>
                <div className={style.formContainer}>
                    <div className={style.form}>
                        <div className={style.inputContainer}>
                            <div className={style.labelError}>
                                <label htmlFor="name">Nombre:</label>
                                {errors.name && <p>{errors.name}</p>}
                            </div>
                            <div className={style.formInput}>
                                <input type="text" name='name' onChange={changeHandler} value={data.name} />
                            </div>
                        </div>
                        <div className={style.inputContainer}>
                            <div className={style.labelError}>
                                <label htmlFor="name">Email:</label>
                                {errors.mail && <p>{errors.mail}</p>}
                            </div>
                            <div className={style.formInput}>
                                <input type="text" name='mail' onChange={changeHandler} value={data.mail} />
                            </div>
                        </div>
                        <div className={style.inputContainer}>
                            <div className={style.labelError}>
                                <label htmlFor="name">Telefono:</label>
                                {errors.phone && <p>{errors.phone}</p>}
                            </div>
                            <div className={style.formInput}>
                                <input type="text" name='phone' onChange={changeHandler} value={data.phone} />
                            </div>
                        </div>
                        <div className={style.commentsContainer}>
                            <label htmlFor="comments">Comentario:</label>
                            <textarea name="comments" id="" cols={30} rows={10} onChange={CommentHandler} value={data.comments}></textarea>
                        </div>
                    </div>
                    <div className={style.buttonDiv}>
                        <button>Enviar</button>
                    </div>
                </div>
                <div className={style.comunicate}>
                    <h3>Otras formas de comunicarte:</h3>
                    <div className={style.comunicateOptions}>
                        <div className={style.option}>
                            <img src={phone} alt="" />
                            <p>+549 266 570187</p>
                        </div>
                        <div className={style.option}>
                            <img src={whatsapp} alt="" />
                            <a href="`https://api.whatsapp.com/send?phone=5492664570187&text=Hola, Necesito asesoramiento sobre una propiedad`" target="_blank" rel="noopener noreferrer">
                                <p>+549 266 570187</p>
                            </a>
                        </div>
                        <div className={style.option}>
                            <img src={instagram} alt="" />
                            <a href={`https://www.instagram.com/byrinmobiliaria/`} target="_blank" rel="noopener noreferrer">
                                <p>@byrinmobiliaria</p>
                            </a>
                        </div>
                        <div className={style.option}>
                            <img src={facebook} alt="" />
                            <a href={`https://www.facebook.com/ByRdesarrollosinmobiliarios`} target="_blank" rel="noopener noreferrer">
                                <p>Inmobiliaria B&R</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Rates