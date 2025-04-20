interface Props {
  content?: string;
}
export const ProductBlog: React.FC<Props> = ({ content }) => {
  return (
    <div>
      <h2>MÔ TẢ SẢN PHẨM</h2>
      <div className="font-bold">
        Ở đây nên để mã html miêu tả chi tiết sản phẩm
      </div>
      <div className="min-h-50 ">{content}</div>
    </div>
  );
};
