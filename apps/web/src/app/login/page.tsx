import {Heading, Page} from "../../components/ui";
import {LoginButton} from "./LoginButton";

export default function Login() {
  return (
    <Page>
      <Heading>Sign in with your school email</Heading>
      <LoginButton />
    </Page>
  );
}
