import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button variant={"outline"} onClick={() => navigate(-1)}>
      Quay lại
    </Button>
  );
};
