import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import styles from "./register.module.css";

const Register = () => {
  const navigate = useNavigate();
  const [objData, setObjData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(false);

  const validations = (name, value) => {
    const errorMessages = {
      name: "El nombre es requerido",
      email: "Debes escribir un mail valido",
      password: "El password debe tener al menos 8 caracteres y una mayuscula",
    };
    let errorMessage = null;
    if (!value.trim()) {
      errorMessage = `el campo ${name} es requerido`;
    } else if (name === "password") {
      if (value.length < 8 || !/[A-Z]/.test(value)) {
        errorMessage = errorMessages[name];
      }
    } else if (name === "email") {
      const isValidEmail = /\S*@\S*\.\S*/.test(value);
      if (!isValidEmail) {
        errorMessage = errorMessages[name];
      }
    }

    setErrors((oldErrors) => {
      return {
        ...oldErrors,
        [name]: errorMessage,
      };
    });
  };

  const handleChange = ({ target: { value, name } }) => {
    let data = { [name]: value };

    setObjData({
      ...objData,
      ...data,
    });

    validations(name, value);
  };

  const sendData = async () => {
    try {
      const response = await fetch("http://localhost:3001/users/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(objData),
      });

      if (response.status === 400) {
        const responseData = await response.json();

        console.log(responseData);

        const errorMessage = {};

        responseData.errors.forEach((err) => {
          errorMessage[err.path] = err.msg;
        });

        setErrors(errorMessage);
        throw new Error("Error al enviar los datos");
      } else {
        const data = await response.json();
        console.log("Post succesfull", data);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = () => {
    setObjData({
      name: "",
      email: "",
      password: "",
    });
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    sendData();
    handleReset();
  };

  useEffect(() => {
    const isValied = Object.values(errors).every((error) => !error);
    const allFieldFilled = Object.values(objData).every(
      (value) => value.trim() !== ""
    );

    setDisabled(!isValied || !allFieldFilled);
  }, [errors, objData]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}></div>

        <div>
          <h2 className={styles.title}>Crear Cuenta</h2>
          <form onSubmit={handlesubmit} className={styles.form}>
            <label>Escribe tu nombre</label>
            <input
              className={styles.input}
              type="text"
              name="name"
              onChange={handleChange}
              value={objData.name}
            />
            {errors && <span style={{ color: "red" }}>{errors.name}</span>}
            <label>Escribe tu email</label>
            <input
              className={styles.input}
              type="text"
              name="email"
              onChange={handleChange}
              value={objData.email}
            />
            <label>Escribe tu password</label>
            {errors && <span style={{ color: "red" }}>{errors.email}</span>}
            <input
              className={styles.input}
              type="password"
              name="password"
              onChange={handleChange}
              value={objData.password}
            />
            {errors && <span style={{ color: "red" }}>{errors.password}</span>}
            <button type="submit" disabled={disabled}>
              registrarme
            </button>
          </form>
        </div>
        <p>
          Ya tienes cuenta ? <Link to="/login">Click aqui!</Link>
        </p>
      </div>
    </>
  );
};

export default Register;
