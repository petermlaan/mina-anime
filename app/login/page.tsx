import Form from "next/form";
import { loginSA } from "@/lib/actions";
import { Metadata } from "next";
import SubmitButton from "@/components/submitbutton";

export const metadata: Metadata = {
    title: "Mina Anime - Logga in"
};

export default function LoginPage() {
    return (<>
        <Form action={loginSA}>
            <input type="text" name="passkey" placeholder="passkey" />
            <SubmitButton />
        </Form>
    </>);
}
