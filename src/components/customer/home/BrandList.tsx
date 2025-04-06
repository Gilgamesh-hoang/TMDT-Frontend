
export const BrandList = () => {
  const brandListImageUrls = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIjQtovZViy0Mrl5CCeywoO5gsVm5tLzm4KQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRss0p00re-fVLJo5BCpLd-SAqATQjBOxvG1Q&s",
    "https://info.mountainroseherbs.com/hubfs/MRHLogo_Color.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXoH6MBEFYoVthLBb4ECsp8iXuWv2JmxjR9g&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7lqk1mbADhSy8AtkiHmxSHrRpJ1wCzX9rFQ&s",
    "https://images-platform.99static.com/U9CFcdI6k3sH30tbufYAAZ4EKiw=/500x500/top/smart/99designs-contests-attachments/43/43954/attachment_43954737",
    "https://images.ctfassets.net/x0wnv07j8mtt/d10798a9-04f9-ba3c-158b-ee0736238068/4ccb17dc18d827e574f6a78e5d575745/d10798a9-04f9-ba3c-158b-ee0736238068",
  ];

  return (
    <div className="flex justify-center items-center gap-y-10 gap-x-16 flex-wrap mt-4">
      {brandListImageUrls.map((url) => (
        <div className="max-w-52 max-h-42">
          <img className="h-auto max-w-full" src={url} />
        </div>
      ))}
    </div>
  );
};
