import React from 'react';

// Define types for the facility data structure
interface FacilityOption {
    icon: string;
    text: string;
}

interface FacilityCategory {
    [key: string]: FacilityOption;
}

interface Facilities {
    [key: string]: FacilityCategory;
}

interface CampPitch {
    icon: string;
    text: string;
}

interface CampPitches {
    [key: string]: CampPitch;
}

interface SportFacility {
    icon: string;
    text: string;
}

interface SportFacilities {
    [key: string]: SportFacility;
}

// Facilities data
const facilities: Facilities = {
    "tents": {
        "yes": {
            "icon": "tent.svg",
            "text": "tents allowed on site",
        },
        "no": {
            "icon": "no-tent.svg",
            "text": "no tents allowed on site",
        }
    },
    "caravans": {
        "yes": {
            "icon": "caravan.svg",
            "text": "caravans allowed on site",
        },
        "no": {
            "icon": "no-caravan.svg",
            "text": "no caravans allowed on site",
        }
    },
    "motorhome": {
        "yes": {
            "icon": "motorhome.svg",
            "text": "motorhome/RV allowed on site"
        },
        "no": {
            "icon": "no-motorhome.svg",
            "text": "no motorhome/RV allowed on site"
        }
    },
    "static_caravans": {
        "yes": {
            "icon": "static_caravans.svg",
            "text": "static caravans for rent",
        }
    },
    "cabins": {
        "yes": {
            "icon": "cabins.svg",
            "text": "cabins for rent",
        }
    },
    "permanent_camping": {
        "yes": {
            "icon": "permanent.svg",
            "text": "pitches for permanent residents available",
        },
        "only": {
            "icon": "permanent.svg",
            "text": "permanent residents only"
        }
    },
    "toilets": {
        "yes": {
            "icon": "toilet.svg",
            "text": "toilets on site",
        },
        "no": {
            "icon": "no-toilet.svg",
            "text": "no toilets on site",
        }
    },
    "shower": {
        "yes": {
            "icon": "shower.svg",
            "text": "showers on site",
        },
        "no": {
            "icon": "no-shower.svg",
            "text": "no showers on site",
        }
    },
    "drinking_water": {
        "yes": {
            "icon": "drinking_water.svg",
            "text": "drinking water available on site",
        },
        "no": {
            "icon": "no-drinking_water.svg",
            "text": "no drinking water available on site",
        }
    },
    "power_supply": {
        "^(?!no).+$": {
            "icon": "power_supply.svg",
            "text": "electrical power supply available",
        },
        "no": {
            "icon": "no-power_supply.svg",
            "text": "no electrical power supply available",
        }
    },
    "sanitary_dump_station": {
        "^(?!no).+$": {
            "icon": "sanitary_dump_station.svg",
            "text": "sanitary dump station available",
        }
    },
    "shop": {
        "yes": {
            "icon": "shop.svg",
            "text": "shop on site",
        }
    },
    "laundry": {
        "yes": {
            "icon": "laundry.svg",
            "text": "laundry or washing machine on site",
        }
    },
    "washing_machine": {
        "yes": {
            "icon": "laundry.svg",
            "text": "laundry or washing machine on site",
        }
    },
    "pub": {
        "yes": {
            "icon": "pub.svg",
            "text": "pub on site",
        }
    },
    "bar": {
        "yes": {
            "icon": "bar.svg",
            "text": "bar on site",
        }
    },
    "restaurant": {
        "yes": {
            "icon": "restaurant.svg",
            "text": "restaurant on site",
        }
    },
    "fast_food": {
        "yes": {
            "icon": "fast_food.svg",
            "text": "fast food restaurant on site",
        }
    },
    "telephone": {
        "yes": {
            "icon": "telephone.svg",
            "text": "public telephone on site",
        }
    },
    "post_box": {
        "yes": {
            "icon": "post_box.svg",
            "text": "post box on site",
        }
    },
    "playground": {
        "yes": {
            "icon": "playground.svg",
            "text": "playground on site",
        }
    },
    "internet_access": {
        "yes": {
            "icon": "wifi.svg",
            "text": "internet access",
        },
        "no": {
            "icon": "no-wifi.svg",
            "text": "no internet access",
        },
        "wifi": {
            "icon": "wifi.svg",
            "text": "wifi internet access",
        },
        "wlan": {
            "icon": "wifi.svg",
            "text": "wifi internet access",
        }
    },
    "bbq": {
        "yes": {
            "icon": "bbq.svg",
            "text": "barbeque on site",
        }
    },
    "picnic_table": {
        "yes": {
            "icon": "picnic_table.svg",
            "text": "picnic table(s) available",
        }
    },
    "kitchen": {
        "yes": {
            "icon": "kitchen.svg",
            "text": "public kitchen available",
        }
    },
    "fridge": {
        "yes": {
            "icon": "fridge.svg",
            "text": "public fridge available",
        }
    },
    "sink": {
        "yes": {
            "icon": "sink.svg",
            "text": "kitchen sink available",
        }
    },
    "dog": {
        "yes": {
            "icon": "dog.svg",
            "text": "Dogs are allowed"
        },
        "no": {
            "icon": "no-dog.svg",
            "text": "Dogs are not allowed"
        },
        "leashed": {
            "icon": "dog-leashed.svg",
            "text": "Dogs on leash only"
        }
    },
    "motor_vehicle": {
        "yes": {
            "icon": "motor_vehicle.svg",
            "text": "motor vehicles allowed on site",
        },
        "no": {
            "icon": "no-motor_vehicle.svg",
            "text": "no motor vehicles allowed on site",
        }
    },
    "openfire": {
        "yes": {
            "icon": "firepit.svg",
            "text": "open fire allowed",
        },
        "no": {
            "icon": "no-firepit.svg",
            "text": "open fire prohibited",
        }
    },
    "sauna": {
        "yes": {
            "icon": "sauna.svg",
            "text": "sauna",
        }
    },
    "miniature_golf": {
        "yes": {
            "icon": "miniature_golf.svg",
            "text": "miniature golf course"
        }
    },
    "swimming_pool": {
        "yes": {
            "icon": "swimming_pool.svg",
            "text": "swimming pool"
        }
    },
    "golf_course": {
        "yes": {
            "icon": "sport-golf.svg",
            "text": "golf course"
        }
    },
    "fee": {
        "^(?!no).+$": {
            "icon": "fee.svg",
            "text": "There is a fee for usage"
        },
        "no": {
            "icon": "nofee.svg",
            "text": "Usage free of charge"
        }
    }
};

const campPitches: CampPitches = {
    "generic": {
        "icon": "../feature-icons/pitch-green.svg",
        "text": "generic camping pitch"
    },
    "permanent": {
        "icon": "../feature-icons/pitch-blue.svg",
        "text": "pitch for permanent residents"
    },
    "tents": {
        "icon": "../feature-icons/pitch-red.svg",
        "text": "camping pitch for tents"
    }
};

const sportFacilities: SportFacilities = {
    "swimming": {
        "icon": "swimming_pool.svg",
        "text": "swimming pool",
    },
    "golf": {
        "icon": "sport-golf.svg",
        "text": "golf court",
    },
    "tennis": {
        "icon": "sport-tennis.svg",
        "text": "tennis court",
    },
    "soccer": {
        "icon": "sport-soccer.svg",
        "text": "soccer pitch",
    },
    "archery": {
        "icon": "sport-archery.svg",
        "text": "archery range"
    },
    "baseball": {
        "icon": "sport-baseball.svg",
        "text": "Baseballfeld verfügbar"
    },
    "basketball": {
        "icon": "sport-basketball.svg",
        "text": "basketball court"
    },
    "beachvolleyball": {
        "icon": "sport-beachvolleyball.svg",
        "text": "beach volleyball ground"
    },
    "equestrian": {
        "icon": "sport-equestrian.svg",
        "text": "riding arena"
    },
    "table_tennis": {
        "icon": "sport-table_tennis.svg",
        "text": "table tennis table"
    },
    "volleyball": {
        "icon": "sport-volleyball.svg",
        "text": "volleyball field"
    }
};

export {
    facilities,
    campPitches,
    sportFacilities,
};
