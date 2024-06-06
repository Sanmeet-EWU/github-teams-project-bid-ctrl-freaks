import citiesJSON from '../images/worldcities.json';

// Define the return object, add more fields if needed
export interface CityMatch {
    city_ascii: string;
    lat: number;
    lng: number;
    country: string;
    admin_name: string;
}



function findClosestMatches(input: string): CityMatch[] {
    if (!input) return [];

    if (input.length < 3) return []; // Return empty array if input is less than 3 characters

    const inputLowerCase = input.toLowerCase();
    const matchesMap: { [key: string]: CityMatch } = {}; // Use a map to store unique matches

    if (!citiesJSON || !(citiesJSON as any).ListOfCity) { // Do do change to citiesJSON.ListOfCity as it will throw error
        console.error('citiesJSON.ListOfCity is undefined');
        return [];
    }

    (citiesJSON as any).ListOfCity.forEach((city: { city_ascii: string; lat: any; lng: any; country: any; admin_name: any; } ) => {
        if (city.city_ascii && city.city_ascii.toLowerCase().includes(inputLowerCase)) {
            const cityMatch: CityMatch = {
                city_ascii: city.city_ascii,
                lat: city.lat,
                lng: city.lng,
                country: city.country,
                admin_name: city.admin_name
            };
            // Ensure no duplicate based on lat and lng
            const key = `${city.lat},${city.lng}`;
            if (!matchesMap[key]) {
                matchesMap[key] = cityMatch;
            }
        }
    });

    // Convert the map values back to an array
    const uniqueMatches: CityMatch[] = Object.values(matchesMap);
    return uniqueMatches;
}

export { findClosestMatches };