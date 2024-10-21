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
import { propertyTypes } from '../../utils/propertyTypes'
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
import { useFormik } from 'formik'
import handleError from '../../utils/HandleErrors'
import { log } from 'console'
const SERVER_URL = process.env.REACT_APP_SERVER_URL

interface ImagePreview {
    file: File;
    preview: string;
}

interface UploaderV2Props {
    updateList: () => void
}

const UploaderV2: React.FC<UploaderV2Props> = ({ updateList }) => {
    const [uploading, setUploading] = useState(false)
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
        imageOrder:[]
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
                    preview: URL.createObjectURL(file),
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
                    preview: URL.createObjectURL(file),
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
            imageOrder:[]
        })
        setOthersCheck(new Array(others.length).fill(false))
        setServicesCheck(new Array(services.length).fill(false))
        setAmenitiesCheck(new Array(amenities.length).fill(false))
        setImages([])
        setSelectedImages([])
        setInputKey('123')
        formik.resetForm();
    }

    const validate = (values: PropertyType): PropertyType => {
        const errors: any = {};
        if(!values.name.trim())
            errors.name = "Ingrese el nombre de la propiedad"
        return errors;
    };

    const formik = useFormik<PropertyType>({
        initialValues: {
            id: "",
            featured: false,
            name: "",
            description: "",
            type: "Cabaña",
            category: "Alquiler",
            price: undefined,
            currency: "$",
            location: "San Luis",
            size: undefined,
            constructed: undefined,
            bedrooms: undefined,
            bathrooms: undefined,
            kitchen: undefined,
            garage: undefined,
            others: othersCheck,
            services: servicesCheck,
            amenities: amenitiesCheck,
            imageOrder: new Array<number>
        },
        validate,
        enableReinitialize: true,
        onSubmit: async values => {
            setUploading(true)
            values.others=data.others
            values.services=data.services
            values.amenities=data.amenities
            values.size =  values.size || 0
            values.price = values.price || 0
            values.constructed = values.constructed || 0
            values.bedrooms = values.bedrooms || 0
            values.bathrooms = values.bathrooms || 0
            values.kitchen = values.kitchen || 0
            values.garage = values.garage || 0
            const formData = new FormData()
            if (images) {
                for (let i = 0; i < images.length; i++) {
                    values.imageOrder.push(i)
                    formData.append('images', images[i])
                }
            }

            formData.append('propertyData', JSON.stringify(values))
            setData({
                ...data,
                description: DOMPurify.sanitize(data.description)
            })
            try {
                const res = await axios.post(`${SERVER_URL}/api/properties/publish`, formData)
                if(res.data) {
                    notifySuccess(res.data)
                }
                resetHandler()
                setUploading(false)
                updateList()
            } catch (error: any) {
                handleError(error)
                setUploading(false)
            }
        },
    });

    return (
        <div className="d-flex flex-column justify-content-center align-items-center px-3">
            <header>
                <h2>Publicar propiedad</h2>
            </header>
            <Form noValidate onSubmit={formik.handleSubmit} className='w-100'>
                <h3>Información Básica</h3>
                <Col lg={6}>
                    <Row className='mb-3'>
                        <Form.Label>Propiedad destacada</Form.Label>
                        <Form.Group>

                            <Form.Check
                                type="switch"
                                id="featured"
                                value={formik.values.featured ? "true" : "false"}
                                onChange={e => {
                                    formik.setFieldValue("featured", e.target.checked === true)
                                }}
                                onBlur={formik.handleBlur}
                            />
                        </Form.Group>
                    </Row>
                    <Row className='mb-3'>
                        <Form.Group>
                            <Form.Label>Nombre</Form.Label>
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
                    </Row>
                    <Row className='mb-5'>
                        <Form.Label>Descripción</Form.Label>
                        <div className="">
                            <ReactQuill style={{ height: '300px' }}
                                theme='snow'
                                className=""
                                id='description'
                                onChange={value => formik.setFieldValue('description', value)}
                            />
                        </div>
                    </Row>
                    <Row>
                        <h3 className='mt-3'>Información adicional</h3>
                    </Row>
                    <Row className='mb-3'>
                        <Form.Group>
                            <Form.Label className="">Tipo</Form.Label>
                            <Form.Select
                                id="type"
                                name="type"
                                value={formik.values.type}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                {propertyTypes.map(type => (
                                    <option value={type}>{type}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row className='mb-3'>
                        <Form.Group>
                            <Form.Label className="">Categoría</Form.Label>
                            <Form.Select
                                id="category"
                                name="category"
                                value={formik.values.category}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value="Alquiler">Alquiler</option>
                                <option value="Alquiler temporario">Alquiler temporario</option>
                                <option value="Permuta">Permuta</option>
                                <option value="Venta">Venta</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row className='mb-3'>
                        <Form.Group>
                            <Form.Label>Precio</Form.Label>
                            <Form.Control type="number"
                                id="price"
                                name="price"
                                value={formik.values.price}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </Form.Group>
                    </Row>
                    <Row className='mb-3'>
                        <Form.Group>
                            <Form.Label className="">Moneda</Form.Label>
                            <Form.Select
                                id="currency"
                                name="currency"
                                value={formik.values.currency}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value="$">Pesos</option>
                                <option value="US$">Dolares</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row className='mb-3'>
                        <Form.Group>
                            <Form.Label className="">Ubicación</Form.Label>
                            <Form.Select
                                id="location"
                                name="location"
                                value={formik.values.location}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value="San Luis">San Luis</option>
                                <option value="Juana Koslay">Juana Koslay</option>
                                <option value="Potrero De Los Funes">Potrero</option>
                                <option value="El Volcan">El Volcan</option>
                                <option value="Estancia Grande">Estancia Grande</option>
                                <option value="El Trapiche">El Trapiche</option>
                                <option value="La Florida">La Florida</option>
                                <option value="La Punta">La Punta</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row className='mb-3'>
                        <Form.Group>
                            <Form.Label>Superficie</Form.Label>
                            <Form.Control type="number"
                                id="size"
                                name="size"
                                value={formik.values.size}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </Form.Group>
                    </Row>
                    <Row className='mb-3'>
                        <Form.Group>
                            <Form.Label>Superficie cubierta</Form.Label>
                            <Form.Control type="number"
                                id="constructed"
                                name="constructed"
                                value={formik.values.constructed}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </Form.Group>
                    </Row>
                    <Row className='mb-3'>
                        <Form.Group>
                            <Form.Label>Habitaciones</Form.Label>
                            <Form.Control type="number"
                                id="bedrooms"
                                name="bedrooms"
                                value={formik.values.bedrooms}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </Form.Group>
                    </Row>
                    <Row className='mb-3'>
                        <Form.Group>
                            <Form.Label>Baños</Form.Label>
                            <Form.Control type="number"
                                id="bathrooms"
                                name="bathrooms"
                                value={formik.values.bathrooms}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </Form.Group>
                    </Row>
                    <Row className='mb-3'>
                        <Form.Group>
                            <Form.Label>Cocina</Form.Label>
                            <Form.Control type="number"
                                id="kitchen"
                                name="kitchen"
                                value={formik.values.kitchen}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </Form.Group>
                    </Row>
                    <Row className='mb-3'>
                        <Form.Group>
                            <Form.Label>Garaje</Form.Label>
                            <Form.Control type="number"
                                id="garage"
                                name="garage"
                                value={formik.values.garage}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </Form.Group>
                    </Row>
                    <h3>Otros Ambientes</h3>
                    <hr />
                    <Row className='mb-3'>
                        {others.map((item, index) => (
                            <Col key={index} md={4} className="mb-3">
                                <input
                                    type="checkbox"
                                    name={item.name}
                                    value={item.name}
                                    onChange={(event) => othersHandler(event, index)}
                                    checked={othersCheck[index]}
                                />
                                <label className='ms-1' htmlFor={item.name}>{item.name}</label>
                            </Col>
                        ))}
                    </Row>
                    <h3>Servicios</h3>
                    <hr />
                    <Row className='mb-3'>
                        {services.map((item, index) => (
                            <Col key={index} md={4} className="mb-3">
                                <input
                                    type="checkbox"
                                    name={item.name}
                                    value={item.name}
                                    onChange={(event) => servicesHandler(event, index)}
                                    checked={servicesCheck[index]}
                                />
                                <label className='ms-1' htmlFor={item.name}>{item.name}</label>
                            </Col>
                        ))}
                    </Row>
                    <h3>Comodidades</h3>
                    <hr />
                    <Row className='mb-3'>
                        {amenities.map((item, index) => (
                            <Col key={index} md={4} className="mb-3">
                                <input
                                    type="checkbox"
                                    name={item.name}
                                    value={item.name}
                                    onChange={(event) => amenitiesHandler(event, index)}
                                    checked={amenitiesCheck[index]}
                                />
                                <label className='ms-1' htmlFor={item.name}>{item.name}</label>
                            </Col>
                        ))}
                    </Row>
                    <Row>
                        <h3>Cargar imágenes</h3>
                        <hr />
                        <Row className='mb-5'>
                            <div className="">
                                <input type="file" key={inputKey} name="uploader" accept="image/png, image/jpeg, image/png" multiple onChange={fileHandler} />
                            </div>
                        </Row>
                        <h3>Imágenes elegidas</h3>
                        <hr />
                        <Row className="mb-5">
                            {selectedImages ? selectedImages.map((image, index) => (
                                <Col lg={2} key={index}>
                                    <img className='w-100' src={image.preview} alt="Preview" />
                                    <div className="d-flex flex-row justify-content-evenly">
                                        <Button onClick={() => moveLeft(index)}>{'<'}</Button>
                                        <Button className="" onClick={() => deleteImage(index)}>X</Button>
                                        <Button onClick={() => moveRight(index)}>{'>'}</Button>
                                    </div>
                                </Col>
                            ))
                                : <div className='d-flex flex-row justify-content-center'>
                                    <h6>No se han cargado imágenes</h6>
                                </div>
                            }
                        </Row>
                    </Row>
                    <Row>
                        {uploading ?
                            <div className='d-flex flex-row justify-content-around mt-5 mb-5'>
                                <Spinner></Spinner>
                            </div>
                            :
                            <div className='d-flex flex-row justify-content-around mt-5 mb-5'>
                                <Button variant='danger' onClick={updateList}>Cancelar</Button>
                                <Button variant="primary" type='submit'>Publicar</Button>
                            </div>
                        }
                    </Row>
                </Col>
            </Form>
        </div>
    )
}

export default UploaderV2