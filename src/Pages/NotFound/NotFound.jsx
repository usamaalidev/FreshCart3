import NotFoundImage from "../../assets/images/error.svg";
export default function NotFound() {
  return (
    <>
      <img src={NotFoundImage} className="mx-auto" alt="404 image" />
    </>
  );
}
