 import React, { useState, useRef, useEffect, useContext } from "react";
import "./Change.css";
import { Input, Form, Checkbox, Button, Progress } from "antd";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Context from "../../../context";

export default function Change(props) {
  const cartId = useContext(Context).cartId;
  const setCartId = useContext(Context).setCartId;
  const [shop, setShop] = useState([]);
  const productToDelete = useRef();
  const Title = useRef();
  // const Image = useRef();
  const Quantity = useRef();
  const Price = useRef();
  const Description = useRef();
  const newImage = useRef();
  const title = useRef();
  const newQuantity = useRef();
  const [base64,setBase64]=useState("");
  const [url,setUrl]=useState(null);

  useEffect(() => {
    axios.get("/api/shop").then((res) => {
      setShop(res.data);
    });
  }, []);

  function deleted() {
    const titleToDelete={title:productToDelete.current.value}
    axios
      .delete("/api/shop", {params:titleToDelete})
      .then((res) => {
        console.log(
          `product whith title ${productToDelete.current.value} deleted`
        );
      });
  }

  function addProduct() {
    const newProduct = {
      id: shop.length + 1,
      title: Title.current.value,
      image: url,
      // image: `../../../../images/${newImage.current.files[0].name}`,
      quantity: Quantity.current.value,
      price: Price.current.value,
      description: Description.current.value,
    };
    // console.log(newProduct);
    axios.post(`/api/shop`, newProduct).then((res) => {
      console.log(`shcoyech!`);
    });
  }

  function updateProduct() {
    const updates = {
      title: title.current.value,
      newQuantity: newQuantity.current.value,
    };
    axios.put("/api/shop/update", updates).then((res) => {
      console.log("המלאי התעדכן");
    });
  }

   function previewFile(){
    const file=newImage.current.files[0];
    const reader= new FileReader();
    reader.addEventListener("load", function convert(){
         setBase64(reader.result);
      
    }, false)
    if (file)
    {reader.readAsDataURL(file)};
  }

  function uploadFile() {
        axios.post("/api/upload", {base64}, 
        // {params: { filename: newImage.current.files[0].name},
  // onUploadProgress: (progressEvent)=>{
  //   const percentCompleted=Math.round(
  //     (progressEvent.loaded*100)/progressEvent.total
  //   );
  // }}
).then((res) => {
  setUrl(res.data);
  })}

  return (
    <div className="borderToChange">
      <h3> מחיקת מוצר</h3>
      בחר את הפריט שברצונך למחוק
      <select className="input" ref={productToDelete} size="3" multiple>
        {shop.map((product) => (
          <option value={product.title}>{product.title}</option>
        ))}
      </select>
      <button className="sendId" onClick={deleted}>
        שלח
      </button>
      <br />
      <h3> הוספת מוצר</h3>
      <input
        className="input"
        ref={Title}
        placeholder="רשום את שמו של הפריט החדש"
      ></input>
      <div className="addimg">
        בחר את תמונת המוצר החדש
        <br />
        <input className="input" type="file" ref={newImage} id="uploadedFile" onChange={previewFile} />
        <button onClick={uploadFile}>העלה את התמונה לשרת</button>
      </div>
      <input
        className="input"
        ref={Quantity}
        placeholder="רשום את המלאי של הפריט החדש"
      ></input>
      <input
        className="input"
        ref={Price}
        placeholder="רשום את מחירו של הפריט החדש"
      ></input>
      <textarea
        className="input"
        ref={Description}
        rows="3"
        placeholder="הכנס את תיאור המוצר החדש"
      ></textarea>
      <button className="sendProduct" onClick={addProduct}>
        הוסף מוצר
      </button>
      <br />
      <h3> עדכון המלאי של מוצר</h3>
      <input
        className="input"
        ref={title}
        placeholder="רשום את שם המוצר"
      ></input>
      <input
        className="input"
        ref={newQuantity}
        placeholder="רשום את המלאי המעודכן"
      ></input>
      <button className="changeProduct" onClick={updateProduct}>
        שנה מוצר
      </button>
      <br />
      {/* <button onClick={addtoserver}>קבל איידי</button> */}
      <br />
      <Link to="/">בחזרה לחנות</Link>
    </div>
  );

  //   "id": 6,
  //   "title": "כיפה",
  //   "image": "data:image/jpeg;base64,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",
  //   "quantity": 300,
  //   "price": 100,
  //   "description": "כיפות סרוגות במספר רב של דוגמאות"
  // }
  //   const layout = {
  //     labelCol: { span: 90 },
  //     wrapperCol: { span: -10 },
  //   };
  //   const tailLayout = {
  //     wrapperCol: { offset: 8, span: 16 },
  //   };

  //   const [validPassword, setValidPassword] = useState(false);
  //   const [valid1, setValid1] = useState(true);
  //   const [valid2, setValid2] = useState(true);
  //   const [change, setChange] = useState("");

  //   const onFinish = (values) => {
  //     axios.delete(`http://127.0.0.1:8000/shop/${values.id}`).then((res) => {
  //       console.log(`product whith id ${values.id} deleted`);
  //     });
  //   };

  //   const onFinishFailed = (errorInfo) => {
  //     console.log("Failed:", errorInfo);
  //   };

  //   const onchange = () => {
  //     setChange(change);
  //   };

  //   return (
  //     <div className="border">
  //       <Form
  //         {...layout}
  //         name="basic"
  //         initialValues={{ remember: true }}
  //         onFinish={onFinish}
  //         onFinishFailed={onFinishFailed}
  //         onFieldsChange={onchange}
  //       >
  //         <Form.Item
  //           name="id"
  //           rules={[
  //             { required: true, message: "הכנס את קוד המוצר שברצונך למחוק" },
  //           ]}
  //         >
  //           <Input
  //             className="enterPassword"
  //             placeholder="הכנס את קוד המוצר שברצונך למחוק"
  //             type="password"
  //           />
  //         </Form.Item>

  //         <Button className="send" type="primary" htmlType="submit">
  //           שלח
  //         </Button>

  //         <br />
  //         <br />
  //         <Link to="/" className="linkShop">
  //           בחזרה לחנות
  //         </Link>
  //       </Form>
  //     </div>
  //   );
}


  // function addtoserver() {
  // {cartId:cartId, name:name, password:password,title:title}

  //   axios.post("http://127.0.0.1:8000/shop/cartAdd", ).then((res) => {
  //     setCartId(res);
  //     console.log(cartId);
  //   });
  // }

  //   const newProduct = {
  //     title: idToChange1,
  //   };
  //   axios
  //     .put(`http://127.0.0.1:8000/shop/${idToChange1}`, newProduct)
  //     .then((res) => {
  //       console.log(`shcoyech!`);
  //     });
  // }
