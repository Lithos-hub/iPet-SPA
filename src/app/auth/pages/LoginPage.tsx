import { Link } from "react-router-dom";
import { AccessCard } from "../../../components/AccessCard";
import { Input } from "../../../components/Input";

export const LoginPage = () => {
  return (
    <main className="flex flex-col justify-center min-h-screen">
      <section className="w-auto mx-auto min-w-[400px] max-w-[500px]">
        <AccessCard title="Login">
          <div className="flex flex-col gap-5">
            <Input
              placeholder="example@domain.com"
              label="Email"
              type={"email"}
            />
            <Input placeholder="*********" label="Password" type="password" />

            <Link to="/reset" className="text-right">
              <small className=" font-light underline text-white hover:brightness-200 cursor-pointer">
                Forgot password?
              </small>
            </Link>
          </div>
        </AccessCard>
      </section>
    </main>
  );
};
