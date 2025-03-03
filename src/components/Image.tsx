export interface IProps {
  imageUrl: string;
    altText: string;
  className: string;
  
}
function Image({ imageUrl, altText, className }: IProps) {
  return (
    <>
      <img src={imageUrl} alt={altText} className={className} />
    </>
  );
}
export default Image;
