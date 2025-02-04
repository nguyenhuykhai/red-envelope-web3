"use client";

import { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { parseEther } from "ethers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft,
  Coins,
  Users,
  SplitSquareVertical,
  Lock,
  MessageSquare,
} from "lucide-react";
import ConnectButton from "@/components/connectButton";

export default function CreateLixiForm() {
  const [amount, setAmount] = useState("");
  const [recipients, setRecipients] = useState("");
  const [isRandom, setIsRandom] = useState(true);
  const [isPublic, setIsPublic] = useState(true);
  const [message, setMessage] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");

  const { address } = useAccount();
  const { writeContract, isPending, isSuccess } = useWriteContract();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-amber-50 to-red-100 px-4 py-8 md:py-12">
      <div className="max-w-xl mx-auto">
        <div className="flex items-center mb-8 gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-amber-100 hover:bg-amber-200 transition-all duration-300 shadow-sm"
          >
            <ArrowLeft className="h-5 w-5 text-amber-900" />
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold text-center flex-1 text-red-800 bg-clip-text text-transparent bg-gradient-to-r from-red-800 to-amber-900">
            Tạo mã lì xì
          </h1>
        </div>

        <Card className="p-6 md:p-8 space-y-8 bg-white/95 backdrop-blur-xl shadow-xl rounded-2xl border border-red-100 transition-all duration-300 hover:shadow-2xl">
          {/* Total Amount */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-red-600" />
              <Label htmlFor="amount" className="text-red-800 font-semibold">
                Tổng số tiền mừng
              </Label>
            </div>
            <Input
              id="amount"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-lg border-red-200 focus:border-red-400 focus:ring-red-400 transition-colors duration-300"
              type="number"
              step="0.001"
            />
            <p className="text-sm text-red-500 italic">
              Sau 12h, số tiền mừng chưa được nhận sẽ hoàn về Ví của bạn
            </p>
          </div>

          {/* Number of Recipients */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-red-600" />
              <Label
                htmlFor="recipients"
                className="text-red-800 font-semibold"
              >
                Số người nhận tiền mừng
              </Label>
            </div>
            <Input
              id="recipients"
              placeholder="Nhập số người"
              value={recipients}
              onChange={(e) => setRecipients(e.target.value)}
              type="number"
              className="border-red-200 focus:border-red-400 focus:ring-red-400 transition-colors duration-300"
            />
          </div>

          {/* Distribution Method */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <SplitSquareVertical className="h-5 w-5 text-red-600" />
              <Label className="text-red-800 font-semibold">
                Phương thức chia tiền
              </Label>
            </div>
            <RadioGroup
              defaultValue={isRandom ? "random" : "equal"}
              onValueChange={(v) => setIsRandom(v === "random")}
              className="space-y-3 pl-2"
            >
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 transition-colors duration-300">
                <RadioGroupItem
                  value="random"
                  id="random"
                  className="text-red-600 border-red-300"
                />
                <Label htmlFor="random" className="text-red-800 cursor-pointer">
                  Chia ngẫu nhiên
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 transition-colors duration-300">
                <RadioGroupItem
                  value="equal"
                  id="equal"
                  className="text-red-600 border-red-300"
                />
                <Label htmlFor="equal" className="text-red-800 cursor-pointer">
                  Chia đều
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Recipient Privacy */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-red-600" />
              <Label className="text-red-800 font-semibold">
                Ai có thể nhận tiền mừng
              </Label>
            </div>
            <RadioGroup
              defaultValue={isPublic ? "public" : "private"}
              onValueChange={(v) => setIsPublic(v === "public")}
              className="space-y-3 pl-2"
            >
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 transition-colors duration-300">
                <RadioGroupItem
                  value="public"
                  id="public"
                  className="text-red-600 border-red-300"
                />
                <Label htmlFor="public" className="text-red-800 cursor-pointer">
                  Bất kỳ ai có link
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 transition-colors duration-300">
                <RadioGroupItem
                  value="private"
                  id="private"
                  className="text-red-600 border-red-300"
                />
                <Label
                  htmlFor="private"
                  className="text-red-800 cursor-pointer"
                >
                  Chọn người nhận cụ thể
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Message */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-red-600" />
                <Label className="text-red-800 font-semibold">
                  Gửi kèm thiệp và lời nhắn
                </Label>
              </div>
              <Switch
                checked={message.length > 0}
                onCheckedChange={() => setMessage("")}
                className="data-[state=checked]:bg-red-600"
              />
            </div>
            {message.length > 0 && (
              <div className="space-y-2">
                <Textarea
                  placeholder="Nhập lời nhắn"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={200}
                  className="border-red-200 focus:border-red-400 focus:ring-red-400 min-h-[100px] transition-colors duration-300"
                />
                <div className="text-sm text-red-500 text-right">
                  {message.length}/200
                </div>
              </div>
            )}
          </div>

          <ConnectButton />

          {/* Submit Button */}
          <Button
            className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold py-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-xl"
            onClick={() => {
              writeContract({
                abi: [], // Add your contract ABI here
                address: "0x...", // Add your contract address here
                functionName: "createLixi",
                args: [
                  parseEther(amount),
                  Number(recipients),
                  isRandom,
                  isPublic,
                  message,
                  Math.floor(Date.now() / 1000) + 43200, // 12 hours
                ],
                value: parseEther(amount),
              });
            }}
            disabled={isPending}
          >
            {isPending ? "Đang tạo..." : "Tiếp tục"}
          </Button>
        </Card>
      </div>
    </div>
  );
}
