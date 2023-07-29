import './InfoCard_Item.scss';
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import itemService from '../../../backend/services/itemService';

import ParallaxTilt from 'react-parallax-tilt'

interface Item {
    _id: string;
    Title: string;
    Value: number;
}



export function InfoCard_Item() {
    const [items, setItems] = useState<any>(null);

    useEffect(() => {
        if (!items) {
            getItems();
        }
    })
    
    const getItems = async () => {
        let resItems = await itemService.getItems();
        setItems(resItems);
    }



    const [covers, setCovers] = useState<string[]>([]);

    useEffect(() => {
        const getCovers = async () => {
            let items = await itemService.getItems();
            const coverUrls = await Promise.all(
                items.map(async (item : any) => {
                    const coverUrl = await itemService.getItemCoverUrl(item.Media.Cover === null ? 'NOOBJECT' : item.Media.Cover);
                    console.log(item.Media.Cover)
                    return coverUrl;
                })
            );
            setCovers(coverUrls);
        };
        getCovers();
    }, []);
    
    
    const renderItem = (item: Item, coverUrl: string) => {
        // const TiltOptions = {
        //     reverse: true,  // reverse the tilt direction
        //     max: 50,     // max tilt rotation (degrees)
        //     perspective: 300,   // Transform perspective, the lower the more extreme the tilt gets.
        //     scale: 1,
        //     reset: true,    // If the tilt effect has to be reset on exit.
        // }
        return (
            <Link to={`/Content/Item/${item.Title}`} className='LinkStyle'>
                <div className='CardOfItem'>
                    <figure className='Card'>
                        <ParallaxTilt tiltMaxAngleX={35} tiltMaxAngleY={35} perspective={400} tiltReverse={true} className="ParallaxEffectCard">
                            <img className="ParallaxEffectItem" src={coverUrl} alt={item.Title} />
                            <figcaption className="ParallaxEffectTitle">{item.Title}</figcaption>
                        </ParallaxTilt>
                    </figure>
                </div>
            </Link>
        );
    };

    return (
        <>

                {(items && items.length > 0) ? (
                    <div className="GridOfItems">
                        { items.map((item: Item, index: number) => renderItem(item, covers[index])) }
                    </div>
                ) : (
                    <p>No items found</p>
                )}

{/*            <div className='CardOfItem'>
                <figure className='Card'>
                    <ParallaxTilt perspective={800} tiltReverse={true} className="ParallaxEffectSword">
                        <img style={{ transform: 'translateZ(100px)', display: 'flow' }} src={require('../../images/SwordLayer.png')} alt="" />
                        <img className="ParallaxEffectSword" style={{ transform: 'translateZ(50px)' }} src={require('../../images/Sword of the departed.png')} alt="" />
                        <img className="ParallaxEffectSword" style={{ transform: 'translateZ(55px)' }} src={require('../../images/SwordLayer4.png')} alt="" />
                        <img className="ParallaxEffectSword" style={{ transform: 'translateZ(60px)' }} src={require('../../images/SwordLayer3.png')} alt="" />
                        <img className="ParallaxEffectSword" style={{ transform: 'translateZ(65px)' }} src={require('../../images/SwordLayer2.png')} alt="" />
                        <img className="ParallaxEffectSword" style={{ transform: 'translateZ(70px)' }} src={require('../../images/SwordLayer1.png')} alt="" />
                    </ParallaxTilt>
                </figure>
            </div>*/}
        </>
    )
}