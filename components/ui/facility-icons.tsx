import React, {JSX} from 'react';
import {facilities, sportFacilities, campPitches} from './facilities';

interface FacilityData {
    properties: Record<string, any>;
    geometry: {
        coordinates: number[];
    };
}

interface FacilityProps {
    fdata: FacilityData;
}

// Helper function to count address tags
const countAddrTags = (tags: Record<string, string>): number => {
    let count = 0;
    for (const key in tags) {
        if (key.startsWith('addr:')) {
            count++;
        }
    }
    return count;
};

const gen_addr = (
    tags: Record<string, string>,
    newline: string
): string => {
    const addr: Record<string, string> = {};
    let formated = "";

    if (countAddrTags(tags) > 2) {
        if ('addr:housenumber' in tags) {
            addr.houseNumber = tags['addr:housenumber'];
        }

        if ('addr:place' in tags) {
            addr.road = tags['addr:place'];
        }

        if ('addr:street' in tags) {
            addr.road = tags['addr:street'];
        }

        if ('addr:city' in tags) {
            addr.city = tags['addr:city'];
        }

        if ('addr:postcode' in tags) {
            addr.postcode = tags['addr:postcode'];
        } else {
            addr.postcode = '';
        }

        if ('addr:country' in tags) {
            addr.countryCode = tags['addr:country'].toUpperCase();
        }

        // Simple address formatting without the external addressFormatter
        const addressParts: string[] = [];

        // Street address line
        const streetLine = [addr.houseNumber, addr.road].filter(Boolean).join(' ');
        if (streetLine) addressParts.push(streetLine);

        // City line
        const cityLine = [addr.postcode, addr.city].filter(Boolean).join(' ');
        if (cityLine) addressParts.push(cityLine);

        // Country
        if (addr.countryCode) addressParts.push(addr.countryCode);

        // Format the address
        for (let i = 0; i < addressParts.length - 1; i++) {
            formated = formated + addressParts[i] + newline;
        }

        if (addressParts.length > 0) {
            formated = formated + addressParts[addressParts.length - 1].toUpperCase();
        }

        return formated;
    }

    return '';
};

const F2Html: React.FC<FacilityProps> = ({ fdata }) => {

    // special handling flags
    let laundry = false;
    let golf_course = false;
    let swimming_pool = false;

    // Generate facility icons JSX
    const renderFacilityIcons = () => {
        let icons: JSX.Element[] = [];

        for (const f in facilities) {
            if (f === "toilets") {
                icons.push(<div key={`separator-${f}`} className="w-full"></div>);
            }

            if (f in fdata.properties) {
                // prevent double rendering of washing_machine/laundry icon
                if ((f === "laundry" || f === "washing_machine")) {
                    if (laundry) continue;
                    laundry = true;
                }

                // look up potential matching value (regex)
                for (const v in facilities[f]) {
                    // break after match has occurred
                    if (fdata.properties[f].match(v)) {
                        if (f === "power_supply") {
                            if (typeof fdata.properties['power_supply:maxcurrent'] === "undefined") {
                                icons.push(
                                    <img
                                        key={`facility-${f}-${v}`}
                                        src={`/cicons/${facilities[f][v].icon}`}
                                        title={facilities[f][v]['text']}
                                        alt={facilities[f][v]['text']}
                                        className="w-8 h-8 inline-block"
                                    />
                                );
                            } else {
                                let amps = fdata.properties['power_supply:maxcurrent'].replace(";", "A, ");
                                icons.push(
                                    <img
                                        key={`facility-${f}-${v}`}
                                        src={`/cicons/${facilities[f][v].icon}`}
                                        title={`${facilities[f][v]['text']} (max. ${amps}A)`}
                                        alt={`${facilities[f][v]['text']} (max. ${amps}A)`}
                                        className="w-8 h-8 inline-block"
                                    />
                                );
                            }
                        } else {
                            icons.push(
                                <img
                                    key={`facility-${f}-${v}`}
                                    src={`/cicons/${facilities[f][v].icon}`}
                                    title={facilities[f][v]['text']}
                                    alt={facilities[f][v]['text']}
                                    className="w-8 h-8 inline-block"
                                />
                            );
                        }
                        break;
                    }
                }

                if (f === "swimming_pool") {
                    swimming_pool = true;
                }
                if (f === "golf_course") {
                    golf_course = true;
                }
            }
        }

        if ('sport' in fdata.properties) {
            // sport facility icons
            for (const sf in sportFacilities) {
                // prevent double rendering of swimming_pool and golf
                if ((sf === "swimming" && swimming_pool) || (sf === "golf" && golf_course)) {
                    continue;
                }

                if (fdata.properties['sport'].indexOf(sf) > -1) {
                    icons.push(
                        <img
                            key={`sport-${sf}`}
                            src={`/cicons/${sportFacilities[sf].icon}`}
                            title={sportFacilities[sf]['text']}
                            alt={sportFacilities[sf]['text']}
                            className="w-8 h-8 inline-block"
                        />
                    );
                }
            }
        }

        return icons;
    };

    // Render stars
    const renderStars = () => {
        if ("stars" in fdata.properties) {
            const numstars = Number(fdata.properties.stars[0]);
            if (!isNaN(numstars) && numstars > 0) {
                return (
                    <p>
                        {[...Array(numstars)].map((_, i) => (
                            <img key={`star-${i}`} src="/cicons/star.svg" alt="star" className="w-7 h-7 inline-block" />
                        ))}
                    </p>
                );
            }
        }
        return null;
    };

    // Render capacity table
    const renderCapacityTable = () => {
        if (
            !('capacity:caravans' in fdata.properties) &&
            !('capacity:tents' in fdata.properties) &&
            !('capacity:persons' in fdata.properties) &&
            !('capacity:pitches' in fdata.properties)
        ) {
            return null;
        }

        return (
            <table>
                <tbody>
                <tr>
                    {fdata.properties['capacity:caravans'] && (
                        <td style={{ padding: 0, paddingRight: 16 }}>
                            <img
                                src="/other-icons/caravan.svg"
                                title={'capacity (RV/caravans)'}
                                style={{ verticalAlign: 'middle' }}
                                alt={'capacity (RV/caravans)'}
                                className="w-8 h-8 inline-block mr-1"
                            />
                            <b>{fdata.properties['capacity:caravans']}</b>
                        </td>
                    )}

                    {fdata.properties['capacity:tents'] && (
                        <td style={{ padding: 0, paddingRight: 16 }}>
                            <img
                                src="/other-icons/tent.svg"
                                title={'capacity (tents)'}
                                style={{ verticalAlign: 'middle' }}
                                alt={'capacity (tents)'}
                                className="w-8 h-8 inline-block mr-1"
                            />
                        
                            <b>{fdata.properties['capacity:tents']}</b>
                        </td>
                    )}

                    {fdata.properties['capacity:pitches'] &&
                        !fdata.properties['capacity:caravans'] &&
                        !fdata.properties['capacity:tents'] && (
                            <td style={{ padding: 0, paddingRight: 16 }}>
                                <img
                                    src="/other-icons/caravan+tent.svg"
                                    title={'capacity (RV/caravans)'}
                                    style={{ verticalAlign: 'middle' }}
                                    alt={'capacity (RV/caravans)'}
                                    className="w-8 h-8 inline-block mr-1"
                                />
                                <b>{fdata.properties['capacity:pitches']}</b>
                            </td>
                        )}

                    {fdata.properties['capacity:persons'] && (
                        <td style={{ padding: 0 }}>
                            <img
                                src="/other-icons/persons.svg"
                                title={'capacity (persons)'}
                                style={{ verticalAlign: 'middle' }}
                                alt={'capacity (persons)'}
                                className="w-8 h-8 inline-block mr-1"
                            />
                            <b>{fdata.properties['capacity:persons']}</b>
                        </td>
                    )}
                </tr>
                </tbody>
            </table>
        );
    };

    // Handle special cases for caravan sites
    if (fdata.properties['tourism'] === 'caravan_site' && 'capacity' in fdata.properties) {
        fdata.properties['capacity:pitches'] = fdata.properties['capacity'];
        delete fdata.properties['capacity'];
    }

    // Handle deprecated 'maxtents' property
    if ('maxtents' in fdata.properties && !('capacity:tents' in fdata.properties)) {
        fdata.properties['capacity:tents'] = fdata.properties['maxtents'];
    }

    const latlon = `${fdata.geometry.coordinates[1].toFixed(7)},${fdata.geometry.coordinates[0].toFixed(7)}`;
    const geolink = <a href={`geo:${latlon}`}>{latlon}</a>;
    const addr = gen_addr(fdata.properties, '<br />\n');

    return (
        <>
            <div className="flex flex-wrap gap-3">
                <div className="flex flex-wrap gap-2">
                    {renderFacilityIcons()}
                </div>
            {renderStars()}

            {addr && (
                <p>
                    <b>{'Address'}:</b><br />
                    <span dangerouslySetInnerHTML={{ __html: addr }} />
                </p>
            )}

            {fdata.properties.reservation === "required" && (
                <p><b>{'Advance reservation required!'}</b></p>
            )}

            {fdata.properties.reservation === "no" && (
                <p><b>{'No reservation in advance!'}</b></p>
            )}

            {(fdata.properties[`description:en`] || fdata.properties.description) && (
                <div className="infobox">
                    {fdata.properties[`description:en`] || fdata.properties.description}
                </div>
            )}

            {renderCapacityTable()}
            </div>
        </>
    );
};

export default F2Html;
