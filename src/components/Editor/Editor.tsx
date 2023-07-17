import style from './Editor.module.css'
import axios from 'axios'
import { useState, useEffect, ChangeEvent } from 'react'
import { NavLink } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import others from '../../utils/others'
import services from '../../utils/services'
import amenities from '../../utils/amenities'

const SERVER_URL = process.env.REACT_APP_SERVER_URL

interface ImagePreview {
    file: File;
    preview: string;
  }

const Editor = ({id}:any) => {
    console.log(id)
    // const { id } = useParams()
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
    const [images, setImages] = useState<FileList | File[]>(new FileList());
const [selectedImages, setSelectedImages] = useState<ImagePreview[]>([]);
    const [propertyImages, setPropertyImages] = useState([])
    const [othersCheck, setOthersCheck] = useState(new Array(others.length).fill(false))
    const [servicesCheck, setServicesCheck] = useState(new Array(services.length).fill(false))
    const [amenitiesCheck, setAmenitiesCheck] = useState(new Array(amenities.length).fill(false))


    useEffect(() => {
        const getProperty = async () => {
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
        }
        getProperty()
    }, [])

    const othersHandler = (event:any, index:number) => {
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

    const servicesHandler = (event:any, index:number) => {
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

    const amenitiesHandler = (event: ChangeEvent<HTMLInputElement>, index:number) => {
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

    const changeHandler = (event:any) => {
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
            setUploaded(true)
        } catch (error) {
            console.log(error)
        }
    }

    const fileHandler = (event:ChangeEvent<HTMLInputElement>) => {
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

    const deleteImage = (index:number) => {
        const newImages = [...images]
        newImages.splice(index, 1)
        setImages(newImages)
        const newImagesPreview = [...selectedImages];
        newImagesPreview.splice(index, 1);
        setSelectedImages(newImagesPreview);
    }

    const deleteImageFromDb = async (index:number, imageId:string) => {
        try {
            await axios.delete(`${SERVER_URL}/properties/delete/image?id=${id}&imageId=${imageId}`)
            const imagesCache = [...propertyImages]
            imagesCache.splice(index, 1)
            setPropertyImages(imagesCache)

        } catch (error) {
            console.log(error)
        }
    }

    const isFeatured = (event:any) => {
        if(event.target.checked === true) setData({
            ...data,
            featured: true
        })
        else setData({
            ...data,
            featured: false
        })
    }

    return (
        isLoaded ? !uploaded ? <div className={style.uploader}>
            <header>
                <h2>Editar propiedad</h2>
            </header>
            <div className={style.uploaderBody}>
                <div className={style.info}>
                    <h3>Informacion Basica</h3>
                    <div className={style.basicInfo}>
                        <div>
                            <label htmlFor="featured">Propiedad destacada</label>
                            <input type="checkbox" name="featured" onChange={isFeatured} checked={data.featured}/>
                        </div>
                        <div>
                            <label htmlFor="name">Nombre</label>
                            <input name='name' type="text" value={data.name} onChange={changeHandler} />
                        </div>
                        <div>
                            <label htmlFor="description">Descripcion adicional</label>
                            <input name='description' type="text" value={data.description} onChange={changeHandler} />
                        </div>
                        <div>
                            <label htmlFor="tipo">Tipo</label>
                            <select name="type" id="" value={data.type} onChange={changeHandler}>
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
                        <div>
                            <label htmlFor="category">Categoria</label>
                            <select name="category" id="" value={data.category} onChange={changeHandler}>
                                <option value="Alquiler">Alquiler</option>
                                <option value="Alquiler temporario">Alquiler temporario</option>
                                <option value="Permuta">Permuta</option>
                                <option value="Venta">Venta</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="price">Precio</label>
                            <input name='price' type="number" value={data.price} onChange={changeHandler} />
                        </div>
                        <div>
                            <label htmlFor="currency">Moneda</label>
                            <select name="currency" id="" value={data.currency} onChange={changeHandler}>
                                <option value="$">Pesos</option>
                                <option value="US$">Dolares</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="location">Ubicacion</label>
                            <select name="location" id="" value={data.location} onChange={changeHandler}>
                                <option value="San Luis">San Luis</option>
                                <option value="Juana Koslay">Juana Koslay</option>
                                <option value="Potrero De Los Funes">Potrero</option>
                                <option value="El Volcan">El Volcan</option>
                                <option value="Estancia Grande">Estancia Grande</option>
                                <option value="El Trapiche">El Trapiche</option>
                                <option value="La Florida">La Florida</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="size">Superficie</label>
                            <input name='size' type="number" value={data.size} onChange={changeHandler} />
                        </div>
                        <div>
                            <label htmlFor="constructed">Superficie cubierta</label>
                            <input name='constructed' type="number" value={data.constructed} onChange={changeHandler} />
                        </div>
                        <div>
                            <label htmlFor="bedrooms">Habitaciones</label>
                            <input name='bedrooms' type="number" value={data.bedrooms} onChange={changeHandler} />
                        </div>
                        <div>
                            <label htmlFor="bathrooms">Baños</label>
                            <input name='bathrooms' type="number" value={data.bathrooms} onChange={changeHandler} />
                        </div>
                        <div>
                            <label htmlFor="kitchen">Cocina</label>
                            <input name='kitchen' type="number" value={data.kitchen} onChange={changeHandler} />
                        </div>
                        <div>
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
                    <div className={style.imageUploader}>
                        <input type="file" name="uploader" accept="image/png, image/jpeg" multiple onChange={fileHandler} />
                    </div>
                    <h3>Imagenes seleccionadas</h3>
                    <div className={style.preview}>
                        {selectedImages.map((image:any, index) => (
                            <div key={index}>
                                <img src={image.preview} alt="Preview" />
                                <button className={style.deleteImage} onClick={() => deleteImage(index)}>X</button>
                            </div>
                        ))}
                    </div>
                    <h3>Imagenes subidas</h3>
                    <div className={style.preview}>
                        {propertyImages.map((image:any, index) => (
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
        </div> : <div>
            <h1>Propiedad editada con exito!</h1>
        </div> :
            <div>
                <p>Cargando</p>
            </div>
    )
}

export default Editor