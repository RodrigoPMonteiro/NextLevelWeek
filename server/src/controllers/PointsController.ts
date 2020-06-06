import { Request, Response } from 'express';
import knex from '../database/connection';
//import celebrate from 'celebrate';

class PointController{
    async index( request: Request, response: Response) {
        // cidade, uf e items --> Query Params
        const { city, uf, items } = request.query;

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        const serializedPoints = points.map(point => {
            return {
                ...point,
                //image_url: `http://localhost:3333/uploads/${item.image}`
                image_url: `http://192.168.15.13:3333/uploads/${point.image}`
            };
        });

       return response.json(serializedPoints);
    }

    // Serialização 
    // API - transformer


    async show( request: Request, response: Response) {
        const { id } = request.params;

        const point = await knex('points').where('id', id).first();

        if(!point){
            return response.status(400).json( {message: 'Point not found.'});
        }

        const serializedPoint = {
            ...point,
            image_url: `http://192.168.15.13:3333/uploads/${point.image}`
        };

        // join
        const items = await knex('items')
        .join('point_items', 'items.id', '=', 'point_items.item_id')
        .where('point_items.point_id', id)
        .select('items.title');

        return response.json({ point: serializedPoint, items });
    }

    async create(request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;
    
        const trx = await knex.transaction();
    
        const point =  {
            image:  request.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf   
        }

        const insertedids = await trx('points').insert(point);
    
        const point_id = insertedids[0];
        // Faz o relacionamento N-N ( Muitos para Muitos )
        const pointItems = items
                .split(',')
                .map((item: string)=> Number(item.trim()))
                .map((item_id:number) =>{
            return{
                item_id ,
                point_id
            };
        });
    
        await trx('point_items').insert(pointItems);
        // trx faz rollback das duas querys acima se der erro
        //return response.json({ success: true });

        await trx.commit();

        return response.json({
            id: point_id,
            ... point
        });
    }
}

export default PointController;