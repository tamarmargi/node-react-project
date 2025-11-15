import '../../components/Nav.css'; 
import { useGetAllCategoriesQuery } from "./categories/CategoryApiSlice";
import { useRef, useState } from "react";
import { useAddToBusketMutation } from "../busket/BusketApiSlice";
import ChooseTopping from "../busket/ChooseTopping";
import { useSelector } from "react-redux";
//---------------------------------------------
// import React, { useEffect } from 'react';
import { Button } from 'primereact/button';

import { DataView } from 'primereact/dataview';

const Menue = () => {
    const { isUserLoggedIn } = useSelector((state) => state.auth)
    const { data: categories = [], isError, isLoading } = useGetAllCategoriesQuery();
    const [addToBasket, { isError: basketError, isLoading: basketLoading }] = useAddToBusketMutation()
    const categoryRefs = useRef([]);
    const [showTopping, setShowTopping] = useState(false)
    const [chosenProduct, setChosenProduct] = useState(null)
    const [chosenCategoryId, setChosenCategoryId] = useState(null)
    // ------------------------------
    if (isLoading) return <h2>Loading</h2>;
    if (isError) return <h2>Error</h2>;

    const scrollToCategory = (index) => {
        categoryRefs.current[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const buy = (categoryId, product) => {
        addToBasket({
            categoryId,
            productId: product._id
        });
        if (product.extras.length > 0) {
            setChosenProduct(product);
            setChosenCategoryId(categoryId);
            setShowTopping(true);
        }
    }

    const gridItem = (category, index) => {
        return (
            <div className="col-12 p-2" key={category._id}>
                <div ref={el => categoryRefs.current[index] = el}>
                    <div>
                        <span className="nav-link" >{category.name}</span>
                        <div className="flex flex-wrap gap-4 mt-2">
                            {category.products.map((product) => {
                                return (
                                    <div className="p-4 border-1 surface-border surface-card border-round" style={{ width: "calc(33.33% - 16px)" }} key={product.id}> {/* רוחב מותאם */}
                                        <div className="flex flex-column align-items-center gap-3 py-5">
                                            <img className="w-9 shadow-2 border-round" src={`/${product.image.replace(/\\/g, '/')}`} alt={product.name} />
                                            <div className="text-2xl font-bold">{product.name}</div>
                                            <span>{product.description}</span>
                                        </div>
                                        <div className="flex align-items-center justify-content-between">
                                            <span className="text-2xl font-semibold">₪{product.price}</span>
                                            {isUserLoggedIn && <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'} onClick={() => buy(category._id, product)} style={{ border: "solid,2px", borderColor: "red", backgroundColor: "black", color: "red" }}></Button>}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    const itemTemplate = (category, index) => {
        if (!category) {
            return;
        }
        return gridItem(category, index);
    };

    const listTemplate = (categories) => {
        return <div className="grid grid-nogutter">{categories.map((category, index) => itemTemplate(category, index))}</div>;
    };
    return (
        <div style={{ backgroundColor: "black", minHeight: "100vh" }}>
            <h1>תפריט</h1>

            <div className="card flex flex-wrap justify-content-center gap-3">
                {categories.map((category, index) => (
                    <Button key={category._id} onClick={() => scrollToCategory(index)} label={category.name} severity="danger" text style={{ color: "white", backgroundColor: "#151515" }} />
                ))}
            </div>

            <DataView value={categories} listTemplate={listTemplate} />
            {showTopping && (
                <>
                    <div style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex: 1000
                    }} />
                    <div style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        border: "1px solid ",
                        padding: "1rem",
                        backgroundColor: "black",
                        zIndex: 1001
                    }}>
                        <button onClick={() => setShowTopping(false)}>סגור</button> {/* כפתור סגירה */}
                        <ChooseTopping
                            categoryId={chosenCategoryId}
                            productId={chosenProduct._id}
                            onClose={() => setShowTopping(false)}
                        />
                    </div>
                </>
            )}
        </div>
    )

}
export default Menue;
