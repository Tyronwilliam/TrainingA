import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useCustomRouter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const routerPushTo = (arg: string) => {
    if (arg === "") {
      return router.push(`${pathname}`);
    }
    return router.push(`/${arg}`);
  };
  return { router, pathname, routerPushTo, searchParams };
};

export default useCustomRouter;
