import "./Forms.css";
import logo from "../../assets/logo.png";

const Login = () => {
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
        <h1>Sign in</h1>
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div class="form-group" style={{ marginTop: 20 }}>
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <p>
            <a
              href="/register"
              class="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
            >
              Not registered yet?
            </a>
          </p>
          <button
            type="submit"
            class="btn btn-warning"
            style={{ marginTop: 20 }}
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
