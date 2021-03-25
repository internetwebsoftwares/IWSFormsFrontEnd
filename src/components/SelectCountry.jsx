import React from "react";

export default function SelectCountry({ country, setCountry }) {
  //All the countries
  let countries = [
    "Costa Rica",
    "Netherlands",
    "Venezuela (Bolivarian Republic)",
    "Saint Helena",
    "Syrian Arab Republic (Syria)",
    "Hungary",
    "Bolivia",
    "Burundi",
    "Ecuador",
    "Saudi Arabia",
    "Cyprus",
    "Greenland",
    "Pakistan",
    "India",
    "Korea (North)",
    "China",
    "Cook Islands",
    "Finland",
    "Libya",
    "Russian Federation",
    "Slovenia",
    "Antigua and Barbuda",
    "Isle of Man",
    "Heard and Mcdonald Islands",
    "Paraguay",
    "Tunisia",
    "Grenada",
    "Guinea",
    "South Sudan",
    "Bhutan",
    "Haiti",
    "Maldives",
    "Saint Kitts and Nevis",
    "Ukraine",
    "Israel",
    "Myanmar",
    "Nepal",
    "Nigeria",
    "Pitcairn",
    "British Virgin Islands",
    "Bulgaria",
    "Gibraltar",
    "United Kingdom",
    "Comoros",
    "Côte d'Ivoire",
    "Faroe Islands",
    "Togo",
    "Turkmenistan",
    "Bosnia and Herzegovina",
    "Cocos (Keeling) Islands",
    "United States of America",
    "Macedonia, Republic of",
    "Mozambique",
    "Australia",
    "Western Sahara",
    "Aruba",
    "Christmas Island",
    "Svalbard and Jan Mayen Islands",
    "Equatorial Guinea",
    "Uruguay",
    "Romania",
    "Hong Kong, SAR China",
    "Republic of Kosovo",
    "Palestinian Territory",
    "Cambodia",
    "Estonia",
    "Georgia",
    "Luxembourg",
    "Saint-Martin (French part)",
    "Bahrain",
    "Canada",
    "Chile",
    "Benin",
    "Jordan",
    "Mayotte",
    "San Marino",
    "Tanzania, United Republic of",
    "Armenia",
    "Vanuatu",
    "Mongolia",
    "Rwanda",
    "Tajikistan",
    "Bahamas",
    "Chad",
    "Saint Vincent and Grenadines",
    "Thailand",
    "Viet Nam",
    "Afghanistan",
    "Gambia",
    "Germany",
    "Cuba",
    "Macao, SAR China",
    "Anguilla",
    "Brunei Darussalam",
    "Congo (Brazzaville)",
    "Iraq",
    "Kyrgyzstan",
    "New Caledonia",
    "Qatar",
    "Angola",
    "Czech Republic",
    "Guatemala",
    "Niger",
    "Saint Lucia",
    "Montenegro",
    "Poland",
    "Algeria",
    "Jamaica",
    "Mexico",
    "Brazil",
    "Ireland",
    "Japan",
    "Saint Pierre and Miquelon",
    "Bouvet Island",
    "Marshall Islands",
    "Mauritania",
    "South Africa",
    "Falkland Islands (Malvinas)",
    "Mauritius",
    "Netherlands Antilles",
    "Uzbekistan",
    "Croatia",
    "Réunion",
    "Trinidad and Tobago",
    "Barbados",
    "Greece",
    "Lao PDR",
    "Zambia",
    "Niue",
    "Guam",
    "Jersey",
    "Montserrat",
    "Honduras",
    "Palau",
    "Zimbabwe",
    "French Polynesia",
    "Sudan",
    "Moldova",
    "Belize",
    "Liechtenstein",
    "Madagascar",
    "Indonesia",
    "Timor-Leste",
    "Argentina",
    "South Georgia and the South Sandwich Islands",
    "Switzerland",
    "United Arab Emirates",
    "US Minor Outlying Islands",
    "Guinea-Bissau",
    "Kenya",
    "Oman",
    "Kuwait",
    "Wallis and Futuna Islands",
    "Korea (South)",
    "Peru",
    "Somalia",
    "Northern Mariana Islands",
    "Yemen",
    "Samoa",
    "Turkey",
    "Bangladesh",
    "Denmark",
    "Eritrea",
    "Namibia",
    "Tokelau",
    "ALA Aland Islands",
    "Antarctica",
    "Tonga",
    "Bermuda",
    "Nauru",
    "Panama",
    "Micronesia, Federated States of",
    "Portugal",
    "Senegal",
    "Suriname",
    "Austria",
    "Azerbaijan",
    "Martinique",
    "Nicaragua",
    "Singapore",
    "Belgium",
    "Cape Verde",
    "Liberia",
    "Serbia",
    "Seychelles",
    "Congo (Kinshasa)",
    "French Southern Territories",
    "Puerto Rico",
    "Sao Tome and Principe",
    "Andorra",
    "Philippines",
    "Lebanon",
    "Lithuania",
    "Malawi",
    "Malaysia",
    "Spain",
    "British Indian Ocean Territory",
    "French Guiana",
    "Sri Lanka",
    "Sweden",
    "Uganda",
    "Egypt",
    "Tuvalu",
    "Fiji",
    "Guyana",
    "El Salvador",
    "Lesotho",
    "Virgin Islands, US",
    "Botswana",
    "Dominica",
    "Papua New Guinea",
    "Slovakia",
    "Swaziland",
    "Burkina Faso",
    "Colombia",
    "Ghana",
    "Iran, Islamic Republic of",
    "Norfolk Island",
    "France",
    "Guadeloupe",
    "Guernsey",
    "Kazakhstan",
    "Belarus",
    "Monaco",
    "Albania",
    "Ethiopia",
    "Holy See (Vatican City State)",
    "Iceland",
    "Italy",
    "American Samoa",
    "Cayman Islands",
    "Gabon",
    "Saint-Barthélemy",
    "Cameroon",
    "New Zealand",
    "Kiribati",
    "Malta",
    "Morocco",
    "Turks and Caicos Islands",
    "Djibouti",
    "Dominican Republic",
    "Solomon Islands",
    "Taiwan, Republic of China",
    "Central African Republic",
    "Latvia",
    "Norway",
    "Mali",
    "Sierra Leone",
  ];
  return (
    <div className="form-group mt-3">
      <label htmlFor="country">Select country:</label>
      <select
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="form-control"
      >
        {countries.sort().map((country, index) => {
          return (
            <option key={index} value={country}>
              {country}
            </option>
          );
        })}
      </select>
    </div>
  );
}
