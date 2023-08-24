import style from './Uploader.module.css'
import axios from 'axios'
import { useState, useEffect, ChangeEventHandler } from 'react'
import others from '../../utils/others'
import services from '../../utils/services'
import amenities from '../../utils/amenities'
import { ChangeEvent, MouseEvent } from 'react'
import { PropertyType } from '../../types'
import { notifyError, notifySuccess } from '../Toaster/Toaster'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import * as DOMPurify from 'dompurify'
import ReactLoading from 'react-loading'
const SERVER_URL = process.env.REACT_APP_SERVER_URL

interface ImagePreview {
    file: File;
    preview: string;
}

const Uploader = () => {
    const [uploaded, setUploaded] = useState(true)
    const [data, setData] = useState<PropertyType>({
        id: '',
        featured: false,
        name: '',
        description: '',
        type: 'Cabaña',
        category: 'Alquiler',
        price: 0,
        currency: '$',
        location: 'San Luis',
        size: 0,
        constructed: 0,
        bedrooms: 0,
        bathrooms: 0,
        kitchen: 0,
        garage: 0,
        others: [],
        services: [],
        amenities: [],
    })
    const [images, setImages] = useState<File[]>([]);
    const [selectedImages, setSelectedImages] = useState<ImagePreview[]>()
    const [othersCheck, setOthersCheck] = useState(new Array(others.length).fill(false))
    const [servicesCheck, setServicesCheck] = useState(new Array(services.length).fill(false))
    const [amenitiesCheck, setAmenitiesCheck] = useState(new Array(amenities.length).fill(false))
    const [inputKey, setInputKey] = useState<string>('asd')

    const othersHandler = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        let buffer = othersCheck
        buffer[index] = !buffer[index]
        setOthersCheck(buffer)
        if (event.target.checked === true) {
            setData({
                ...data,
                others: [...data.others, event.target.value]
            })
        } else {
            setData({
                ...data,
                others: [...data.others.filter((item) => item !== event.target.value)]
            })
        }
    }

    const servicesHandler = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        let buffer = servicesCheck
        buffer[index] = !buffer[index]
        setServicesCheck(buffer)
        if (event.target.checked === true) {
            setData({
                ...data,
                services: [...data.services, event.target.value]
            })
        } else {
            setData({
                ...data,
                services: [...data.services.filter((item) => item !== event.target.value)]
            })
        }
    }

    const amenitiesHandler = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        let buffer = amenitiesCheck
        buffer[index] = !buffer[index]
        setAmenitiesCheck(buffer)
        if (event.target.checked === true) {
            setData({
                ...data,
                amenities: [...data.amenities, event.target.value]
            })
        } else {
            setData({
                ...data,
                amenities: [...data.amenities.filter((item) => item !== event.target.value)]
            })
        }
    }

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    const editorHandler = (value: string) => {
        setData({
            ...data,
            description: value
        })
    }

    const selectHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    const submitHandler = async () => {
        setUploaded(false)
        const formData = new FormData()
        formData.append('data', JSON.stringify(data))
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i])
        }
        setData({
            ...data,
            description: DOMPurify.sanitize(data.description)
        })
        try {
            await axios.post(`${SERVER_URL}/properties/upload`, formData)
            notifySuccess('Propiedad publicada correctamente!')
            resetHandler()
            setUploaded(true)
        } catch (error: any) {
            notifyError(error.response.data)
            setUploaded(true)
        }
    }

    const fileHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const imagesUpload = event.target.files
        if (imagesUpload) {
            setImages([...images, ...imagesUpload])
            const files = Array.from(imagesUpload);
            const imagesPreview = files.map((file) => ({
                file,
                preview: URL.createObjectURL(file), // Generar una URL para la vista previa
            }));
            setSelectedImages((selectedImages || []).concat(imagesPreview));
        }
    }

    useEffect(() => {
        // Limpia las URLs de vista previa cuando el componente se desmonta
        return () => {
            selectedImages && selectedImages.forEach((image) => URL.revokeObjectURL(image.preview));
        };
    }, [selectedImages]);

    const deleteImage = (index: number) => {
        const newImages = [...images]
        newImages.splice(index, 1)
        setImages(newImages)
        const newImagesPreview: ImagePreview[] = selectedImages?.slice() || [];
        newImagesPreview.splice(index, 1);
        setSelectedImages(newImagesPreview);
    }

    const isFeatured = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked === true) setData({
            ...data,
            featured: true
        })
        else setData({
            ...data,
            featured: false
        })
    }

    const moveRight = (index: number) => {
        const aux = images
        if (aux) {
            if (index !== aux.length - 1) {
                const temp = aux[index]
                aux[index] = aux[index + 1];
                aux[index + 1] = temp;
                setImages(aux)
                const files = Array.from(aux);
                const imagesPreview = files.map((file) => ({
                    file,
                    preview: URL.createObjectURL(file), // Generar una URL para la vista previa
                }));
                setSelectedImages(imagesPreview);
            }
        }
    }

    const moveLeft = (index: number) => {
        const aux = images
        if (aux) {
            if (index !== 0) {
                const temp = aux[index]
                aux[index] = aux[index - 1];
                aux[index - 1] = temp;
                setImages(aux)
                const files = Array.from(aux);
                const imagesPreview = files.map((file) => ({
                    file,
                    preview: URL.createObjectURL(file), // Generar una URL para la vista previa
                }));
                setSelectedImages(imagesPreview);
            }
        }
    }

    const resetHandler = () => {
        setData({
            id: '',
            featured: false,
            name: '',
            description: '',
            type: 'Cabaña',
            category: 'Alquiler',
            price: 0,
            currency: '$',
            location: 'San Luis',
            size: 0,
            constructed: 0,
            bedrooms: 0,
            bathrooms: 0,
            kitchen: 0,
            garage: 0,
            others: [],
            services: [],
            amenities: [],
        })
        setOthersCheck(new Array(others.length).fill(false))
        setServicesCheck(new Array(services.length).fill(false))
        setAmenitiesCheck(new Array(amenities.length).fill(false))
        setImages([])
        setSelectedImages([])
        setInputKey('123')
    }

    return (

        uploaded ? <div className={style.uploader}>
            <header>
                <h2>Publicar propiedad</h2>
            </header>
            <div className={style.uploaderBody}>
                <div className={style.info}>
                    <div className={style.basicInfo}>
                        <h3>Información Básica</h3>
                        <div className={style.basicInfoDiv}>
                            <label htmlFor="featured">Propiedad destacada</label>
                            <input type="checkbox" name="featured" onChange={isFeatured} checked={data.featured} />
                        </div>
                        <div className={style.basicInfoDiv}>
                            <label htmlFor="name">Nombre</label>
                            <input name='name' type="text" value={data.name} onChange={changeHandler} />
                        </div>
                        <div className={style.description}>
                            <label htmlFor="description">Descripción adicional</label>
                            <div className={style.editorContainer}>
                                <ReactQuill theme='snow' className={style.editorInput} value={data.description} onChange={editorHandler}></ReactQuill>
                            </div>
                        </div>
                        <div className={style.basicInfoDiv}>
                            <label htmlFor="tipo">Tipo</label>
                            <select name="type" id="" value={data.type} onChange={selectHandler}>
                                <option value="Cabaña">Cabaña</option>
                                <option value="Campo">Campo</option>
                                <option value="Casa">Casa</option>
                                <option value="Cochera">Cochera</option>
                                <option value="Complejo">Complejo</option>
                                <option value="Departamento">Departamento</option>
                                <option value="Deposito">Deposito</option>
                                <option value="Duplex">Duplex</option>
                                <option value="Fondo de comercio">Fondo de comercio</option>
                                <option value="Galpon">Galpon</option>
                                <option value="Hotel">Hotel</option>
                                <option value="Local">Local</option>
                                <option value="Loteo">Loteo</option>
                                <option value="Monoambiente">Monoambiente</option>
                                <option value="Oficina">Oficina</option>
                                <option value="Terreno">Terreno</option>
                            </select>
                        </div>
                        <div className={style.basicInfoDiv}>
                            <label htmlFor="category">Categoría</label>
                            <select name="category" id="" value={data.category} onChange={selectHandler}>
                                <option value="Alquiler">Alquiler</option>
                                <option value="Alquiler temporario">Alquiler temporario</option>
                                <option value="Permuta">Permuta</option>
                                <option value="Venta">Venta</option>
                            </select>
                        </div>
                        <div className={style.basicInfoDiv}>
                            <label htmlFor="price">Precio</label>
                            <input name='price' type="number" value={data.price} onChange={changeHandler} />
                        </div>
                        <div className={style.basicInfoDiv}>
                            <label htmlFor="currency">Moneda</label>
                            <select name="currency" id="" value={data.currency} onChange={selectHandler}>
                                <option value="$">Pesos</option>
                                <option value="US$">Dolares</option>
                            </select>
                        </div>
                        <div className={style.basicInfoDiv}>
                            <label htmlFor="location">Ubicación</label>
                            <select name="location" id="" value={data.location} onChange={selectHandler}>
                                <option value="San Luis">San Luis</option>
                                <option value="Juana Koslay">Juana Koslay</option>
                                <option value="Potrero De Los Funes">Potrero</option>
                                <option value="El Volcan">El Volcan</option>
                                <option value="Estancia Grande">Estancia Grande</option>
                                <option value="El Trapiche">El Trapiche</option>
                                <option value="La Florida">La Florida</option>
                            </select>
                        </div>
                        <div className={style.basicInfoDiv}>
                            <label htmlFor="size">Superficie</label>
                            <input name='size' type="number" value={data.size} onChange={changeHandler} />
                        </div>
                        <div className={style.basicInfoDiv}>
                            <label htmlFor="constructed">Superficie cubierta</label>
                            <input name='constructed' type="number" value={data.constructed} onChange={changeHandler} />
                        </div>
                        <div className={style.basicInfoDiv}>
                            <label htmlFor="bedrooms">Habitaciones</label>
                            <input name='bedrooms' type="number" value={data.bedrooms} onChange={changeHandler} />
                        </div>
                        <div className={style.basicInfoDiv}>
                            <label htmlFor="bathrooms">Baños</label>
                            <input name='bathrooms' type="number" value={data.bathrooms} onChange={changeHandler} />
                        </div>
                        <div className={style.basicInfoDiv}>
                            <label htmlFor="kitchen">Cocina</label>
                            <input name='kitchen' type="number" value={data.kitchen} onChange={changeHandler} />
                        </div>
                        <div className={style.basicInfoDiv}>
                            <label htmlFor="garage">Garaje</label>
                            <input name='garage' type="number" value={data.garage} onChange={changeHandler} />
                        </div>
                    </div>
                    <hr />
                    <h3>Otros Ambientes</h3>
                    <div className={style.others}>
                        {others.map((item, index) => {
                            return (
                                <div key={index}>
                                    <input type="checkbox" name={item.name} value={item.name} onChange={(event) => othersHandler(event, index)} checked={othersCheck[index]} />
                                    <label htmlFor={item.name}>{item.name}</label>
                                </div>
                            )
                        })}
                    </div>
                    <hr />
                    <h3>Servicios</h3>
                    <div className={style.services}>
                        {services.map((item, index) => {
                            return (
                                <div key={index}>
                                    <input type="checkbox" name={item.name} value={item.name} onChange={(event) => servicesHandler(event, index)} checked={servicesCheck[index]} />
                                    <label htmlFor={item.name}>{item.name}</label>
                                </div>
                            )
                        })}
                    </div>
                    <hr />
                    <h3>Comodidades</h3>
                    <div className={style.amenities}>
                        {amenities.map((item, index) => {
                            return (
                                <div key={index}>
                                    <input type="checkbox" name={item.name} value={item.name} onChange={(event) => amenitiesHandler(event, index)} checked={amenitiesCheck[index]} />
                                    <label htmlFor={item.name}>{item.name}</label>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={style.images}>
                    <h3>Imágenes</h3>
                    <div className={style.imageUploader}>
                        <input type="file" key={inputKey} name="uploader" accept="image/png, image/jpeg, image/png" multiple onChange={fileHandler} />
                    </div>
                    <h3>Imágenes elegidas</h3>
                    <div className={style.preview}>
                        {selectedImages && selectedImages.map((image, index) => (
                            <div key={index}>
                                <img src={image.preview} alt="Preview" />
                                <div className={style.previewButtonContainer}>
                                    <button onClick={() => moveLeft(index)}>{'<'}</button>
                                    <button className={style.deleteImage} onClick={() => deleteImage(index)}>X</button>
                                    <button onClick={() => moveRight(index)}>{'>'}</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <footer>
                <button onClick={submitHandler}>Publicar</button>
                <button onClick={resetHandler}>Reiniciar</button>
            </footer>
        </div> : <div className={style.uploader}>
            <div className={style.uploading}>
                <ReactLoading type='spinningBubbles' color='#000000' height={'50%'} width={'50%'} />
            </div>
        </div>
    )
}

export default Uploader