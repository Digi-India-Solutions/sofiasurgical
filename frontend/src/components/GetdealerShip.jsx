import React, { useState } from "react";
import axios from "axios";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "./Loader/Loader";
import submitenquiry from "../assets/images/submit-enquiry.jpg"; // Replace with your actual image path
import ongrowing from "../assets/images/ongoing-groing-support.jpg"; // Replace with your actual image path
import applicationReview from "../assets/images/application-review.jpg"; // Replace with your actual image path
import agreementsetup from "../assets/images/aggrement-setup.jpg"; // Replace with your actual image path
import trainingdevelopment from "../assets/images/training-development.jpg"; // Replace with your actual image path
import eclusive from "../assets/images/ExclusiveTerritory.jpg"; // Replace with your actual image path
import Attractivemargins from "../assets/images/Attractivemargins.jpg"; // Replace with your actual image path
import ExportReady from "../assets/images/Compliantexport.jpg"; // Replace with your actual image path
import worldclass from "../assets/images/WorldClassQuality.jpg"; // Replace with your actual image path

function GetdealerShip() {
  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo (Congo-Brazzaville)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czechia (Czech Republic)",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini (fmr. Swaziland)",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Holy See",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar (formerly Burma)",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine State",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States of America",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const handleSelect = (country) => {
  //   setFormData({ ...formData, country });
  //   setShowSuggestions(false);
  // };

  const [formData, setFormData] = useState({
    companyName: "",
    companyNumber: "",
    companyEmail: "",
    companyCountry: "",
    companyCity: "",
    companyAddress: "",
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "companyCountry") {
      setFilteredCountries(
        countries.filter((country) =>
          country.toLowerCase().includes(value.toLowerCase())
        )
      );
      setShowSuggestions(true);
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSelect = (selectedCountry) => {
    setFormData({ ...formData, companyCountry: selectedCountry });
    setFilteredCountries(countries); // Reset the filtered countries list
    setShowSuggestions(false); // Hide suggestions
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://api.sofiasurgicals.com/api/send-dealership",
        formData
      );
      setIsLoading(false);
      Swal.fire(
        "Success",
        "Dealership request submitted successfully!",
        "success"
      );
      setFormData({
        companyName: "",
        companyNumber: "",
        companyEmail: "",
        companyCountry: "",
        companyCity: "",
        companyAddress: "",
      });
    } catch (error) {
      setIsLoading(false);
      console.error("Error submitting form:", error);
      Swal.fire(
        "Error",
        "Failed to submit dealership request. Please try again.",
        "error"
      );
    }
  };

  return (
    <>
      {
        isLoading ? <Loader /> :
          <section
            className="contact-section"
            style={{ background: "linear-gradient(180deg, #CEE5FD, #FFFFFF)" }}
          >

            <div className="container">
              <section className="partner-section">
                <div className="partner-container">
                  <h2 className="partner-title">Become a Sofia Surgical Partner</h2>
                  <p className="partner-subtitle">
                    Join the Sofia Surgical global dealer network and fuel your growth with high-quality orthopedic implants and instruments.
                  </p>

                  <div className="partner-benefits">
                    <h3 className="partner-heading">Why Partner With Us?</h3>
                    <div className="partner-benefit-lines">
                      {[
                        {
                          title: "Exclusive Territory Rights",
                          desc: "Gain designated sales/distribution rights in your region, empowering you to expand without competition.",
                          icon: eclusive,
                        },
                        {
                          title: "Attractive Margins & Inventory Support",
                          desc: "Access competitive pricing tiers and starter stock options for top-selling products.",
                          icon: Attractivemargins,
                        },
                        {
                          title: "Compliant & Export-Ready Solutions",
                          desc: "Our implants meet international standards and are export-ready with complete documentation.",
                          icon: ExportReady,
                        },
                        {
                          title: "World-Class Quality Assurance",
                          desc: "We prioritize precision manufacturing and strict quality control at every stage—from CNC machining to final sterility checks.",
                          icon: worldclass,
                        },
                      ].map((item, index) => (
                        <div
                          className="d-flex align-items-center mb-4 gap-3" key={index} style={{ borderBottom: "1px solid #ccc", paddingBottom: "12px" }}>
                          <img style={{ objectFit: "cover" }} src={item.icon} alt={item.title} width={100} height={100} />
                          <div>
                            <strong>{item.title}</strong>
                            <p className="mb-0 small">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>


                  <div className="partner-offers">
                    <h3 className="partner-heading">Benefits of Partnering with Sofia Surgical</h3>
                    <ul className="partner-benefit-list">
                      {[
                        "Custom Private Labeling: Brand products with your company identity, custom packaging, labeling, and instruction inserts.",
                        "Marketing & Clinical Support: Receive co-developed educational materials, surgical training modules, and digital marketing toolkits.",
                        "Timely Logistics: Benefit from regular shipment schedules, diligent packing, and transparent Incoterm-based delivery.",
                        "Dedicated Account Manager: Enjoy personalized, quick responses, technical guidance, and after-sales service.",
                        "Training & Onboarding: Get in-depth training on product usage, implant selection, and surgical workflows.",
                        "Early Access to Innovations: Be the first to launch new orthopedic solutions like trauma, fixation, osteotomy, and prosthetic systems.",
                        "No Upfront Entry Costs: Start your partnership without hefty advance deposits and simple, straightforward onboarding.",
                      ].map((text, idx) => (
                        <li key={idx}>{text}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="partner-process">
                    <h3 className="partner-heading">Dealer Onboarding Process</h3>
                    <div className="partner-process-lines">
                      {[
                        {
                          step: "Submit Inquiry",
                          desc: "Complete our dealership form—provide your company profile, market region, and interest area.",
                          icon: submitenquiry,
                        },
                        {
                          step: "Application Review",
                          desc: "Our team assesses the fit based on region potential, distribution capabilities, and compliance readiness.",
                          icon: applicationReview,
                        },
                        {
                          step: "Agreement & Setup",
                          desc: "Upon approval, we finalize the partnership agreement, determine product mix, and set pricing levels.",
                          icon: agreementsetup,
                        },
                        {
                          step: "Training & Launch",
                          desc: "Your team receives in-depth product and sales training, plus marketing support to launch effectively.",
                          icon: trainingdevelopment,
                        },
                        {
                          step: "Ongoing Growth Support",
                          desc: "Gain access to continuous product training, marketing co-funding, strategic support, and global dealer network events.",
                          icon: ongrowing,
                        },
                      ].map((item, index) => (
                        <div
                          className="d-flex align-items-center mb-4 gap-3"
                          key={index}
                          style={{ borderBottom: "1px solid #ccc", paddingBottom: "12px" }}
                        >
                          <img src={item.icon} alt={item.step} style={{ objectFit: "cover" }} width={100} height={100} />
                          <div>
                            <strong>{item.step}</strong>
                            <p className="mb-0 small">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </section>
            </div>

            <div className="container py-4">
              <div className="row pt-2 pb-2 get-dealership">
                <div className="col-md-6">
                  <h2>Get Dealership</h2>
                  <p>
                    Sofia Surgicals is one of the most sold brands in the Indian
                    Orthopedic market...
                  </p>
                  <div className="iconSection">
                    <div className="pt-2">
                      <FaEnvelope size={35} className="faIcon" />
                      <Link to="" style={{ textDecoration: "none", color: "#000" }}>
                        <span className="px-3">
                          sofiasurgicals@gmail.com
                          <br />
                          <span className="px-5">exports@sofiasurgicals.com</span>
                        </span>
                      </Link>
                    </div>
                    <div className="pt-3">
                      <FaPhone size={35} className="faIcon" />
                      <Link to="" style={{ textDecoration: "none", color: "#000" }}>
                        <span className="px-3">
                          +91-9015555501
                          <br />
                          <span className="px-5">+91-11-41414592</span>
                        </span>
                      </Link>
                    </div>
                    <div className="pt-3">
                      <FaMapMarkerAlt size={35} className="faIcon" />
                      <Link to="" style={{ textDecoration: "none", color: "#000" }}>
                        <span className="px-3">
                          Regd. Off : 3965/224, 2nd floor City Market, <br />
                          <span className="px-5">
                            Ajmeri Gate Delhi-110006 (INDIA)
                          </span>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 pt-2">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col mb-4">
                        <input
                          type="text"
                          className="form-control"
                          name="companyName"
                          placeholder="Company Name*"
                          value={formData.companyName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col mb-4">
                        <input
                          type="number"
                          className="form-control"
                          name="companyNumber"
                          placeholder="Company Contact No.*"
                          value={formData.companyNumber}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col mb-4">
                        <input
                          type="email"
                          className="form-control"
                          name="companyEmail"
                          placeholder="Company Email ID*"
                          value={formData.companyEmail}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col mb-4">
                        {/* <input type="text" className="form-control" name="companyCountry" placeholder="Country*" value={formData.companyCountry} onChange={handleChange} required /> */}
                        <div className="col position-relative">
                          <input
                            type="text"
                            name="companyCountry"
                            className="form-control"
                            placeholder="Country*"
                            value={formData.companyCountry}
                            onChange={handleChange}
                            onFocus={() => setShowSuggestions(true)}
                            required
                          />
                          {showSuggestions && (
                            <ul
                              className="list-group position-absolute w-100"
                              style={{
                                maxHeight: "200px",
                                overflowY: "auto",
                                zIndex: 1000,
                                backgroundColor: "white",
                              }}
                            >
                              {filteredCountries.map((country, index) => (
                                <li
                                  key={index}
                                  className="list-group-item list-group-item-action"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleSelect(country)}
                                >
                                  {country}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col mb-4">
                        <input
                          type="text"
                          className="form-control"
                          name="companyCity"
                          placeholder="City*"
                          value={formData.companyCity}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col mb-4">
                        <textarea
                          className="form-control"
                          name="companyAddress"
                          rows="3"
                          placeholder="Company Address*"
                          value={formData.companyAddress}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col mb-4">
                        <button type="submit" className="btn btn-primary px-4 w-30">
                          Submit <span className="ms-2">→</span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
      }
    </>
  );
}

export default GetdealerShip;
