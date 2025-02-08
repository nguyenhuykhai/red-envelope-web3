import { useCallback, useState, useEffect } from "react";
import { parseEther } from "ethers";
import { useAccount, useWriteContract } from "wagmi";
import { Coins, MessageSquare, SplitSquareVertical } from "lucide-react";

import ConnectButton from "@/components/home/organisms/connect-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import LoadingSpinner from "@/components/ui/loading-spinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { fetchEthPrice, type EthToUsd } from "@/utils/price";
import {
  validateForm,
  isFormValid,
  type FormData,
  type FormErrors,
} from "@/utils/validation";
import { contractABI } from "@/types/contracts";

const INITIAL_FORM_DATA: FormData = {
  amount: "",
  recipients: 0,
  isRandom: true,
  message: "",
};

const INITIAL_ERRORS: FormErrors = {
  amount: "",
  recipients: "",
  message: "",
};

const EnvelopeForm = () => {
  const { address } = useAccount();
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>(INITIAL_ERRORS);
  const [showConnectAlert, setShowConnectAlert] = useState(false);

  const [ethToUsd, setEthToUsd] = useState<EthToUsd>({
    ethAmount: "0",
    ethPrice: "0",
    usdValue: "0",
  });

  const [isPriceLoading, setIsPriceLoading] = useState(false);

  const { writeContract, isPending } = useWriteContract();

  const handleValidation = useCallback(() => {
    const newErrors = validateForm(formData, ethToUsd);
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  }, [formData, ethToUsd]);

  // Reset form when address changes or disconnects
  useEffect(() => {
    setFormData(INITIAL_FORM_DATA);
    setErrors(INITIAL_ERRORS);
  }, [address]);

  // Show connect alert when form changes without wallet connection
  const handleFormChange = useCallback(
    (newFormData: FormData) => {
      console.log(
        "handleFormChange: ",
        Object.values(newFormData).some((value) => value)
      );
      if (!address) {
        setShowConnectAlert(true);
        return;
      }
      setFormData(newFormData);
    },
    [address]
  );

  // Validate whenever form data changes
  useEffect(() => {
    if (address) {
      handleValidation();
    }
  }, [formData, handleValidation, address]);

  const handleAmountBlur = useCallback(async () => {
    if (!address) {
      setShowConnectAlert(true);
      return;
    }

    if (formData.amount) {
      setIsPriceLoading(true);
      try {
        const priceData = await fetchEthPrice(formData.amount);
        setEthToUsd(priceData);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch ETH price";
        setErrors((prev) => ({ ...prev, amount: errorMessage }));
      } finally {
        setIsPriceLoading(false);
      }
    }
  }, [formData.amount, address]);

  const handleSubmit = useCallback(() => {
    if (!address) {
      setShowConnectAlert(true);
      return;
    }

    if (handleValidation()) {
      writeContract({
        abi: contractABI,
        address: "0xFF2e45885457065B1FcA8779c65F0585a94Bd119",
        functionName: "createEnvelope",
        args: [formData.recipients, formData.isRandom, formData.message],
        value: parseEther(formData.amount),
      });
    }
  }, [formData, handleValidation, writeContract, address]);

  return (
    <>
      <Card className="p-6 md:p-8 space-y-8 bg-white/95 backdrop-blur-xl shadow-xl rounded-2xl border border-red-100 transition-all duration-300 hover:shadow-2xl">
        {/* Total Amount */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-red-600" />
            <Label htmlFor="amount" className="text-red-800 font-semibold">
              Tổng số tiền mừng
            </Label>
          </div>
          <div className="relative">
            <Input
              id="amount"
              placeholder="0"
              value={formData.amount}
              onChange={(e) =>
                handleFormChange({ ...formData, amount: e.target.value })
              }
              onBlur={handleAmountBlur}
              className="text-lg border-red-200 focus:border-red-400 focus:ring-red-400 transition-colors duration-300"
              type="number"
              step="0.001"
              min="0"
            />
            {isPriceLoading && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <LoadingSpinner />
              </div>
            )}
          </div>
          {errors.amount && (
            <p className="text-sm text-red-500">{errors.amount}</p>
          )}
          {!errors.amount && ethToUsd.usdValue !== "0" && (
            <p className="text-sm text-green-600">
              ≈ ${ethToUsd.usdValue} USD ($
              {(Number(ethToUsd.usdValue) / formData.recipients || 1).toFixed(
                2
              )}
              /người)
            </p>
          )}
        </div>

        {/* Number of Recipients */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Label htmlFor="recipients" className="text-red-800 font-semibold">
              Số người nhận tiền mừng
            </Label>
          </div>
          <Input
            id="recipients"
            placeholder="Nhập số người"
            value={formData.recipients || ""}
            onChange={(e) => {
              const value = parseInt(e.target.value) || 0;
              handleFormChange({ ...formData, recipients: value });
            }}
            type="number"
            min="1"
            className="border-red-200 focus:border-red-400 focus:ring-red-400 transition-colors duration-300"
          />
          {errors.recipients && (
            <p className="text-sm text-red-500">{errors.recipients}</p>
          )}
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
            value={formData.isRandom ? "random" : "equal"}
            onValueChange={(v) =>
              handleFormChange({ ...formData, isRandom: v === "random" })
            }
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

        {/* Message */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-red-600" />
            <Label className="text-red-800 font-semibold">Lời chúc</Label>
          </div>
          <Textarea
            placeholder="Nhập lời chúc của bạn"
            value={formData.message}
            onChange={(e) =>
              handleFormChange({ ...formData, message: e.target.value })
            }
            maxLength={200}
            className="border-red-200 focus:border-red-400 focus:ring-red-400 min-h-[100px] transition-colors duration-300"
          />
          <div className="flex justify-between text-sm">
            {errors.message && <p className="text-red-500">{errors.message}</p>}
            <p className="text-red-500 text-right">
              {formData.message.length}/200
            </p>
          </div>
        </div>

        <ConnectButton />

        {/* Submit Button */}
        <Button
          className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold py-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          onClick={handleSubmit}
          disabled={!isFormValid(formData, errors, ethToUsd) || isPending}
        >
          {isPending ? (
            <div className="flex items-center gap-2">
              <LoadingSpinner />
              <span>Đang tạo...</span>
            </div>
          ) : (
            "Tạo lì xì"
          )}
        </Button>
      </Card>

      {/* Connect Wallet Alert Dialog */}
      <AlertDialog open={showConnectAlert} onOpenChange={setShowConnectAlert}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-800">
              Kết nối ví
            </AlertDialogTitle>
            <AlertDialogDescription>
              Vui lòng kết nối ví của bạn để tiếp tục tạo lì xì.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => setShowConnectAlert(false)}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Đã hiểu
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EnvelopeForm;
