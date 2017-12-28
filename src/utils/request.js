
import {fetch_get,fetch_post} from './fetch';

import {host} from './config';

export const get_category = (sc,fc)=>{


    return fetch_get(host+'hero/get_category',{},sc,fc)

}


export const get_hero_list = (id,sc,fc)=>{

    return fetch_get(host+'hero/get_hero_list?id='+id,{},sc,fc)

}

