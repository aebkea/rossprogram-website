const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export function mapImageResources(resources) {
    return resources.map(resource => {
        return {
            assetId: resource.asset_id,
            publicId: resource.public_id,
            title: resource.public_id,
            url: resource.secure_url,
            width: resource.width,
            height: resource.height,
        }
    });
}

export async function search(expression) {

    const results = await cloudinary.search
        .expression(expression)
        .execute()

    // console.log(results)

    return {
        images: mapImageResources(results.resources),
        totalCount: results.total_count,
        nextCursor: results?.next_cursor,
    };
}