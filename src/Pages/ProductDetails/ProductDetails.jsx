import axios from "axios";
import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { CartContext } from "../../Context/Cart.context";
import ReactImageGallery from "react-image-gallery";
import { Helmet } from "react-helmet";

export default function ProductDetails() {
  const { addToCart } = useContext(CartContext);
  let { data } = useLoaderData();
  const { title, price, images, description, category, ratingsAverage, id } =
    data;

  const imageItems = images.map((image) => {
    return {
      original: image,
      thumbnail: image,
    };
  });
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <section className="grid grid-cols-12 gap-8">
        <div className="col-span-3">
          {/* <img src={images[0]} alt={`image for ${title}`} /> */}

          <ReactImageGallery
            items={imageItems}
            showBullets={false}
            showNav={false}
            showFullscreenButton={false}
            showPlayButton={false}
          ></ReactImageGallery>
        </div>

        <div className="col-span-9 p-4">
          <h2 className="font-bold text-2xl line-clamp-2">{title}</h2>
          <h3 className="text-sm font-semibold mt-1 text-primary ">
            {category.name}
          </h3>
          <p className="text-gray-400 mt-5">{description}</p>
          <div className="flex justify-between items-center mt-4">
            <span>{price} EGP</span>
            <div className="rating flex items-center gap-1">
              <i className="fa-solid fa-star text-yellow-500"></i>
              <span>{ratingsAverage}</span>
            </div>
          </div>

          <button
            className="btn-primary py-2 w-full mt-3"
            onClick={() => {
              addToCart({ id });
            }}
          >
            Add to Cart
          </button>
        </div>
      </section>
    </>
  );
}

export async function loader({ params }) {
  const { id } = params;
  let { data } = await axios.get(
    `https://ecommerce.routemisr.com/api/v1/products/${id}`
  );
  return data;
}
