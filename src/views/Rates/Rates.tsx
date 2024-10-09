import style from './Rates.module.css'
import { useState, useEffect, useRef } from 'react'
import Validations from './Validations'
import { ChangeEvent } from 'react'
import emailjs from '@emailjs/browser'
import { notifyError, notifySuccess } from '../../components/Toaster/Toaster'
import ReactLoading from 'react-loading'
import { Col, Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import handleError from '../../utils/HandleErrors'

export interface Data {
    name: string,
    mail: string,
    phone: string,
    comments: string,
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
    })

    const sendEmail = async () => {
        setSending(true)
        try {
            if (formRef.current) {
                await emailjs.sendForm('service_2rg7tis', 'template_3omezxo', formRef.current, 'fup4O1b1tN2Rfnirg')
                notifySuccess('Mensaje enviado correctamente.')
                setSending(false)
                setData({
                    name: '',
                    mail: '',
                    phone: '',
                    comments: '',
                })
            }
        } catch (error: any) {
            handleError(error)
            setSending(false)
        }
    }

    useEffect(() => {
        setTimeout(() => setLoading(false), 900)
        return () => {
            setLoading(true)
        }
    }, [])

    const validate = (values: Data): Data => {
        const errors: any = {};

        if (!values.name.trim()) {
            errors.name = 'Ingrese el nombre';
        }

        if (!values.mail.trim()) {
            errors.mail = 'Ingrese su correo electrónico';
        } else if (!/\S+@\S+\.\S+/.test(values.mail)) {
            errors.mail = 'Ingrese un mail válido'
        }

        if (!/^\d+$/.test(values.phone)) {
            errors.phone = 'Ingrese solo números'
        }

        if (!values.comments.trim()) {
            errors.comments = 'Escriba algún comentario';
        }
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            mail: '',
            phone: '',
            comments: '',
        },
        validate,
        onSubmit: async values => {

        },
    });

    const resetForm = () => {
        formik.resetForm();
    }

    return (
        <div className={style.rates}>
            {loading && <div className={style.loading}>
                <img src='/images/loading.gif' alt=''></img>
            </div>}
            <div className={`${style.container} text-center`}>
                <div className={`${style.infoContainer}`}>
                    <div className={`${style.info} text-center`}>
                        <h1>Tasaciones</h1>
                        <p>¿Querés vender tu propiedad? Acá podrás contactarte con nosotros para conocer el valor indicado.</p>
                        <p> Completá tus datos y describí las caracterí­sticas de tu propiedad. Un tasador de B&R se pondrá en contacto con vos, y te asesorará en tu consulta.</p>
                    </div>
                </div>
                <div className={style.formContainer}>
                    <Form noValidate onSubmit={formik.handleSubmit} ref={formRef} className='w-100 mt-0 mb-3'>
                        <Form.Group as={Col} xs={12} lg={{ span: 6, offset: 3 }}>
                            <Form.Label >Nombre</Form.Label>
                            <Form.Control type="text" placeholder="Nombre"
                                id="name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={!!(formik.touched.name && formik.errors.name)}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} xs={12} lg={{ span: 6, offset: 3 }}>
                            <Form.Label >Mail</Form.Label>
                            <Form.Control type="mail" placeholder="Mail"
                                id="mail"
                                name="mail"
                                value={formik.values.mail}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={!!(formik.touched.mail && formik.errors.mail)}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.mail}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} xs={12} lg={{ span: 6, offset: 3 }}>
                            <Form.Label >Teléfono</Form.Label>
                            <Form.Control type="text" placeholder="Teléfono"
                                id="phone"
                                name="phone"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={!!(formik.touched.phone && formik.errors.phone)}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.phone}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} xs={12} lg={{ span: 6, offset: 3 }}>
                            <Form.Label >Comentarios</Form.Label>
                            <Form.Control type="text"
                                as='textarea'
                                id="comments"
                                name="comments"
                                value={formik.values.comments}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={!!(formik.touched.comments && formik.errors.comments)}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.comments}</Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                    <div className={style.buttonDiv}>
                        {!sending && <button className={style.send} onClick={sendEmail}>Enviar</button>}
                    </div>
                    {sending && <ReactLoading type='spinningBubbles' color='#4a4a4a' height={'4%'} width={'4%'} />}
                </div>
                <div className={style.comunicate}>
                    <h3>Otras formas de comunicarte:</h3>
                    <div className={style.comunicateOptions}>
                        <div className={style.option}>
                            <img src='/images/phone.webp' alt="" />
                            <a href="tel:+549 266 570187">
                                <p className='m-0'>+549 266 570187</p>
                            </a>
                        </div>
                        <div className={style.option}>
                            <img src='/images/whatsapp.webp' alt="" />
                            <a href={`https://api.whatsapp.com/send?phone=5492664570187&text=Hola, Necesito asesoramiento sobre una propiedad`} target="_blank" rel="noopener noreferrer">
                                <p className='m-0'>+549 266 570187</p>
                            </a>
                        </div>
                        <div className={style.option}>
                            <img src='/images/instagram.webp' alt="" />
                            <a href={`https://www.instagram.com/byrinmobiliaria/`} target="_blank" rel="noopener noreferrer">
                                <p className='m-0'>@byrinmobiliaria</p>
                            </a>
                        </div>
                        <div className={style.option}>
                            <img src='/images/facebook.webp' alt="" />
                            <a href={`https://www.facebook.com/ByRdesarrollosinmobiliarios`} target="_blank" rel="noopener noreferrer">
                                <p className='m-0'>Inmobiliaria B&R</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Rates