import { NextApiRequest, NextApiResponse } from "next";

export default async function getProducts(req: NextApiRequest, res: NextApiResponse) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS'); 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');


    return res.status(200).json({
        "laptops": [
            {
                "id": 1,
                "model": "Standard",
                "basePrice": 500,
                "RAM": [
                    {
                        "size": "8GB",
                        "price": 50
                    },
                    {
                        "size": "16GB",
                        "price": 100
                    }
                ],
                "storage": [
                    {
                        "type": "SSD",
                        "size": "256GB",
                        "price": 100
                    },
                    {
                        "type": "SSD",
                        "size": "512GB",
                        "price": 150
                    }
                ]
            },
            {
                "id": 2,
                "model": "Pro",
                "basePrice": 800,
                "RAM": [
                    {
                        "size": "16GB",
                        "price": 100
                    },
                    {
                        "size": "32GB",
                        "price": 200
                    }
                ],
                "storage": [
                    {
                        "type": "SSD",
                        "size": "512GB",
                        "price": 150
                    },
                    {
                        "type": "SSD",
                        "size": "1TB",
                        "price": 250
                    }
                ]
            },
            {
                "id": 3,
                "model": "Ultra",
                "basePrice": 1000,
                "RAM": [
                    {
                        "size": "32GB",
                        "price": 200
                    },
                    {
                        "size": "64GB",
                        "price": 300
                    }
                ],
                "storage": [
                    {
                        "type": "SSD",
                        "size": "1TB",
                        "price": 250
                    },
                    {
                        "type": "SSD",
                        "size": "2TB",
                        "price": 400
                    }
                ]
            }
        ]
    });
}