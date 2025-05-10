import {
  useGetImagesQuery,
  useUploadImageMutation,
} from "@/api/adminApi/image";
import { Button } from "@/components/ui/button";
import { ImageContainer } from "@/components/ui/image-container";
import Loader from "@/components/ui/Loader";
import { formatDateTime } from "@/lib/string-utils";
import { toastError, toastSuccess, uuid } from "@/lib/utils";
import {
  compressImageToWebP,
  toMb,
} from "@/pages/admin/manage-product/utils";
import { ImageResponse } from "@/types/image";
import { DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Check,
  HandIcon,
  LoaderIcon,
  PlusIcon,
  TrashIcon,
  UploadIcon,
} from "lucide-react";
import { ChangeEvent, FC, useState } from "react";

interface MediaDialogProps {
  onSelect: (images: ImageResponse[]) => void;
}
export const MediaDialog: FC<MediaDialogProps> = ({ onSelect }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [selectedImages, setSelectedImages] = useState<ImageResponse[]>([]);
  const { data: savedImagesPage, isLoading: isLoadingSavedImages } =
    useGetImagesQuery({ size: 20, page: 1 });
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (e.target.files.length > 5) {
      toastError("Số lượng ảnh tối đa là 5");
      return;
    }
    const selectedFiles = Array.from(e.target.files);
    const compressedFiles = await Promise.all(
      selectedFiles.map(compressImageToWebP),
    );
    setFiles(compressedFiles);
  };
  const handleUpload = async () => {
    try {
      await Promise.all(files.map((file) => uploadImage(file).unwrap()));
      toastSuccess("Tải ảnh lên thành công");
      setFiles([]);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSelect = () => {
    onSelect(selectedImages);
  };
  const toggleSelect = (image: ImageResponse) => {
    setSelectedImages((prev) => {
      const isSelected = selectedImages.includes(image);
      if (isSelected) {
        return prev.filter((item) => image !== item);
      }
      if (selectedImages.length > 4) {
        toastError("Số lượng ảnh tối đa là 5");
        return prev;
      }
      return [...prev, image];
    });
  };
  return (
    <>
      <VisuallyHidden>
        <DialogTitle></DialogTitle>
      </VisuallyHidden>
      <div className="grid grid-cols-6 min-h-[800px] ">
        <div className="bg-red-200 col-span-1"></div>
        <div className="col-span-5 px-2">
          <div className="flex items-center space-x-2">
            <h2 className="my-0 ">Media management</h2>
            <div>
              <label
                htmlFor="fileInput"
                className=" flex items-center space-x-2 border rounded-sm p-1 bg-blue-400/80 text-white"
              >
                <PlusIcon />
                <span>New images</span>
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="fileInput"
              />
            </div>
            {files.length > 0 && (
              <Button
                onClick={handleUpload}
                disabled={isUploading}
                className="border font-bold"
              >
                {isUploading ? <LoaderIcon /> : <UploadIcon />}
                {isUploading ? "Uploading" : "Upload"}
              </Button>
            )}
          </div>
          <div className="border rounded-sm mt-1 ">
            <div className="flex space-x-2 justify-center">
              {files.map((file) => (
                <div key={uuid()} className="relative group">
                  <ImageContainer
                    className="size-30"
                    src={URL.createObjectURL(file)}
                  />
                  <p className="text-xs text-gray-500">
                    {toMb(file.size)} (Compressed)
                  </p>
                  <div
                    className="flex-center space-x-2 mt-1 absolute 
                    top-0 right-0 invisible group-hover:visible"
                  >
                    <Button
                      size="sm"
                      onClick={() => {
                        setFiles((prev) =>
                          prev.filter((item) => item !== file),
                        );
                      }}
                      className="bg-gray-500 p-2"
                    >
                      <TrashIcon />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className=" border rounded-sm p-2">
            <div className="flex justify-between">
              <div className="flex space-x-2 items-center">
                <h3>Image Library</h3>
                {selectedImages.length > 0 && (
                  <p className="text-success">
                    {selectedImages.length}{" "}
                    {selectedImages.length == 1 ? "image" : "images"} selected
                  </p>
                )}
              </div>
              <Button
                className="bg-success/80 text-white"
                onClick={handleSelect}
              >
                <HandIcon />
                Select images
              </Button>
            </div>
            {isLoadingSavedImages && <Loader />}
            <div className="flex gap-2 flex-wrap">
              {savedImagesPage &&
                savedImagesPage.data.map((image) => {
                  const isSelected = selectedImages.includes(image);
                  return (
                    <div
                      key={image.id}
                      className="group relative"
                      onClick={() => toggleSelect(image)}
                    >
                      <ImageContainer
                        key={image.id}
                        className="size-35"
                        src={image.imagePath}
                      />
                      {isSelected && (
                        <div
                          className="absolute top-0 right-0 border 
                      rounded-full bg-success p-1 text-white"
                        >
                          <Check />
                        </div>
                      )}
                      <p
                        className="absolute bottom-0 text-[12px] invisible 
                      group-hover:visible  bg-gray-200/80  w-full"
                      >
                        Upload: {formatDateTime(image.uploadedAt)}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
