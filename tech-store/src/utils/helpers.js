import url from './URL';

// helper functions

// flatten

// flatten the object 'image' and turn it into a simple string with the url

export function flattenProducts(data) {
  return data.map(item => {
    // cloudinary
    let image = item.image[0].url;

    return {... item,image};
  });
}

export function featuredProducts(data) {
  return data.filter(item => {
    return item.featured === true;
  })
}