"use client";
import { useRouter } from "next/navigation";

export default function usePreviousHistory() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };
  return goBack;
}
