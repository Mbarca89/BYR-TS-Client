import style from './Rates.module.css'
import { useState, useEffect, useRef } from 'react'
import Validations from './Validations'
import whatsapp from '../../img/whatsapp.webp'
import facebook from '../../img/facebook.webp'
import instagram from '../../img/instagram.webp'
import phone from '../../img/phone.webp'
import loadingGif from '../../img/loading.gif'
import { ChangeEvent } from 'react'
import emailjs from '@emailjs/browser'
import { notifyError, notifySuccess } from '../../components/Toaster/Toaster'
import ReactLoading from 'react-loading'

export interface Data {
    name: string,
    mail: string,
    phone: string,
    comments: string,
    eventName: string
}

const Rates = () => {

    const [loading, setLoading] = useState<boolean>(true)
    const [sending, setSending] = useState<boolean>(false)

    const formRef = useRef<HTMLFormElement>(null);

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
                console.log(val.disabled1)
                setErrors({
                    ...errors,
                    name: val.name,
                    disabled1: val.disabled1
                })
            }
            if (data.eventName === 'mail') {
                console.log(val.disabled2)
                setErrors({
                    ...errors,
                    mail: val.mail,
                    disabled2: val.disabled2
                })
            }
            if (data.eventName === 'phone') {
                console.log(val.disabled3)
                setErrors({
                    ...errors,
                    phone: val.phone,
                    disabled3: val.disabled3
                })
            }
        }
    }, [data])

    const sendEmail = async () => {
        setSending(true)
        try {
            if (formRef.current)
                await emailjs.sendForm('service_2rg7tis', 'template_3omezxo', formRef.current, 'fup4O1b1tN2Rfnirg')
            notifySuccess('Mensaje enviado correctamente.')
            setSending(false)
            setData({
                name: '',
                mail: '',
                phone: '',
                comments: '',
                eventName: ''
            })
        } catch (error) {
            notifyError('No se pudo enviar el formulario')
        }
    }

    useEffect(() => {
        setTimeout(() => setLoading(false), 900)
        return () => {
            setLoading(true)
        }
    }, [])

    return (
        <div className={style.rates}>
            {loading && <div className={style.loading}>
                <img src={loadingGif} alt=''></img>
            </div>}
            <div className={style.container}>
                <div className={style.infoContainer}>
                    <div className={style.info}>
                        <h1>Tasaciones</h1>
                        <p>¿Querés vender tu propiedad? Acá podrás contactarte con nosotros para conocer el valor indicado.</p>
                        <p> Completá tus datos y describí las caracterí­sticas de tu propiedad. Un tasador de B&R se pondrá en contacto con vos, y te asesorará en tu consulta.</p>
                    </div>
                </div>
                <div className={style.formContainer}>
                    <form ref={formRef} className={style.form}>
                        <div className={style.inputContainer}>
                            <div className={style.labelError}>
                                <label htmlFor="name">Nombre:</label>
                                {errors.name && <p>{errors.name}</p>}
                            </div>
                            <div className={style.formInput}>
                                <input type="text" name='name' onInput={() => Validations(data,'name')} onChange={changeHandler} value={data.name} />
                            </div>
                        </div>
                        <div className={style.inputContainer}>
                            <div className={style.labelError}>
                                <label htmlFor="mail">Email:</label>
                                {errors.mail && <p>{errors.mail}</p>}
                            </div>
                            <div className={style.formInput}>
                                <input type="text" name='mail' onInput={() => Validations(data,'mail')} onChange={changeHandler} value={data.mail} />
                            </div>
                        </div>
                        <div className={style.inputContainer}>
                            <div className={style.labelError}>
                                <label htmlFor="phone">Telefono:</label>
                                {errors.phone && <p>{errors.phone}</p>}
                            </div>
                            <div className={style.formInput}>
                                <input type="text" name='phone' onInput={() => Validations(data,'phone')} onChange={changeHandler} value={data.phone} />
                            </div>
                        </div>
                        <div className={style.commentsContainer}>
                            <label htmlFor="comments">Comentario:</label>
                            <textarea name="comments" id="" cols={30} rows={10} onChange={CommentHandler} value={data.comments}></textarea>
                        </div>
                    </form>
                    <div className={style.buttonDiv}>
                        {!sending && <button className={(errors.disabled1 || errors.disabled2 || errors.disabled3) ? style.sendDis : style.send} onClick={sendEmail} disabled={errors.disabled1 || errors.disabled2 || errors.disabled3}>Enviar</button>}
                    </div>
                    {sending && <ReactLoading type='spinningBubbles' color='#4a4a4a' height={'4%'} width={'4%'} />}
                </div>
                <div className={style.comunicate}>
                    <h3>Otras formas de comunicarte:</h3>
                    <div className={style.comunicateOptions}>
                        <div className={style.option}>
                            <img src={phone} alt="" />
                            <a href="tel:+549 266 570187">
                                <p>+549 266 570187</p>
                            </a>
                        </div>
                        <div className={style.option}>
                            <img src={whatsapp} alt="" />
                            <a href={`https://api.whatsapp.com/send?phone=5492664570187&text=Hola, Necesito asesoramiento sobre una propiedad`} target="_blank" rel="noopener noreferrer">
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