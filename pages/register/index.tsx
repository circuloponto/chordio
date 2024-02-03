import { useState, useContext } from 'react';
//import styles from '../../styles/Register.module.scss'
import axios from 'axios';
import Cookies from 'js-cookie'
import AppContext from '@/components/AppContext'
import { useRouter } from 'next/navigation'
const RegisterForm = () => {
  const context = useContext(AppContext)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitRequest, setSubmitRequest] = useState({
    error: false,
    isLoading: false,
    submitted: false,
    errorMessage: '',
  });
  const router = useRouter()
  const onRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('Register!!!');
    try {
      //pedido de signup
      const response = await axios.post(
        'https://x8ki-letl-twmt.n7.xano.io/api:4m4S1GeF/auth/signup',
        { email, password, name }
      );
      const responseLogin = await axios.post(
        'https://x8ki-letl-twmt.n7.xano.io/api:4m4S1GeF/auth/login',

        { email, password }
      );
      const me = await axios.get(
        'https://x8ki-letl-twmt.n7.xano.io/api:4m4S1GeF/auth/me',

        { headers: { Authorization: 'Bearer ' + responseLogin.data.authToken } },
      );
      localStorage.setItem('authToken', response.data.authToken)
      Cookies.set('authToken', response.data.authToken, { expires: 7 });
      //context.setNameContext(response.data.authToken)
      context.setMe(me)
      router.push('/mysongs')
      setSubmitRequest({
        error: false,
        isLoading: false,
        submitted: true,
        errorMessage: ''
      });

      setTimeout(() => {
        setSubmitRequest({
          submitted: false,
          error: false,
          isLoading: false,

          errorMessage: ''
        });
      }, 4000);
    } catch (error: any) {
      console.log(error);
      setSubmitRequest({
        error: true,
        errorMessage: error.response.data.message,
        submitted: true,
        isLoading: false,
      });
    }
  };

  return (
    <div className='registerContainer'>
      <form className='registerForm' onSubmit={onRegisterSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          required
          id="name"
          value={name}
          className='inputName'
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          required
          id="email"
          value={email}
          className='inputEmail'
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          required
          id="password"
          value={password}
          className='inputPassword'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Register</button>
        {submitRequest.error && <p>{submitRequest.errorMessage}</p>}
        {!submitRequest.error && submitRequest.submitted && (
          <p>Account Created</p>
        )}
        {submitRequest.isLoading && <p>Loading...</p>}
      </form>
    </div>
  );
};

export default RegisterForm;
