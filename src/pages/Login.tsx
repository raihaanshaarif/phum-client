import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";



const Login = () => {
  const { register, handleSubmit } = useForm({
    defaultValues:{
      userId: '0001',
      password: 'admin12345'
    }
  })

  const [login, {data, error}] = useLoginMutation()
  console.log('Data =>', data)
  console.log('Error =>', error)

  const onSubmit = (data: { userId: string; password: string }) => {
    const userInfo= {
      id: data.userId,
      password: data.password
    }
    login(userInfo)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="id">ID: </label>
        <input type="text" id='id' {...register('userId')}/>
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input type="text" id='password'  {...register('password')}/>
      </div>
      <Button htmlType="submit">Submit</Button>
    </form>
  );
};

export default Login;
