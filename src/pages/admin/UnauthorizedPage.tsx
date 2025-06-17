import { IoMdSad } from "react-icons/io";

export const UnauthorizedPage = () => {
  return (
    <div className="flex-center flex-col text-gray-500">
      <h1 className="text-center ">Bạn không có quyền vào trang này</h1>
      <IoMdSad size={80} />
    </div>
  );
};
