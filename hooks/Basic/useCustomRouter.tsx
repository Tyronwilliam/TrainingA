import { usePathname, useRouter } from "next/navigation";

const useCustomRouter = () => {
  const router = useRouter();
  const pathname = usePathname();

  const routerPushTo = (arg: string) => {
    console.log("CLICK", arg);
    console.log(pathname);
    if (arg === "") {
      return router.push(`${pathname}`);
    }
    return router.push(`${pathname}/${arg}`);
  };
  return { router, pathname, routerPushTo };
};

export default useCustomRouter;
