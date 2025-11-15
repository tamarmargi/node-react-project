import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const styles = {
        header: {
            backgroundColor: "black",
            position: "relative",
            width: "100vw",
            height: "37vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
        },
        orderButton: {
            backgroundColor: "red",
            color: "white",
            border: "none",
            padding: "0.8rem 2rem",
            fontSize: "1.2rem",
            cursor: "pointer",
            fontWeight: "bold",
            borderRadius: "4px",
            position: "relative",
            zIndex: 2,
        },
        headerWave: {
            position: "absolute",
            bottom: "-1px",
            left: 0,
            width: "100%",
            height: "100px",
        },
        svg: {
            display: "block",
            width: "100 %",
            height: "200 %",
            marginTop: "- 1vh"
},
    };

return (
    <div>
        {/* HEADER */}
        <div style={styles.header}>
            <img src="products_image/MainPic.png" className="headerPic" style={{
                width: "52vw",
                height: "21vh",
                marginBottom: "20vh",
                marginTop: "17vh",
                marginLeft: "5vw"
            }}></img>
            <div style={styles.headerWave}>
                <svg
                    style={styles.svg}
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,40 C200,100 800,0 1200,60 L1200,120 L0,120 Z"
                        fill="white"
                    ></path>
                </svg>
            </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="main" style={{ backgroundColor: "white", height: "180vh", width: "100vw" }}>
            <div style={{
                width: "44vw",
                height: "30vh",
                textAlign: "center",
                marginRight: "28vw",
                paddingTop: "4vh",
                fontSize: "1vw"
            }}>
                <p style={{ color: "black" }}>
                    רשת ג'פניקה מתמחה בנפלאות המטבח האסייתי על כל סוגיו,
                    ובפרט בכל הקשור לעולם הסושי.
                    העקרונות המנחים אותנו הם שילוב של חומרי גלם טריים ואיכותיים לצד מחירים נוחים ותודעת שירות גבוהה,
                    והם אלה המזמינים את קהל הלקוחות לשוב וליהנות בכל פעם מחדש, הן במסעדות הרשת והן במשלוחים.
                </p>
                <a href="/About" style={{ color: "red" }}> קראו עוד</a>
            </div>

            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{
                    width: "44vw",
                    height: "30vh",
                    textAlign: "start",
                    marginRight: "2vw",
                    paddingTop: "4vh",
                    fontSize: "1vw"
                }}>
                    <img src="products_image/mainSoshi.png" style={{ width: "34vw", height: "51vh" }} alt="main sushi" />
                    <div style={{
                        marginRight: "50vw",
                        marginTop: "-42vh",
                        width: "33vw"
                    }}>
                        <h1 style={{ color: "black" }}>התפריט שלנו</h1>
                        <p style={{ color: "black" }}>
                            רשת ג'פניקה פועלת בארץ משנת 2004 וכיום מוגדרת כרשת המסעדות הגדולה בישראל עם כ-50 סניפים הפרוסים ברחבי הארץ.
                            מועדון הלקוחות הייחודי והמצליח של ג׳פניקה,
                            נועד להעניק הטבות משתלמות וטעימות למאות אלפי הלקוחות הוותיקים והנאמנים שלנו
                            הנהנים לאכול ג׳פניקה מדי יום.
                            אז… שיהיה בתאבון!
                        </p>
                        <a href="/menue" style={{ color: "red" }}> לתפריט</a>
                    </div>
                </div>
            </div>

            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{
                    width: "44vw",
                    height: "30vh",
                    textAlign: "start",
                    marginRight: "2vw",
                    paddingTop: "4vh",
                    fontSize: "1vw"
                }}>
                    <div style={{
                        marginRight: "18vw",
                        marginTop: "51vh",
                        width: "33vw"
                    }}>
                        <h1 style={{ color: "black" }}>ג'פניקה עד הבית</h1>
                        <p style={{ color: "black" }}>
                            מזמינים אתכם לחוות טעמים מושקעים ישירות ממטבחינו. עם שירות המשלוחים המהיר שלנו, נפתח לכם חלון לעולם של טעמים אותנטיים וחוויות קולינריות משובחות.
                            הזמינו עכשיו ותובילו את הטעמים המפתיעים ישירות לשולחן בביתכם! 🍜🏠
                        </p>
                        <button onClick={() => navigate("/menue")} style={{ backgroundColor: "red", color: "white", padding: "0.5rem 1.2rem", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }}>
                            להזמנות
                        </button>
                    </div>
                    <img src="products_image/mainBag.png" style={{
                        width: "23vw",
                        height: "62vh",
                        marginRight: "64vw",
                        marginTop: "-46vh"
                    }} alt="main bag" />
                </div>
            </div>
        </div>

        <img
            src="products_image/Screenshot 2025-07-13 171946.png"
            style={{
                width: "100vw",
                height: "35vh"
            }}
            alt=""
        />

        <div style={{ backgroundColor: "black", height: "40vh" }}></div>
    </div >
);
};

export default Home;