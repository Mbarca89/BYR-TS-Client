
const delete2 = () => {

    return (
        // <>
        //     <div className="">
        //         <div className="">
        //             <div className="">
        //                 <div className="">
        //                     <label htmlFor="featured">Propiedad destacada</label>
        //                     <input type="checkbox" name="featured" onChange={isFeatured} checked={data.featured} />
        //                 </div>
        //                 <div className="">
        //                     <label htmlFor="name">Nombre</label>
        //                     <input name='name' type="text" value={data.name} onChange={changeHandler} />
        //                 </div>
        //                 <div className="">
        //                     <label htmlFor="description">Descripción adicional</label>
        //                     <div className="">
        //                         <ReactQuill theme='snow' className="" />
        //                     </div>
        //                 </div>
        //                 <div className="">
        //                     <label htmlFor="tipo">Tipo</label>
        //                     <select name="type" id="" value={data.type} onChange={selectHandler}>
        //                         {propertyTypes.map(type => (
        //                             <option value={type}>{type}</option>
        //                         ))}
        //                     </select>
        //                 </div>
        //                 <div className="">
        //                     <label htmlFor="category">Categoría</label>
        //                     <select name="category" id="" value={data.category} onChange={selectHandler}>
        //                         <option value="Alquiler">Alquiler</option>
        //                         <option value="Alquiler temporario">Alquiler temporario</option>
        //                         <option value="Permuta">Permuta</option>
        //                         <option value="Venta">Venta</option>
        //                     </select>
        //                 </div>
        //                 <div className="">
        //                     <label htmlFor="price">Precio</label>
        //                     <input name='price' type="number" value={data.price} onChange={changeHandler} />
        //                 </div>
        //                 <div className="">
        //                     <label htmlFor="currency">Moneda</label>
        //                     <select name="currency" id="" value={data.currency} onChange={selectHandler}>
        //                         <option value="$">Pesos</option>
        //                         <option value="US$">Dolares</option>
        //                     </select>
        //                 </div>
        //                 <div className="">
        //                     <label htmlFor="location">Ubicación</label>
        //                     <select name="location" id="" value={data.location} onChange={selectHandler}>
        //                         <option value="San Luis">San Luis</option>
        //                         <option value="Juana Koslay">Juana Koslay</option>
        //                         <option value="Potrero De Los Funes">Potrero</option>
        //                         <option value="El Volcan">El Volcan</option>
        //                         <option value="Estancia Grande">Estancia Grande</option>
        //                         <option value="El Trapiche">El Trapiche</option>
        //                         <option value="La Florida">La Florida</option>
        //                         <option value="La Punta">La Punta</option>
        //                     </select>
        //                 </div>
        //                 <div className="">
        //                     <label htmlFor="size">Superficie</label>
        //                     <input name='size' type="number" value={data.size} onChange={changeHandler} />
        //                 </div>
        //                 <div className="">
        //                     <label htmlFor="constructed">Superficie cubierta</label>
        //                     <input name='constructed' type="number" value={data.constructed} onChange={changeHandler} />
        //                 </div>
        //                 <div className="">
        //                     <label htmlFor="bedrooms">Habitaciones</label>
        //                     <input name='bedrooms' type="number" value={data.bedrooms} onChange={changeHandler} />
        //                 </div>
        //                 <div className="">
        //                     <label htmlFor="bathrooms">Baños</label>
        //                     <input name='bathrooms' type="number" value={data.bathrooms} onChange={changeHandler} />
        //                 </div>
        //                 <div className="">
        //                     <label htmlFor="kitchen">Cocina</label>
        //                     <input name='kitchen' type="number" value={data.kitchen} onChange={changeHandler} />
        //                 </div>
        //                 <div className="">
        //                     <label htmlFor="garage">Garaje</label>
        //                     <input name='garage' type="number" value={data.garage} onChange={changeHandler} />
        //                 </div>
        //             </div>
        //             <hr />
        //             <h3>Otros Ambientes</h3>
        //             <div className="">
        //                 {others.map((item, index) => {
        //                     return (
        //                         <div key={index}>
        //                             <input type="checkbox" name={item.name} value={item.name} onChange={(event) => othersHandler(event, index)} checked={othersCheck[index]} />
        //                             <label htmlFor={item.name}>{item.name}</label>
        //                         </div>
        //                     )
        //                 })}
        //             </div>
        //             <hr />
        //             <h3>Servicios</h3>
        //             <div className="">
        //                 {services.map((item, index) => {
        //                     return (
        //                         <div key={index}>
        //                             <input type="checkbox" name={item.name} value={item.name} onChange={(event) => servicesHandler(event, index)} checked={servicesCheck[index]} />
        //                             <label htmlFor={item.name}>{item.name}</label>
        //                         </div>
        //                     )
        //                 })}
        //             </div>
        //             <hr />
        //             <h3>Comodidades</h3>
        //             <div className="">
        //                 {amenities.map((item, index) => {
        //                     return (
        //                         <div key={index}>
        //                             <input type="checkbox" name={item.name} value={item.name} onChange={(event) => amenitiesHandler(event, index)} checked={amenitiesCheck[index]} />
        //                             <label htmlFor={item.name}>{item.name}</label>
        //                         </div>
        //                     )
        //                 })}
        //             </div>
        //         </div>
        //         <div className="">
        //             <h3>Imágenes</h3>
        //             <div className="">
        //                 <input type="file" key={inputKey} name="uploader" accept="image/png, image/jpeg, image/png" multiple onChange={fileHandler} />
        //             </div>
        //             <h3>Imágenes elegidas</h3>
        //             <div className="">
        //                 {selectedImages && selectedImages.map((image, index) => (
        //                     <div key={index}>
        //                         <img src={image.preview} alt="Preview" />
        //                         <div className="">
        //                             <button onClick={() => moveLeft(index)}>{'<'}</button>
        //                             <button className="" />
        //                             <button onClick={() => moveRight(index)}>{'>'}</button>
        //                         </div>
        //                     </div>
        //                 ))}
        //             </div>
        //         </div>
        //     </div>
        //     <footer>
        //         {/* <button onClick={submitHandler}>Publicar</button>
        //         <button onClick={resetHandler}>Reiniciar</button> */}
        //     </footer>

        // </>
<></>
    )
}

export default delete2