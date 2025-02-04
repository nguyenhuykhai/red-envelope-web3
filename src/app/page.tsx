import CreateLixiForm from "@/components/create-lixi-form";
import Web3ModalProvider from "@/context";

export default function Home() {
  return (
    <Web3ModalProvider>
      <CreateLixiForm />
    </Web3ModalProvider>
  );
}
