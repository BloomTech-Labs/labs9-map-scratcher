// import geojson from '../components/Map/countries.geo.json'

// let count = 0

// export default () => (
//   <div>
//      {finalData.map(item => {
//          return(
//              <div>
//             {`country${count++}: createCountry(data: {name: "${item.ADMIN}", code: "${item.ISO_A3}"}) { id }`}
//             {/* Updates state locally, writes directly to the cache. Direct writes are great for one-off mutations that don’t depend on the data that’s currently in the cache, such as writing a single value.
//                     <Query query={isLoggedIn}>
//                     {({ client, data }) => {
//                         console.log(data)
//                         return(
//                             <button  onClick={() => {
//                                 data.isLoggedIn === true ? client.writeData({ data: { isLoggedIn: false }}): client.writeData({ data: { isLoggedIn: true } })
//                             }}>
//                                 click
//                             </button>
//                         )
//                     }}
//                     </Query>
//                     {/* add user example using a form */}
//                     {/* <form>
//                         <input
//                         type='text'
//                         placeholder='name'
//                         name='name'
//                         value={this.state.name}
//                         onChange={this.handleChange}
//                         />
//                         <input
//                         type='text'
//                         placeholder='nickname'
//                         name='nickname'
//                         value={this.state.nickname}
//                         onChange={this.handleChange}
//                         />
//                         <input
//                         type='text'
//                         placeholder='email'
//                         name='email'
//                         value={this.state.email}
//                         onChange={this.handleChange}
//                         />
//                         <Mutation mutation={createMutation}>
//                         {( createUser ) => (
//                                 <button
//                                         onClick={e => {
//                                         e.preventDefault();
//                                         createUser({ variables: { name: this.state.name, nickname: this.state.nickname, email: this.state.email } });
//                                         this.setState({ name: '', nickname: '', email: '' })
//                                         }
//                                     }
                                        
//                                     >
//                                     add user
//                                 </button>
//                         )}
//                         </Mutation>
//              </div>
             
//          )
//      })}
//   </div>
// );

// let arrayData = geojson.features
// let finalData = []

// function getData(data) {
//     for (let i = 0; i< data.length; i++) {
//         finalData.push(data[i].properties)
//     }
//     return finalData
// }


// getData(arrayData)
// console.log(finalData)

// let countryCodes = [ { ADMIN: "Aruba", ISO_A3: "ABW" },
// { ADMIN: "Afghanistan", ISO_A3: "AFG" },
// { ADMIN: "Angola", ISO_A3: "AGO" },
// { ADMIN: "Anguilla", ISO_A3: "AIA" },
// { ADMIN: "Albania", ISO_A3: "ALB" },
// { ADMIN: "Aland", ISO_A3: "ALA" },
// { ADMIN: "Andorra", ISO_A3: "AND" },
// { ADMIN: "United Arab Emirates", ISO_A3: "ARE" },
// { ADMIN: "Argentina", ISO_A3: "ARG" },
// { ADMIN: "Armenia", ISO_A3: "ARM" },
// { ADMIN: "American Samoa", ISO_A3: "ASM" },
// { ADMIN: "Antarctica", ISO_A3: "ATA" },
// { ADMIN: "Ashmore and Cartier Islands", ISO_A3: "-99" },
// { ADMIN: "French Southern and Antarctic Lands", ISO_A3: "ATF" },
// { ADMIN: "Antigua and Barbuda", ISO_A3: "ATG" },
// { ADMIN: "Australia", ISO_A3: "AUS" },
// { ADMIN: "Austria", ISO_A3: "AUT" },
// { ADMIN: "Azerbaijan", ISO_A3: "AZE" },
// { ADMIN: "Burundi", ISO_A3: "BDI" },
// { ADMIN: "Belgium", ISO_A3: "BEL" },
// { ADMIN: "Benin", ISO_A3: "BEN" },
// { ADMIN: "Burkina Faso", ISO_A3: "BFA" },
// { ADMIN: "Bangladesh", ISO_A3: "BGD" },
// { ADMIN: "Bulgaria", ISO_A3: "BGR" },
// { ADMIN: "Bahrain", ISO_A3: "BHR" },
// { ADMIN: "The Bahamas", ISO_A3: "BHS" },
// { ADMIN: "Bosnia and Herzegovina", ISO_A3: "BIH" },
// { ADMIN: "Bajo Nuevo Bank (Petrel Is.)", ISO_A3: "-99" },
// { ADMIN: "Saint Barthelemy", ISO_A3: "BLM" },
// { ADMIN: "Belarus", ISO_A3: "BLR" },
// { ADMIN: "Belize", ISO_A3: "BLZ" },
// { ADMIN: "Bermuda", ISO_A3: "BMU" },
// { ADMIN: "Bolivia", ISO_A3: "BOL" },
// { ADMIN: "Brazil", ISO_A3: "BRA" },
// { ADMIN: "Barbados", ISO_A3: "BRB" },
// { ADMIN: "Brunei", ISO_A3: "BRN" },
// { ADMIN: "Bhutan", ISO_A3: "BTN" },
// { ADMIN: "Botswana", ISO_A3: "BWA" },
// { ADMIN: "Central African Republic", ISO_A3: "CAF" },
// { ADMIN: "Canada", ISO_A3: "CAN" },
// { ADMIN: "Switzerland", ISO_A3: "CHE" },
// { ADMIN: "Chile", ISO_A3: "CHL" },
// { ADMIN: "China", ISO_A3: "CHN" },
// { ADMIN: "Ivory Coast", ISO_A3: "CIV" },
// { ADMIN: "Clipperton Island", ISO_A3: "-99" },
// { ADMIN: "Cameroon", ISO_A3: "CMR" },
// { ADMIN: "Cyprus No Mans Area", ISO_A3: "-99" },
// { ADMIN: "Democratic Republic of the Congo", ISO_A3: "COD" },
// { ADMIN: "Republic of Congo", ISO_A3: "COG" },
// { ADMIN: "Cook Islands", ISO_A3: "COK" },
// { ADMIN: "Colombia", ISO_A3: "COL" },
// { ADMIN: "Comoros", ISO_A3: "COM" },
// { ADMIN: "Cape Verde", ISO_A3: "CPV" },
// { ADMIN: "Costa Rica", ISO_A3: "CRI" },
// { ADMIN: "Coral Sea Islands", ISO_A3: "-99" },
// { ADMIN: "Cuba", ISO_A3: "CUB" },
// { ADMIN: "Curaçao", ISO_A3: "CUW" },
// { ADMIN: "Cayman Islands", ISO_A3: "CYM" },
// { ADMIN: "Northern Cyprus", ISO_A3: "-99" },
// { ADMIN: "Cyprus", ISO_A3: "CYP" },
// { ADMIN: "Czech Republic", ISO_A3: "CZE" },
// { ADMIN: "Germany", ISO_A3: "DEU" },
// { ADMIN: "Djibouti", ISO_A3: "DJI" },
// { ADMIN: "Dominica", ISO_A3: "DMA" },
// { ADMIN: "Denmark", ISO_A3: "DNK" },
// { ADMIN: "Dominican Republic", ISO_A3: "DOM" },
// { ADMIN: "Algeria", ISO_A3: "DZA" },
// { ADMIN: "Ecuador", ISO_A3: "ECU" },
// { ADMIN: "Egypt", ISO_A3: "EGY" },
// { ADMIN: "Eritrea", ISO_A3: "ERI" },
// { ADMIN: "Dhekelia Sovereign Base Area", ISO_A3: "-99" },
// { ADMIN: "Spain", ISO_A3: "ESP" },
// { ADMIN: "Estonia", ISO_A3: "EST" },
// { ADMIN: "Ethiopia", ISO_A3: "ETH" },
// { ADMIN: "Finland", ISO_A3: "FIN" },
// { ADMIN: "Fiji", ISO_A3: "FJI" },
// { ADMIN: "Falkland Islands", ISO_A3: "FLK" },
// { ADMIN: "France", ISO_A3: "FRA" },
// { ADMIN: "Faroe Islands", ISO_A3: "FRO" },
// { ADMIN: "Federated States of Micronesia", ISO_A3: "FSM" },
// { ADMIN: "Gabon", ISO_A3: "GAB" },
// { ADMIN: "United Kingdom", ISO_A3: "GBR" },
// { ADMIN: "Georgia", ISO_A3: "GEO" },
// { ADMIN: "Guernsey", ISO_A3: "GGY" },
// { ADMIN: "Ghana", ISO_A3: "GHA" },
// { ADMIN: "Gibraltar", ISO_A3: "GIB" },
// { ADMIN: "Guinea", ISO_A3: "GIN" },
// { ADMIN: "Gambia", ISO_A3: "GMB" },
// { ADMIN: "Guinea Bissau", ISO_A3: "GNB" },
// { ADMIN: "Equatorial Guinea", ISO_A3: "GNQ" },
// { ADMIN: "Greece", ISO_A3: "GRC" },
// { ADMIN: "Grenada", ISO_A3: "GRD" },
// { ADMIN: "Greenland", ISO_A3: "GRL" },
// { ADMIN: "Guatemala", ISO_A3: "GTM" },
// { ADMIN: "Guam", ISO_A3: "GUM" },
// { ADMIN: "Guyana", ISO_A3: "GUY" },
// { ADMIN: "Hong Kong S.A.R.", ISO_A3: "HKG" },
// { ADMIN: "Heard Island and McDonald Islands", ISO_A3: "HMD" },
// { ADMIN: "Honduras", ISO_A3: "HND" },
// { ADMIN: "Croatia", ISO_A3: "HRV" },
// { ADMIN: "Haiti", ISO_A3: "HTI" },
// { ADMIN: "Hungary", ISO_A3: "HUN" },
// { ADMIN: "Indonesia", ISO_A3: "IDN" },
// { ADMIN: "Isle of Man", ISO_A3: "IMN" },
// { ADMIN: "India", ISO_A3: "IND" },
// { ADMIN: "Indian Ocean Territories", ISO_A3: "-99" },
// { ADMIN: "British Indian Ocean Territory", ISO_A3: "IOT" },
// { ADMIN: "Ireland", ISO_A3: "IRL" },
// { ADMIN: "Iran", ISO_A3: "IRN" },
// { ADMIN: "Iraq", ISO_A3: "IRQ" },
// { ADMIN: "Iceland", ISO_A3: "ISL" },
// { ADMIN: "Israel", ISO_A3: "ISR" },
// { ADMIN: "Italy", ISO_A3: "ITA" },
// { ADMIN: "Jamaica", ISO_A3: "JAM" },
// { ADMIN: "Jersey", ISO_A3: "JEY" },
// { ADMIN: "Jordan", ISO_A3: "JOR" },
// { ADMIN: "Japan", ISO_A3: "JPN" },
// { ADMIN: "Baykonur Cosmodrome", ISO_A3: "-99" },
// { ADMIN: "Siachen Glacier", ISO_A3: "-99" },
// { ADMIN: "Kazakhstan", ISO_A3: "KAZ" },
// { ADMIN: "Kenya", ISO_A3: "KEN" },
// { ADMIN: "Kyrgyzstan", ISO_A3: "KGZ" },
// { ADMIN: "Cambodia", ISO_A3: "KHM" },
// { ADMIN: "Kiribati", ISO_A3: "KIR" },
// { ADMIN: "Saint Kitts and Nevis", ISO_A3: "KNA" },
// { ADMIN: "South Korea", ISO_A3: "KOR" },
// { ADMIN: "Kosovo", ISO_A3: "-99" },
// { ADMIN: "Kuwait", ISO_A3: "KWT" },
// { ADMIN: "Laos", ISO_A3: "LAO" },
// { ADMIN: "Lebanon", ISO_A3: "LBN" },
// { ADMIN: "Liberia", ISO_A3: "LBR" },
// { ADMIN: "Libya", ISO_A3: "LBY" },
// { ADMIN: "Saint Lucia", ISO_A3: "LCA" },
// { ADMIN: "Liechtenstein", ISO_A3: "LIE" },
// { ADMIN: "Sri Lanka", ISO_A3: "LKA" },
// { ADMIN: "Lesotho", ISO_A3: "LSO" },
// { ADMIN: "Lithuania", ISO_A3: "LTU" },
// { ADMIN: "Luxembourg", ISO_A3: "LUX" },
// { ADMIN: "Latvia", ISO_A3: "LVA" },
// { ADMIN: "Macao S.A.R", ISO_A3: "MAC" },
// { ADMIN: "Saint Martin", ISO_A3: "MAF" },
// { ADMIN: "Morocco", ISO_A3: "MAR" },
// { ADMIN: "Monaco", ISO_A3: "MCO" },
// { ADMIN: "Moldova", ISO_A3: "MDA" },
// { ADMIN: "Madagascar", ISO_A3: "MDG" },
// { ADMIN: "Maldives", ISO_A3: "MDV" },
// { ADMIN: "Mexico", ISO_A3: "MEX" },
// { ADMIN: "Marshall Islands", ISO_A3: "MHL" },
// { ADMIN: "Macedonia", ISO_A3: "MKD" },
// { ADMIN: "Mali", ISO_A3: "MLI" },
// { ADMIN: "Malta", ISO_A3: "MLT" },
// { ADMIN: "Myanmar", ISO_A3: "MMR" },
// { ADMIN: "Montenegro", ISO_A3: "MNE" },
// { ADMIN: "Mongolia", ISO_A3: "MNG" },
// { ADMIN: "Northern Mariana Islands", ISO_A3: "MNP" },
// { ADMIN: "Mozambique", ISO_A3: "MOZ" },
// { ADMIN: "Mauritania", ISO_A3: "MRT" },
// { ADMIN: "Montserrat", ISO_A3: "MSR" },
// { ADMIN: "Mauritius", ISO_A3: "MUS" },
// { ADMIN: "Malawi", ISO_A3: "MWI" },
// { ADMIN: "Malaysia", ISO_A3: "MYS" },
// { ADMIN: "Namibia", ISO_A3: "NAM" },
// { ADMIN: "New Caledonia", ISO_A3: "NCL" },
// { ADMIN: "Niger", ISO_A3: "NER" },
// { ADMIN: "Norfolk Island", ISO_A3: "NFK" },
// { ADMIN: "Nigeria", ISO_A3: "NGA" },
// { ADMIN: "Nicaragua", ISO_A3: "NIC" },
// { ADMIN: "Niue", ISO_A3: "NIU" },
// { ADMIN: "Netherlands", ISO_A3: "NLD" },
// { ADMIN: "Norway", ISO_A3: "NOR" },
// { ADMIN: "Nepal", ISO_A3: "NPL" },
// { ADMIN: "Nauru", ISO_A3: "NRU" },
// { ADMIN: "New Zealand", ISO_A3: "NZL" },
// { ADMIN: "Oman", ISO_A3: "OMN" },
// { ADMIN: "Pakistan", ISO_A3: "PAK" },
// { ADMIN: "Panama", ISO_A3: "PAN" },
// { ADMIN: "Pitcairn Islands", ISO_A3: "PCN" },
// { ADMIN: "Peru", ISO_A3: "PER" },
// { ADMIN: "Spratly Islands", ISO_A3: "-99" },
// { ADMIN: "Philippines", ISO_A3: "PHL" },
// { ADMIN: "Palau", ISO_A3: "PLW" },
// { ADMIN: "Papua New Guinea", ISO_A3: "PNG" },
// { ADMIN: "Poland", ISO_A3: "POL" },
// { ADMIN: "Puerto Rico", ISO_A3: "PRI" },
// { ADMIN: "North Korea", ISO_A3: "PRK" },
// { ADMIN: "Portugal", ISO_A3: "PRT" },
// { ADMIN: "Paraguay", ISO_A3: "PRY" },
// { ADMIN: "Palestine", ISO_A3: "PSE" },
// { ADMIN: "French Polynesia", ISO_A3: "PYF" },
// { ADMIN: "Qatar", ISO_A3: "QAT" },
// { ADMIN: "Romania", ISO_A3: "ROU" },
// { ADMIN: "Russia", ISO_A3: "RUS" },
// { ADMIN: "Rwanda", ISO_A3: "RWA" },
// { ADMIN: "Western Sahara", ISO_A3: "ESH" },
// { ADMIN: "Saudi Arabia", ISO_A3: "SAU" },
// { ADMIN: "Scarborough Reef", ISO_A3: "-99" },
// { ADMIN: "Sudan", ISO_A3: "SDN" },
// { ADMIN: "South Sudan", ISO_A3: "SSD" },
// { ADMIN: "Senegal", ISO_A3: "SEN" },
// { ADMIN: "Serranilla Bank", ISO_A3: "-99" },
// { ADMIN: "Singapore", ISO_A3: "SGP" },
// { ADMIN: "South Georgia and South Sandwich Islands", ISO_A3: "SGS" },
// { ADMIN: "Saint Helena", ISO_A3: "SHN" },
// { ADMIN: "Solomon Islands", ISO_A3: "SLB" },
// { ADMIN: "Sierra Leone", ISO_A3: "SLE" },
// { ADMIN: "El Salvador", ISO_A3: "SLV" },
// { ADMIN: "San Marino", ISO_A3: "SMR" },
// { ADMIN: "Somaliland", ISO_A3: "-99" },
// { ADMIN: "Somalia", ISO_A3: "SOM" },
// { ADMIN: "Saint Pierre and Miquelon", ISO_A3: "SPM" },
// { ADMIN: "Republic of Serbia", ISO_A3: "SRB" },
// { ADMIN: "Sao Tome and Principe", ISO_A3: "STP" },
// { ADMIN: "Suriname", ISO_A3: "SUR" },
// { ADMIN: "Slovakia", ISO_A3: "SVK" },
// { ADMIN: "Slovenia", ISO_A3: "SVN" },
// { ADMIN: "Sweden", ISO_A3: "SWE" },
// { ADMIN: "Swaziland", ISO_A3: "SWZ" },
// { ADMIN: "Sint Maarten", ISO_A3: "SXM" },
// { ADMIN: "Seychelles", ISO_A3: "SYC" },
// { ADMIN: "Syria", ISO_A3: "SYR" },
// { ADMIN: "Turks and Caicos Islands", ISO_A3: "TCA" },
// { ADMIN: "Chad", ISO_A3: "TCD" },
// { ADMIN: "Togo", ISO_A3: "TGO" },
// { ADMIN: "Thailand", ISO_A3: "THA" },
// { ADMIN: "Tajikistan", ISO_A3: "TJK" },
// { ADMIN: "Turkmenistan", ISO_A3: "TKM" },
// { ADMIN: "East Timor", ISO_A3: "TLS" },
// { ADMIN: "Tonga", ISO_A3: "TON" },
// { ADMIN: "Trinidad and Tobago", ISO_A3: "TTO" },
// { ADMIN: "Tunisia", ISO_A3: "TUN" },
// { ADMIN: "Turkey", ISO_A3: "TUR" },
// { ADMIN: "Tuvalu", ISO_A3: "TUV" },
// { ADMIN: "Taiwan", ISO_A3: "TWN" },
// { ADMIN: "United Republic of Tanzania", ISO_A3: "TZA" },
// { ADMIN: "Uganda", ISO_A3: "UGA" },
// { ADMIN: "Ukraine", ISO_A3: "UKR" },
// { ADMIN: "United States Minor Outlying Islands", ISO_A3: "UMI" },
// { ADMIN: "Uruguay", ISO_A3: "URY" },
// { ADMIN: "United States of America", ISO_A3: "USA" },
// { ADMIN: "US Naval Base Guantanamo Bay", ISO_A3: "-99" },
// { ADMIN: "Uzbekistan", ISO_A3: "UZB" },
// { ADMIN: "Vatican", ISO_A3: "VAT" },
// { ADMIN: "Saint Vincent and the Grenadines", ISO_A3: "VCT" },
// { ADMIN: "Venezuela", ISO_A3: "VEN" },
// { ADMIN: "British Virgin Islands", ISO_A3: "VGB" },
// { ADMIN: "United States Virgin Islands", ISO_A3: "VIR" },
// { ADMIN: "Vietnam", ISO_A3: "VNM" },
// { ADMIN: "Vanuatu", ISO_A3: "VUT" },
// { ADMIN: "Wallis and Futuna", ISO_A3: "WLF" },
// { ADMIN: "Akrotiri Sovereign Base Area", ISO_A3: "-99" },
// { ADMIN: "Samoa", ISO_A3: "WSM" },
// { ADMIN: "Yemen", ISO_A3: "YEM" },
// { ADMIN: "South Africa", ISO_A3: "ZAF" },
// { ADMIN: "Zambia", ISO_A3: "ZMB" },
// { ADMIN: "Zimbabwe", ISO_A3: "ZWE" }, ]