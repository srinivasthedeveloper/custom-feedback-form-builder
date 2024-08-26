import { Button, Card, Flex, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { urlRoutes } from '../../utils/Routes';
import styles from './index.module.css';

const Login = () => {
  const navigate = useNavigate();
  const form = useForm({
    mode: 'uncontrolled',
    name: 'login-form',
    initialValues: {
      username: '',
      password: '',
    },
    validate: {
      username: isNotEmpty('Username is required'),
      password: isNotEmpty('Password is required'),
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    form.validate();
    if (form.isValid()) {
      const username = form.getValues().username;
      const password = form.getValues().password;
      if (username === 'admin' && password === 'admin') {
        navigate(urlRoutes.dashboard);
        localStorage.setItem('isAdminLogin', 'true');
        localStorage.setItem('isUserLogin', 'false');
      } else if (username === 'user' && password === 'user') {
        navigate(urlRoutes.userDashboard);
        localStorage.setItem('isUserLogin', 'true');
        localStorage.setItem('isAdminLogin', 'false');
      } else {
        alert('Invalid Username or Password');
      }
    }
  };

  return (
    <Flex className={styles.loginContainer}>
      <Card shadow="xs" className={styles.loginCard}>
        <form onSubmit={handleLogin} className={styles.loginForm}>
          <TextInput
            {...form.getInputProps('username')}
            key={form.key('username')}
            type="text"
            placeholder="Username"
            label="Username"
            withAsterisk
          />
          <TextInput
            {...form.getInputProps('password')}
            key={form.key('password')}
            type="password"
            placeholder="Password"
            label="Password"
            withAsterisk
          />
          <Button color="purple" type="submit" fullWidth>
            Login
          </Button>
          <Flex align="center" justify="space-evenly">
            <Button
              color="#2E7D32"
              onClick={() => {
                form.setValues({ username: 'admin', password: 'admin' });
              }}
            >
              Enter Admin Credentials
            </Button>
            <Button
              onClick={() => {
                form.setValues({ username: 'user', password: 'user' });
              }}
            >
              Enter User Credentials
            </Button>
          </Flex>
        </form>
      </Card>
    </Flex>
  );
};

export { Login };
