import { useNavigate, useParams } from "react-router-dom";
import { useUpdateToppingMutation } from "./ToppingApiSlice";
import { useState } from "react";

import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";

const UpdateTopping = (props) => {
    const { categoryId, productId, extraId, toppingId } = props;
    const [updateTopping, { isError, isLoading, error }] = useUpdateToppingMutation();
    const navigate = useNavigate();

    const [topping, setTopping] = useState({
        categoryId: "",
        productId: "",
        extraId: "",
        toppingId: "",
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
        e.preventDefault();
        props.setUpdateTopping(false)
        const updatedTopping = {
            ...topping,
            categoryId,
            productId,
            extraId,
            toppingId
        };

        updateTopping(updatedTopping);

        setTopping({
            categoryId: "",
            productId: "",
            extraId: "",
            toppingId: "",
            name: ""
        });

        navigate("/update")
    };

    return (
        <div className="flex justify-content-center mt-5">
            <Card title="עדכון Topping" className="w-30">
                {isLoading && (
                    <div className="flex justify-content-center mb-3">
                        <ProgressSpinner style={{ width: '30px', height: '30px' }} />
                    </div>
                )}

                {isError && (
                    <Message
                        severity="error"
                        text={error?.data?.message || "אירעה שגיאה בעדכון Topping"}
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

                    <Button type="submit" label="עדכן" className="p-button-warning" />
                </form>
            </Card>
        </div>
    );
};

export default UpdateTopping;
