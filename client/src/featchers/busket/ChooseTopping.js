//import { useParams } from "react-router-dom"
import { useGetProductByIdQuery } from "../menu/products/ProductApiSlice"
import { useState } from "react";
import { useAddToppingMutation } from "./BusketApiSlice";
//----------------------------
import { Button } from 'primereact/button';

const ChooseTopping = ({ categoryId, productId }) => {
    // const { categoryId, productId } = useParams()
    const { data: product = {}, isError, isLoading } = useGetProductByIdQuery({ categoryId, productId })
    const [addTopping, { isError: topIsError, isLoading: topIsLoading }] = useAddToppingMutation()
    const [flags, setFlags] = useState({});

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading product</div>;

    const choose = (extraId, toppingId) => {
        addTopping({
            categoryId,
            productId,
            extraId,
            toppingId
        })
        setFlags(toppingsArr => ({
            ...toppingsArr,
            [toppingId]: !toppingsArr[toppingId]
        }))

    };

    return (
        <div>
            <h1>chooseTopping</h1>
            <h3>{product.name}</h3>
            {product.image &&
                <img src={`/${product.image.replace(/\\/g, '/')}`} alt={product.name} />
            }
            {Array.isArray(product.extras) && product.extras.map((extra, index) => (
                <div key={index}>
                    <h2 >{extra.title}</h2>
                    {Array.isArray(extra.toppings) && extra.toppings.map(topping => (
                        < div key={topping._id}>
                            <h4>{topping.name}</h4>
                            <Button icon={flags[topping._id] ? "pi pi-check" : "pi pi-times"} rounded text severity="danger" aria-label="Cancel" onClick={() => choose(extra._id, topping._id)}
                             style={{ backgroundColor: flags[topping._id] ? " red" : "white", width: "2vw", height: "4vh", marginTop: "4vh" }} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default ChooseTopping