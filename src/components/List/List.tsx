import style from './List.module.css'
import axios from 'axios'
import { MouseEventHandler, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Editor from '../Editor/Editor'
import { ChangeEvent, MouseEvent } from 'react'
import { PropertyType } from '../../types'
const SERVER_URL = process.env.REACT_APP_SERVER_URL

const List = () => {

    const navigate = useNavigate()

    const [properties, setProperties] = useState([])
    const [filterData, setFilterData] = useState('')
    const [filteredProperties, setFilteredProperties] = useState([])
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [deleteId, setDeleteId] = useState('')
    const [showEditor, setShowEditor] = useState(false)
    const [editId, setEditId] = useState('')

    useEffect(() => {
        const getProperty = async () => {
            const { data } = await axios(`${SERVER_URL}/properties/list`)
            await setProperties(data)
            if (!filterData.length) setFilteredProperties(data)
        }
        getProperty()
        return () => {
            setProperties([])
            setFilteredProperties([])
            setShowEditor(false)
        }
    }, [])

    const filterChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
        setFilterData(event.target.value)
    }

    useEffect(() => {
        if (!filterData) setFilteredProperties(properties)
        setFilteredProperties(properties.filter((property:PropertyType) => property.name.toLowerCase().includes(filterData)))
    }, [filterData])

    const editHandler = (id:string) => {
        setEditId(id)
        setShowEditor(true)
        // navigate(`/editor/${id}`)
    }

    const cancelHandler = () => {
        setShowEditor(false)
    }

    const deleteHandler = (id:string) => {
        setConfirmDelete(true)
        setDeleteId(id)
    }

    const confirmDeleteHandler = async (event:MouseEvent<HTMLButtonElement>) => {
        const target = event.target as HTMLButtonElement
        if (target.name === 'si') {
            setConfirmDelete(false)
            await axios.delete(`${SERVER_URL}/properties/delete/${deleteId}`)
            setDeleteId('')
            const { data } = await axios(`${SERVER_URL}/properties/list`)
            await setProperties(data)
            if (!filterData.length) setFilteredProperties(data)
        } else {
            setConfirmDelete(false)
        }
    }

    return (
        <div>
            {!showEditor ?
                <div className={style.list}>
                    {confirmDelete && <div className={style.confirmDelete}>
                        <h2>Seguro que desea eliminar la propiedad?</h2>
                        <button name='si' onClick={confirmDeleteHandler}>Si</button>
                        <button name='cancelar' onClick={confirmDeleteHandler}>Cancelar</button>
                    </div>}
                    <div className={style.filterContainer}>
                        <label htmlFor="name">Buscar</label>
                        <input type="text" name='name' value={filterData} onChange={filterChangeHandler} />
                    </div>
                    <div className={style.tableContainer}>
                        <table>
                            <thead>
                                <tr>
                                    <th className={style.tableName}>Nombre</th>
                                    <th>Tipo</th>
                                    <th>Ubicacion</th>
                                    <th>Precio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProperties.map((item:PropertyType) => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{item.type}</td>
                                        <td>{item.location}</td>
                                        <td>{item.currency} {item.price}</td>
                                        <td><button name='editar' onClick={() => editHandler(item.id)}>Editar</button></td>
                                        <td><button name='eliminar' onClick={() => deleteHandler(item.id)}>Eliminar</button></td>
                                        <td><button name='ver' onClick={() => {window.open(`../detail/${item.id}`, "_blank")}}>Ver</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div> :
                <div>
                    <button className={style.cancelButton} onClick={cancelHandler}>Cancelar</button>
                    <Editor id={editId} />
                </div>
            }

        </div>
    )
}

export default List