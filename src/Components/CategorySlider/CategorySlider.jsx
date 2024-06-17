import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";

export default function CategorySlider() {
  async function getCategories() {
    const options = {
      method: "GET",
      url: "https://ecommerce.routemisr.com/api/v1/categories",
    };
    const { data } = await axios.request(options);
    return data;
  }

  const { data, isLoading } = useQuery({
    queryKey: ["getCategories"],
    queryFn: getCategories,
    staleTime: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  return (
    <>
      <div className="py-12">
        {!isLoading ? (
          <>
            <h2 className="text-lg font-bold mb-3">Shop Popular Categories</h2>
            <swiper-container slides-per-view={6} loop={true}>
              {data.data.map((category) => (
                <swiper-slide key={category._id}>
                  <Link to={`/category/${category._id}`}>
                    <img
                      src={category.image}
                      className="w-full h-60 object-cover"
                      alt=""
                    />
                    <h3>{category.name}</h3>
                  </Link>
                </swiper-slide>
              ))}
            </swiper-container>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}
