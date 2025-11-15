import { useNavigate, useParams } from "react-router-dom";
import { useCreateToppingMutation } from "./ToppingApiSlice";
import { useState } from "react";

import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";

const AddTopping = (props) => {
    const { categoryId, productId, extraId } = props
    const [createTopping, { isError, isLoading, error }] = useCreateToppingMutation();
    const navigate = useNavigate();

    const [topping, setTopping] = useState({
        categoryId: "",
        productId: "",
        extraId: "",
        name: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTopping({
            ...topping,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        props.setAddTopping(false)
        e.preventDefault();
        const newTopping = {
            ...topping,
            categoryId,
            productId,
            extraId
        };

        createTopping(newTopping);

        setTopping({
            categoryId: "",
            productId: "",
            extraId: "",
            name: ""
        });

        navigate("/update")
    };

    return (
        <div className="flex justify-content-center mt-5">
            <Card title="הוסף Topping" className="w-30">
                {isLoading && (
                    <div className="flex justify-content-center mb-3">
                        <ProgressSpinner style={{ width: '30px', height: '30px' }} />
                    </div>
                )}

                {isError && (
                    <Message
                        severity="error"
                        text={error?.data?.message || "אירעה שגיאה בהוספת Topping"}
                        className="mb-3"
                    />
                )}

                <form onSubmit={handleSubmit} className="flex flex-column gap-3">
                    <span className="p-float-label">
                        <InputText
                            id="name"
                            name="name"
                            value={topping.name}
                            onChange={handleChange}
                        />
                        <label htmlFor="name">שם Topping</label>
                    </span>

                    <Button type="submit" label="הוסף" className="p-button-success" />
                </form>
            </Card>
        </div>
    );
};

export default AddTopping;
