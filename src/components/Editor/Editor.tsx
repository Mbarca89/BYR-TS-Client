import style from './Editor.module.css'
import axios from 'axios'
import { useState, useEffect, ChangeEvent } from 'react'
import others from '../../utils/others'
import services from '../../utils/services'
import amenities from '../../utils/amenities'
import { notifyError, notifySuccess } from '../Toaster/Toaster'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import * as DOMPurify from 'dompurify'

const SERVER_URL = process.env.REACT_APP_SERVER_URL

interface ImagePreview {
    file: File;
    preview: string;
}

const Editor = ({ id }: any) => {
    const [isLoaded, setIsloaded] = useState(false)
    const [uploaded, setUploaded] = useState(false)
    const [data, setData] = useState({
        featured: false,
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
        others: Array<string>(),
        services: Array<string>(),
        amenities: Array<string>(),
    })
    const [images, setImages] = useState<File[]>([]);
    const [selectedImages, setSelectedImages] = useState<ImagePreview[]>([]);
    const [propertyImages, setPropertyImages] = useState([])
    const [othersCheck, setOthersCheck] = useState(new Array(others.length).fill(false))
    const [servicesCheck, setServicesCheck] = useState(new Array(services.length).fill(false))
    const [amenitiesCheck, setAmenitiesCheck] = useState(new Array(amenities.length).fill(false))


    useEffect(() => {
        const getProperty = async () => {
            try {
                const { data } = await axios(`${SERVER_URL}/properties/detail/${id}`)
                setData({
                    featured: data.featured,
                    name: data.name,
                    description: data.description,
                    type: data.type,
                    category: data.category,
                    price: data.price,
                    currency: data.currency,
                    location: data.location,
                    size: data.size,
                    constructed: data.constructed,
                    bedrooms: data.bedrooms,
                    bathrooms: data.bathrroms,
                    kitchen: data.kitchen,
                    garage: data.garage,
                    others: data.others,
                    services: data.services,
                    amenities: data.amenities,
                })
                setPropertyImages(data.images)
                let othersCheckBuffer = othersCheck
                others.map((item, index) => {
                    if (data.others.toString().includes(item.name)) othersCheckBuffer[index] = true
                    return null
                })
                setOthersCheck(othersCheckBuffer)
                let servicesCheckBuffer = servicesCheck
                services.map((item, index) => {
                    if (data.services.toString().includes(item.name)) servicesCheckBuffer[index] = true
                    return null
                })
                setServicesCheck(servicesCheckBuffer)

                let amenitiesCheckBuffer = amenitiesCheck
                amenities.map((item, index) => {
                    if (data.amenities.toString().includes(item.name)) amenitiesCheckBuffer[index] = true
                    return null
                })
                setAmenitiesCheck(amenitiesCheckBuffer)
                setIsloaded(true)
            } catch (error: any) {
                notifyError(error.response.data)
            }
        }
        getProperty()
    }, [])

    const othersHandler = (event: any, index: number) => {
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

    const servicesHandler = (event: any, index: number) => {
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

    const changeHandler = (event: any) => {
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
        const formData = new FormData()
        formData.append('data', JSON.stringify(data))
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i])
        }
        try {
            await axios.post(`${SERVER_URL}/properties/edit/${id}`, formData)
            notifySuccess('Propiedad editada con exito!')
        } catch (error: any) {
            notifyError(error.response.data)
        }
    }

    const fileHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setImages((prevImages: FileList | File[]) => [...prevImages, ...(event.target.files || [])]);
        const files: File[] = Array.from(event.target.files || []);

        const imagesPreview = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file), // Generar una URL para la vista previa
        }));

        setSelectedImages([...selectedImages, ...imagesPreview]);
    }

    useEffect(() => {
        // Limpia las URLs de vista previa cuando el componente se desmonta
        return () => {
            selectedImages.forEach((image) => URL.revokeObjectURL(image.preview));
        };
    }, [selectedImages]);

    const deleteImage = (index: number) => {
        const newImages = [...images]
        newImages.splice(index, 1)
        setImages(newImages)
        const newImagesPreview = [...selectedImages];
        newImagesPreview.splice(index, 1);
        setSelectedImages(newImagesPreview);
    }

    const deleteImageFromDb = async (index: number, imageId: string) => {
        try {
            await axios.delete(`${SERVER_URL}/properties/delete/image?id=${id}&imageId=${imageId}`)
            const imagesCache = [...propertyImages]
            imagesCache.splice(index, 1)
            setPropertyImages(imagesCache)
        } catch (error: any) {
            notifyError(error.response.data)
        }
    }

    const isFeatured = (event: any) => {
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

    const moveLeftDb = async (index:number) =>{
        if(index !== 0) {
            try {
                const {data} = await axios.put(`${SERVER_URL}/properties/move/image?id=${id}&index=${index}&direction=left`)
                setPropertyImages(data)
            } catch (error: any) {
                notifyError(error.response.data)
            }
        }
    }

    const moveRightDb = async (index:number) =>{
        if(index !== propertyImages.length -1) {
            try {
                const {data} = await axios.put(`${SERVER_URL}/properties/move/image?id=${id}&index=${index}&direction=right`)
                setPropertyImages(data)
            } catch (error: any) {
                notifyError(error.response.data)
            }
        }
    }

    return (
        isLoaded ? <div className={style.uploader}>
            <header>
                <h2>Editar propiedad</h2>
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
                                <option value="La Punta">La Punta</option>
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
                        <input type="file" name="uploader" accept="image/png, image/jpeg" multiple onChange={fileHandler} />
                    </div>
                    <h3>Imágenes seleccionadas</h3>
                    <div className={style.preview}>
                        {selectedImages.map((image: any, index) => (
                            <div key={index}>
                                <img src={image.preview} alt="Preview" />
                                <button onClick={() => moveLeft(index)}>{'<'}</button>
                                <button className={style.deleteImage} onClick={() => deleteImage(index)}>X</button>
                                <button onClick={() => moveRight(index)}>{'>'}</button>
                            </div>
                        ))}
                    </div>
                    <h3>Imágenes subidas</h3>
                    <div className={style.preview}>
                        {propertyImages.map((image: any, index) => (
                            <div key={index}>
                                <img src={image.url} alt="Preview" />   
                                                           
                                <button className={style.deleteImage} onClick={() => deleteImageFromDb(index, image.id)}>X</button>  
                                                           
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <footer>
                <button onClick={submitHandler}>Aceptar</button>
            </footer>
        </div> :
            <div>
                <p>Cargando</p>
            </div>
    )
}

export default Editor