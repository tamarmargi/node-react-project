import { useState } from "react";
import { useCreateCategoryMutation } from "./CategoryApiSlice";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";

const AddCategory = (props) => {
    const [category, setCategory] = useState({
        name: ""
    });
    const navigate = useNavigate();

    const [addCategory, { isError, isLoading, error }] = useCreateCategoryMutation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory({
            ...category,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        props.setAddCategory(false)
        try {
            await addCategory(category).unwrap();

            setCategory({
                name: ''
            });

            navigate("/update");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex justify-content-center mt-5">
            <Card title="הוסף קטגוריה" className="w-30">
                {isLoading && (
                    <div className="flex justify-content-center mb-3">
                        <ProgressSpinner style={{ width: '30px', height: '30px' }} />
                    </div>
                )}

                {isError && (
                    <Message
                        severity="error"
                        text={error?.data?.message || "אירעה שגיאה בהוספת קטגוריה"}
                        className="mb-3"
                    />
                )}

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-column gap-3"
                    style={{ display: "flex", flexDirection: "column", gap: "1vh" }}
                >
                    <span className="p-float-label">
                        <InputText
                            id="name"
                            name="name"
                            value={category.name}
                            onChange={handleChange}
                        />
                        <label htmlFor="name">שם קטגוריה</label>
                    </span>

                    <Button type="submit" label="הוסף" className="p-button-success" />
                </form>
            </Card>
        </div>
    );
};

export default AddCategory;
