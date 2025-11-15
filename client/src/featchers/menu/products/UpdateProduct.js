import { useNavigate, useParams } from "react-router-dom";
import { useUpdateProductMutation } from "./ProductApiSlice";
import { useState } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";


const UpdateProduct = (props) => {
    const { categoryId, productId } = props

    const [updateProduct, { isError, isLoading, error }] = useUpdateProductMutation();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        categoryId: "",
        productId: "",
        name: "",
        image: "",
        description: "",
        price: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    const handlePriceChange = (e) => {
        setProduct({
            ...product,
            price: e.value || 0
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        props.setUpdateProduct(false)
        const updatedProduct = {
            ...product,
            categoryId,
            productId
        };

        try {
            await updateProduct(updatedProduct).unwrap();

            setProduct({
                categoryId: "",
                productId: "",
                name: "",
                image: "",
                description: "",
                price: 0
            });

            navigate("/update")
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex justify-content-center mt-5">
            <Card title="עדכן מוצר" className="w-30">
                {isLoading && (
                    <div className="flex justify-content-center mb-3">
                        <ProgressSpinner style={{ width: '30px', height: '30px' }} />
                    </div>
                )}

                {isError && (
                    <Message
                        severity="error"
                        text={error?.data?.message || "אירעה שגיאה בעדכון המוצר"}
                        className="mb-3"
                    />
                )}

                <form onSubmit={handleSubmit} className="flex flex-column gap-3"
                    style={{ display: "flex", flexDirection: "column", gap: "1vh" }}
                >
                    <span className="p-float-label">
                        <InputText
                            id="name"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                        />
                        <label htmlFor="name">שם מוצר</label>
                    </span>

                    <span className="p-float-label">
                        <InputText
                            id="image"
                            name="image"
                            value={product.image}
                            onChange={handleChange}
                        />
                        <label htmlFor="image">כתובת תמונה</label>
                    </span>

                    <span className="p-float-label">
                        <InputTextarea
                            id="description"
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            rows={3}
                            autoResize
                        />
                        <label htmlFor="description">תיאור</label>
                    </span>

                    <span className="p-float-label">
                        <InputNumber
                            id="price"
                            name="price"
                            value={product.price}
                            onValueChange={handlePriceChange}
                            mode="currency"
                            currency="ILS"
                            locale="he-IL"
                            min={0}
                        />
                        <label htmlFor="price">מחיר</label>
                    </span>

                    <Button type="submit" label="עדכן" className="p-button-success" />
                </form>
            </Card>
        </div>
    );
};

export default UpdateProduct;
