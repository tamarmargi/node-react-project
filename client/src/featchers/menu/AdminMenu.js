import React, { useRef, useState } from 'react';
import {useGetAllCategoriesQuery, useCreateCategoryMutation, useDeleteCategoryMutation,} from './categories/CategoryApiSlice';
import { useDeleteProductMutation } from './products/ProductApiSlice';
import { useDeleteExtraMutation } from './extras/ExtraApiSlice';
import { useDeleteToppingMutation } from './toppings/ToppingApiSlice';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import AddCategory from './categories/AddCategory';
import "./AdminMenu.css"
import AddProduct from './products/AddProduct';
import AddExtra from './extras/AddExtra';
import AddTopping from './toppings/AddTopping';
import UpdateProduct from './products/UpdateProduct';
import UpdateTopping from './toppings/UpdateTopping';

const AdminMenu = () => {
    const toast = useRef(null);

    const { data: categories = [], isLoading, isError } = useGetAllCategoriesQuery();
    const [createCategory] = useCreateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();
    const [deleteProduct] = useDeleteProductMutation();
    const [deleteExtra] = useDeleteExtraMutation();
    const [deleteTopping] = useDeleteToppingMutation();

    const [categoryDialogVisible, setCategoryDialogVisible] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [addCategory, setAddCategory] = useState(false);

    const [addProductForCategoryId, setAddProductForCategoryId] = useState(null);
    const [addExtraForProductId, setAddExtraForProductId] = useState(null);
    const [addToppingForExtraId, setAddToppingForExtraId] = useState(null);
    const [updateProductForId, setUpdateProductForId] = useState(null);
    const [updateToppingForId, setUpdateToppingForId] = useState(null);

    const [categoryId, setCategoryId] = useState(null);
    const [productId, setProductId] = useState(null);
    const [extraId, setExtraId] = useState(null);
    const [toppingId, setToppingId] = useState(null);

    if (isLoading) return <h2>טוען...</h2>;
    if (isError) return <h2>שגיאה בטעינת הנתונים</h2>;

    const handleSaveCategory = async () => {
            await createCategory({ name: newCategoryName })
            setNewCategoryName('');
    }

    const handleDeleteCategory = async (categoryId) => {
            await deleteCategory(categoryId)
    }
    const handleDeleteProduct = async (categoryId, productId) => {
            await deleteProduct({ categoryId, productId })
    }
    const handleDeleteExtra = async (categoryId, productId, extraId) => {
            await deleteExtra({ categoryId, productId, extraId })
    }
    const handleDeleteTopping = async (categoryId, productId, extraId, toppingId) => {
            await deleteTopping({ categoryId, productId, extraId, toppingId })
    }

    return (
        <div className="p-4">
            <Toast ref={toast} />
            <h1>ניהול תפריט</h1>
            <Button
                style={{
                    border: "2px solid red",
                    backgroundColor: "black",
                    color: "red"
                }}
                label="הוסף קטגוריה"
                icon="pi pi-plus"
                className="p-button-success mb-3"
                onClick={() => setAddCategory(true)}
            />

            {addCategory && (
                <>
                    <div className='divComponent' />
                    <div className='divComponent1'>
                        <button onClick={() => setAddCategory(false)}>סגור</button>
                        <AddCategory setAddCategory = {setAddCategory}/>
                    </div>
                </>
            )}

            <h2>קטגוריות</h2>
            <DataTable value={categories} dataKey="_id" style={{ textAlign: "center" }}>
                <Column field="name" header="שם קטגוריה" />
                <Column
                    header="פעולות"
                    body={(rowData) => (
                        <>
                            <Button
                                style={{ color: "red" }}
                                icon="pi pi-trash"
                                className="p-button-text p-button-danger p-button-sm"
                                onClick={() => handleDeleteCategory(rowData._id)}
                            />
                            <Button
                                style={{ color: "red" }}
                                icon="pi pi-plus"
                                className="p-button-text p-button-success p-button-sm"
                                onClick={() => {setCategoryId(rowData._id); setAddProductForCategoryId(rowData._id); }}
                            />
                        </>
                    )}
                />
            </DataTable>

            {addProductForCategoryId && (
                <>
                    <div className='divComponent' />
                    <div className='divComponent1'>
                        <button onClick={() => setAddProductForCategoryId(null)}>סגור</button>
                        <AddProduct categoryId={addProductForCategoryId} setAddProduct={() => setAddProductForCategoryId(null)} />
                    </div>
                </>
            )}

            <h2 className="mt-4">מוצרים</h2>
            {categories.map((category) => (
                category.products.map((product) => (
                    <div key={product._id} className="mb-4 p-3 border-round border-1 surface-border">
                        <h3>{product.name}</h3>
                        <img src={`/${product.image.replace(/\\/g, '/')}`} alt={product.name} style={{ width: '20vw' }} />
                        <p>{product.description}</p>
                        <h4>₪{product.price}</h4>

                        <Button
                            style={{
                                border: "2px solid red",
                                backgroundColor: "black",
                                color: "red"
                            }}
                            icon="pi pi-trash"
                            className="p-button-danger p-button-sm mr-2"
                            onClick={() => handleDeleteProduct(category._id, product._id)}
                        />
                        <Button
                            style={{ color: "red" }}
                            icon="pi pi-pencil"
                            className="p-button-text p-button-sm mr-2"
                            onClick={() => { setCategoryId(category._id); setProductId(product._id); setUpdateProductForId(product._id);}}
                        />
                        <Button
                            style={{
                                border: "2px solid red",
                                backgroundColor: "black",
                                color: "red"
                            }}
                            icon="pi pi-plus"
                            className="p-button-success p-button-sm"
                            onClick={() => { setCategoryId(category._id); setProductId(product._id); setAddExtraForProductId(product._id); }}
                            label="הוסף כותרת לתוספות"
                        />

                        {updateProductForId === product._id && (
                            <>
                                <div className='divComponent' />
                                <div className='divComponent1'>
                                    <button onClick={() => setUpdateProductForId(null)}>סגור</button>
                                    <UpdateProduct categoryId={categoryId} productId={productId} setUpdateProduct={setUpdateProductForId} />
                                </div>
                            </>
                        )}

                        {addExtraForProductId === product._id && (
                            <>
                                <div className='divComponent' />
                                <div className='divComponent1'>
                                    <button onClick={() => setAddExtraForProductId(null)}>סגור</button>
                                    <AddExtra categoryId={category._id} productId={product._id} setAddExtra={() => setAddExtraForProductId(null)} />
                                </div>
                            </>
                        )}

                        {product.extras.map((extra) => (
                            <div key={`${category._id}_${product._id}_${extra._id}`} className="mt-3 ml-4">
                                <h5>{extra.title}</h5>
                                <Button
                                    style={{
                                        border: "2px solid red",
                                        backgroundColor: "black",
                                        color: "red"
                                    }}
                                    icon="pi pi-trash"
                                    className="p-button-danger p-button-sm mr-2"
                                    onClick={() => handleDeleteExtra(category._id, product._id, extra._id)}
                                    label="מחק Extra"
                                />

                                <Button
                                    style={{
                                        border: "2px solid red",
                                        backgroundColor: "black",
                                        color: "red"
                                    }}
                                    icon="pi pi-plus"
                                    className="p-button-success p-button-sm"
                                    onClick={() => { setCategoryId(category._id); setProductId(product._id); setExtraId(extra._id); setAddToppingForExtraId(extra._id); }}
                                    label="הוסף תוספת"
                                />

                                <ul className="mt-2" style={{ listStyleType: "none" }}>
                                    {extra.toppings.map((topping) => (
                                        <li key={topping._id}>
                                            {topping.name}{' '}
                                            <Button
                                                style={{ color: "red" }}
                                                icon="pi pi-pencil"
                                                className="p-button-text p-button-sm"
                                                onClick={() => { setCategoryId(category._id); setProductId(product._id); setExtraId(extra._id); setToppingId(topping._id); setUpdateToppingForId(topping._id); }}
                                            />
                                            <Button
                                                style={{ color: "red" }}
                                                icon="pi pi-trash"
                                                className="p-button-text p-button-danger p-button-sm"
                                                onClick={() => handleDeleteTopping( category._id, product._id, extra._id, topping._id )}
                                            />
                                        </li>
                                    ))}
                                </ul>

                                {addToppingForExtraId === extra._id && (
                                    <>
                                        <div className='divComponent' />
                                        <div className='divComponent1'>
                                            <button onClick={() => setAddToppingForExtraId(null)}>סגור</button>
                                            <AddTopping categoryId={category._id} productId={product._id} extraId={extra._id} setAddTopping={() => setAddToppingForExtraId(null)} />
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                ))
            ))}

            {updateToppingForId && (
                <>
                    <div className='divComponent' />
                    <div className='divComponent1'>
                        <button onClick={() => setUpdateToppingForId(null)}>סגור</button>
                        <UpdateTopping categoryId={categoryId} productId={productId} extraId={extraId} toppingId={toppingId} setUpdateTopping={setUpdateToppingForId} />
                    </div>
                </>
            )}

            <Dialog
                visible={categoryDialogVisible}
                header="הוספת קטגוריה"
                onHide={() => setCategoryDialogVisible(false)}
                footer={
                    <>
                        <Button label="ביטול" onClick={() => setCategoryDialogVisible(false)} />
                        <Button label="שמור" onClick={handleSaveCategory} />
                    </>
                }
            >
                <div className="field">
                    <label>שם קטגוריה</label>
                    <InputText
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                </div>
            </Dialog>
        </div>
    );
};

export default AdminMenu;
