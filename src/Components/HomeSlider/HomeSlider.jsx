import sliderImage1 from "../../assets/images/slider-image-1.jpeg";
import sliderImage2 from "../../assets/images/slider-image-2.jpeg";
import sliderImage3 from "../../assets/images/slider-image-3.jpeg";
export default function HomeSlider() {
  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-8">
          <swiper-container loop={true} style={{ height: "100%" }}>
            <swiper-slide style={{ height: "100%" }}>
              <img
                src={sliderImage3}
                className="w-full h-full object-cover"
                alt=""
              />
            </swiper-slide>
            <swiper-slide>
              <img
                src={sliderImage3}
                className="w-full h-full object-cover"
                alt=""
              />
            </swiper-slide>

            <swiper-slide>
              <img
                src={sliderImage3}
                className="w-full h-full object-cover"
                alt=""
              />
            </swiper-slide>
          </swiper-container>
        </div>
        <div className="col-span-4">
          <div>
            <img
              src={sliderImage1}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div>
            <img
              src={sliderImage2}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}
