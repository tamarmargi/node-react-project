import { useNavigate, useParams } from "react-router-dom";
import { useCreateExtraMutation } from "./ExtraApiSlice";
import { useState } from "react";

import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";

const AddExtra = (props) => {
    const { categoryId, productId } = props;
    const [createExtra, { isError, isLoading, error }] = useCreateExtraMutation();
    const navigate = useNavigate();

    const [extra, setExtra] = useState({
        categoryId: "",
        productId: "",
        title: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExtra({
            ...extra,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        props.setAddExtra(false)
        e.preventDefault();
        const newExtra = {
            ...extra,
            categoryId,
            productId
        };
        createExtra(newExtra);
        setExtra({
            categoryId: "",
            productId: "",
            title: ""
        });
        navigate("/update")
    };

    return (
        <div className="flex justify-content-center mt-5">
            <Card title="הוסף Extra" className="w-30">
                {isLoading && (
                    <div className="flex justify-content-center mb-3">
                        <ProgressSpinner style={{ width: '30px', height: '30px' }} />
                    </div>
                )}

                {isError && (
                    <Message
                        severity="error"
                        text={error?.data?.message || "אירעה שגיאה בהוספת Extra"}
                        className="mb-3"
                    />
                )}

                <form onSubmit={handleSubmit} className="flex flex-column gap-3">
                    <span className="p-float-label">
                        <InputText
                            id="title"
                            name="title"
                            value={extra.title}
                            onChange={handleChange}
                        />
                        <label htmlFor="title">כותרת Extra</label>
                    </span>

                    <Button type="submit" label="הוסף" className="p-button-success" />
                </form>
            </Card>
        </div>
    );
};

export default AddExtra;
