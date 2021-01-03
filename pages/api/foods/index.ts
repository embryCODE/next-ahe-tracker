import dynamoDB from '../../../data/dynamoDB';

// Hardcoded until more users added
const userId = '0';

export default async (req, res) => {
  if (req.method === 'GET') {
    const { Item } = await dynamoDB.get({ Key: { id: userId } });
    const foods = Item.foods;

    res.status(200).json(foods);
  }

  if (req.method === 'POST') {

    const { Attributes } = await dynamoDB.update({
      Key: {
        id: userId,
      },
      UpdateExpression: 'SET foods = :foods',
      ExpressionAttributeValues: {
        ':foods': req.body,
      },
      ReturnValues: 'ALL_NEW',
    });

    const foods = Attributes.foods;

    res.status(200).json(foods);
  }
};
