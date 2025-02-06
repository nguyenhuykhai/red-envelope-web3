import CreateRedEnvelopeForm from "@/components/home/template/create-red-envelope";
import Web3ModalProvider from "@/context";

export default function Home() {
  return (
    <Web3ModalProvider>
      <CreateRedEnvelopeForm />
    </Web3ModalProvider>
  );
}
