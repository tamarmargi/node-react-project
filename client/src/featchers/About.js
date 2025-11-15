import React from "react";

const About = () => {
    return (
        <div style={{ fontFamily: "sans-serif", direction: "rtl" }}>

            {/* Section Top - Black background */}
            <div style={{
                backgroundColor: "black",
                color: "white",
                textAlign: "center",
                padding: "50px 20px",
                position: "relative"
            }}>

                <h1 style={{
                    fontSize: "64px",
                    margin: 0,
                    fontWeight: "bold"
                }}>
                    אודות
                </h1>
                <p style={{
                    fontSize: "24px",
                    marginTop: "10px",
                    letterSpacing: "4px"
                }}>
                    מאז 2004
                </p>

            </div>
            <img
                src={"/products_image/black.png"}
                alt="פרחים אדומים"
                style={{
                   
                    width: "97.7vw",
                    height: "22vh",
                    marginBottom: "-11vh"
                }}
            />

            {/* Section Content - White background */}
            <div style={{
                backgroundColor: "white",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "60px 80px",
                // minHeight: "500px",
                position: "relative"
            }}>

                {/* Text Content */}
                <p style={{
                    maxWidth: "700px",
                    fontSize: "15px",
                    color: "#333",
                    lineHeight: "1.8"
                }}>
                    רשת ג'פניקה מתמחה בנפלאות המטבח האסייתי על כל סוגיו, ובפרט בכל הקשור לעולם הסושי.
                    העקרונות המנחים אותנו הם שילוב של חומרי גלם טריים ואיכותיים לצד מחירים נוחים ותודעת שירות גבוהה,
                    והם אלה המזמינים את קהל הלקוחות לשוב וליהנות בכל פעם מחדש, הן במסעדות הרשת והן במשלוחים.
                </p>

                {/* Image of red flowers */}
                <img
                    src={"/products_image/flowers.png"}
                    alt="פרחים אדומים"
                    style={{ maxWidth: "300px", height: "auto" }}
                />
            </div>
            <img
                src={"/products_image/about.png"}
                alt="about"
                style={{ height: "auto", width: "100vw" }}
            />
            <div style={{
                backgroundColor: "white",
                padding: "60px 80px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <img
                    src={"/products_image/flowers.png"}
                    alt="פרחים אדומים"
                    style={{ maxWidth: "300px", height: "auto" }}
                />
                <p style={{
                    maxWidth: "700px",
                    fontSize: "15px",
                    color: "#333",
                    lineHeight: "1.8",
                    textAlign: "right"
                }}>
                    רשת ג'פניקה פועלת בארץ משנת 2004 וכיום מוגדרת כרשת המסעדות הגדולה בישראל עם כ-40 סניפים הפרוסים ברחבי הארץ.
                    מועדון הלקוחות הייחודי והמצליח של ג׳פניקה,
                    נועד להעניק הטבות משתלמות וטעימות למאות אלפי הלקוחות הוותיקים והנאמנים שלנו הנהנים לאכול ג׳פניקה מדי יום.
                    <br /><br />
                    אז… שיהיה בתאבון!
                </p>
            </div>
            <div style={{
                backgroundColor: "black",
                height: "200px",
                width: "100%",
            }}></div>


        </div >
    );
};

export default About;
