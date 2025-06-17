import { useUpdateImagesMutation } from "@/api/adminApi/product";
import { useGetProductDetailQuery } from "@/api/customerApi/product";
import { BackButton } from "@/components/admin/common/BackButton";
import { MediaDialog } from "@/components/admin/product-save-form/MediaDialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ImageContainer } from "@/components/ui/image-container";
import Loader from "@/components/ui/Loader";
import { isValidUUID } from "@/lib/string-utils";
import { toastSuccess } from "@/lib/utils";
import { ImageResponse } from "@/types/image";
import { TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const ImageUpdateForm = () => {
  const { productId } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const { data, isLoading } = useGetProductDetailQuery(productId!, {
    skip: !isValidUUID(productId),
  });
  const [updateImages] = useUpdateImagesMutation();
  const [thumbnail, setThumbnail] = useState<string | undefined>(undefined);
  const [images, setImages] = useState<ImageResponse[] | null | undefined>(
    null,
  );

  useEffect(() => {
    if (data) {
      setImages(data?.data.images);
      setThumbnail(data.data.product.thumbnail);
    }
  }, [data]);
  const handleRemoveImage = (imageId: string) => {
    if (data)
      setImages((prev) => prev?.filter((image) => image.id !== imageId));
  };
  const handleUpdateImages = async () => {
    try {
      if (productId && images && thumbnail)
        await updateImages({
          productId,
          imageIds: images?.map((i) => i.id),
          thumbnail,
        }).unwrap();
      toastSuccess("Cập nhập hình ảnh thành công");
    } catch (error) {
      console.log(error);
    }
  };
  const handleImagesSelected = (images: ImageResponse[]) => {
    setImages((prev) => {
      if (prev) return [...prev, ...images];
    });
    setOpenModal(false);
  };
  if (isLoading) return <Loader />;
  return (
    <div className="mx-8 my-5 ">
      <BackButton />
      <h3>Cập nhập hình ảnh sản phẩm - {data?.data.product.name}</h3>
      <div className="flex space-x-2 min-h-30 rounded-sm border bg-white flex-wrap p-4">
        {images &&
          images?.length > 0 &&
          images.map((image) => (
            <div
              className="relative"
              key={image.id}
              onClick={() => {
                setThumbnail(image.imagePath);
              }}
            >
              <ImageContainer
                key={image.id}
                className="size-35"
                src={image.imagePath}
              />
              {image.imagePath == thumbnail && (
                <p className="absolute bg-gray-300 text-center w-full bottom-0">
                  Thumbnail
                </p>
              )}
              <Button
                size={"sm"}
                onClick={() => handleRemoveImage(image.id)}
                className=" absolute top-0 right-0 text-white"
                variant={"destructive"}
              >
                <TrashIcon />
              </Button>
            </div>
          ))}
      </div>
      <div className="flex justify-between mt-2">
        <Button onClick={() => setOpenModal(true)}>Media</Button>
        <Button className="bg-success" onClick={handleUpdateImages}>
          Save
        </Button>
      </div>
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="max-w-6xl px-1 overflow-y-auto max-h-[700px]">
          <MediaDialog onSelect={handleImagesSelected} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
