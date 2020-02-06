const apiKey =
  "ZtNakPkufB2lQWCF8xhaY0uM-iMegDozaKUj4n3RTyVwl5nMfSRqTO4UUttFX5vkhTF8oTZr-5r1M6n88OcodObOiUWHqXzdzpMnqQ0bFetJnEnWbHzPOMWX9w8FXnYx";

export const yelp = {
  search: function(term, location, sortBy){
    return fetch(
      `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
      {
        headers: {
            Authorization: `Bearer ${apiKey}`
        }
      }
    )
    .then((res) => res.json())
    .then((jsonRes) => {
        if(jsonRes.businesses){
            console.log(jsonRes.businesses);
            return jsonRes.businesses.map(business => {
                return {
                    id: business.id,
                    imageSrc: business.image_url,
                    name: business.name,
                    address: business.location.address1,
                    city: business.location.city,
                    state:business.location.state,
                    zipCode:business.location.zip_code,
                    category:business.categories,
                    rating:business.rating,
                    reviewCount:business.review_count,
                    url: business.url
                }
            })
        }
    });
  }
};