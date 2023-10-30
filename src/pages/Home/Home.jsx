import React from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import "./Home.css";
import useWindowSize from "../../utils/useWindowSize";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import illustration from "../../assets/abc1.png";
import banner from "../../assets/about_banner.png";
import joinus from "../../assets/joinusbanner.png";
import agent from "../../assets/agt.png";
import trends from "../../assets/mt.png";
import house from "../../assets/bok.png";
import femaleAvatar1 from "../../assets/female-avatar-1.png";
import femaleAvatar2 from "../../assets/female-avatar-2.png";
import femaleAvatar3 from "../../assets/female-avatar-3.png";
import maleAvatar1 from "../../assets/male-avatar-1.png";
import maleAvatar2 from "../../assets/male-avatar-2.png";
import water from "../../assets/water.jpg";
import backgroundLeaves from "../../assets/11.jpg";
import Review from "../../assets/22.jpg";
import caution from "../../assets/33.jpg";
import accessibility from "../../assets/people-looking-at-gadgets.png";
import care from "../../assets/mt.png";
import expertCare from "../../assets/ui.png";
import Centeric from "../../assets/girl-working-working-on-computer.png";
import sofa from "../../assets/sofa.jpg";

const Home = () => {
  const { width, height } = useWindowSize();
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 769 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 769, min: 0 },
      items: 1,
    },
  };
  const responsiveWhyChoose = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 600 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="Home-main">
      <div
        id="intro-example"
        className="p-3 text-center"
        style={{
          backgroundImage: `url(${banner})`,
          height: "100%",
          borderBottom: "3px solid black",
        }}
      >
        <MDBCard className="hero-card mb-3">
          <MDBCardBody>
            <MDBRow>
              <MDBCol
                md="6"
                className="d-flex justify-content-around align-items-center flex-column text-white"
              >
                {width >= 300 ? (
                  <h1>
                    At Estate Mate, we are dedicated to providing top-quality
                    RealEstate work to our Customers
                  </h1>
                ) : null}
                <h4>
                  Looking for the best RealEstate site in the area? You've come to
                  the right place
                </h4>

                {width >= 1065 ? (
                  <div className="heroSecBtnsContainer">
                    <MDBCol md="6" className="m-2">
                      <MDBBtn
                        className="btn-rounded heroSecBtn-1"
                        style={{
                          width: "100%",
                        }}
                      >
                        Book appointment
                      </MDBBtn>
                    </MDBCol>
                    <MDBCol md="6" className="m-2">
                      <MDBBtn
                        className="btn-rounded heroSecBtn-2"
                        style={{
                          width: "100%",
                        }}
                      >
                        Learn more
                      </MDBBtn>
                    </MDBCol>
                  </div>
                ) : null}
              </MDBCol>
              <MDBCol
                md="6"
                className="d-flex justify-content-center align-items-center"
              >
                <img
                  className="banner-illustration"
                  src={illustration}
                  alt="banner"
                />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
        {width < 1065 ? (
          <div className="heroSecBtnsContainer-2">
            <MDBCol className="my-3 w-100 mx-1">
              <MDBBtn
                className="btn-rounded heroSecBtn-1"
                style={{
                  width: "100%",
                  height: "70px",
                }}
              >
                Book appointment
              </MDBBtn>
            </MDBCol>
            <MDBCol className="w-100 mx-1">
              <MDBBtn
                className="btn-rounded heroSecBtn-2"
                style={{
                  width: "100%",
                  height: "70px",
                }}
              >
                Learn more
              </MDBBtn>
            </MDBCol>
          </div>
        ) : null}

        {width < 260 ? (
          <MDBRow className="my-4 ">
            <MDBCol md="4">
              <MDBCard className="d-flex justify-content-around align-items-center p-4 m-2 heroSecCard">
                <img
                  src={house}
                  className="card-image"
                  alt="agent"
                />
                <MDBCardText>Property Details</MDBCardText>
              </MDBCard>
            </MDBCol>
            <MDBCol md="4">
              <MDBCard className="d-flex justify-content-around align-items-center p-4 m-2 heroSecCard">
                <img
                  src={agent}
                  className="card-image"
                  alt="agent"
                  style={{ marginLeft: "15%" }}
                />
                <MDBCardText>Real Estate Agents</MDBCardText>
              </MDBCard>
            </MDBCol>
            <MDBCol md="4">
              <MDBCard className="d-flex justify-content-around align-items-center p-4 m-2 heroSecCard">
                <img
                  src={trends}
                  className="card-image"
                  alt="agent"
                  style={{ marginLeft: "10%" }}
                />
                <MDBCardText>Market Trends and Insights</MDBCardText>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        ) : (
          <MDBCard className="hero-card my-4">
            <MDBCardBody>
              <h1 className=" text-white">Are You Looking For:</h1>
              <MDBRow className="my-4 ">
                <MDBCol md="4">
                  <MDBCard className="d-flex justify-content-around align-items-center p-4 m-2 heroSecCard">
                    <img
                      src={house}
                      className="card-image"
                      alt="agent"
                    />
                    <MDBCardTitle>Property Details</MDBCardTitle>
                    <MDBCardText>Book Appointment</MDBCardText>
                  </MDBCard>
                </MDBCol>
                <MDBCol md="4">
                  <MDBCard className="d-flex justify-content-around align-items-center p-4 m-2 heroSecCard">
                    <img
                      src={agent}
                      className="card-image"
                      alt="agent"
                      style={{ marginLeft: "1%" }}
                    />
                    <MDBCardTitle>Real Estate Agents</MDBCardTitle>
                    <MDBCardText> Talk with Experts</MDBCardText>
                  </MDBCard>
                </MDBCol>
                <MDBCol md="4">
                  <MDBCard className="d-flex justify-content-around align-items-center p-4 m-2 heroSecCard">
                    <img
                      src={trends}
                      className="card-image"
                      alt="agent"
                      style={{ marginLeft: "10%" }}
                    />
                    <MDBCardTitle>Market Trends and Insights</MDBCardTitle>
                    <MDBCardText>Explore Articles</MDBCardText>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        )}
      </div>
      <div
        id="intro-example"
        className="text-center"
        style={{
          backgroundImage: `url(${joinus})`,
          height: "100%",
          borderBottom: "3px solid black",
        }}
      >
        <MDBCard className="hero-card">
          <MDBCardBody>
            <MDBRow className="text-white my-4">
              <h1>Our Satisfied Customers</h1>
              <h4>
                At our RealEstate center, we prioritize Customer safety and
                satisfaction. Trust us to provide you with the best possible
                care
              </h4>
            </MDBRow>
            <Carousel
              responsive={responsive}
              autoPlay={true}
              autoPlaySpeed={1000}
              keyBoardControl={true}
              transitionDuration={1000}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              infinite={true}
              customTransition={"transform 1000ms ease-in-out"}
            >
              <MDBCard className="d-flex justify-content-around align-items-center p-4 m-2 heroSecCardTestimonial">
                <img src={femaleAvatar1} className="card-image" alt="agent" />
                <MDBCardTitle className="mt-3">
                  <i className="fas fa-quote-left pe-2"></i>I couldn't be happier with my home-buying experience thanks to this real estate website. Their user-friendly interface and extensive listings made finding the perfect home a breeze. I received timely notifications about new properties, and the neighborhood insights were invaluable. I highly recommend this site to anyone in the market for a new home!
                </MDBCardTitle>
                <MDBCardText className="fw-bold">
                  Jessie
                </MDBCardText>
                <ul className="list-unstyled d-flex justify-content-center text-warning mb-0">
                  <li>
                    <i className="fas fa-star fa-sm"></i>
                  </li>
                  <li>
                    <i className="fas fa-star fa-sm"></i>
                  </li>
                  <li>
                    <i className="fas fa-star fa-sm"></i>
                  </li>
                  <li>
                    <i className="fas fa-star fa-sm"></i>
                  </li>
                  <li>
                    <i className="far fa-star fa-sm"></i>
                  </li>
                </ul>
              </MDBCard>

              <MDBCard className="d-flex justify-content-around align-items-center p-4 m-2 heroSecCardTestimonial">
                <img src={femaleAvatar2} className="card-image" alt="agent" />
                <MDBCardTitle className="mt-3">
                  <i className="fas fa-quote-left pe-2"></i>Selling my property was a seamless process, all thanks to this fantastic real estate website. Their expert real estate agents provided invaluable advice, and the property listing attracted potential buyers within days. I was able to close the deal quickly and at a great price. I couldn't have asked for a better experience"
                </MDBCardTitle>
                <MDBCardText className="fw-bold">
                  Alva
                </MDBCardText>
                <ul className="list-unstyled d-flex justify-content-center text-warning mb-0">
                  <li>
                    <i className="fas fa-star fa-sm"></i>
                  </li>
                  <li>
                    <i className="fas fa-star fa-sm"></i>
                  </li>
                  <li>
                    <i className="fas fa-star fa-sm"></i>
                  </li>
                  <li>
                    <i className="fas fa-star fa-sm"></i>
                  </li>
                  <li>
                    <i className="far fa-star fa-sm"></i>
                  </li>
                </ul>
              </MDBCard>
              <MDBCard className="d-flex justify-content-around align-items-center p-4 m-2 heroSecCardTestimonial">
                <img src={femaleAvatar3} className="card-image" alt="agent" />
                <MDBCardTitle className="mt-3">
                  <i className="fas fa-quote-left pe-2"></i>As a renter, I found my dream apartment using this real estate website. Their detailed listings and search filters made it easy to find exactly what I was looking for. The interactive maps helped me explore the surrounding area, and I even discovered a great local park thanks to their neighborhood insights. I'm thrilled with my new home!"
                </MDBCardTitle>
                <MDBCardText className="fw-bold">
                  Elsa
                </MDBCardText>
                <ul className="list-unstyled d-flex justify-content-center text-warning mb-0">
                  <li>
                    <i className="fas fa-star fa-sm"></i>
                  </li>
                  <li>
                    <i className="fas fa-star fa-sm"></i>
                  </li>
                  <li>
                    <i className="fas fa-star fa-sm"></i>
                  </li>
                  <li>
                    <i className="fas fa-star fa-sm"></i>
                  </li>
                  <li>
                    <i className="far fa-star fa-sm"></i>
                  </li>
                </ul>
              </MDBCard>
              <MDBCard className="d-flex justify-content-around align-items-center p-4 m-2 heroSecCardTestimonial">
                <img src={maleAvatar1} className="card-image" alt="agent" />
                <MDBCardTitle className="mt-3">
                  <i className="fas fa-quote-left pe-2"></i>I've been investing in real estate for years, and this website has become my go-to resource. It provides in-depth market reports and trends, helping me make informed decisions. The ability to set up alerts for new investment opportunities has been a game-changer. Whether you're a seasoned investor or just starting, this site is a must-have tool."
                </MDBCardTitle>
                <MDBCardText className="fw-bold">
                  Jack
                </MDBCardText>
                <ul className="list-unstyled d-flex justify-content-center text-warning mb-0">
                  <li>
                    <i className="fas fa-star fa-sm"></i>
                  </li>
                  <li>
                    <i className="fas fa-star fa-sm"></i>
                  </li>
                  <li>
                    <i className="fas fa-star fa-sm"></i>
                  </li>
                  <li>
                    <i className="fas fa-star fa-sm"></i>
                  </li>
                  <li>
                    <i className="far fa-star fa-sm"></i>
                  </li>
                </ul>
              </MDBCard>
              <MDBCard className="d-flex justify-content-around align-items-center p-4 m-2 heroSecCardTestimonial">
                <img src={maleAvatar2} className="card-image" alt="agent" />
                <MDBCardTitle className="mt-3">
                  <i className="fas fa-quote-left pe-2"></i>Navigating the real estate market for the first time can be overwhelming, but this website made the process much easier. Their mortgage calculator helped me understand the financial aspect, and the local expert agents were patient and supportive throughout the entire journey. I'm now a proud homeowner, all thanks to this incredible platform."
                </MDBCardTitle>
                <MDBCardText className="fw-bold">
                  Jhon
                </MDBCardText>
                <ul className="list-unstyled d-flex justify-content-center text-warning mb-0">
                  <li>
                    <i className="fas fa-star fa-sm"></i>
                  </li>
                  <li>
                    <i className="fas fa-star fa-sm"></i>
                  </li>
                  <li>
                    <i className="fas fa-star fa-sm"></i>
                  </li>
                  <li>
                    <i className="fas fa-star fa-sm"></i>
                  </li>
                  <li>
                    <i className="far fa-star fa-sm"></i>
                  </li>
                </ul>
              </MDBCard>
            </Carousel>
          </MDBCardBody>
        </MDBCard>
      </div>
      <div
        id="intro-example"
        className="text-center"
        style={{
          backgroundImage: `url(${water})`,
          height: "100%",
          borderBottom: "3px solid black",
        }}
      >
        <MDBCardBody>
          <MDBRow
            className="text-white "
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              borderRadius: "10px",
            }}
          >
            <h1 className="fw-bold my-4">Why to choose Estate Mate</h1>
          </MDBRow>
          <Carousel
            className="my-4"
            responsive={responsiveWhyChoose}
            autoPlay={true}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            transitionDuration={1000}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            infinite={true}
            customTransition={"transform 1000ms ease-in-out"}
          >
            <MDBCard className="d-flex justify-content-around align-items-center p-4 m-2 heroSecCardWhyChoose">
              <img src={expertCare} className="card-image" alt="agent" />
              <MDBCardTitle className="mt-3 fw-bold">
              User-Friendly Experience:
              </MDBCardTitle>
              <MDBCardText>
              We've designed "Estate Mate" with user convenience in mind. Our intuitive search tools and filters allow users to narrow down their property search quickly. The user-friendly interface ensures that finding the perfect property is a hassle-free experience.
              </MDBCardText>
            </MDBCard>
            <MDBCard className="d-flex justify-content-around align-items-center p-4 m-2 heroSecCardWhyChoose">
              <img src={agent} className="card-image" alt="agent" />
              <MDBCardTitle className="mt-3 fw-bold">
              Local Expertise:
              </MDBCardTitle>
              <MDBCardText>
              Estate Mate" connects you with local real estate experts who have in-depth knowledge of the market. Our experienced agents are here to assist you in making informed decisions about properties, neighborhoods, and market trends, ensuring a smooth and confident real estate journey.
              </MDBCardText>
            </MDBCard>
            <MDBCard className="d-flex justify-content-around align-items-center p-4 m-2 heroSecCardWhyChoose">
              <img src={care} className="card-image" alt="agent" />
              <MDBCardTitle className="mt-3 fw-bold">
              Market Insights:
              </MDBCardTitle>
              <MDBCardText>
              Stay ahead of the real estate game with our comprehensive market insights. We provide you with the latest data, trends, and forecasts, helping you make well-informed decisions whether you're a first-time homebuyer, a seasoned investor, or a property seller.
              </MDBCardText>
            </MDBCard>
            <MDBCard className="d-flex justify-content-around align-items-center p-4 m-2 heroSecCardWhyChoose">
              <img src={Centeric} className="card-image" alt="agent" />
              <MDBCardTitle className="mt-3 fw-bold">
              Personalized Services: 
              </MDBCardTitle>
              <MDBCardText>
              At "Estate Mate," we understand that every real estate journey is unique. Our platform offers personalized services, such as property alerts, mortgage calculators, and neighborhood recommendations. We're here to be your trusted estate mate, guiding you every step of the way.
              </MDBCardText>
            </MDBCard>
            <MDBCard className="d-flex justify-content-around align-items-center p-4 m-2 heroSecCardWhyChoose">
              <img src={accessibility} className="card-image" alt="agent" />
              <MDBCardTitle className="mt-3 fw-bold">
              Secure Transactions:
              </MDBCardTitle>
              <MDBCardText>
              "Estate Mate" prioritizes your peace of mind. We facilitate secure and transparent real estate transactions. Our platform ensures that all transactions are conducted with the utmost integrity, and we work with trusted partners and agents to safeguard your interests. You can trust "Estate Mate".
              </MDBCardText>
            </MDBCard>
          </Carousel>
        </MDBCardBody>

        <div>
          <MDBRow
            className="text-white"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              borderRadius: "10px",
              width:"100%"
            }}
          >
            <h1 className="fw-bold my-4">Our Recent Articles</h1>
          </MDBRow>

          <div className="blog-card p-3 my-2">
            <img src={backgroundLeaves} className="home-blog-image" />

            <div className="blog-text-container text-white my-4">
              <MDBCardTitle className="fw-bold">
              Choosing the Right Agent
              </MDBCardTitle>
              <MDBCardText className="my-3">
              When it comes to selling your property,
              one of the most critical decisions you'll make is choosing the right real estate agent.
              </MDBCardText>
              <MDBBtn className="blogCardBtn">Read More</MDBBtn>
            </div>
          </div>

          <div className="blog-card p-3 my-2">
            {width <= 996 ? (
              <img src={Review} className="home-blog-image" />
            ) : null}
            <div className="blog-text-container text-white my-4">
              <MDBCardTitle className="fw-bold">
              Residential vs Commercial
              </MDBCardTitle>
              <MDBCardText className="my-3">
              Residential real estate is the most common form of real estate investment, with people buying homes,
              apartments, or condominiums for various purposes.
              </MDBCardText>
              <MDBBtn className="blogCardBtn">Read More</MDBBtn>
            </div>
            {width > 996 ? (
              <img src={Review} className="home-blog-image" />
            ) : null}
          </div>

          <div className="blog-card p-3 my-2">
            <img src={caution} className="home-blog-image" />

            <div className="blog-text-container text-white my-4">
              <MDBCardTitle className="fw-bold">
              The Impact of Location
              </MDBCardTitle>
              <MDBCardText className="my-3">
              When it comes to real estate, the old adage "location, location, location" holds true.
              The location of a property is one of the most significant factors influencing its value. 
              </MDBCardText>
              <MDBBtn className="blogCardBtn">Read More</MDBBtn>
            </div>
          </div>
        </div>
      </div>

      <div
        id="intro-example"
        className="text-center"
        style={{
          backgroundImage: `url(${sofa})`,
          height: "100%",
          borderBottom: "3px solid black",
        }}
      >
        <div className="mb-5">
          <div
            className="p-2 text-white d-flex justify-content-center align-items-center flex-column"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              borderRadius: "10px",
            }}
          >
            <h1 className="fw-bold my-4">Join Us</h1>
            <MDBCardTitle className="fw-bold">
              Subscribe for news update from Estate Mate
            </MDBCardTitle>

            <div className="my-4 subscribe-email-container">
              <div className="mx-3 w-100">
                <MDBInput contrast type="email" label="Email address" />
              </div>

              <div>
                <MDBBtn outline color="light" className="my-3">
                  Subscribe
                </MDBBtn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
