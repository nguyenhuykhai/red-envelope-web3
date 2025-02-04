"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

const OCCASIONS = [
  { id: "women-day", label: "Quốc tế phụ nữ" },
  { id: "tet", label: "Tết" },
  { id: "valentine", label: "Valentine" },
  { id: "children-day", label: "Thiếu nhi" },
]

const TEMPLATES = [
  {
    id: "template1",
    occasion: "women-day",
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/z6263533203778_3842c78cbbd9370d4c6bbf773cef55f8.jpg-TPnZZVj3lIMPLSDKMsaLbRx966X9qK.jpeg",
  },
  // Add more templates here
]

interface GreetingCardSelectorProps {
  onSelect: (templateId: string) => void
  selected?: string
}

export default function GreetingCardSelector({ onSelect, selected }: GreetingCardSelectorProps) {
  const [occasion, setOccasion] = useState(OCCASIONS[0].id)

  return (
    <div className="space-y-4">
      <Tabs defaultValue={occasion} onValueChange={setOccasion}>
        <ScrollArea className="w-full whitespace-nowrap">
          <TabsList className="inline-flex bg-transparent gap-2">
            {OCCASIONS.map((occ) => (
              <TabsTrigger
                key={occ.id}
                value={occ.id}
                className="rounded-full px-4 py-2 data-[state=active]:bg-amber-100"
              >
                {occ.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Tabs>

      <ScrollArea className="w-full whitespace-nowrap pb-4">
        <div className="inline-flex gap-4 p-2">
          {TEMPLATES.filter((t) => t.occasion === occasion).map((template) => (
            <Button
              key={template.id}
              variant="outline"
              className={`relative w-[200px] h-[280px] p-0 overflow-hidden rounded-lg border-2 ${
                selected === template.id ? "border-red-500" : "border-transparent"
              }`}
              onClick={() => onSelect(template.id)}
            >
              <Image
                src={template.imageUrl || "/placeholder.svg"}
                alt="Greeting card template"
                fill
                className="object-cover"
              />
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

