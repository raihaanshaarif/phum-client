import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";

const Login = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      userId: "0001",
      password: "admin12345",
    },
  });

  const [login, { error }] = useLoginMutation();
  // console.log("Data =>", data);
  console.log("Error =>", error);

  const onSubmit = async (data: { userId: string; password: string }) => {
    const userInfo = {
      id: data.userId,
      password: data.password,
    };
    const res = await login(userInfo).unwrap();
    console.log(res);
    const user = verifyToken(res.data.accessToken);
    console.log(user);
    dispatch(setUser({ user, token: res.data.accessToken }));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="id">ID: </label>
        <input type="text" id="id" {...register("userId")} />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input type="text" id="password" {...register("password")} />
      </div>
      <Button htmlType="submit">Submit</Button>
    </form>
  );
};

export default Login;
