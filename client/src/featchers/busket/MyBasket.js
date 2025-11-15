import { useGetAllCategoriesQuery } from "../menu/categories/CategoryApiSlice";
import { useAddToBusketMutation, useDeleteProductFromBasketMutation, useGetBusketByIdQuery, useLessAmountMutation } from "./BusketApiSlice";
import { useEffect, useState } from 'react';
import { OrderList } from 'primereact/orderlist';
import { Button } from 'primereact/button';
import { ButtonGroup } from 'primereact/buttongroup';

const MyBasket = () => {
    const { data: categories = [], isError: isError1, isLoading: isLoading1 } = useGetAllCategoriesQuery();
    const { data: basket = {}, isError, isLoading } = useGetBusketByIdQuery()
    const [deleteProduct, { isError: isError2, isLoading: isLoading2 }] = useDeleteProductFromBasketMutation()
    const [addToBasket, { isError: isError3, isLoading: isLoading3 }] = useAddToBusketMutation()
    const [lessAmount, { isError: isError4, isLoading: isLoading4 }] = useLessAmountMutation()
    const [products, setProducts] = useState([])

    useEffect(() => {
        if (basket.products) {
            setProducts(basket.products);
        }
    }, [basket.products]);

    const handleDeleteProduct = (product) => {
        const updatedProduct = { ...product, amount: 0 };
        deleteProduct(updatedProduct.productId);
        setProducts(prevProducts =>
            prevProducts.filter(p => p.productId !== updatedProduct.productId)
        );
    };

    const handleLess = (basketId, product) => {
        if (product.amount > 1) {
            lessAmount({ basketId: basketId, productId: product.productId })
            setProducts((prev) =>
                prev.map((p) => p.productId === product.productId ? { ...p, amount: p.amount - 1 } : p  ))
        }
        else {
            handleDeleteProduct(product);
        }
    };

    const total = products.reduce((sum, item) => {
        const productId = item.productId?.toString();
        let product = null;

        categories.forEach(category => {
            const foundProduct = category.products?.find(
                prod => prod._id?.toString() === productId
            );
            if (foundProduct) {
                product = foundProduct;
            }
        });

        if (product) {
            return sum + (product.price * item.amount);
        }

        return sum;
    }, 0);

    if (isLoading || isLoading1) return <div>Loading...</div>;
    if (isError || isError1) return <div>Error loading data</div>;

    const itemTemplate = (item) => {
        const productId = item.productId?.toString();
        let productName = "";
        let product;
        let thisCategory;

        categories.forEach(category => {
            const foundProduct = category.products?.find(
                prod => prod._id?.toString() === productId
            );
            if (foundProduct) {
                productName = foundProduct.name;
                product = foundProduct;
                thisCategory = category
            }
        });

        if (!product) {
            return (
                <div>
                    <h2>מוצר לא במלאי</h2>
                    <Button style={{ border: "solid,2px", borderColor: "red", backgroundColor: "black", color: "red" }}
                            onClick={() => handleDeleteProduct(item)}
                            icon="pi pi-trash"
                        />
                </div>
            );
        }

        return (
            <div  >
                <div className="flex flex-wrap p-2 align-items-center gap-3" >
                    <img className="border-round" src={`/${product.image?.replace(/\\/g, '/')}`} alt={productName} style={{ width: "18vw" }} />
                    <div className="flex-1 flex flex-column gap-2 xl:mr-8">
                        <span className="font-bold">{productName}</span>
                    </div>
                    <span className="font-bold text-900">₪{product.price}</span>
                    <div className="card flex justify-content-center" style={{ marginRight: "8vw" }} >
                        <button style={{
                            border: "2px solid red",
                            backgroundColor: " black",
                            color: "red",
                            borderRadius: "100%",
                            width: "2vw",
                            height: " 4vh",
                            marginLeft: "1.0vw"
                        }}
                            onClick={() => addToBasket({ categoryId: thisCategory._id, productId: item.productId })}
                            label="+"
                        >+</button>
                        <span className="font-bold text-900">  {item.amount} </span>
                        <button style={{
                            border: "2px solid red",
                            backgroundColor: " black",
                            color: "red",
                            borderRadius: "100%",
                            width: "2vw",
                            height: " 4vh",
                            marginRight: "1.0vw"
                        }}
                            onClick={() => handleLess(basket._id, item)}
                            label="-"
                        >-</button></div>
                    <ButtonGroup>
                        <Button style={{ border: "solid,2px", borderColor: "red", backgroundColor: "black", color: "red" }}
                            onClick={() => handleDeleteProduct(item)}
                            icon="pi pi-trash"
                        />
                    </ButtonGroup>
                </div>
                <div style={{marginTop: "-6vh"}}> 
                    {/* המרה בשביל לבצע map  על אובייקט  */}
                    {Object.entries(item.toppings || {}).map(([toppingId,isActive]) => {
                        if (!isActive) return null;
                        let toppingName = "";
                        product.extras.map((extra) => {
                            const foundTopping = extra.toppings.find(
                                (t) =>( <>{t._id.toString() === toppingId}
                                </>)
                            )
                         {toppingName = foundTopping.name}
                       
                        })
                        return (
                            <div key={toppingId}>
                              + תוספת {toppingName}
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    };

    return (
        < div style={{marginTop: "8vh"}}>
            <div className="card xl:flex xl:justify-content-center">
                <OrderList
                    dataKey="productId"
                    value={products}
                    onChange={(e) => setProducts(e.value)}
                    itemTemplate={itemTemplate}
                    header="My Basket"
                />

            </div>
            <h3 style={{ marginRight: "6vw" }}>לתשלום: ₪{total}</h3>
        </div>
    );
};

export default MyBasket;
