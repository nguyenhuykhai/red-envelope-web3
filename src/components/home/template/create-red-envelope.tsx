"use client";

import AddressInfo from "@/components/home/organisms/address-info";

import EnvelopeForm from "@/components/home/organisms/envelope-form";

export default function CreateRedEnvelopeForm() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-amber-50 to-red-100 px-4 py-8 md:py-12">
      <div className="max-w-xl mx-auto">
        <AddressInfo />

        <EnvelopeForm />
      </div>
    </div>
  );
}
