import "./Forms.css";
import logo from "../../assets/logo.png";

const Register = () => {
  return (
    <div className="container">
      <a href="/">
        <img
          src={logo}
          alt="Logo"
          className="logo-img"
          style={{ marginBottom: 20 }}
        />
      </a>
      <div class="wrapper">
        <h1>Create account</h1>
        <form>
          <div class="form-group" style={{ marginTop: 20 }}>
            <label for="emailImput">Email address</label>
            <input
              type="email"
              class="form-control"
              id="emailImput"
              placeholder="Enter email"
            />
          </div>
          <div class="form-group" style={{ marginTop: 20 }}>
            <label for="Name">Name</label>
            <input
              type="name"
              class="form-control"
              id="nameInput"
              placeholder="First and last name"
            />
          </div>
          <div class="form-group" style={{ marginTop: 20 }}>
            <label for="passwordInput">Password</label>
            <input
              type="password"
              class="form-control"
              id="passwordInput"
              placeholder="Password"
            />
          </div>
          <div class="form-group" style={{ marginTop: 20 }}>
            <label for="2ndPasswordInput">Re-enter password</label>
            <input
              type="password"
              class="form-control"
              id="2ndPasswordInput"
              placeholder="Password"
            />
          </div>
          <p>
            <a
              href="/login"
              class="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
            >
              Already registered?
            </a>
          </p>

          <button
            type="submit"
            class="btn btn-warning"
            style={{ marginTop: 20 }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
