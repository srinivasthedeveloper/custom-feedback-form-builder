import { Button, Card, Flex, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';

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
  return (
    <Flex align={'center'} justify={'center'} fullWidth style={{ height: '100vh' }}>
      <Card shadow="xs" padding="lg" style={{ width: 400, margin: 'auto' }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.validate();
            if (form.isValid()) {
              if (form.values.username === 'admin' && form.values.password === 'admin') {
                navigate('/dashboard');
                localStorage.setItem('isAdminLogin', 'true');
              } else if (form.values.username === 'user' && form.values.password === 'user') {
                navigate('/dashboard');
                localStorage.setItem('isUserLogin', 'true');
              } else {
                alert('Invalid Username or Password');
              }
            }
          }}
          style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}
        >
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
          <Button type="submit" fullWidth>
            Login
          </Button>
          <Button
            onClick={() => {
              form.setValues({ username: 'admin', password: 'admin' });
            }}
          >
            Login as Admin
          </Button>
          <Button
            onClick={() => {
              form.setValues({ username: 'user', password: 'user' });
            }}
          >
            Login as User
          </Button>
        </form>
      </Card>
    </Flex>
  );
};

export { Login };
