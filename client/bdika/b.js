// import React, { useState } from "react";
// import { Input, Form, Button } from "antd";
// import "./SendPhoneNumber.css";

// let ob = { m: "mush" };
// console.log(ob);
// console.log(String(ob));
// console.log(JSON.stringify(ob));

// const SendPhoneNumber = (props) => {
//   const [visabilityInput, setVisabilityInput] = useState(false);
//   const layout = {
//     labelCol: { span: 90 },
//     wrapperCol: { span: -10 },
//   };
//   const tailLayout = {
//     wrapperCol: { offset: 8, span: 16 },
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//   const [valid, setValid] = useState(true);
//   const [valid1, setValid1] = useState(true);
//   const [valid2, setValid2] = useState(true);
//   const [change, setChange] = useState("");

//   const onFinish = (values) => {
//     const regular = /^[0-9]+$/;
//     if (regular.test(values.phonenumber) && values.phonenumber.length === 10) {
//       console.log("Success:", values.phonenumber);
//       props.setPhoneNum(values.username);
//       props.check(values.phonenumber);
//     }
//     if (values.phonenumber.length < 10) {
//       setValid2(false);
//     }
//   };
//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//   const validationInput = (changedValues) => {
//     setValid2(true);
//     const regular = /^[0-9]+$/;
//     const validation = regular.test(changedValues.phonenumber);
//     if (!validation && changedValues.phonenumber.length > 0) {
//       setValid(false);
//     } else if (valid === false) {
//       setValid(true);
//       console.log(valid);
//     }
//     if (changedValues.phonenumber.length > 10) {
//       setValid1(false);
//     } else if (valid1 === false) {
//       setValid1(true);
//       console.log(valid1);
//     }
//   };
//   const onchange = () => {
//     setChange(change);
//   };

//   return (
//     <Form
//       className=""
//       {...layout}
//       name="basic"
//       initialValues={{ remember: true }}
//       onFinish={onFinish}
//       onFinishFailed={onFinishFailed}
//       onValuesChange={validationInput}
//       onFieldsChange={onchange}
//     >
//       <div className="SendPhoneNumberHeader">
//         <h1>,אופס</h1>
//         <h4>לא מצאנו אותך במערכת...</h4>
//       </div>

//       {/* <Form.Item {...tailLayout}> */}
//       <Button
//         type="primary"
//         htmlType="submit"
//         className="sendPhoneNumberStudentBtn"
//         onClick={() => setVisabilityInput(true)}
//       >
//         אני תלמיד
//       </Button>

//       {/* </Form.Item>
//       <Form.Item {...tailLayout}> */}
//       <Button
//         type="primary"
//         htmlType="submit"
//         className="sendPhoneNumberParentBtn"
//       >
//         אני הורה
//       </Button>
//       {/* </Form.Item> */}

//       <div>
//         <div className="SendPhoneNumberBottomText">
//           <h4>עליך לקבל הרשאת הורה</h4>
//           <h4>אנא הזן מספר טלפון של אחד ההורים</h4>
//         </div>

//         <Form.Item
//           name="phonenumber"
//           rules={[{ required: false, message: "" }]}
//         >
//           <Input className="PhoneInput" placeholder="הזן מספר טלפון" />
//         </Form.Item>
//         {!valid && <div>יש להזין מספרים בלבד</div>}
//         {!valid1 && valid && <div>אין להזין יותר מ-10 ספרות</div>}
//         {!valid2 && <div>יש להזין מספר עם 10 ספרות</div>}
//         <Form.Item>
//           <Button
//             type="primary"
//             htmlType="submit"
//             className="sendPhoneNumber"
//             onClick={props.sendPasswordAgain(props.dataObject.phoneNum)}
//           >
//             שלח
//           </Button>
//         </Form.Item>
//       </div>
//     </Form>
//   );
// };

// export default SendPhoneNumber;

// import React, { useEffect, useState } from "react";
// import { Input, Form, Checkbox, Button } from "antd";
// import { OmitProps } from "antd/lib/transfer/ListBody";
// import "../LogInValidation/LogInValidation.css";

// const LogInValidation = (props) => {
//   const [PasswordCheck, setPasswordCheck] = useState(false);
//   const layout = {
//     labelCol: { span: 4 },
//     wrapperCol: { span: 25 },
//   };
//   const tailLayout = {
//     wrapperCol: { offset: 10, span: 3 },
//   };

//   const onFinish = (values) => {
//     const check = /^[0-9]+$/;
//     console.log("Success:", values.password);
//     if (values.password.length === 4 && check.test(values.password)) {
//       setPasswordCheck(false);
//       props.check(values.password);
//       console.log(PasswordCheck);
//     } else {
//       setPasswordCheck(true);
//     }
//     console.log(PasswordCheck);
//   };
//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//   const [valid, setValid] = useState(true);
//   const [valid1, setValid1] = useState(true);
//   const [valid2, setValid2] = useState(true);
//   const [change, setChange] = useState("");

//   const validationInput = (changedValues) => {
//     setValid2(true);
//     const regular = /^[0-9]+$/;
//     const validation = regular.test(changedValues.password);
//     if (!validation && changedValues.password.length > 0) {
//       setValid(false);
//     } else if (valid === false) {
//       setValid(true);
//       console.log(valid);
//     }
//     if (changedValues.password.length > 4) {
//       setValid1(false);
//     } else if (valid1 === false) {
//       setValid1(true);
//       console.log(valid1);
//     }
//   };
//   const onchange = () => {
//     setChange(change);
//   };

//   return (
//     <div className="logInValidation">
//       <Form
//         className="passwordContainer"
//         {...layout}
//         name="basic"
//         initialValues={{ remember: true }}
//         onFinish={onFinish}
//         onFinishFailed={onFinishFailed}
//         onValuesChange={validationInput}
//         onFieldsChange={onchange}
//       >
//         <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEBASExIVFRUVEBUWGRcVGBUYFhUVGRYYFhYXFxgYHSggGBonJxUTIjEiJSktLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGi8lHyUtLS0tOC4xNystMy4tLS0tKzUrLTUzLS0tKzMtLS0vLS0tLS0tLS0tMCstLystLS8tK//AABEIAOAA4AMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYDBAcCAf/EAEcQAAEDAgMDBwYLBgUFAAAAAAEAAgMEEQUSIQYxQRMWIlFhcdEyUlSBkZIHFCNCcqGisbLB0hUzNFNiczV0s8LhJEODk/D/xAAaAQEAAgMBAAAAAAAAAAAAAAAAAQQDBQYC/8QAKxEBAAIBAgUEAgAHAAAAAAAAAAECAwQREhMhMUEFFFFSIoEVIzJCYXHR/9oADAMBAAIRAxEAPwDuKIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgLy94AJJsBx6l6VX2pxP/stP0z9zfzPqWLNljFXil5taKxu+1+09iRE0H+p249wWi3aSpB3tPYW+Ch0Wltqstp34lSclp8rphGPMnORwyv4Dg7uPX2KZXM2uIIINiDcHtV6wPERPGD84aOHb19xWw0mqnJ+Nu7PiycXSUkiIr7MIiICIiAiIgIiICIiAiIgIig8Y2hZCSxgzPG/qb39vYsWbNTFXivO0PePHbJPDWN03dLqkO2mqb72jsy/8qRw3acEhsoDb/ObuHeOCp4/VNPe3Dvt/tZvoM1Y32WdF5a669LYqYiLHNIGNLibAC5PYnYaWN4iIIyfnHRo7evuCojnEkkm5JuT1k71t4pXGeQvO7c0dQ8VprQ6rPzb9O0KeS/FIiIqzGLcwuuMEgeN25w62+K00U1tNZ3hMTtO7pMErXta5puCLg9iyKpbL4nldyLjo49HsPV61bV0GDNGWnEu0txRuIiLM9CIiAiIgIiICIiAiLDUztjY5zjYAXKiZiI3kiN+kNDH8T5CPTy3aN7Os+pUQm5JPFbOJVrp5C8+odTeAWquR1+rnUZOn9MdnSaPTxhp17z3ERFRW1q2UxO45Fx1A6JPEcW+pWdc6wimfJMwMNiCDm80A710MLqvSs18mHa0dum7n/UMVaZfx8vRVT2pxPMeRadAekRxPAer/AO3KYx7E+Qj08t2jezrd6vBUcnip12o2jl1/bU5r7fjD4iItUrCIiAiIg+q74BiXLx6npt0d29RVHWzh9Y6GRr28N46xxCsabPyr/wCJ7veO/DLoiLDS1DZGNe03DhcLMt9E7xvC6IiKQREQEREBERAVN2oxTO7kmnotPSPW7q7h9/cpnaPE+RjytPTfu7BxcqOtF6trNo5Nf3/xtfTtNvPNt+hERc+3QvoF9BvXxWTZXC8x5Zw0HkDrPFysabBbPkikMOfNGGk2lL4Bhggj18t1i78h6lIVdSyJjnvNmtFyVlXP9tMZ5V/IsPQYekR85/gPv7l1k8GnxbV8dnLZs0zM3t3l4xCtM8heeO4dTeAWstKgn+afV4LdWjvMzaZlQmdxEReUCIiAiIgIiIJzZnE+TfyTj0XHTsd4H71cAuZq6bOYnyzMrj02jX+ocHeK2mhz7/y7fpYw3/tlMoiLZrAiIgIiIC162pbExz3GwAv/AMDtWclUrafFOVfybT0GHh853X3DxVTWamNPjm3nwsabBOa/D48oyuq3TSOe7eeHUOAC10Rcfa02mbT3l01axWNo7CIvUcZcQ1ouSQAOslREb9ITM7dW5g+HmokDfmjVx6h4ldAijDWhoFgBYAcAtLBsOEEYb846uPWfBZ8QrGQRvkedGi/aTwA7Sus0GljT497d57ub1mp51+naOyI2txn4vFlYflHggf0t4u/IdvcucLZxKufUSukfvcd3mjg0dy1lXzZeZbfx4afJfikBUrTTZh28VFLJBLkN/b3Kveu8MaWRGm4uEWBIiIgIiICIiAs9FVOie17d4PtHEFYEUxMxO8ETs6NR1LZWNe3cR7OsHtWdUrZzEuSfkceg8+67gfyV0C3+nzRlpv58rtL8UbvqIizvYhReX7kEJtNinJMyNPTePdbxKpasdXs9Uyvc9z47uPW7TqA03LFzVn8+P2u8FzWtw6rUZOLgnbw3ely6fDTbi6+UCinuas/nx+13gnNWfz4/a7wVT+H6n6Ste9wfZAq17KYVYcs8akdAHgPO9f3d616TZZ4e0yOaWg6ht7ns1CtjGgaAWsFsvTvT7VvzMsbbdlHXa2tq8GOe/d9K53tjjPLycmw/JsPDc5+4nuG4etXbGoZpInMhc1rnaXdfRp32sDr4qncx6j+ZF7XfpWz1PMtHDWGiy8U9IVhFaOZFR/Mi9rv0pzIqP5kXtd+lUvb5fhg5VvhV0Vo5j1H8yL2u/SnMio/mRe136U9vl+DlW+EFQz2OU+rwW+t7mRUfzIva/wDSt2PZaewu+O/e7wWK+ly94qcu3whEU7zXm89n2vBOa83ns+14Lz7XN9Tl2+EEinea83ns+14JzXm89n2vBPa5vqcu3wgkU7zXm89n2vBOa83ns+14J7XN9Tl2+EEinea83ns+14JzXm89n2vBPa5vqcu3wglcdmsU5RnJuPTYPebwPePBRfNebz2fa8FlpdnqiN7XtewEHrd7DpuWfT482K+/D08veOt6z2WtF8buX1bhaEReXvDQSdABc9gCD0iiectF6TH7yc5aL0mP3kEsijZcepGZc07BmaHNud7TcAjs0Ky0eL082YRytflFzlN7DrKDdRRPOWi9Jj95OctF6TH7yCWRRsuPUjQwunYA9uZpJ8oXIuOzQr63HaQsLxOzKHBpdfQE7h36FBIoonnLRekx+8vcW0FG9zWtnjLnEAAHUkmwAQSaLmrtoahmIuY+dwhbVuaQbZQwPIsdN1ldOctF6TH7yCWReY3hwBBuCAQesHco6XaCjY5zXVEYc1xBBOoINiCgk0UTzlovSI/eWSXHqRgYXTsAe3M258ptyLjs0KCSRRPOWi9Jj95ZJcepGBpdOwB7czbnym3IuOzQoJJFE85aL0mP3lnkxmmbGyUysDHkhridHEXvY+o+xBvoonnLRekx+8skGP0kjmsZOxznGwAOpPUEEkiiuclF6RH7y+c5aL0mP3kEsi8xvDgCDcEAg9YOoK9ICx1EWdjm3tmaR7RZZEQcYxLDRDVupw4kCRrMxGvSy629a3Nq8BbRPia15fnaTqALWIHDvWXaFh/achsbfGI+B6mKU+E1pMtPYE/Jv3A9YUj5W4A2aghqjIQYqIWbYWOXM7U+tePg1beWpHXCB7SVOtaf2La2vxM6cfJVV2SrH0zKyYNuWwsIDrgG8gH5oI3aTChSTmJri4BjTcix1HYtrajAW0fIZXl/KNcdQBa2Xq+ksMz58TqbhgzOyt6IOVjRpcngOKsPwlxm9IACbMkGg+gg08TwprsMp6kuOaOJrA3TKQ6Ui54/OTZTCxVUdVGXltpWPuAD5LXaK4bKwNfQU7XtDhk1DgCPKJFwV52km+JUz5KeNjXZ2CwYLEE2Nw211A55srhDa2Yxl5ZaIvuADuLRbX6S+4fTiLEYowbhlY1l+vLJa/1LeZtdWjyY4gbWu2I3+9Ztk8DqJqptRK1zWtkMhc8WL33uLA79db7lIm6/YNksssnLuGeRz7ZBpmJNt/aqbtPhAo5uSDy/5MOuRbeXC2/+ldO2nrpKelkkjtnaW2uLjVwB09ZXPI8PrcSnD3tdrYF5blY1o6uvedAg6fhn7iH+0z8IVLxDZqikqJb1rWyPmccl48wc518tr3vrZXqGMNa1o3NAA7gLBcsrWn9rHQ/xrPxtUDHtZgDaJ0TWvL87XHUAWsQOHerFSbLNraWjkdK5mWnDbAA/Ocb6961/hOYTJTWBPQk3DtarTskLUVN/aH5qRzvazAG0TomteX52uOoAtYgcO9WOk2WZW01HI6VzMtO1tgAfnON9e9a3wmsJkprAnoP3Dtascu0FVSQUbImtsaZrjmaSb5nDgR1BBG7WbOtoeRyyF/KZ94Atly9X0lNfswT4NE4uI5FksosAcxBfoepVvG8Zqazk+VaOhmtla4eVa97k+aFO7OV0r8ProXDoxUrsnRIJzCQm/WghtlcDbWyPY55ZlZmuADfUDj3pgMPJ4lEy98lSW368pIv9Sl/g0YRUTXBHyPEf1BR2Fxu/arTY2+OP4Hz3IJRmyVE+TI2uaXlxGUGMuvxFr3vv9igNqMHFHMIg8vBjDrkAby4W0+itzAWn9qs0P8TL/vWz8I7CawWBP/Ts3A+c9B0PCv3EP9pn4QtpauF/uIf7TPwhbSgEREBERAXxzQd4v3rSxymfLTTRs8tzCG6217+C5XRtlirYonuN21UbTZxIuJG37wg7A1gG4Ady9Lku1dFPT1D8z9JHve3K52jS82B0Fj3LZ2hpZhTUdQHWZ8VhjPSOYvs517d3FSOoouRYTgtZUxulidcNcW2LyHXAB09o4qZ2LxyaR7qWR5eHxvyFxJc1wB0zb7Wv3WQdERcXxSmnppTDJJdzct8rnEagEam3Wrlt3hVRIROxwEccHS6RB0JJsBv0IQXZFyvZWCaoZWxMcc7oWZczjYfKAnXhuXuq2Tr42Pkc9uVjHONpHXs0XNtOxQOopZc3+DaVxqpLuJ+QO8k/PYujPFwR2FB6RcyGxeI28tn/ALHeCg8Ypp6aR0UjzmDQei5xGouEHaUXLttqOeKczF1mS5coDjfoxsBuOGt1uNoZ58JgdG7WOSZ7iXEEtBfx4lSOiouUbJRyzuqY2uOZ1HIG5nGwcXMtrwUZFBO6fkA85+UMflOtmBy7+rRNh2pFyWqFdhsrLyEEi4s4uY4DeCDv4cOK6fhVYJ4IpQLZ2B1uo8R7bqBtoiICIiAiIgIiIC5NXf4sf88z/Uausrn1VsxVuxAzhg5P402S+Zt8oeHE2vfcEFqxjZ6nq3NdKHEtblFnEaXuoXbymbFh8UbfJZLG0X1Ngx4GquK1sQoIp2hkrA9oN7G+/UX07ygo2y2MijoHSFheDVllgQN8YN9foqI2HN8Qh/8AJ+By6O3AaUR8lyLMmfPlNyM1rX142X2lwOlieHxwsa4Xs4DUXFj96kamJbK0tRK6WQOLnWvZxA0Fhp6lXNqNrwWVFK2Ig3fEXEi1gcpIAHGyv6jXYBSF5eYIy4uLiS0G5JuSbqBSNiZHU0NXVuYSwNY0cMxzdKx7LhbeI7eRywyxiF4L43svmbpmaRf61d56SN8ZjcxpYQBlt0bDUC3sWhzaovR4/dUjnmxWJinqhdpdygEQsbWLnt1PZousqLj2do2uDmwRgggggagg3BClEHL9iquV1fE10j3D5TQucR5DuBKw/CH/ABsn9tn4V0OjwClheJI4mteL2IvfUWO89pXuswSmmcXyQse4gC7hc2G5BU/hK/dUne78LVE4ftUIaE0ojJcWyNzEjL0yTe2/TMuj12GQzholja8N3Zhe3d7Fqt2cogb/ABeL1tB+ooKl8GdC/lJZ7WZyeQHziXAm3XbL9ahqD/FW/wCed/qFdZYwNAAAAAsANAB2KNZs/SNk5UQtz58+bW+a9770HPttsabVStaGFvIukYbkHN0gLjq8n61fNjv4Gm+h/uKyybO0biXGnjJJJJI3km5K36anZG0MY0Na0WAG4BQMqIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiIP//Z" />

//         <h3 className="logInValidationHeader">הזן את הקוד שנשלח לנייד</h3>

//         {PasswordCheck && <h5>סיסמה שגוייה</h5>}

//         <Form.Item
//           label=""
//           name="password"
//           rules={[{ required: true, message: "הכנס סיסמה" }]}
//         >
//           <Input.Password className="passwordInput" placeholder="קוד" />
//         </Form.Item>
//         {!valid && <div>יש להזין מספרים בלבד</div>}
//         {!valid1 && valid && <div>אין להזין יותר מ-4 ספרות</div>}
//         <div
//           // onClick={() => {
//           //   props.sendPasswordAgain(props.dataObject.phoneNum);
//           //   console.log(props.dataObject.phoneNum);
//           // }}
//           className="auth-btn1"
//         >
//           {" "}
//           לא קיבלתי קוד אנא שילחו לי שוב
//         </div>
//         <Form.Item {...tailLayout}>
//           <Button
//             className="sendPassword"
//             type="primary"
//             htmlType="submit"
//             onClick={props.check}
//           >
//             שלח
//           </Button>
//         </Form.Item>
//         <div className="auth-btn1"> לא קיבלתי קוד אנא שילחו לי שוב</div>
//       </Form>
//     </div>
//   );
// };

// export default LogInValidation;

// import React, { useState } from "react";
// import { Input, Form, Checkbox, Button } from "antd";
// import "./LogIn.css";

// const LogIn = (props) => {
//   const layout = {
//     labelCol: { span: 90 },
//     wrapperCol: { span: -10 },
//   };
//   const tailLayout = {
//     wrapperCol: { offset: 8, span: 16 },
//   };

//   const [valid, setValid] = useState(true);
//   const [valid1, setValid1] = useState(true);
//   const [valid2, setValid2] = useState(true);
//   const [change, setChange] = useState("");

//   const onFinish = (values) => {
//     const regular = /^[0-9]+$/;
//     if (regular.test(values.phonenumber) && values.phonenumber.length === 10) {
//       console.log("Success:", values.phonenumber);
//       props.check(values.phonenumber);
//     }
//     if (values.phonenumber.length < 10) {
//       setValid2(false);
//     }
//   };
//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//   const validationInput = (changedValues) => {
//     setValid2(true);
//     const regular = /^[0-9]+$/;
//     const validation = regular.test(changedValues.phonenumber);
//     if (!validation && changedValues.phonenumber.length > 0) {
//       setValid(false);
//     } else if (valid === false) {
//       setValid(true);
//       console.log(valid);
//     }
//     if (changedValues.phonenumber.length > 10) {
//       setValid1(false);
//     } else if (valid1 === false) {
//       setValid1(true);
//       console.log(valid1);
//     }
//   };
//   const onchange = () => {
//     setChange(change);
//   };

//   return (
//     <Form
//       className="PhoneContainer"
//       {...layout}
//       name="basic"
//       initialValues={{ remember: true }}
//       onFinish={onFinish}
//       onFinishFailed={onFinishFailed}
//       onValuesChange={validationInput}
//       onFieldsChange={onchange}
//     >
//       <h1>!שלום</h1>
//       <h4>על מנת להרשם למערכת הזינו בבקשה את מספר הטלפון שלכם</h4>
//       <Form.Item
//         name="phonenumber"
//         rules={[{ required: true, message: "הכנס בבקשה מספר טלפון" }]}
//       >
//         <Input className="PhoneInput" placeholder="הזן מספר טלפון" />
//       </Form.Item>
//       {!valid && <div>יש להזין מספרים בלבד</div>}
//       {!valid1 && valid && <div>אין להזין יותר מ-10 ספרות</div>}
//       {!valid2 && <div>יש להזין מספר בעל 10 ספרות</div>}
//       <Form.Item {...tailLayout}>
//         <Button type="primary" htmlType="submit" className="sendPass">
//           שלח אלי קוד אימות
//         </Button>
//       </Form.Item>
//       <Form.Item>
//         {props.message.phoneNumValid === 2 && (
//           <div className="error">המספר אינו קיים במערכת</div>
//         )}
//         {props.message.phoneNumValid === 1 && (
//           <div className="messegeSend">נשלחה סיסמה לטלפון שלך</div>
//         )}
//         {props.message.phoneNumValid === 3 && (
//           <div className="messegeSend">המספר לא נשלח, אנא נסה שנית</div>
//         )}
//       </Form.Item>
//       <h6 className="LogInDescriptionText">
//         לאחר הזנת מספר הטלפון יישלח אליכם מסרון עם קוד אימות
//       </h6>
//     </Form>
//   );
// };

// export default LogIn;




import React, {useState, useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import {TextField, Select, MenuItem} from '@material-ui/core';

function App() {
  const [startAt,setStartAt]=useState("07:30");
  const [endAt,setEndAt]=useState("07:30");
  const [room,setRoom]=useState(2);

  function submit(){
    console.log (startAt);
    console.log (endAt);
    console.log (room);
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <p>
         Rooms Management
        </p>
         </header>
        <body className="body">
        <TextField
        onChange={(e)=>setStartAt(e.target.value)}
        id="time"
        label= "שעת התחלה"
        type="time"
        defaultValue={startAt}
        className="textField"
        
      />
       <TextField
        onChange={(e)=>setEndAt(e.target.value)}
        id="time"
        label= "שעת סיום"
        type="time"
        defaultValue={endAt}
        className="textField"
        
      />
       <Select
          labelId="בחר את סוג החדר"
          id="selectRoom"
          value={room}
          onChange={(e)=>setRoom(e.target.value)}
          className="select"
        >
          <MenuItem value={2}>שני משתתפים</MenuItem>
          <MenuItem value={6}>עד 6 משתתפים</MenuItem>
          <MenuItem value={14}>עד 14 משתתפים</MenuItem>
          <MenuItem value={25}>עד 25 משתתפים</MenuItem>
        </Select>
        
          <br/>
        
          <button onClick={submit}>מתאים לי בדיוק</button>
        </body> 
         
    </div>
  );
}

export default App;

